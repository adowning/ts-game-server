import { User, Shop, Game } from '../prisma/generated'

export interface PlayerSession {
  id: string
  userId: number
  sessionId: string
  ipAddress?: string
  userAgent?: string
  createdAt: Date
  lastActivity: Date
  gameData: Record<string, SessionGameData>
}

export interface SessionGameData {
  timelife: number
  payload: any
}

export interface PlayerWithShop extends User {
  shop: Shop
}

export interface GameWithShop extends Game {
  shop: Shop
}

export interface PlayerBalance {
  current: number
  currency: string
  lastUpdate: Date
}

export interface PlayerStats {
  totalBets: number
  totalWins: number
  totalSpins: number
  biggestWin: number
  currentStreak: number
  rtp: number
}

export interface AuthResult {
  success: boolean
  user?: PlayerWithShop
  error?: string
  sessionId?: string
}

export interface ValidationResult {
  valid: boolean
  error?: string
  data?: any
}
