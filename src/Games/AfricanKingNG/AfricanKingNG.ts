import { GameRequest, GameResponse } from '../../types/GameTypes'
import { SlotSettings } from './SlotSettings'
import { GameReel } from './GameReel'

export class AfricanKingNG {
  private slotSettings: SlotSettings
  
  constructor(slotSettings: SlotSettings) {
    this.slotSettings = slotSettings
  }

  async handleRequest(request: GameRequest): Promise<GameResponse> {
    const { action, data } = request
    
    try {
      switch (action) {
        case 'InitRequest':
          return this.handleInitRequest()
          
        case 'EventsRequest':
          return this.handleEventsRequest()
          
        case 'APIVersionRequest':
          return this.handleAPIVersionRequest(request)
          
        case 'CheckBrokenGameRequest':
          return this.handleCheckBrokenGameRequest()
          
        case 'AuthRequest':
          return this.handleAuthRequest()
          
        case 'BalanceRequest':
          return this.handleBalanceRequest()
          
        case 'SpinRequest':
        case 'FreeSpinRequest':
          return this.handleSpinRequest(request)
          
        case 'PickBonusItemRequest':
          return this.handlePickBonusItemRequest(request)
          
        default:
          return {
            action: action.replace('Request', 'Response'),
            result: false,
            error: `Unsupported action: ${action}`
          }
      }
    } catch (error) {
      console.error('AfricanKingNG error:', error)
      return {
        action: action.replace('Request', 'Response'),
        result: false,
        error: 'Internal server error'
      }
    }
  }

  private handleInitRequest(): GameResponse {
    return {
      action: 'InitResponce', // Note: PHP has typo "Responce"
      result: true,
      sesId: 'a40e5dc15a83a70f288e421fbcfc6de8',
      data: { id: 16183084 }
    }
  }

  private handleEventsRequest(): GameResponse {
    return {
      action: 'EventsResponce', // Note: PHP has typo "Responce"
      result: true,
      sesId: 'a40e5dc15a83a70f288e421fbcfc6de8',
      data: []
    }
  }

  private handleAPIVersionRequest(request: GameRequest): GameResponse {
    return {
      action: 'APIVersionResponse',
      result: true,
      sesId: false,
      msgId: (request as any).msgId || null,
      data: {
        router: 'v3.12',
        transportConfig: {
          reconnectTimeout: 500000000000
        }
      }
    }
  }

  private handleCheckBrokenGameRequest(): GameResponse {
    return {
      action: 'CheckBrokenGameResponse',
      result: true,
      sesId: false,
      data: { haveBrokenGame: false }
    }
  }

  private handleAuthRequest(): GameResponse {
    // Reset game data
    this.slotSettings.setGameData('BonusWin', 0)
    this.slotSettings.setGameData('FreeGames', 0)
    this.slotSettings.setGameData('CurrentFreeGame', 0)
    this.slotSettings.setGameData('TotalWin', 0)
    this.slotSettings.setGameData('FreeBalance', 0)
    this.slotSettings.setGameData('FreeStartWin', 0)
    this.slotSettings.setGameData('BonusSymbol', -1)

    // Get last event from history
    const lastEvent = this.slotSettings.getHistory()
    let rp2: string
    let bet: number

    if (lastEvent && lastEvent !== 'NULL') {
      // Restore from last event
      this.slotSettings.setGameData('BonusWin', lastEvent.serverResponse.bonusWin)
      this.slotSettings.setGameData('FreeGames', lastEvent.serverResponse.totalFreeGames)
      this.slotSettings.setGameData('CurrentFreeGame', lastEvent.serverResponse.currentFreeGames)
      this.slotSettings.setGameData('TotalWin', lastEvent.serverResponse.bonusWin)
      this.slotSettings.setGameData('BonusSymbol', lastEvent.serverResponse.BonusSymbol)
      
      // Build reel positions from last event
      const reels = lastEvent.serverResponse.reelsSymbols
      rp2 = `[${reels.reel1[0]},${reels.reel2[0]},${reels.reel3[0]},${reels.reel4[0]},${reels.reel5[0]}]`
      rp2 += `,[${reels.reel1[1]},${reels.reel2[1]},${reels.reel3[1]},${reels.reel4[1]},${reels.reel5[1]}]`
      rp2 += `,[${reels.reel1[2]},${reels.reel2[2]},${reels.reel3[2]},${reels.reel4[2]},${reels.reel5[2]}]`
      bet = lastEvent.serverResponse.slotBet * 100 * 20
    } else {
      // Generate random initial reels
      const gameReel = new GameReel()
      const rp_1 = Math.floor(Math.random() * (gameReel.reelStrip1.length - 3))
      const rp_2 = Math.floor(Math.random() * (gameReel.reelStrip2.length - 3))
      const rp_3 = Math.floor(Math.random() * (gameReel.reelStrip3.length - 3))
      const rp_4 = Math.floor(Math.random() * (gameReel.reelStrip4.length - 3))
      const rp_5 = Math.floor(Math.random() * (gameReel.reelStrip5.length - 3))
      
      rp2 = `[${gameReel.reelStrip1[rp_1]},${gameReel.reelStrip2[rp_2]},${gameReel.reelStrip3[rp_3]},${gameReel.reelStrip4[rp_4]},${gameReel.reelStrip5[rp_5]}]`
      rp2 += `,[${gameReel.reelStrip1[rp_1 + 1]},${gameReel.reelStrip2[rp_2 + 1]},${gameReel.reelStrip3[rp_3 + 1]},${gameReel.reelStrip4[rp_4 + 1]},${gameReel.reelStrip5[rp_5 + 1]}]`
      rp2 += `,[${gameReel.reelStrip1[rp_1 + 2]},${gameReel.reelStrip2[rp_2 + 2]},${gameReel.reelStrip3[rp_3 + 2]},${gameReel.reelStrip4[rp_4 + 2]},${gameReel.reelStrip5[rp_5 + 2]}]`
      bet = this.slotSettings.bet[0] * 100 * 20
    }

    // Check if free games are complete
    if (this.slotSettings.getGameData('FreeGames') === this.slotSettings.getGameData('CurrentFreeGame')) {
      this.slotSettings.setGameData('FreeGames', 0)
      this.slotSettings.setGameData('CurrentFreeGame', 0)
    }

    // Build restore string for free spins
    let restoreString = ''
    if (this.slotSettings.getGameData('CurrentFreeGame') < this.slotSettings.getGameData('FreeGames')) {
      const fBonusWin = this.slotSettings.getGameData('BonusWin')
      const fTotal = this.slotSettings.getGameData('FreeGames')
      const fCurrent = this.slotSettings.getGameData('CurrentFreeGame')
      const fRemain = fTotal - fCurrent
      restoreString = `,"restoredGameCode":"340","lastResponse":{"spinResult":{"type":"SpinResult","rows":[${rp2}]},"freeSpinsTotal":"${fTotal}","freeSpinRemain":"${fRemain}","totalBonusWin":"${fBonusWin}","state":"FreeSpins","expandingSymbols":["1"]}`
    }

    const authResponse = {
      action: 'AuthResponse',
      result: true,
      sesId: '10000296198',
      data: {
        snivy: 'proxy v6.10.48 (API v4.23)',
        supportedFeatures: ['Offers', 'Jackpots', 'InstantJackpots', 'SweepStakes'],
        sessionId: '10000296198',
        defaultLines: Array.from({length: 20}, (_, i) => i.toString()),
        bets: this.slotSettings.bet,
        betMultiplier: '1.5000000',
        defaultBet: this.slotSettings.bet[0],
        defaultCoinValue: this.slotSettings.denomination.toString(),
        coinValues: [this.slotSettings.denomination.toString()],
        gameParameters: {
          availableLines: this.getAvailableLines(),
          rtp: '95.00',
          payouts: this.getPayouts(),
          initialSymbols: this.parseInitialSymbols(rp2)
        },
        jackpotsEnabled: true,
        gameModes: []
      }
    }

    return authResponse
  }

  private handleBalanceRequest(): GameResponse {
    return {
      action: 'BalanceResponse',
      result: true,
      sesId: '10000214325',
      data: {
        entries: '0.00',
        totalAmount: this.slotSettings.getBalance().toString(),
        currency: this.slotSettings.currency
      }
    }
  }

  private handleSpinRequest(request: GameRequest): GameResponse {
    // Implementation will be added in next part due to complexity
    return {
      action: 'SpinResponse',
      result: true,
      sesId: '10000214325',
      data: {
        // Spin logic will be implemented
      }
    }
  }

  private handlePickBonusItemRequest(request: GameRequest): GameResponse {
    // Implementation will be added in next part
    return {
      action: 'PickBonusItemResponse',
      result: true,
      sesId: '10000608346',
      data: {
        // Bonus logic will be implemented
      }
    }
  }

  private getAvailableLines(): number[][] {
    return [
      [1,1,1,1,1], [0,0,0,0,0], [2,2,2,2,2], [0,1,2,1,0], [2,1,0,1,2],
      [1,0,1,2,1], [1,2,1,0,1], [0,0,1,2,2], [2,2,1,0,0], [0,1,0,1,0],
      [2,1,2,1,2], [1,0,0,0,1], [1,2,2,2,1], [0,1,1,1,0], [2,1,1,1,2],
      [1,1,0,1,1], [1,1,2,1,1], [0,2,0,2,0], [2,0,2,0,2], [2,0,1,0,2]
    ]
  }

  private getPayouts(): any[] {
    // Return the paytable from SlotSettings
    return this.slotSettings.getPayouts()
  }

  private parseInitialSymbols(rp2: string): number[][] {
    // Parse the rp2 string into a 3x5 grid
    const rows = rp2.split('],[').map(row => 
      row.replace(/[\[\]]/g, '').split(',').map(Number)
    )
    return rows
  }
}
