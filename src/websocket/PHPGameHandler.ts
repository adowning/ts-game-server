import { phpExecutor } from '../utils/phpExecutor'
import { createErrorResponse, GameOutputData } from '../utils/messageEncoder' // Assuming GameOutputData is defined here or imported
import prisma from '../database/client'
import { Decimal } from '@prisma/client/runtime/library' // Correct import for Decimal
import { Game, GameBank, JPG, Shop, User } from '@prisma/client' // Import Prisma types

export interface WebSocketMessage {
  gameName?: string
  sessionId?: string // User's session token
  cookie?: string // Potentially for other session mechanisms if used by PHP
  action?: string // e.g., SpinRequest, AuthRequest
  gameData?: any // Payload specific to the action, e.g., { data: { coin: 1, bet: 10 }} for SpinRequest
  // Allow other properties as they come from client
  [key: string]: any
}

// Define a structure for UserGameState (simulating as if it exists)
interface UserGameState {
  id: string;
  userId: string;
  gameId: number; // Assuming Game ID is Int
  stateJson: { // This will store gameData and gameDataStatic
    gameData?: any;
    gameDataStatic?: any;
  };
  createdAt: Date;
  updatedAt: Date;
}


export class PHPGameHandler {
  /**
   * Process game message using PHP backend
   */
  public async processGameMessage(clientMessage: WebSocketMessage): Promise<string> {
    const { gameName, sessionId, cookie, ...actionPayload } = clientMessage

    if (!gameName) {
      return createErrorResponse('Game name is required')
    }

    try {
      // 1. Fetch all required data for GameInputData bundle
      const user = await prisma.user.findUnique({
        where: { remember_token: sessionId }, // Assuming sessionId is the remember_token
        include: { shop: true },
      })

      if (!user || !user.shop) {
        return createErrorResponse('Invalid session or user data')
      }

      const game = await prisma.game.findFirst({
        where: { name: gameName, shop_id: user.shop_id },
      })

      if (!game || !game.view) {
        return createErrorResponse('Game is disabled or not found')
      }

      const gameBank = await prisma.gameBank.findFirst({
        where: { shop_id: user.shop_id },
      })

      const jpgs = await prisma.jPG.findMany({
        where: { shop_id: user.shop_id },
      })

      // Simulate fetching UserGameState (replace with actual Prisma call if table existed)
      // let userGameState: UserGameState | null = await prisma.userGameState.findUnique({
      //   where: { userId_gameId: { userId: user.id, gameId: game.id } }
      // });
      // For now, use sessionDataJson and persistentGameDataJson from User model
      let gameSessionData = user.sessionDataJson ? JSON.parse(user.sessionDataJson as string) : {};
      let gameStaticData = user.persistentGameDataJson ? JSON.parse(user.persistentGameDataJson as string) : {};

      // If specific game data is namespaced within these JSON blobs, extract it.
      // Example: gameSessionData = gameSessionData[gameName] || {};
      // gameStaticData = gameStaticData[gameName] || {};
      // For now, assume they are flat objects for the specific game, or SlotSettings handles namespacing.


      // 2. Construct gameInputBundle
      const gameInputBundle = {
        ...actionPayload, // Contains 'action' and 'gameData' (action-specific payload)
        playerId: user.id, // Ensure this is the format PHP expects (string from Prisma)
        user: {
          id: user.id, // Or user.uid if PHP expects the integer ID
          username: user.username,
          balance: user.balance,
          shop_id: user.shop_id,
          count_balance: (user as any).count_balance || 0, // Assuming count_balance might exist or defaults to 0
          address: user.address || 0,
          // session data can be part of user object or separate as session_data
        },
        game: {
          id: game.id,
          name: game.name,
          title: game.title,
          shop_id: game.shop_id,
          view: game.view,
          bet: game.bet.split(','), // Convert comma-separated string to array
          denomination: parseFloat(game.denomination.toString()), // Ensure number
          slotViewState: game.slotViewState,
          advanced: game.advanced ? JSON.parse(game.advanced) : {}, // Game-level static data
          rezerv: parseFloat(game.rezerv.toString()),
          stat_in: parseFloat(game.stat_in.toString()),
          stat_out: parseFloat(game.stat_out.toString()),
          lines_percent_config: game.advanced ? (JSON.parse(game.advanced).lines_percent_config || {}) : {}, // Example if stored in advanced
        },
        shop: {
          id: user.shop.id,
          name: user.shop.name,
          currency: user.shop.currency,
          percent: user.shop.percent,
          max_win: user.shop.max_win,
        },
        gamebank: gameBank ? {
          slots: parseFloat(gameBank.slots.toString()),
          fish: parseFloat(gameBank.fish.toString()),
          bonus: parseFloat(gameBank.bonus.toString()),
          little: parseFloat(gameBank.little.toString()),
        } : { slots:0, fish:0, bonus:0, little:0 }, // Default if no gamebank found
        jpgs: jpgs.map(j => ({ id: j.id, shop_id: j.shop_id, percent: j.percent, balance: (j as any).balance || 0, pay_sum: (j as any).pay_sum || 0, user_id: (j as any).user_id || null })), // Add other fields PHP expects
        session_data: { // Data that PHP's SlotSettings GetGameData/SetGameData would use
          gameData: gameSessionData,       // From user.sessionDataJson
          gameDataStatic: gameStaticData,  // From user.persistentGameDataJson (or game.advanced for older system)
        },
        gamelog: [], // Pass empty array; PHP's GetHistory will use this if needed, but primarily logs new entries
        statgame: [], // Pass empty array
      }

      // 3. Call executeGameServer
      const result = await phpExecutor.executeGameServer(gameName, gameInputBundle)

      if (!result.success || !result.output) {
        console.error(`PHP execution failed for ${gameName}:`, result.error, `Output: ${result.output}`)
        // Try to parse PHP output even if non-zero exit code, as Server_refactored might output JSON error
        if (result.output) {
            try {
                const phpJsonOutput = JSON.parse(result.output.trim()) as GameOutputData;
                 if (phpJsonOutput.error) {
                    return createErrorResponse(phpJsonOutput.error.message || 'Game server error from PHP', phpJsonOutput.error.code);
                }
            } catch (e) { /* Ignore parsing error if main error is PHP execution */ }
        }
        return createErrorResponse('Game server execution error');
      }

      const phpOutput = JSON.parse(result.output.trim()) as GameOutputData;

      // 4. Process GameOutputData response
      const updates: Partial<User> = {};
      if (phpOutput.balance !== null && phpOutput.balance !== undefined && user.balance !== phpOutput.balance) {
        updates.balance = new Decimal(phpOutput.balance).toNumber(); // Ensure Decimal if schema expects it, or Number
      }

      // Process PHP logs for DB operations
      // This requires phpOutput.log to be structured with types and data for each operation.
      if (phpOutput.log && Array.isArray(phpOutput.log)) {
        for (const logEntry of phpOutput.log) {
          switch (logEntry.type) {
            case 'game_log_entry':
              await prisma.gameLog.create({
                data: {
                  user_id: logEntry.user_id || user.id,
                  game_id: logEntry.game_id || game.id,
                  str: typeof logEntry.str === 'string' ? logEntry.str : JSON.stringify(logEntry.str),
                  // shop_id: logEntry.shop_id || user.shop_id, // If you add shop_id to GameLog schema
                },
              });
              break;
            case 'stat_game_entry':
              // StatGame table is missing in schema. Log this intent.
              console.log('StatGame entry to record (table missing):', logEntry.data);
              // Example if StatGame existed:
              // await prisma.statGame.create({ data: logEntry.data });
              break;
            case 'user_update_level': // Example custom log type
            case 'game_update_stat_in':
            case 'game_update_stat_out':
            case 'game_tournament_stat':
            case 'user_update_last_bid':
            case 'game_increment_bids':
              // These would typically update fields on User or Game models, or create StatGame entries.
              // For now, just logging them.
              console.log(`Processing game logic log: ${logEntry.type}`, logEntry);
              if (logEntry.type === 'game_update_stat_in' && logEntry.amount_denom) {
                await prisma.game.update({
                    where: { id: game.id },
                    data: { stat_in: { increment: new Decimal(logEntry.amount_denom).toNumber() } }
                });
              }
              if (logEntry.type === 'game_update_stat_out' && logEntry.amount_denom) {
                 await prisma.game.update({
                    where: { id: game.id },
                    data: { stat_out: { increment: new Decimal(logEntry.amount_denom).toNumber() } }
                });
              }
              break;
            // Add cases for other log types like JPG updates if needed
          }
        }
      }

      // Persist gameData and gameDataStatic (session state)
      // phpOutput.state might contain overall game state, but specific session data might be at root
      const gameDataToSave = phpOutput.gameData || phpOutput.state?.gameData || gameSessionData;
      const gameDataStaticToSave = phpOutput.gameDataStatic || phpOutput.state?.gameDataStatic || gameStaticData;

      if (gameDataToSave) {
        updates.sessionDataJson = JSON.stringify(gameDataToSave);
      }
      if (gameDataStaticToSave) {
        updates.persistentGameDataJson = JSON.stringify(gameDataStaticToSave);
      }

      // Apply user updates if any
      if (Object.keys(updates).length > 0) {
        await prisma.user.update({
          where: { id: user.id },
          data: updates,
        });
      }

      // 5. Formulate client response
      // The main response data is in phpOutput.response
      // Other fields like balance, full state are at phpOutput root or phpOutput.state
      const clientResponse = {
        action: phpOutput.action || clientMessage.action, // Echo action from PHP or original
        success: phpOutput.success,
        balance: phpOutput.balance,
        state: phpOutput.state,       // Overall game state (freeSpinsLeft etc.)
        response: phpOutput.response, // Action-specific data from PHP
        error: phpOutput.error,
        sesId: phpOutput.sesId || sessionId, // Use PHP's session ID or echo original
        // Include logs if client needs them, or strip them for production
        // logs: phpOutput.log
      };

      return JSON.stringify(clientResponse);

    } catch (error: any) {
      console.error('PHPGameHandler processGameMessage error:', error);
      return createErrorResponse(error.message || 'Internal server error in handler');
    }
  }


  /**
   * Validate session and get user data (simplified)
   */
  private async validateSession(sessionId?: string, cookie?: string): Promise<User & { shop: Shop } | null> {
    // This is a placeholder. Real session validation would be more complex.
    if (!sessionId) return null;
    try {
        const user = await prisma.user.findUnique({
            where: { remember_token: sessionId },
            include: { shop: true }
        });
        if (!user || !user.shop) return null;
        return user;
    } catch (e) {
        console.error("Session validation DB error", e);
        return null;
    }
  }

  public async checkPHPAvailability(): Promise<boolean> {
    return await phpExecutor.checkPhpAvailability();
  }

  public async getPHPVersion(): Promise<string | null> {
    return await phpExecutor.getPhpVersion();
  }
}
