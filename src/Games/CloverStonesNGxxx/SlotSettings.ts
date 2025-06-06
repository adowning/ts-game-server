import { PrismaClient } from '@prisma/client'
import {
  GameHistoryEntry,
  PayLine,
  SymbolWin,
  GameState,
  WinType,
  SlotEvent,
} from '../../types/GameTypes'

export class SlotSettings {
  public slotId: string
  public playerId: number
  public prisma: PrismaClient
  public gameData: { [key: string]: { timelife: number; payload: any } } = {}

  // Game configuration
  public reelStrip1: number[] = []
  public reelStrip2: number[] = []
  public reelStrip3: number[] = []
  public reelStrip4: number[] = []
  public reelStrip5: number[] = []

  // Game settings
  public Bet: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50, 100, 200, 400]
  public Line: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  public SymbolGame: (string | number)[] = ['0', '1', 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // Paytable - CloverStonesNG specific payouts
  public Paytable: { [key: string]: number[] } = {
    SYM_0: [0, 0, 0, 0, 0, 0], // Wild
    SYM_1: [0, 0, 0, 16, 32, 80], // High value symbol
    SYM_2: [0, 0, 0, 16, 24, 48], // High value symbol
    SYM_3: [0, 0, 0, 16, 24, 48], // High value symbol
    SYM_4: [0, 0, 0, 8, 16, 32], // Medium value symbol
    SYM_5: [0, 0, 0, 8, 16, 32], // Medium value symbol
    SYM_6: [0, 0, 0, 4, 8, 16], // Low value symbol
    SYM_7: [0, 0, 0, 4, 8, 16], // Low value symbol
    SYM_8: [0, 0, 0, 4, 8, 16], // Low value symbol
    SYM_9: [0, 0, 0, 4, 8, 16], // Low value symbol
    SYM_10: [0, 0, 0, 4, 8, 16], // Low value symbol
  }

  // Paylines for CloverStonesNG (20 lines, 4 rows, 5 reels)
  public payLines: PayLine[] = [
    { line: 0, positions: [1, 1, 1, 1, 1] }, // Line 1 - Row 2
    { line: 1, positions: [2, 2, 2, 2, 2] }, // Line 2 - Row 3
    { line: 2, positions: [0, 0, 0, 0, 0] }, // Line 3 - Row 1
    { line: 3, positions: [3, 3, 3, 3, 3] }, // Line 4 - Row 4
    { line: 4, positions: [1, 2, 3, 2, 1] }, // Line 5 - V shape
    { line: 5, positions: [2, 1, 0, 1, 2] }, // Line 6 - Inverted V
    { line: 6, positions: [0, 0, 1, 2, 3] }, // Line 7 - Rising
    { line: 7, positions: [3, 3, 2, 1, 0] }, // Line 8 - Falling
    { line: 8, positions: [1, 0, 0, 0, 1] }, // Line 9 - U shape
    { line: 9, positions: [2, 3, 3, 3, 2] }, // Line 10 - Inverted U
    { line: 10, positions: [0, 1, 2, 3, 3] }, // Line 11 - Rising stairs
    { line: 11, positions: [3, 2, 1, 0, 0] }, // Line 12 - Falling stairs
    { line: 12, positions: [1, 0, 1, 2, 1] }, // Line 13 - W shape
    { line: 13, positions: [2, 3, 2, 1, 2] }, // Line 14 - M shape
    { line: 14, positions: [0, 1, 0, 1, 0] }, // Line 15 - Zigzag up
    { line: 15, positions: [3, 2, 3, 2, 3] }, // Line 16 - Zigzag down
    { line: 16, positions: [1, 2, 1, 0, 1] }, // Line 17 - Complex 1
    { line: 17, positions: [2, 1, 2, 3, 2] }, // Line 18 - Complex 2
    { line: 18, positions: [0, 1, 1, 1, 0] }, // Line 19 - Plateau up
    { line: 19, positions: [3, 2, 2, 2, 3] }, // Line 20 - Plateau down
  ]

  // Game mechanics
  public slotWildMpl: number = 1
  public slotFreeMpl: number = 2
  public slotFreeCount: number = 15
  public slotBonus: boolean = true
  public slotGamble: boolean = true
  public MaxWin: number = 10000
  public CurrentDenom: number = 0.01
  public slotCurrency: string = 'USD'

  // Game state
  private user: any = null
  private game: any = null
  private shop: any = null
  private balance: number = 0
  private percent: number = 90
  private isActive: boolean = true

  constructor(slotId: string, playerId: number, prisma: PrismaClient) {
    this.slotId = slotId
    this.playerId = playerId
    this.prisma = prisma
  }

  async initialize(): Promise<boolean> {
    try {
      // Get user data
      this.user = await this.prisma.user.findUnique({
        where: { id: this.playerId },
        include: { shop: true },
      })

      if (!this.user) {
        return false
      }

      // Get game data
      this.game = await this.prisma.game.findFirst({
        where: {
          name: this.slotId,
          shop_id: this.user.shop_id,
        },
      })

      if (!this.game) {
        return false
      }

      // Get shop data
      this.shop = this.user.shop

      // Set game properties
      this.balance = this.user.balance
      this.percent = this.shop.percent
      this.MaxWin = this.shop.max_win
      this.CurrentDenom = this.game.denomination
      this.slotCurrency = this.shop.currency

      // Parse bet values
      if (this.game.bet) {
        this.Bet = this.game.bet.split(',').map((b: string) => parseFloat(b))
      }

      // Load game session data
      if (this.user.session) {
        try {
          this.gameData = JSON.parse(this.user.session) || {}
        } catch (e) {
          this.gameData = {}
        }
      }

      // Clean expired game data
      this.cleanExpiredGameData()

      return true
    } catch (error) {
      console.error('Error initializing CloverStonesNG slot settings:', error)
      return false
    }
  }

  getIsActive(): boolean {
    return this.isActive && this.game?.view && !this.shop?.is_blocked && !this.user?.is_blocked
  }

  async GetBalance(): Promise<number> {
    if (this.user) {
      const user = await this.prisma.user.findUnique({
        where: { id: this.user.id },
      })
      return user?.balance || 0
    }
    return 0
  }

  async SetBalance(amount: number): Promise<void> {
    if (this.user) {
      await this.prisma.user.update({
        where: { id: this.user.id },
        data: { balance: { increment: amount } },
      })
      this.balance += amount
    }
  }

  SetGameData(key: string, value: any): void {
    const timeLife = 86400 // 24 hours
    this.gameData[key] = {
      timelife: Date.now() + timeLife * 1000,
      payload: value,
    }
  }

  GetGameData(key: string): any {
    if (this.gameData[key]) {
      return this.gameData[key].payload
    }
    return 0
  }

  async saveGameData(): Promise<void> {
    if (this.user) {
      await this.prisma.user.update({
        where: { id: this.user.id },
        data: { session: JSON.stringify(this.gameData) },
      })
    }
  }

  private cleanExpiredGameData(): void {
    const now = Date.now()
    Object.keys(this.gameData).forEach((key) => {
      if (this.gameData[key].timelife <= now) {
        delete this.gameData[key]
      }
    })
  }

  async GetHistory(): Promise<GameHistoryEntry | null> {
    try {
      const history = await this.prisma.gameLog.findFirst({
        where: {
          user_id: this.playerId,
          game_id: this.game.id,
        },
        orderBy: { id: 'desc' },
      })

      if (history) {
        return {
          id: history.id,
          user_id: history.user_id,
          game_id: history.game_id,
          str: history.str,
          created_at: history.created_at.toISOString(),
          serverResponse: history.str ? JSON.parse(history.str) : null,
        }
      }

      return null
    } catch (error) {
      console.error('Error getting game history:', error)
      return null
    }
  }

  GetPercent(): number {
    return this.percent
  }

  GetSpinSettings(slotEvent: SlotEvent, betLine: number, lines: number): [WinType, number] {
    // Simplified spin settings - in a real implementation this would be more complex
    const totalBet = betLine * lines
    const maxWin = totalBet * 100 // Max win is 100x bet

    // Determine win type based on RNG and game state
    const rng = Math.random()

    if (rng < 0.02) {
      // 2% chance for bonus
      return ['bonus', maxWin]
    } else if (rng < 0.25) {
      // 23% chance for win
      return ['win', maxWin * 0.5]
    } else {
      // 75% chance for no win
      return ['none', 0]
    }
  }

  FormatFloat(num: number): number {
    return Math.round(num * 100) / 100
  }
}
