import { SlotSettings } from './SlotSettings'
import { GameReel } from './GameReel'
import {
  GameRequest,
  GameResponse,
  SpinRequest,
  SpinResponse,
  AuthRequest,
  AuthResponse,
  BalanceRequest,
  BalanceResponse,
  InitRequest,
  InitResponse,
  EventsRequest,
  EventsResponse,
  APIVersionRequest,
  APIVersionResponse,
  CheckBrokenGameRequest,
  CheckBrokenGameResponse,
  PickBonusItemRequest,
  PickBonusItemResponse,
  LineWin,
  SymbolWin,
  ReelResult,
} from '../../types/GameTypes'

export class CloverStonesNG {
  private slotSettings: SlotSettings
  private gameReel: GameReel
  private userId: number | null = null

  constructor(slotSettings: SlotSettings, userId?: number) {
    this.slotSettings = slotSettings
    this.gameReel = new GameReel()
    this.userId = userId || null
  }

  async handleRequest(request: GameRequest | any): Promise<GameResponse> {
    try {
      // Authentication check (similar to PHP version)
      if (this.userId === null) {
        return {
          responseEvent: 'error',
          responseType: '',
          serverResponse: 'invalid login',
        } as any
      }

      // Check if game is active (similar to PHP version)
      if (!this.slotSettings.is_active()) {
        return {
          responseEvent: 'error',
          responseType: '',
          serverResponse: 'Game is disabled',
        } as any
      }

      // Parse request data (handle both gameData.cmd and direct action structures)
      let postData: any = request
      let reqId: string

      if (request.gameData && request.gameData.cmd) {
        // Handle nested gameData structure
        postData = request.gameData
        reqId = postData.cmd
      } else if (request.action) {
        // Handle direct action structure
        reqId = request.action
      } else {
        return {
          responseEvent: 'error',
          responseType: '',
          serverResponse: 'incorrect action',
        } as any
      }

      // Validate spin requests
      if (reqId === 'SpinRequest') {
        if (
          !postData.data?.coin ||
          postData.data.coin <= 0 ||
          !postData.data?.bet ||
          postData.data.bet <= 0
        ) {
          return {
            responseEvent: 'error',
            responseType: '',
            serverResponse: 'invalid bet state',
          } as any
        }

        const lines = 20
        const betLine = postData.data.coin * postData.data.bet
        const allBet = betLine * lines
        const balance = await this.slotSettings.GetBalance()
        const freeGames = this.slotSettings.GetGameData(this.slotSettings.slotId + 'FreeGames')

        if (balance < allBet && freeGames <= 0) {
          return {
            responseEvent: 'error',
            responseType: '',
            serverResponse: 'invalid balance',
          } as any
        }
      }

      // Route to appropriate handler
      switch (reqId) {
        case 'InitRequest':
          return this.handleInit(postData as InitRequest)
        case 'AuthRequest':
          return await this.handleAuth(postData as AuthRequest)
        case 'BalanceRequest':
          return await this.handleBalance(postData as BalanceRequest)
        case 'SpinRequest':
          return await this.handleSpin(postData as SpinRequest)
        case 'FreeSpinRequest':
          return await this.handleFreeSpin(postData as SpinRequest)
        case 'PickBonusItemRequest':
          return this.handleBonusPick(postData as PickBonusItemRequest)
        case 'EventsRequest':
          return this.handleEvents(postData as EventsRequest)
        case 'APIVersionRequest':
          return this.handleAPIVersion(postData as APIVersionRequest)
        case 'CheckBrokenGameRequest':
          return this.handleCheckBrokenGame(postData as CheckBrokenGameRequest)
        default:
          return {
            responseEvent: 'error',
            responseType: '',
            serverResponse: `Unknown action: ${reqId}`,
          } as any
      }
    } catch (error) {
      return {
        responseEvent: 'error',
        responseType: '',
        serverResponse: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      } as any
    }
  }

  private handleInit(request: InitRequest): InitResponse {
    return {
      action: 'InitResponce', // Note: PHP has typo
      result: true,
      sesId: 'a40e5dc15a83a70f288e421fbcfc6de8',
      data: { id: 16183084 },
    }
  }

  private async handleAuth(request: AuthRequest): Promise<AuthResponse> {
    // Reset game state
    this.slotSettings.SetGameData(this.slotSettings.slotId + 'BonusWin', 0)
    this.slotSettings.SetGameData(this.slotSettings.slotId + 'FreeGames', 0)
    this.slotSettings.SetGameData(this.slotSettings.slotId + 'CurrentFreeGame', 0)
    this.slotSettings.SetGameData(this.slotSettings.slotId + 'TotalWin', 0)
    this.slotSettings.SetGameData(this.slotSettings.slotId + 'FreeBalance', 0)
    this.slotSettings.SetGameData(this.slotSettings.slotId + 'FreeStartWin', 0)
    this.slotSettings.SetGameData(this.slotSettings.slotId + 'BonusSymbol', -1)

    // Get last event for restoration
    const lastEvent = await this.slotSettings.GetHistory()
    let restoreString = ''
    let curReels = ''
    let bet = this.slotSettings.Bet[0] * 100 * 20

    if (lastEvent) {
      // Restore from last event
      this.slotSettings.SetGameData(
        this.slotSettings.slotId + 'BonusWin',
        lastEvent.serverResponse?.bonusWin || 0
      )
      this.slotSettings.SetGameData(
        this.slotSettings.slotId + 'FreeGames',
        lastEvent.serverResponse?.totalFreeGames || 0
      )
      this.slotSettings.SetGameData(
        this.slotSettings.slotId + 'CurrentFreeGame',
        lastEvent.serverResponse?.currentFreeGames || 0
      )
      this.slotSettings.SetGameData(
        this.slotSettings.slotId + 'TotalWin',
        lastEvent.serverResponse?.bonusWin || 0
      )
      this.slotSettings.SetGameData(
        this.slotSettings.slotId + 'BonusSymbol',
        lastEvent.serverResponse?.BonusSymbol || -1
      )

      if (lastEvent.serverResponse?.reelsSymbols) {
        const reels = lastEvent.serverResponse.reelsSymbols
        // Build reel display string for 4 rows
        curReels = this.buildReelString(reels)
        bet = (lastEvent.serverResponse.slotBet || 1) * 100 * 20
      }
    } else {
      // Generate random initial reels
      curReels = this.generateRandomReels()
    }

    // Check if in free spins
    const freeGames = this.slotSettings.GetGameData(this.slotSettings.slotId + 'FreeGames')
    const currentFreeGame = this.slotSettings.GetGameData(
      this.slotSettings.slotId + 'CurrentFreeGame'
    )

    if (currentFreeGame < freeGames && freeGames > 0) {
      const fBonusWin = this.slotSettings.GetGameData(this.slotSettings.slotId + 'BonusWin')
      const fRemain = freeGames - currentFreeGame
      restoreString = `,"restoredGameCode":"340","lastResponse":{"spinResult":{"type":"SpinResult","rows":[${curReels}]},"freeSpinsTotal":"${freeGames}","freeSpinRemain":"${fRemain}","totalBonusWin":"${fBonusWin}","state":"FreeSpins","expandingSymbols":["1"]}`
    }

    const balance = await this.slotSettings.GetBalance()

    return {
      action: 'AuthResponse',
      result: 'true' as any,
      sesId: '10000569942',
      data: {
        snivy: 'proxy v6.10.48 (API v4.23)',
        supportedFeatures: ['Offers', 'Jackpots', 'InstantJackpots', 'SweepStakes'],
        sessionId: '10000569942',
        defaultLines: Array.from({ length: 20 }, (_, i) => i.toString()),
        bets: this.slotSettings.Bet.map((b) => b.toString()),
        betMultiplier: '1.0000000',
        defaultBet: '1',
        defaultCoinValue: '0.01',
        coinValues: ['0.01'],
        gameParameters: this.getGameParameters(),
        jackpotsEnabled: 'true',
        gameModes: '[]',
      },
    }
  }

  private async handleBalance(request: BalanceRequest): Promise<BalanceResponse> {
    const balance = await this.slotSettings.GetBalance()

    return {
      action: 'BalanceResponse',
      result: 'true' as any,
      sesId: '10000214325',
      data: {
        entries: '0.00',
        totalAmount: balance.toString(),
        currency: this.slotSettings.slotCurrency,
      },
    }
  }

  private async handleSpin(request: SpinRequest): Promise<SpinResponse> {
    if (!request.data?.coin || !request.data?.bet) {
      return {
        action: 'SpinResponse',
        result: false,
        error: 'invalid bet state',
        data: null,
      } as any
    }

    const lines = 20 // CloverStonesNG uses 20 lines
    const betLine = request.data.coin * request.data.bet
    const allBet = betLine * lines

    const balance = await this.slotSettings.GetBalance()
    const freeGames = this.slotSettings.GetGameData(this.slotSettings.slotId + 'FreeGames')

    if (balance < allBet && freeGames <= 0) {
      return {
        action: 'SpinResponse',
        result: false,
        error: 'invalid balance',
        data: null,
      } as any
    }

    // Deduct bet from balance (if not free spin)
    if (freeGames <= 0) {
      await this.slotSettings.SetBalance(-allBet, 'bet')

      // Reset game state for new spin
      this.slotSettings.SetGameData(this.slotSettings.slotId + 'BonusWin', 0)
      this.slotSettings.SetGameData(this.slotSettings.slotId + 'FreeGames', 0)
      this.slotSettings.SetGameData(this.slotSettings.slotId + 'CurrentFreeGame', 0)
      this.slotSettings.SetGameData(this.slotSettings.slotId + 'BonusSymbol', -1)
      this.slotSettings.SetGameData(this.slotSettings.slotId + 'TotalWin', 0)
    }

    // Generate spin result
    const spinResult = await this.generateSpinResult(betLine, lines, 'bet')

    return {
      action: 'SpinResponse',
      result: true,
      sesId: 'session123',
      data: spinResult,
    }
  }

  private async handleFreeSpin(request: SpinRequest): Promise<SpinResponse> {
    // Increment free game counter
    const currentFreeGame = this.slotSettings.GetGameData(
      this.slotSettings.slotId + 'CurrentFreeGame'
    )
    this.slotSettings.SetGameData(this.slotSettings.slotId + 'CurrentFreeGame', currentFreeGame + 1)

    const lines = 20
    const betLine = request.data.coin * request.data.bet

    // Generate free spin result
    const spinResult = await this.generateSpinResult(betLine, lines, 'freespin')

    return {
      action: 'FreeSpinResponse',
      result: true,
      sesId: 'session123',
      data: spinResult,
    }
  }

  private handleBonusPick(request: PickBonusItemRequest): PickBonusItemResponse {
    const bonusSymbol = request.data.index
    this.slotSettings.SetGameData(this.slotSettings.slotId + 'BonusSymbol', bonusSymbol)

    return {
      action: 'PickBonusItemResponse',
      result: 'true' as any,
      sesId: '10000217909',
      data: {
        state: 'PickBonus',
        params: {
          picksRemain: '0',
          expandingSymbols: [bonusSymbol.toString()],
        },
        lastPick: 'true',
        bonusItem: `{"type":"IndexedItem","index":"${bonusSymbol}","value":"18","picked":"true"}`,
      },
    }
  }

  private handleEvents(request: EventsRequest): EventsResponse {
    return {
      action: 'EventsResponce', // Note: PHP has typo
      result: true,
      sesId: 'a40e5dc15a83a70f288e421fbcfc6de8',
      data: [],
    }
  }

  private handleAPIVersion(request: APIVersionRequest): APIVersionResponse {
    return {
      action: 'APIVersionResponse',
      result: true,
      sesId: false,
      data: {
        router: 'v3.12',
        transportConfig: {
          reconnectTimeout: 5000,
        },
      },
    }
  }

  private handleCheckBrokenGame(request: CheckBrokenGameRequest): CheckBrokenGameResponse {
    return {
      action: 'CheckBrokenGameResponse',
      result: 'true' as any,
      sesId: 'false' as any,
      data: {
        haveBrokenGame: 'false',
      },
    }
  }

  private buildReelString(reels: ReelResult): string {
    // Build reel string for 4 rows display
    return `[${reels.reel1[0]},${reels.reel2[0]},${reels.reel3[0]},${reels.reel4[0]},${reels.reel5[0]}],[${reels.reel1[1]},${reels.reel2[1]},${reels.reel3[1]},${reels.reel4[1]},${reels.reel5[1]}],[${reels.reel1[2]},${reels.reel2[2]},${reels.reel3[2]},${reels.reel4[2]},${reels.reel5[2]}],[${reels.reel1[3]},${reels.reel2[3]},${reels.reel3[3]},${reels.reel4[3]},${reels.reel5[3]}]`
  }

  private generateRandomReels(): string {
    const symbols = Array.from({ length: 20 }, () => Math.floor(Math.random() * 11))
    return `[${symbols.slice(0, 5).join(',')}],[${symbols.slice(5, 10).join(',')}],[${symbols
      .slice(10, 15)
      .join(',')}],[${symbols.slice(15, 20).join(',')}]`
  }

  private getGameParameters(): any {
    return {
      availableLines: this.slotSettings.payLines.map((line) =>
        line.positions.map((pos) => pos.toString())
      ),
      rtp: '0.00',
      payouts: [
        { payout: '16', symbols: ['1', '1', '1'], type: 'basic' },
        { payout: '32', symbols: ['1', '1', '1', '1'], type: 'basic' },
        { payout: '80', symbols: ['1', '1', '1', '1', '1'], type: 'basic' },
        { payout: '16', symbols: ['2', '2', '2'], type: 'basic' },
        { payout: '24', symbols: ['2', '2', '2', '2'], type: 'basic' },
        { payout: '48', symbols: ['2', '2', '2', '2', '2'], type: 'basic' },
        // ... more payouts
      ],
      initialSymbols: [
        ['8', '8', '10', '9', '7'],
        ['10', '10', '7', '6', '8'],
        ['9', '9', '9', '7', '10'],
        ['6', '6', '8', '8', '9'],
      ],
    }
  }

  private async generateSpinResult(
    betLine: number,
    lines: number,
    slotEvent: string
  ): Promise<any> {
    // Get spin settings
    const [winType, spinWinLimit] = this.slotSettings.GetSpinSettings(
      slotEvent as any,
      betLine,
      lines
    )

    // Generate reels
    const reels = this.gameReel.getWeightedReelPositions(winType, slotEvent)

    // Calculate wins
    const { totalWin, lineWins } = this.calculateWins(reels, betLine, slotEvent)

    // Update balance if there's a win
    if (totalWin > 0) {
      await this.slotSettings.SetBalance(totalWin)
    }

    const balance = await this.slotSettings.GetBalance()

    return {
      spinResult: {
        type: 'SpinResult',
        rows: [
          [reels.reel1[0], reels.reel2[0], reels.reel3[0], reels.reel4[0], reels.reel5[0]],
          [reels.reel1[1], reels.reel2[1], reels.reel3[1], reels.reel4[1], reels.reel5[1]],
          [reels.reel1[2], reels.reel2[2], reels.reel3[2], reels.reel4[2], reels.reel5[2]],
          [reels.reel1[3], reels.reel2[3], reels.reel3[3], reels.reel4[3], reels.reel5[3]],
        ],
      },
      lineWins,
      totalWin,
      balance,
      state: 'Ready',
    }
  }

  private calculateWins(
    reels: any,
    betLine: number,
    slotEvent: string
  ): { totalWin: number; lineWins: LineWin[] } {
    let totalWin = 0
    const lineWins: LineWin[] = []
    const wild = ['0'] // Wild symbol

    // Check each payline
    for (let lineIndex = 0; lineIndex < this.slotSettings.payLines.length; lineIndex++) {
      const payLine = this.slotSettings.payLines[lineIndex]
      const lineSymbols = payLine.positions.map(
        (pos, reelIndex) => reels[`reel${reelIndex + 1}`][pos]
      )

      // Check for wins on this line
      const lineWin = this.checkLineWin(lineSymbols, betLine, lineIndex, slotEvent)
      if (lineWin.amount > 0) {
        totalWin += lineWin.amount
        lineWins.push(lineWin)
      }
    }

    return { totalWin, lineWins }
  }

  private checkLineWin(
    symbols: number[],
    betLine: number,
    lineIndex: number,
    slotEvent: string
  ): LineWin {
    const wild = [0] // Wild symbol
    let bestWin = { amount: 0, symbol: -1, count: 0 }

    // Check each symbol type
    for (const symbolStr of this.slotSettings.SymbolGame) {
      const symbol = typeof symbolStr === 'string' ? parseInt(symbolStr) : symbolStr
      if (symbol === 0) continue // Skip wild in main check

      let count = 0
      let validWin = true

      // Count consecutive symbols from left
      for (let i = 0; i < symbols.length; i++) {
        if (symbols[i] === symbol || wild.includes(symbols[i])) {
          count++
        } else {
          break
        }
      }

      // Check if we have a valid win (3+ symbols)
      if (count >= 3) {
        const paytableKey = `SYM_${symbol}`
        if (this.slotSettings.Paytable[paytableKey]) {
          const payout = this.slotSettings.Paytable[paytableKey][count] || 0
          const winAmount =
            payout * betLine * (slotEvent === 'freespin' ? this.slotSettings.slotFreeMpl : 1)

          if (winAmount > bestWin.amount) {
            bestWin = { amount: winAmount, symbol, count }
          }
        }
      }
    }

    if (bestWin.amount > 0) {
      return {
        type: 'LineWinAmount',
        selectedLine: lineIndex.toString(),
        amount: bestWin.amount.toString(),
        wonSymbols: Array.from({ length: bestWin.count }, (_, i) => [i.toString(), '0']),
      }
    }

    return {
      type: 'LineWinAmount',
      selectedLine: lineIndex.toString(),
      amount: '0',
      wonSymbols: [],
    }
  }
}
