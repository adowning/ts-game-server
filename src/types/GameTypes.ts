export interface GameRequest {
  action: string
  msgId?: string
  result?: boolean
  data?: any
  sesId?: string | boolean
  sessionId?: string
  gameName?: string
  cookie?: string
}

export interface GameResponse {
  action: string
  result: boolean
  sesId?: string | boolean
  msgId?: string | null
  data?: any
  error?: string
}

export interface SpinRequest extends GameRequest {
  action: 'SpinRequest' | 'FreeSpinRequest'
  data: {
    coin: number
    bet: number
    lines?: number
  }
}

export interface SpinResponse extends GameResponse {
  action: 'SpinResponse' | 'FreeSpinResponse'
  data: {
    spinResult: {
      type: string
      rows: number[][]
    }
    lineWins?: LineWin[]
    totalWin: number
    balance: number
    state: string
    freeSpinsTotal?: number
    freeSpinRemain?: number
    totalBonusWin?: number
    expandingSymbols?: string[]
  }
}

export interface LineWin {
  type: string
  selectedLine?: string
  amount: string
  wonSymbols: string[][]
  bonusName?: string
  params?: any
}

export interface AuthRequest extends GameRequest {
  action: 'AuthRequest'
}

export interface AuthResponse extends GameResponse {
  action: 'AuthResponse'
  data: {
    snivy: string
    supportedFeatures: string[]
    sessionId: string
    defaultLines: string[]
    bets: string[]
    betMultiplier: string
    defaultBet: string
    defaultCoinValue: string
    coinValues: string[]
    gameParameters: {
      availableLines: number[][]
      rtp: string
      payouts: PayoutEntry[]
      initialSymbols: number[][]
    }
    jackpotsEnabled: string
    gameModes: string[]
  }
}

export interface PayoutEntry {
  payout: string
  symbols: string[]
  type: string
}

export interface BalanceRequest extends GameRequest {
  action: 'BalanceRequest'
}

export interface BalanceResponse extends GameResponse {
  action: 'BalanceResponse'
  data: {
    entries: string
    totalAmount: string
    currency: string
  }
}

export interface PickBonusItemRequest extends GameRequest {
  action: 'PickBonusItemRequest'
  data: {
    index: number
  }
}

export interface PickBonusItemResponse extends GameResponse {
  action: 'PickBonusItemResponse'
  data: {
    lastPick: string
    bonusItem: any
    items?: any[]
    state: string
    params: any
  }
}

export interface APIVersionRequest extends GameRequest {
  action: 'APIVersionRequest'
  data: {
    versionMajor: string
    versionMinor: string
    gameId: string
  }
}

export interface APIVersionResponse extends GameResponse {
  action: 'APIVersionResponse'
  data: {
    router: string
    transportConfig: {
      reconnectTimeout: number
    }
  }
}

export interface InitRequest extends GameRequest {
  action: 'InitRequest'
}

export interface InitResponse extends GameResponse {
  action: 'InitResponce' // Note: PHP has typo
  data: {
    id: number
  }
}

export interface EventsRequest extends GameRequest {
  action: 'EventsRequest'
}

export interface EventsResponse extends GameResponse {
  action: 'EventsResponce' // Note: PHP has typo
  data: any[]
}

export interface CheckBrokenGameRequest extends GameRequest {
  action: 'CheckBrokenGameRequest'
}

export interface CheckBrokenGameResponse extends GameResponse {
  action: 'CheckBrokenGameResponse'
  data: {
    haveBrokenGame: string
  }
}

// Game state types
export type GameState = 'Ready' | 'FreeSpins' | 'PickBonus' | 'Gamble'
export type WinType = 'none' | 'win' | 'bonus'
export type SlotEvent = 'bet' | 'freespin' | 'bonus'

// Reel result interface
export interface ReelResult {
  reel1: number[]
  reel2: number[]
  reel3: number[]
  reel4: number[]
  reel5: number[]
}

// Line definition for payline calculations
export interface PayLine {
  line: number
  positions: number[] // [reel1_row, reel2_row, reel3_row, reel4_row, reel5_row]
}

// Symbol win calculation result
export interface SymbolWin {
  symbol: number
  count: number
  payout: number
  line: number
  positions: number[]
  multiplier: number
}

// Game history entry
export interface GameHistoryEntry {
  id: number
  user_id: number
  game_id: number
  str: string
  created_at: string
  serverResponse?: {
    bonusWin: number
    totalFreeGames: number
    currentFreeGames: number
    BonusSymbol: number
    slotBet: number
    reelsSymbols: ReelResult
  }
}
