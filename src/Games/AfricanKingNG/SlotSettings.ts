import { PrismaClient } from '@prisma/client'

export interface GameData {
  [key: string]: {
    timelife: number
    payload: any
  }
}

export interface PaytableEntry {
  payout: string
  symbols: string[]
  type: string
}

export class SlotSettings {
  public playerId: number
  public slotId: string
  public slotDBId: number
  public bet: string[]
  public denomination: number
  public currency: string
  public balance: number
  public maxWin: number
  public percent: number
  public slotBonus: boolean = true
  public slotGamble: boolean = true
  public slotWildMpl: number = 1
  public slotFreeMpl: number = 1
  public slotFreeCount: number = 8
  
  private gameData: GameData = {}
  private prisma: PrismaClient
  private user: any
  private game: any
  private shop: any

  // Paytable based on PHP implementation
  private paytable: { [key: string]: number[] } = {
    'SYM_0': [0, 0, 15, 100, 1000, 3000],
    'SYM_1': [0, 0, 0, 0, 0, 0],
    'SYM_2': [0, 0, 5, 50, 100, 1000],
    'SYM_3': [0, 0, 0, 20, 50, 500],
    'SYM_4': [0, 0, 0, 10, 30, 400],
    'SYM_5': [0, 0, 0, 10, 30, 400],
    'SYM_6': [0, 0, 0, 5, 25, 200],
    'SYM_7': [0, 0, 0, 5, 20, 100],
    'SYM_8': [0, 0, 0, 5, 20, 100],
    'SYM_9': [0, 0, 2, 5, 20, 125] // Scatter symbol
  }

  constructor(gameId: string, userId: number, prisma: PrismaClient) {
    this.slotId = gameId
    this.playerId = userId
    this.prisma = prisma
  }

  async initialize(): Promise<boolean> {
    try {
      // Load user data
      this.user = await this.prisma.user.findUnique({
        where: { id: this.playerId },
        include: { shop: true }
      })

      if (!this.user) {
        return false
      }

      // Load game data
      this.game = await this.prisma.game.findFirst({
        where: { 
          name: this.slotId,
          shop_id: this.user.shop_id
        }
      })

      if (!this.game) {
        return false
      }

      this.shop = this.user.shop
      this.slotDBId = this.game.id
      this.balance = parseFloat(this.user.balance.toString())
      this.currency = this.shop.currency
      this.maxWin = parseFloat(this.shop.max_win.toString())
      this.percent = this.shop.percent
      this.denomination = this.game.denomination
      this.bet = this.game.bet.split(',')

      // Initialize game data from session
      if (this.user.session) {
        try {
          this.gameData = JSON.parse(this.user.session) || {}
        } catch {
          this.gameData = {}
        }
      }

      // Clean expired game data
      this.cleanExpiredGameData()

      return true
    } catch (error) {
      console.error('SlotSettings initialization error:', error)
      return false
    }
  }

  isActive(): boolean {
    if (!this.game || !this.shop || !this.user) {
      return false
    }

    if (!this.game.view || this.shop.is_blocked || this.user.is_blocked) {
      return false
    }

    return true
  }

  setGameData(key: string, value: any): void {
    const timeLife = 86400 // 24 hours
    this.gameData[this.slotId + key] = {
      timelife: Date.now() + (timeLife * 1000),
      payload: value
    }
  }

  getGameData(key: string): any {
    const fullKey = this.slotId + key
    if (this.gameData[fullKey]) {
      return this.gameData[fullKey].payload
    }
    return 0
  }

  async saveGameData(): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id: this.playerId },
        data: { session: JSON.stringify(this.gameData) }
      })
    } catch (error) {
      console.error('Error saving game data:', error)
    }
  }

  getBalance(): number {
    return this.balance
  }

  async setBalance(amount: number, event: string = 'bet'): Promise<void> {
    this.balance += amount
    try {
      await this.prisma.user.update({
        where: { id: this.playerId },
        data: { balance: this.balance }
      })
    } catch (error) {
      console.error('Error updating balance:', error)
    }
  }

  getHistory(): any {
    // For now, return null - will implement game history later
    return null
  }

  getPayouts(): PaytableEntry[] {
    const payouts: PaytableEntry[] = []
    
    // Convert paytable to the format expected by the game
    Object.entries(this.paytable).forEach(([symbol, values]) => {
      const symbolNum = symbol.replace('SYM_', '')
      
      values.forEach((payout, index) => {
        if (payout > 0) {
          const symbolCount = index
          const symbols = Array(symbolCount).fill(symbolNum)
          
          payouts.push({
            payout: payout.toString(),
            symbols: symbols,
            type: symbolNum === '9' ? 'scatter' : 'basic'
          })
        }
      })
    })

    return payouts
  }

  getSpinSettings(slotEvent: string, betLine: number, lines: number): [string, number] {
    // Simplified win type determination
    const random = Math.random()
    
    if (random < 0.05) { // 5% chance for bonus
      return ['bonus', betLine * lines * 10]
    } else if (random < 0.25) { // 20% chance for win
      return ['win', betLine * lines * 5]
    } else {
      return ['none', 0]
    }
  }

  getReelStrips(winType: string, slotEvent: string): any {
    // This will be implemented with the GameReel class
    // For now, return empty object
    return {}
  }

  formatFloat(num: number): number {
    return Math.round(num * 100) / 100
  }

  private cleanExpiredGameData(): void {
    const now = Date.now()
    Object.keys(this.gameData).forEach(key => {
      if (this.gameData[key].timelife <= now) {
        delete this.gameData[key]
      }
    })
  }

  // Bank and percentage methods (simplified for now)
  getBank(event: string = ''): number {
    // Simplified bank calculation
    return this.balance * 0.1
  }

  async setBank(event: string, amount: number, slotEvent: string): Promise<void> {
    // Bank management will be implemented later
  }

  getPercent(): number {
    return this.percent
  }

  async updateJackpots(amount: number): Promise<void> {
    // Jackpot updates will be implemented later
  }

  getRandomPay(): number {
    const allRates: number[] = []
    Object.values(this.paytable).forEach(values => {
      values.forEach(value => {
        if (value > 0) {
          allRates.push(value)
        }
      })
    })
    
    if (allRates.length === 0) return 0
    
    const randomIndex = Math.floor(Math.random() * allRates.length)
    return allRates[randomIndex]
  }
}
