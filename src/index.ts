import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import { ConnectionManager } from './websocket/ConnectionManager'
import { parseWebSocketMessage, createIRQResponse } from './utils/messageEncoder'
import prisma from './database/client'
import redis from './utils/redis'
// Assuming RequestBuilder.ts is in ./Games/ directory from where index.ts is.
// Adjust the import path if your RequestBuilder.ts is located elsewhere.
import { processGameRequest, ServerResponse as GameServerResponse } from './Games/RequestBuilder'

// Initialize Hono app
const app = new Hono()

// Middleware
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8000', 'http://127.0.0.1:8000'],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
)

// Initialize WebSocket components
const connectionManager = new ConnectionManager()
connectionManager.startCleanupInterval()

// Static file serving for games
app.use('/games/*', serveStatic({ root: './public' }))
app.use('/games', serveStatic({ root: './public', path: '/games' }))
app.get('/:gameName.html', serveStatic({ root: './public' }))
app.get('/launcher', serveStatic({ root: './public', path: '/index.html' }))

// Game initialization endpoint (remains largely the same, as it's HTTP, not WebSocket game logic)
app.post('/game/:gameName/server', async (c) => {
  try {
    const gameName = c.req.param('gameName')
    const sessionId = c.req.query('sessionId') // This is often a user's session token
    const body = await c.req.json()

    if (!body || !body.action) {
      return c.json(
        {
          action: 'ErrorResponse',
          result: false,
          error: 'Invalid request format - missing action',
        },
        400
      )
    }
    if (body.action === 'EventRequest' || body.action === 'EventsRequest') {
      return c.json({
        action: body.action.replace('Request', 'Response'),
        result: true,
        sesId: sessionId,
        data: {},
      })
    }
    if (body.action !== 'InitRequest') {
      return c.json(
        {
          action: body.action.replace('Request', 'Response'),
          result: false,
          error: `Unsupported action: ${body.action}`,
        },
        400
      )
    }

    // Simulate fetching or identifying user by sessionId for HTTP init
    // In a real app, sessionId would map to a userId.
    // For this Init call, we are mostly concerned with providing game parameters.
    // The actual game play would go through WebSocket and use a persistent userId.
    let user = await prisma.user.findFirst({
      where: { username: 'testuser' },
      include: { shop: true },
    }) // Example user
    if (!user && sessionId) {
      // A more robust session ID to User ID mapping would be here
      // user = await getUserBySession(sessionId);
    }
    if (user === null) {
      return c.json({ action: 'InitResponse', result: false, error: 'User not found' }, 404)
    }
    // if (!user) {
    //   // Still no user, create or use a default guest for init response
    //   user = {
    //     id: sessionId || 'guestInitSession',
    //     username: 'guest',
    //     balance: 0, // Default balance for guest/init
    //     shop: { currency: 'USD', percent: 95, max_win: 10000 }, // Mock shop data
    //   }
    // } else {
    //   // Ensure balance is a number
    //   user.balance = Number(user.balance)
    // }

    const game = await prisma.game.findFirst({
      where: { name: gameName, view: true },
      include: { shop: true },
    })
    if (!game)
      return c.json({ action: 'InitResponse', result: false, error: 'Game not found' }, 404)

    const initResponse = {
      action: 'InitResponse',
      result: true,
      sesId: sessionId || user.id, // Use user's actual ID if available, or session
      data: {
        gameId: game.id, // Prisma game ID
        gameName: game.name,
        gameTitle: game.title,
        userId: user.id,
        username: user.username,
        balance: user.balance,
        currency: user.shop?.currency || game.shop?.currency || 'USD',
        bets: game.bet.split(','),
        denomination: game.denomination,
        defaultBet: game.bet.split(',')[0],
        defaultCoinValue: game.denomination,
        coinValues: [game.denomination],
        shopPercent: user.shop?.percent || game.shop?.percent || 90,
        maxWin: user.shop?.max_win || game.shop?.max_win || '10000',
        serverUrl: `ws://${c.req.header('host') || 'localhost:3000'}/slots`, // Use dynamic host
        gameParameters: { rtp: '95.00', volatility: 'medium', maxLines: 20, reels: 5, rows: 3 },
      },
    }
    console.log(
      `Game Init Response - Game: ${gameName}`,
      initResponse.data.userId,
      initResponse.data.username
    )
    return c.json(initResponse)
  } catch (error) {
    console.error('Game initialization error:', error)
    return c.json({ action: 'InitResponse', result: false, error: 'Internal server error' }, 500)
  }
})

// Health check endpoint
app.get('/health', async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    await redis.getClient().ping()
    // const { phpExecutor } = await import('./utils/phpExecutor'); // Assuming phpExecutor is not used directly anymore here
    // const phpAvailable = await phpExecutor.checkPhpAvailability();
    // const phpVersion = phpAvailable ? await phpExecutor.getPhpVersion() : null;

    return c.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        redis: 'connected',
        websocket: 'active',
        // php: phpAvailable ? 'available' : 'unavailable', phpVersion: phpVersion || 'unknown'
      },
    })
  } catch (error: any) {
    console.error('Health check failed:', error)
    return c.json(
      { status: 'unhealthy', timestamp: new Date().toISOString(), error: error.message },
      500
    )
  }
})

// API routes for games
app.get('/api/games/netgame', async (c) => {
  try {
    const games = await prisma.game.findMany({
      where: {
        view: true,
        name: { endsWith: 'NG' },
      },
      include: { shop: true },
    })

    // Load real-time stats from file
    let gameStats: Record<string, any> = {}
    try {
      const fs = require('fs')
      const path = require('path')
      const statsFile = path.join(__dirname, 'Games', 'CloverStonesNG', 'game_stats.json')
      if (fs.existsSync(statsFile)) {
        gameStats = JSON.parse(fs.readFileSync(statsFile, 'utf8'))
      }
    } catch (error: any) {
      console.log('Could not load game stats file:', error?.message || 'Unknown error')
    }

    // Transform games to the format expected by the frontend
    const ngGames = games.map((game) => {
      // Get real-time stats from file, fallback to database values
      const realTimeStats = gameStats[game.name] || {}
      const statIn = realTimeStats.stat_in || parseFloat(game.stat_in.toString())
      const statOut = realTimeStats.stat_out || parseFloat(game.stat_out.toString())
      const actualRtp = statIn > 0 ? ((statOut / statIn) * 100).toFixed(2) : '0.00'

      return {
        name: game.name,
        title: game.title,
        url: `/games/${game.name}/`,
        assetsPath: `/games/${game.name}/`,
        targetRtp: game.shop?.percent ? `${game.shop.percent}%` : '95.0%',
        actualRtp: `${actualRtp}%`,
        maxWin: game.shop?.max_win || 1000,
        denomination: game.denomination,
        bets: game.bet.split(',').map((b) => parseFloat(b.trim())),
        statIn: statIn,
        statOut: statOut,
        totalSpins: Math.floor(statIn / 10) || 0, // Estimate spins based on average bet
      }
    })

    return c.json(ngGames)
  } catch (error) {
    console.error('Error fetching NG games:', error)
    return c.json({ error: 'Failed to fetch NG games' }, 500)
  }
})

app.get('/api/games/misc', async (c) => c.json([])) // Keep empty for now as requested
app.get('/api/games', async (c) => {
  try {
    const games = await prisma.game.findMany({
      where: { view: true, name: { endsWith: 'NG' } },
      include: { shop: true },
    })
    return c.json(games)
  } catch (e) {
    return c.json({ error: 'failed' }, 500)
  }
})
app.get('/api/games/:gameName', async (c) => {
  const gameName = c.req.param('gameName')
  try {
    const game = await prisma.game.findFirst({
      where: { name: gameName, view: true },
      include: { shop: true },
    })
    if (!game) return c.json({ error: 'Game not found' }, 404)
    return c.json(game)
  } catch (e) {
    return c.json({ error: 'failed' }, 500)
  }
})
app.get('/api/users/:userId/balance', async (c) => {
  const userId = c.req.param('userId')
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true, shop: { select: { currency: true } } },
    })
    if (!user) return c.json({ error: 'User not found' }, 404)
    return c.json({ balance: Number(user.balance), currency: user.shop?.currency || 'USD' })
  } catch (e) {
    return c.json({ error: 'failed' }, 500)
  }
})
app.get('/api/ws-stats', (c) => c.json(connectionManager.getStats()))
app.get('/api/games/:gameName/logs', async (c) => c.json([])) // Placeholder

// PHP test endpoint - This can now use the processGameRequest for more integrated testing
app.post('/api/test-php/:gameName', async (c) => {
  const gameName = c.req.param('gameName')
  const body = await c.req.json() // Expects { action: string, payload?: object, userId: string }

  if (!body.userId || !body.action || !gameName) {
    return c.json({ error: 'Missing userId, action, or gameName for PHP test.' }, 400)
  }

  try {
    const result = await processGameRequest(body.userId, gameName, body.action, body.payload)
    return c.json(result)
  } catch (error: any) {
    console.error('PHP test via processGameRequest error:', error)
    return c.json({ error: `Failed to execute PHP via processGameRequest: ${error.message}` }, 500)
  }
})

app.get('/', (c) => c.json({ message: 'TypeScript Game Server v1.0.1' }))
app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({ error: 'Internal Server Error', message: err.message }, 500)
})

// Graceful shutdown
async function shutdown() {
  console.log('Shutting down server...')
  try {
    await prisma.$disconnect()
    await redis.disconnect()
    console.log('Cleanup completed')
    process.exit(0)
  } catch (error) {
    console.error('Error during shutdown:', error)
    process.exit(1)
  }
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

const port = parseInt(process.env.PORT || '3000')
const host = process.env.HOST || 'localhost'

console.log(`Starting TypeScript Game Server...`)
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
console.log(`Server will run on: http://${host}:${port}`)

async function handleWebSocketMessage(ws: any, message: any) {
  try {
    const parsedMessage = parseWebSocketMessage(message.toString())

    if (!parsedMessage) {
      console.warn('Failed to parse WebSocket message:', message.toString().substring(0, 100))
      ws.send(JSON.stringify({ error: 'Invalid message format' }))
      return
    }

    // Handle IRQ requests (Keep Alive)
    if (parsedMessage.irq !== undefined) {
      ws.send(createIRQResponse())
      return
    }

    // Assuming parsedMessage contains:
    // - gameName: string (e.g., "CloverStonesNG")
    // - action: string (e.g., "SpinRequest", "AuthRequest")
    // - payload: object (e.g., { coin: 1, bet: 1 })
    // - userId: string (crucial - you need to get this from the WebSocket connection's session)

    // TODO: Implement robust user identification from WebSocket connection (ws object)
    // For now, we'll try to get it from the parsedMessage or use a default for testing.
    // In a real app, ws.userId would be set upon successful WebSocket authentication.
    const userId = parsedMessage.userId || ws.userId || 'default_websocket_user'
    const gameName = parsedMessage.gameName
    const action = parsedMessage.action
    const payload = parsedMessage.payload || parsedMessage.data // Accommodate 'data' too
    // console.log(userId)
    // console.log(gameName)
    // console.log(action)
    if (!userId || !gameName || !action) {
      console.warn('WebSocket message missing userId, gameName, or action:', parsedMessage)
      ws.send(JSON.stringify({ error: 'Missing critical fields: userId, gameName, or action' }))
      return
    }
    // console.log(
    //   `[WebSocket] Received for User ${userId}, Game ${gameName}, Action ${action}:`,
    //   payload
    // )

    // Call the refactored game request processor
    const response: GameServerResponse | { error: string; details?: any } =
      await processGameRequest(userId, gameName, action, payload)
    // console.log(
    //   `[WebSocket] Response for User ${userId}, Game ${gameName}, Action ${action}:`,
    //   response
    // )

    // Send response back to client
    if (response) {
      // The PHP server might already stringify its core response, but processGameRequest might wrap it.
      // Ensure we send a string.
      // console.log(`::: ${typeof response === 'string' ? response : JSON.stringify(response)}`)

      ws.send(`::: ${typeof response === 'string' ? response : JSON.stringify(response)}`)
    }
  } catch (error: any) {
    console.error('Error handling WebSocket message:', error)
    const errorResponse = JSON.stringify({
      responseEvent: 'error',
      responseType: '',
      serverResponse: `Message processing error: ${error.message}`,
    })
    try {
      ws.send(errorResponse)
    } catch (sendError) {
      console.error('Error sending error response:', sendError)
    }
  }
}

export default {
  port,
  hostname: host,
  fetch(req: Request, server: any) {
    const url = new URL(req.url)
    if (
      (url.pathname === '/slots' || url.pathname === '/live') &&
      req.headers.get('upgrade') === 'websocket'
    ) {
      if (server.upgrade(req, { data: { connectionId: `conn_${Date.now()}` } })) {
        // Pass unique ID
        return // WebSocket upgrade handled by Bun
      }
      return new Response('WebSocket upgrade failed', { status: 500 })
    }
    return app.fetch(req)
  },
  websocket: {
    open(ws: any) {
      // ws.data.connectionId is set in the fetch handler by Bun on upgrade
      const connectionId = connectionManager.addConnection(ws, ws.data?.connectionId)
      console.log(`WebSocket connected: ${connectionId}`)
      ws.userId = 'user_from_ws_auth' // TODO: Replace with actual user ID after WebSocket authentication
      ws.send('1::') // Standard connection ACK
    },
    message(ws: any, message: any) {
      handleWebSocketMessage(ws, message)
    },
    close(ws: any) {
      connectionManager.removeConnection(ws)
      console.log(`WebSocket disconnected: ${ws.data?.connectionId}`)
    },
    error(ws: any, error: any) {
      console.error(`WebSocket error for ${ws.data?.connectionId}:`, error)
      connectionManager.removeConnection(ws)
    },
  },
}
