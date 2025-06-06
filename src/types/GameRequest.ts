export interface GameRequest {
  action: string
  userId: string
  gameName: string
  currentBalance: number
  currentSessionData: Record<string, any>
  currentStaticData: Record<string, any>
  jackpotData: JackpotState[]
  currentBank?: number
  requestPayload?: GameRequestPayload
  // For specific original structures if needed by PHP
  gameData?: {
    cmd: string
    data?: GameRequestPayload
  }
}

// Dependent interfaces also defined in that artifact:
interface GameRequestPayload {
  coin?: number
  bet?: number
  index?: number
}

interface JackpotState {
  id: string
  balance: number
  percent?: number
}
