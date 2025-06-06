// import { WebSocketMessage, GameRequest, GameResponse } from '../types/websocket.ts'
// import { PlayerWithShop } from '../types/player.ts'
// import { SlotSettings } from '../core/SlotSettings.ts'
// import {
//   createErrorResponse,
//   createGameResponse,
//   createIRQResponse,
// } from '../utils/messageEncoder.ts'
// import { PHPGameHandler } from './PHPGameHandler.ts'
// import prisma from '../database/client.ts'
// import { AfricanKingNG } from '../Games/AfricanKingNG/AfricanKingNG.ts'
// import { SlotSettings as AfricanKingSlotSettings } from '../Games/AfricanKingNG/SlotSettings.ts'
// import { CloverStonesNG } from '../Games/CloverStonesNG/CloverStonesNG.ts'
// import { SlotSettings as CloverStonesSlotSettings } from '../Games/CloverStonesNG/SlotSettings.ts'

// export class MessageHandler {
//   private phpHandler = new PHPGameHandler()

//   public async processGameMessage(data: WebSocketMessage): Promise<string | string[]> {
//     try {
//       // Handle IRQ requests (from CQ protocol)
//       if (data.irq !== undefined) {
//         return createIRQResponse()
//       }

//       const { gameName, sessionId, cookie, ...gameData } = data

//       if (!gameName) {
//         return createErrorResponse('Game name is required')
//       }

//       // Check if this is CloverStonesNG and use PHP backend
//       if (gameName === 'CloverStonesNG') {
//         return await this.phpHandler.processCloverStonesNG(data)
//       }

//       // For other games, continue with existing TypeScript implementation
//       // Validate session and get user
//       const user = await this.validateSession(sessionId, cookie)
//       if (!user) {
//         return createErrorResponse('invalid login')
//       }

//       // Get game configuration
//       const game = await prisma.game.findFirst({
//         where: {
//           name: gameName,
//           shop_id: user.shop_id,
//         },
//         include: { shop: true },
//       })

//       if (!game || !game.view) {
//         return createErrorResponse('Game is disabled')
//       }

//       // Create slot settings
//       const slotSettings = new SlotSettings(gameName, user.id, user, game)

//       if (!slotSettings.is_active()) {
//         return createErrorResponse('Game is disabled')
//       }

//       // Process the game request
//       // Check if this is AfricanKingNG and use the specific implementation
//       if (gameName === 'AfricanKingNG') {
//         return await this.processAfricanKingNG(user, game, gameData as GameRequest)
//       }

//       return await this.processGameAction(slotSettings, gameData as GameRequest)
//     } catch (error) {
//       console.error('Error processing game message:', error)
//       return createErrorResponse('Internal server error')
//     }
//   }

//   private async processGameAction(
//     slotSettings: SlotSettings,
//     request: GameRequest
//   ): Promise<string | string[]> {
//     const action = request.action || request.cmd

//     if (!action) {
//       return createErrorResponse('Action is required')
//     }

//     switch (action) {
//       case 'InitRequest':
//         return await this.handleInit(slotSettings)

//       case 'AuthRequest':
//         return await this.handleAuth(slotSettings)

//       case 'BalanceRequest':
//         return await this.handleBalance(slotSettings)

//       case 'SpinRequest':
//         return await this.handleSpin(slotSettings, request)

//       case 'FreeSpinRequest':
//         return await this.handleFreeSpin(slotSettings, request)

//       case 'PickBonusItemRequest':
//         return await this.handleBonusPick(slotSettings, request)

//       case 'EventsRequest':
//         return await this.handleEvents(slotSettings)

//       case 'APIVersionRequest':
//         return await this.handleAPIVersion(slotSettings, request)

//       case 'CheckBrokenGameRequest':
//         return await this.handleCheckBrokenGame(slotSettings)

//       default:
//         return createErrorResponse('Unknown action: ' + action)
//     }
//   }

//   private async handleInit(slotSettings: SlotSettings): Promise<string> {
//     const response = {
//       action: 'InitResponce',
//       result: true,
//       sesId: 'a40e5dc15a83a70f288e421fbcfc6de8',
//       data: { id: 16183084 },
//     }

//     return JSON.stringify(response)
//   }

//   private async handleAuth(slotSettings: SlotSettings): Promise<string> {
//     // Reset game state
//     await slotSettings.SetGameData(slotSettings.slotId + 'BonusWin', 0)
//     await slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', 0)
//     await slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', 0)
//     await slotSettings.SetGameData(slotSettings.slotId + 'TotalWin', 0)
//     await slotSettings.SetGameData(slotSettings.slotId + 'FreeBalance', 0)
//     await slotSettings.SetGameData(slotSettings.slotId + 'FreeStartWin', 0)
//     await slotSettings.SetGameData(slotSettings.slotId + 'BonusSymbol', -1)

//     // Get last event for restoration
//     const lastEvent = await slotSettings.GetHistory()
//     let restoreString = ''
//     let curReels = ''
//     let bet = slotSettings.Bet[0] * 100 * 20
//     console.log('lastEvent', lastEvent)
//     if (lastEvent) {
//       // Restore from last event
//       await slotSettings.SetGameData(
//         slotSettings.slotId + 'BonusWin',
//         lastEvent.serverResponse?.bonusWin || 0
//       )
//       await slotSettings.SetGameData(
//         slotSettings.slotId + 'FreeGames',
//         lastEvent.serverResponse?.totalFreeGames || 0
//       )
//       await slotSettings.SetGameData(
//         slotSettings.slotId + 'CurrentFreeGame',
//         lastEvent.serverResponse?.currentFreeGames || 0
//       )
//       await slotSettings.SetGameData(
//         slotSettings.slotId + 'TotalWin',
//         lastEvent.serverResponse?.bonusWin || 0
//       )
//       await slotSettings.SetGameData(
//         slotSettings.slotId + 'BonusSymbol',
//         lastEvent.serverResponse?.BonusSymbol || -1
//       )

//       if (lastEvent.serverResponse?.reelsSymbols) {
//         const reels = lastEvent.serverResponse.reelsSymbols
//         // Build reel display string
//         curReels = this.buildReelString(reels)
//         bet = (lastEvent.serverResponse.slotBet || 1) * 100 * 20
//       }
//     } else {
//       // Generate random initial reels
//       curReels = this.generateRandomReels()
//     }

//     // Check if in free spins
//     const freeGames = slotSettings.GetGameData(slotSettings.slotId + 'FreeGames')
//     const currentFreeGame = slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame')

//     if (currentFreeGame < freeGames && freeGames > 0) {
//       const fBonusWin = slotSettings.GetGameData(slotSettings.slotId + 'BonusWin')
//       const fRemain = freeGames - currentFreeGame
//       restoreString = `,"restoredGameCode":"340","lastResponse":{"spinResult":{"type":"SpinResult","rows":[${curReels}]},"freeSpinsTotal":"${freeGames}","freeSpinRemain":"${fRemain}","totalBonusWin":"${fBonusWin}","state":"FreeSpins","expandingSymbols":["1"]}`
//     }

//     const balance = await slotSettings.GetBalance()
//     const balanceInCents = Math.round(balance * 100)

//     const authResponse = {
//       action: 'AuthResponse',
//       result: 'true',
//       sesId: '10000296198',
//       data: {
//         snivy: 'proxy v6.10.48 (API v4.23)',
//         supportedFeatures: ['Offers', 'Jackpots', 'InstantJackpots', 'SweepStakes'],
//         sessionId: '10000296198',
//         defaultLines: Array.from({ length: 20 }, (_, i) => i.toString()),
//         bets: slotSettings.Bet.map((b) => b.toString()),
//         betMultiplier: '1.5000000',
//         defaultBet: '1',
//         defaultCoinValue: '0.01',
//         coinValues: ['0.01'],
//         gameParameters: this.getGameParameters(),
//         jackpotsEnabled: 'true',
//         gameModes: '[]',
//       },
//     }

//     return JSON.stringify(authResponse)
//   }

//   private async handleBalance(slotSettings: SlotSettings): Promise<string> {
//     const balance = await slotSettings.GetBalance()

//     const response = {
//       action: 'BalanceResponse',
//       result: 'true',
//       sesId: '10000214325',
//       data: {
//         entries: '0.00',
//         totalAmount: balance.toString(),
//         currency: slotSettings.slotCurrency,
//       },
//     }

//     return JSON.stringify(response)
//   }

//   private async handleSpin(slotSettings: SlotSettings, request: GameRequest): Promise<string> {
//     if (!request.data?.coin || !request.data?.bet) {
//       return createErrorResponse('invalid bet state')
//     }

//     const lines = 30 // Most NG games use 30 lines
//     const betLine = request.data.coin * request.data.bet
//     const allBet = betLine * lines

//     const balance = await slotSettings.GetBalance()
//     const freeGames = slotSettings.GetGameData(slotSettings.slotId + 'FreeGames')

//     if (balance < allBet && freeGames <= 0) {
//       return createErrorResponse('invalid balance')
//     }

//     // This is a basic spin implementation - would need game-specific logic
//     const spinResult = await this.generateSpinResult(slotSettings, request)

//     return JSON.stringify(spinResult)
//   }

//   private async handleFreeSpin(slotSettings: SlotSettings, request: GameRequest): Promise<string> {
//     // Similar to spin but for free spins
//     request.slotEvent = 'freespin'
//     return await this.handleSpin(slotSettings, request)
//   }

//   private async handleBonusPick(slotSettings: SlotSettings, request: GameRequest): Promise<string> {
//     // Implement bonus pick logic
//     const response = {
//       action: 'PickBonusItemResponse',
//       result: 'true',
//       sesId: '10000608346',
//       data: {
//         lastPick: 'true',
//         bonusItem: '{"type":"IndexedItem","index":"1","value":"18","picked":"true"}',
//         state: 'FreeSpins',
//         params: '{"freeSpins":"8","multiplier":"1","freeSpinRemain":"8","freeSpinsTotal":"8"}',
//       },
//     }

//     return JSON.stringify(response)
//   }

//   private async handleEvents(slotSettings: SlotSettings): Promise<string> {
//     const response = {
//       action: 'EventsResponce',
//       result: true,
//       sesId: 'a40e5dc15a83a70f288e421fbcfc6de8',
//       data: [],
//     }

//     return JSON.stringify(response)
//   }

//   private async handleAPIVersion(
//     slotSettings: SlotSettings,
//     request?: GameRequest
//   ): Promise<string> {
//     const response = {
//       action: 'APIVersionResponse',
//       result: true,
//       sesId: false,
//       msgId: (request as any)?.msgId || null,
//       data: {
//         router: 'v4.23',
//         transportConfig: {
//           reconnectTimeout: 500000000000,
//         },
//       },
//     }

//     return JSON.stringify(response)
//   }

//   private async handleCheckBrokenGame(slotSettings: SlotSettings): Promise<string> {
//     const response = {
//       action: 'CheckBrokenGameResponse',
//       result: 'true',
//       sesId: 'false',
//       data: {
//         haveBrokenGame: 'false',
//       },
//     }

//     return JSON.stringify(response)
//   }

//   private async validateSession(
//     sessionId?: string,
//     cookie?: string
//   ): Promise<PlayerWithShop | null> {
//     if (!sessionId && !cookie) {
//       return null
//     }

//     try {
//       // Try to find user by session ID or parse from cookie
//       let user = null

//       if (sessionId) {
//         user = await prisma.user.findFirst({
//           where: { remember_token: sessionId },
//           include: { shop: true },
//         })
//       }

//       // If no user found and we have a cookie, try to parse it
//       if (!user && cookie) {
//         // Parse Laravel session cookie or similar
//         // This would need to match your existing authentication system
//         // For now, we'll use a simple approach
//       }

//       return user as PlayerWithShop
//     } catch (error) {
//       console.error('Session validation error:', error)
//       return null
//     }
//   }

//   private buildReelString(reels: any): string {
//     // Build reel string for display
//     return `[${reels.reel1[0]},${reels.reel2[0]},${reels.reel3[0]},${reels.reel4[0]},${reels.reel5[0]}],[${reels.reel1[1]},${reels.reel2[1]},${reels.reel3[1]},${reels.reel4[1]},${reels.reel5[1]}],[${reels.reel1[2]},${reels.reel2[2]},${reels.reel3[2]},${reels.reel4[2]},${reels.reel5[2]}]`
//   }

//   private generateRandomReels(): string {
//     const symbols = Array.from({ length: 15 }, () => Math.floor(Math.random() * 9))
//     return `[${symbols.slice(0, 5).join(',')}],[${symbols.slice(5, 10).join(',')}],[${symbols
//       .slice(10, 15)
//       .join(',')}]`
//   }

//   private getGameParameters(): any {
//     return {
//       availableLines: [
//         ['1', '1', '1', '1', '1'],
//         ['0', '0', '0', '0', '0'],
//         ['2', '2', '2', '2', '2'],
//         // ... more paylines
//       ],
//       rtp: '0.00',
//       payouts: [
//         { payout: '15', symbols: ['0', '0'], type: 'basic' },
//         { payout: '100', symbols: ['0', '0', '0'], type: 'basic' },
//         // ... more payouts
//       ],
//       initialSymbols: [
//         ['6', '2', '4', '5', '4'],
//         ['7', '8', '0', '7', '2'],
//         ['8', '6', '7', '8', '6'],
//       ],
//     }
//   }

//   private async generateSpinResult(slotSettings: SlotSettings, request: GameRequest): Promise<any> {
//     // This would contain the actual spin logic
//     // For now, return a basic response
//     return {
//       action: 'SpinResponse',
//       result: true,
//       sesId: 'session123',
//       data: {
//         reelsSymbols: {
//           reel1: [6, 7, 8],
//           reel2: [2, 8, 6],
//           reel3: [4, 0, 7],
//           reel4: [5, 7, 8],
//           reel5: [4, 2, 6],
//           rp: [0, 0, 0, 0, 0],
//         },
//         spinWins: [],
//         totalWin: 0,
//         bonusWin: 0,
//         balance: await slotSettings.GetBalance(),
//       },
//     }
//   }

//   private async processAfricanKingNG(
//     user: PlayerWithShop,
//     game: any,
//     request: GameRequest
//   ): Promise<string> {
//     try {
//       // Create AfricanKingNG slot settings
//       const slotSettings = new AfricanKingSlotSettings('AfricanKingNG', user.id, prisma)

//       // Initialize the slot settings
//       const initialized = await slotSettings.initialize()
//       if (!initialized || !slotSettings.isActive()) {
//         return createErrorResponse('Game is disabled')
//       }

//       // Create the AfricanKingNG game instance
//       const africanKingGame = new AfricanKingNG(slotSettings)

//       // Process the request
//       const response = await africanKingGame.handleRequest(request)

//       // Save game data after processing
//       await slotSettings.saveGameData()

//       return JSON.stringify(response)
//     } catch (error) {
//       console.error('AfricanKingNG processing error:', error)
//       return createErrorResponse('Internal server error')
//     }
//   }

//   private async processCloverStonesNG(
//     user: PlayerWithShop,
//     game: any,
//     request: GameRequest
//   ): Promise<string> {
//     try {
//       // Create CloverStonesNG slot settings
//       const slotSettings = new CloverStonesSlotSettings('CloverStonesNG', user.id, prisma)

//       // Initialize the slot settings
//       const initialized = await slotSettings.initialize()
//       if (!initialized || !slotSettings.isActive()) {
//         return createErrorResponse('Game is disabled')
//       }

//       // Create the CloverStonesNG game instance
//       const cloverStonesGame = new CloverStonesNG(slotSettings)

//       // Process the request
//       const response = await cloverStonesGame.handleRequest(request)

//       // Save game data after processing
//       await slotSettings.saveGameData()

//       return JSON.stringify(response)
//     } catch (error) {
//       console.error('CloverStonesNG processing error:', error)
//       return createErrorResponse('Internal server error')
//     }
//   }

//   public async processGameMessage2(rawMessageData: WebSocketMessage): Promise<string | string[]> {
//     try {
//       if (rawMessageData.irq !== undefined) {
//         return createIRQResponse() //
//       }

//       // Extract top-level properties
//       const gameName = rawMessageData.gameName
//       const sessionId = rawMessageData.sessionId
//       const cookie = rawMessageData.cookie
//       const userIdInput = rawMessageData.userId // This will be the string "null" or an actual ID

//       // The actual game-specific payload is in the 'gameData' property
//       const gamePayload: GameRequest | undefined = rawMessageData.gameData as GameRequest // Explicitly type this

//       if (!gameName) {
//         return createErrorResponse('Game name is required')
//       }
//       if (!gamePayload || !gamePayload.action) {
//         // Or check gamePayload.cmd
//         return createErrorResponse('Game payload with action/cmd is required')
//       }

//       // --- Session Validation ---
//       // Convert string "null" to actual null for userId if necessary for your logic
//       const actualUserId =
//         userIdInput === 'null' || userIdInput === null || userIdInput === undefined
//           ? null
//           : userIdInput

//       // Your existing validateSession logic would use sessionId, cookie, and potentially actualUserId
//       const user = await this.validateSession(sessionId, cookie, actualUserId) // Adjust validateSession if needed
//       if (
//         !user &&
//         !(gamePayload.action === 'APIVersionRequest' || gamePayload.action === 'InitRequest')
//       ) {
//         // Some initial requests might not require a fully validated user
//         // For APIVersionRequest, PHP doesn't strictly check Auth::id() before this response,
//         // but it does for most other game logic requests.
//         // Depending on strictness, you might allow APIVersion through or require some session.
//         // The PHP Server.php for CloverStonesNG does check Auth::id() first.
//         // For POC, if user is null here, you might return an error similar to PHP's "invalid login".
//         // Let's assume for APIVersionRequest it might proceed or have a simpler check.
//       }

//       // --- Game Configuration & Initialization ---
//       // This part remains largely the same, but ensure SlotSettings can handle a null userId if applicable
//       // or that user validation above is strict.
//       const gameDbRecord = await prisma.game.findFirst({
//         //
//         where: { name: gameName, shop_id: user?.shop_id }, // user might be null
//         include: { shop: true },
//       })

//       if (!gameDbRecord || !gameDbRecord.view) {
//         return createErrorResponse('Game is disabled')
//       }

//       // Determine which SlotSettings to use
//       // For CloverStonesNG:
//       if (gameName === 'CloverStonesNG') {
//         // Assuming user is validated and required by SlotSettings constructor or init
//         if (!user) return createErrorResponse('Invalid session for game.')

//         const cloverStonesSlotSettings = new CloverStonesSlotSettings(gameName, user.id, prisma) //
//         const initialized = await cloverStonesSlotSettings.initialize() // Assuming async init
//         if (!initialized || !cloverStonesSlotSettings.is_active()) {
//           // PHP uses is_active()
//           return createErrorResponse('Game is disabled or user inactive')
//         }
//         const cloverStonesGame = new CloverStonesNG(cloverStonesSlotSettings, user.id) //
//         const response = await cloverStonesGame.handleRequest(gamePayload) // Pass the inner gamePayload

//         // After processing, save any changed game data (if SlotSettings methods don't do it already)
//         // await cloverStonesSlotSettings.saveGameData();
//         return JSON.stringify(response) // Ensure the game class returns an object
//       }
//       // ... other game handlers (like AfricanKingNG)

//       return createErrorResponse('Unsupported game or action.')
//     } catch (error) {
//       console.error('Error processing game message:', error)
//       return createErrorResponse('Internal server error')
//     }
//   }
// }
