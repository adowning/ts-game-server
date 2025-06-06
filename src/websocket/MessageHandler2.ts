// // File: src/websocket/MessageHandler.ts

// import {
//   WebSocketMessage as ClientWebSocketMessage,
//   GameRequest,
//   GameResponse,
// } from '../types/websocket' // Renamed to avoid conflict
// import { PlayerWithShop } from '../types/player' //
// // Import core SlotSettings if a generic one is ever needed, but prefer game-specific ones.
// // import { SlotSettings as CoreSlotSettings } from '../core/SlotSettings';

// import {
//   createErrorResponse,
//   createGameResponse, // Assuming this exists for successful generic responses
//   createIRQResponse,
// } from '../utils/messageEncoder' //
// import prisma from '../database/client' //

// // Game Specific Imports
// import { AfricanKingNG } from '../Games/AfricanKingNG/AfricanKingNG' //
// import { SlotSettings as AfricanKingSlotSettings } from '../Games/AfricanKingNG/SlotSettings' //
// import { CloverStonesNG2 } from '../Games/CloverStonesNG/CloverStonesNG2' //
// import { SlotSettings as CloverStonesSlotSettings } from '../Games/CloverStonesNG/SlotSettings' //
// import { Decimal } from '@prisma/client/runtime/binary'

// // Define a more specific type for the incoming message structure from client
// interface IncomingClientMessage {
//   gameData?: GameRequest // This is the game-specific command
//   cookie?: string
//   sessionId?: string
//   userId?: string | number | null // Can be string "null" or actual id
//   gameName?: string
//   irq?: boolean // For CQ protocol
// }

// export class MessageHandler2 {
//   // Removed duplicate signature for processGameMessage. This is the implementation.
//   public async processGameMessage(data: IncomingClientMessage): Promise<string | string[]> {
//     try {
//       if (data.irq !== undefined) {
//         return createIRQResponse()
//       }
//       console.log(data)
//       const gameName = data.gameName
//       const sessionId = data.sessionId
//       const cookie = data.cookie
//       const userIdInput = data.userId // This could be "null" string or an ID
//       const gamePayload = data.gameData // This is the actual game-specific payload

//       if (!gameName) {
//         return createErrorResponse('Game name is required')
//       }
//       if (!gamePayload || (!gamePayload.action && !gamePayload.cmd)) {
//         return createErrorResponse('Game payload with action/cmd is required')
//       }

//       // --- Session Validation ---
//       const actualUserId =
//         userIdInput === 'null' || userIdInput === null || userIdInput === undefined
//           ? null
//           : typeof userIdInput === 'string'
//           ? parseInt(userIdInput, 10)
//           : userIdInput

//       // If parseInt results in NaN for a non-numeric string ID, handle appropriately or ensure IDs are numbers
//       if (
//         Number.isNaN(actualUserId) &&
//         userIdInput !== 'null' &&
//         userIdInput !== null &&
//         userIdInput !== undefined
//       ) {
//         console.warn(`Received non-numeric userId that isn't 'null': ${userIdInput}`)
//         // Decide how to handle this - error out or treat as null
//         // return createErrorResponse('Invalid user identifier format');
//       }

//       // const _user = await this.validateSession(sessionId, cookie, actualUserId as number | null)
//       // const user:PlayerWithShop = {}
//       const user: PlayerWithShop = {
//         id: 1,
//         username: 'test',
//         email: 'test@test.com',
//         balance: Decimal(100),
//         count_balance: 0,
//         shop_id: 1,
//         is_blocked: false,
//         status: 'ACTIVE',
//         address: 0,
//         session: null,
//         remember_token: null,
//         created_at: new Date(),
//         updated_at: new Date(),
//         shop: {
//           id: 1,
//           name: 'test',
//           currency: 'USD',
//           percent: 90,
//           max_win: Decimal(10000),
//           // shop_limit: Decimal(100),
//           created_at: new Date(),
//           updated_at: new Date(),
//           is_blocked: false,
//         },
//       }
//       // In PHP, many game actions check Auth::id() at the very start.
//       // APIVersionRequest and InitRequest might be exceptions but often still need some context.
//       // For POC, and based on PHP code, most actions will require a valid user.
//       if (!user) {
//         // Allow InitRequest and APIVersionRequest to proceed without a fully validated user
//         // ONLY IF PHP allows this. Otherwise, "invalid login" for all.
//         // The PHP Server.php for CloverStonesNG *does* check Auth::id() for APIVersionRequest.
//         // So, if no user, it's an error.
//         return createErrorResponse('invalid login')
//       }

//       // --- Game Configuration & Dispatch ---
//       // No need for a generic SlotSettings here if all paths go to game-specific logic.
//       // The generic processGameAction and its sub-handlers (handleInit, handleAuth etc.)
//       // are removed because we are now routing directly to game-specific classes.

//       if (gameName === 'AfricanKingNG') {
//         // Pass Prisma instance to SlotSettings constructor
//         const africanKingSlotSettings = new AfricanKingSlotSettings(gameName, user.id, prisma) //
//         const initialized = await africanKingSlotSettings.initialize()
//         if (!initialized || !africanKingSlotSettings.isActive()) {
//           // Uses isActive() from specific SlotSettings
//           return createErrorResponse('Game is disabled or user/shop inactive (AK)')
//         }
//         const africanKingGame = new AfricanKingNG(africanKingSlotSettings) // Pass userId
//         const response = await africanKingGame.handleRequest(gamePayload)
//         await africanKingSlotSettings.saveGameData() // Ensure data is saved
//         return JSON.stringify(response)
//       }

//       if (gameName === 'CloverStonesNG') {
//         const cloverStonesSlotSettings = new CloverStonesSlotSettings(gameName, user.id, prisma) //
//         const initialized = await cloverStonesSlotSettings.initialize()
//         if (!initialized || !cloverStonesSlotSettings.getIsActive()) {
//           // Uses isActive() from specific SlotSettings
//           return createErrorResponse('Game is disabled or user/shop inactive (CS)')
//         }
//         const cloverStonesGame = new CloverStonesNG2(cloverStonesSlotSettings, user.id) // Pass userId
//         const response = await cloverStonesGame.handleRequest(gamePayload)
//         await cloverStonesSlotSettings.saveGameData() // Ensure data is saved
//         return ':::' + JSON.stringify(response)
//       }

//       return createErrorResponse(`Unsupported game: ${gameName}`)
//     } catch (error) {
//       console.error(`Error processing game message for ${data.gameName}:`, error)
//       return createErrorResponse('Internal server error')
//     }
//   }

//   private async validateSession(
//     sessionId?: string,
//     cookie?: string,
//     userId?: number | null // Changed to number | null
//   ): Promise<PlayerWithShop | null> {
//     // If a numeric userId is already provided (and not NaN), prioritize it for direct lookup
//     // This bypasses session/cookie lookup if client sends a valid userId
//     if (typeof userId === 'number' && !Number.isNaN(userId)) {
//       const userById = await prisma.user.findUnique({
//         where: { id: userId },
//         include: { shop: true },
//       })
//       if (userById) return userById as PlayerWithShop
//       // If userId was provided but not found, it's an issue, but fall through to session/cookie
//       // Or, you might decide to error here if userId is given but invalid.
//     }

//     // Proceed with session/cookie validation if userId didn't yield a result or wasn't a valid number
//     if (!sessionId && !cookie) {
//       return null
//     }

//     try {
//       let user: PlayerWithShop | null = null

//       if (sessionId) {
//         // Assuming remember_token stores the sessionId
//         const userBySession = await prisma.user.findFirst({
//           where: { remember_token: sessionId },
//           include: { shop: true },
//         })
//         if (userBySession) user = userBySession as PlayerWithShop
//       }

//       // TODO: Implement cookie parsing if needed and if it can identify a user
//       // if (!user && cookie) { ... }

//       return user
//     } catch (error) {
//       console.error('Session validation error:', error)
//       return null
//     }
//   }

//   // Removed generic handlers like handleInit, handleAuth, handleSpin etc. from MessageHandler
//   // as these are now in the game-specific classes (e.g., CloverStonesNG.ts).
// }
