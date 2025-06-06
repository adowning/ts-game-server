// File: src/games/CloverStonesNG/CloverStonesNG.ts

import { SlotSettings } from './SlotSettings' //
import { GameReel } from './GameReel' //
import {
  GameRequest,
  GameResponse,
  AuthRequest,
  AuthResponse,
  APIVersionRequest, // Import if you have a specific type
  APIVersionResponse, // Import if you have a specific type
  PayoutEntry,
} from '../../types/GameTypes' //
import prisma from '../../database/client' //

export class CloverStonesNG2 {
  private slotSettings: SlotSettings
  private gameReel: GameReel
  private userId: number | null = null

  constructor(slotSettings: SlotSettings, userId?: number) {
    this.slotSettings = slotSettings
    this.gameReel = new GameReel()
    this.userId = userId !== undefined ? userId : null
  }

  public async handleRequest(request: GameRequest | any): Promise<GameResponse | any> {
    let reqId: string

    // Use 'action' if present, fallback to 'cmd'
    if (request.action) {
      reqId = request.action
    } else if (request.cmd) {
      reqId = request.cmd
    } else {
      return {
        /* error: incorrect action */
      }
    }

    // Basic request validation for POC (from PHP Server.php)
    if (reqId === 'SpinRequest' && request.data) {
      if (request.data.coin <= 0 || request.data.bet <= 0) {
        return { responseEvent: 'error', responseType: '', serverResponse: 'invalid bet state' }
      }
      // Simplified balance check for POC if needed, or assume valid for hardcoded responses
      // const balance = await this.slotSettings.GetBalance();
      // const freeGames = this.slotSettings.GetGameData(this.slotSettings.slotId + 'FreeGames');
      // if ( balance < (request.data.coin * request.data.bet * 10) && freeGames <= 0 ) {
      //     return { responseEvent:"error", responseType:"", serverResponse:"invalid balance" };
      // }
    }
    // if (reqId === 'BalanceRequest' && request.data) {
    //   const balance = await this.slotSettings.GetBalance()

    //   return {
    //     action: 'BalanceResponse',
    //     result: 'true' as any,
    //     sesId: '10000214325',
    //     data: {
    //       entries: '0.00',
    //       totalAmount: balance.toString(),
    //       currency: this.slotSettings.slotCurrency,
    //     },
    //   }
    // }
    console.log(reqId)
    switch (reqId) {
      case 'BalanceRequest':
        return {
          action: 'BalanceResponse',
          result: 'true' as any,
          sesId: '10000214325',
          data: {
            entries: '0.00',
            totalAmount: '100',
            currency: this.slotSettings.slotCurrency,
          },
        }

      case 'APIVersionRequest':
        return this.handleAPIVersion(request as APIVersionRequest) // Or GameRequest
      case 'AuthRequest':
        return await this.handleAuth(request as AuthRequest) // Or GameRequest
      // ... other cases
      default:
        return {
          action: reqId.replace('Request', 'Response'),
          result: false,
          error: `Unsupported action: ${reqId}`,
        }
    }
  }

  /**
   * Handles the API Version Request for CloverStonesNG.
   * Returns a hardcoded response identical to the PHP server's output.
   * * JSDoc style comment: Processes the API version request.
   * This method returns a static response indicating the API version and
   * transport configuration, matching the existing PHP system's response format.
   */
  private handleAPIVersion(request: APIVersionRequest | GameRequest): APIVersionResponse | any {
    // PHP Source: $result_tmp[] = '{"action":"APIVersionResponse","result":true,"sesId":false,"data":{"router":"v3.12","transportConfig":{"reconnectTimeout":5000}}}';
    // Note: PHP's "result:true" and "sesId":false are actual booleans in the JSON string here.

    const response: APIVersionResponse = {
      // Using your type from GameTypes.ts
      action: 'APIVersionResponse',
      result: true, // Boolean true
      sesId: false, // Boolean false
      // msgId: request.msgId, // Include if present in request and if PHP includes it in response
      data: {
        router: 'v3.12',
        transportConfig: {
          reconnectTimeout: 5000,
        },
      },
    }
    return response
  }

  // The handleAuth method provided in the previous response would go here.
  // I'll paste it again for completeness, assuming it's the next step after APIVersion.
  /**
   * Handles the Authentication Request for the CloverStonesNG game.
   * For the POC, this method returns a hardcoded response structure that
   * mirrors the PHP server's output for this request.
   * * JSDoc style comment: This function processes the authentication request.
   * It initializes certain game data elements to their default states and
   * prepares a response object containing game parameters, configurations,
   * and initial state information required by the client to start the game.
   * The response structure is designed to be identical to the existing PHP system.
   */
  private async handleAuth(request: AuthRequest | GameRequest): Promise<AuthResponse | any> {
    const slotIdPrefix = this.slotSettings.slotId

    this.slotSettings.SetGameData(slotIdPrefix + 'BonusWin', 0)
    this.slotSettings.SetGameData(slotIdPrefix + 'FreeGames', 0)
    this.slotSettings.SetGameData(slotIdPrefix + 'CurrentFreeGame', 0)
    this.slotSettings.SetGameData(slotIdPrefix + 'TotalWin', 0)
    this.slotSettings.SetGameData(slotIdPrefix + 'FreeBalance', 0)
    this.slotSettings.SetGameData(slotIdPrefix + 'FreeStartWin', 0)
    this.slotSettings.SetGameData(slotIdPrefix + 'BonusSymbol', -1)
    // await this.slotSettings.saveGameData(); // If SetGameData doesn't auto-save

    const initialSymbols: number[][] = [
      // 4 rows for CloverStonesNG display
      [8, 8, 10, 9, 7],
      [10, 10, 7, 6, 8],
      [9, 9, 9, 7, 10],
      [6, 6, 8, 8, 9],
    ]

    const staticAuthResponseData = {
      snivy: 'proxy v6.10.48 (API v4.23)',
      supportedFeatures: ['Offers', 'Jackpots', 'InstantJackpots', 'SweepStakes'],
      sessionId: request.sessionId || 'static-cloverstones-session-poc', // Use incoming sessionId if available
      defaultLines: Array.from({ length: 20 }, (_, i) => i.toString()),
      bets: this.slotSettings.Bet.map((bet) => bet.toString()),
      betMultiplier: '1.0000000',
      defaultBet: this.slotSettings.Bet[0]?.toString() || '1',
      defaultCoinValue: this.slotSettings.CurrentDenom.toFixed(2).toString(), // Ensure two decimal places like "0.01"
      coinValues: [this.slotSettings.CurrentDenom.toFixed(2).toString()],
      gameParameters: {
        availableLines: this.slotSettings.payLines.map((line) => line.positions), // PHP sends array of number arrays
        rtp: '0.00',
        payouts: this.transformPaytableToPayoutEntries(this.slotSettings.Paytable),
        initialSymbols: initialSymbols,
      },
      jackpotsEnabled: 'true', // String "true"
      gameModes: '[]', // String "[]"
    }

    const response = {
      action: 'AuthResponse',
      result: 'true', // String "true"
      sesId: request.sessionId || 'static-cloverstones-session-poc', // String
      data: staticAuthResponseData,
      // msgId: request.msgId, // Include if relevant
    }

    return response
  }

  private transformPaytableToPayoutEntries(paytable: { [key: string]: number[] }): PayoutEntry[] {
    const payoutEntries: PayoutEntry[] = []
    for (const symbolKey in paytable) {
      if (paytable.hasOwnProperty(symbolKey)) {
        const payouts = paytable[symbolKey]
        const symbolId = symbolKey.replace('SYM_', '')
        // PHP CloverStonesNG paytable: SYM_1: [0,0,0,16,32,80] (Indices 3,4,5 for 3,4,5 symbols)
        // So, loop from index 3 (representing 3 symbols)
        if (Array.isArray(payouts)) {
          for (let countIndex = 3; countIndex < payouts.length; countIndex++) {
            const payoutAmount = payouts[countIndex]
            if (payoutAmount !== undefined && payoutAmount > 0) {
              const numberOfSymbols = countIndex // In this game's paytable, index directly maps to count of symbols
              payoutEntries.push({
                payout: payoutAmount.toString(),
                symbols: Array(numberOfSymbols).fill(symbolId),
                type: 'basic', // Adjust if scatter/wild type is different in this list for CloverStones
              })
            }
          }
        }
      }
    }
    return payoutEntries
  }

  // ... other handlers like handleSpin, handleBalance etc.
}
