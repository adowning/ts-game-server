# TypeScript Game Server

A modern TypeScript game server using Hono, Bun, WebSockets, and Prisma ORM for hosting NG slot games.

## Features

- **Hono Framework**: Fast, lightweight web framework
- **Bun Runtime**: High-performance JavaScript runtime and package manager
- **WebSocket Support**: Real-time bidirectional communication using Bun's built-in WebSocket
- **Prisma ORM**: Type-safe database operations
- **Redis Integration**: Session management and real-time features
- **TypeScript**: Full type safety throughout the application

## Prerequisites

- [Bun](https://bun.sh/) (latest version)
- MySQL or PostgreSQL database
- Redis server (optional, for session management)

## Quick Start

1. **Install dependencies:**
   ```bash
   cd typescript-game-server
   bun install
   ```

2. **Setup environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database and Redis configuration
   ```

3. **Setup database:**
   ```bash
   # Generate Prisma client
   bun run db:generate
   
   # Push schema to database
   bun run db:push
   
   # Seed database with NG games
   bun run db:seed
   ```

4. **Start development server:**
   ```bash
   bun run dev
   ```

The server will start on `http://localhost:3000`

## Environment Variables

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/casino_db"

# Server Configuration
PORT=3000
HOST=localhost

# Redis Configuration (optional)
REDIS_URL="redis://localhost:6379"

# Development
NODE_ENV="development"
```

## API Endpoints

### HTTP Endpoints

- `GET /` - Server information
- `GET /health` - Health check
- `GET /api/games` - List all NG games
- `GET /api/games/:gameName` - Get specific game details
- `GET /api/users/:userId/balance` - Get user balance
- `GET /api/ws-stats` - WebSocket connection statistics
- `GET /api/games/:gameName/logs` - Game logs

### WebSocket Endpoints

- `WS /slots` - Main game WebSocket connection
- `WS /live` - Live updates (jackpots, tournaments, etc.)

## WebSocket Protocol

The server implements the existing WebSocket protocol for compatibility:

### Message Format
```
data:::{"action":"InitRequest","gameName":"AfricanKingNG","sessionId":"session123"}
```

### Supported Actions
- `InitRequest` - Initialize game session
- `AuthRequest` - Authenticate and get game configuration
- `SpinRequest` - Process spin
- `FreeSpinRequest` - Process free spin
- `BalanceRequest` - Get current balance
- `PickBonusItemRequest` - Handle bonus picks
- `EventsRequest` - Get game events
- `APIVersionRequest` - Get API version
- `CheckBrokenGameRequest` - Check for broken games

## Game Implementation

### Adding New NG Games

1. **Create game directory:**
   ```
   src/games/YourGameNG/
   ├── index.ts
   ├── SlotSettings.ts
   ├── GameReel.ts
   └── reels.json
   ```

2. **Add reel data:**
   Convert the PHP `reels.txt` to JSON format in `reels.json`

3. **Implement game logic:**
   Port the PHP game logic to TypeScript

4. **Register in database:**
   Add the game to the seed file or create manually

### Game Structure

Each game should implement:
- Reel strip configuration
- Paytable definition
- Win calculation logic
- Bonus feature handling
- Free spin mechanics

## Database Schema

The server uses Prisma with the following main models:

- `User` - Player accounts
- `Shop` - Casino configuration
- `Game` - Game definitions
- `GameLog` - Game history
- `GameBank` - Banking configuration
- `Session` - User sessions

## Development

### Running in Development
```bash
bun run dev
```

### Building for Production
```bash
bun run build
```

### Database Operations
```bash
# Generate Prisma client
bun run db:generate

# Create migration
bun run db:migrate

# Push schema changes
bun run db:push

# Seed database
bun run db:seed
```

## Testing

### Test User Credentials
After seeding the database, you can use:
- Username: `testuser`
- Session Token: `test_session_token_123`
- Balance: $1000.00

### WebSocket Testing

You can test WebSocket connections using a WebSocket client:

```javascript
const ws = new WebSocket('ws://localhost:3000/slots');

ws.onopen = () => {
  // Send auth request
  ws.send('data:::{"action":"AuthRequest","gameName":"AfricanKingNG","sessionId":"test_session_token_123"}');
};

ws.onmessage = (event) => {
  console.log('Received:', event.data);
};
```

## Production Deployment

1. **Set environment to production:**
   ```env
   NODE_ENV=production
   ```

2. **Configure database:**
   Update `DATABASE_URL` with production database

3. **Setup Redis:**
   Configure Redis for session management

4. **Start server:**
   ```bash
   bun run start
   ```

## Monitoring

- Health check: `GET /health`
- WebSocket stats: `GET /api/ws-stats`
- Game logs: `GET /api/games/:gameName/logs`

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   WebSocket     │    │   HTTP API      │    │   Database      │
│   /slots        │◄──►│   /api/*        │◄──►│   MySQL/PG      │
│   /live         │    │                 │    │   + Prisma      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Game Logic    │    │   Middleware    │    │   Redis         │
│   - Slots       │    │   - CORS        │    │   - Sessions    │
│   - Reels       │    │   - Auth        │    │   - Live Data   │
│   - Payouts     │    │   - Logging     │    │   - Pub/Sub     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
