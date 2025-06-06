export interface WebSocketMessage {
  action: string;
  sessionId?: string;
  gameName?: string;
  cookie?: string;
  data?: any;
  vals?: any[];
  irq?: boolean;
}

export interface GameRequest {
  action: 'InitRequest' | 'SpinRequest' | 'FreeSpinRequest' | 'BalanceRequest' | 'PickBonusItemRequest' | 'AuthRequest' | 'EventsRequest' | 'APIVersionRequest' | 'CheckBrokenGameRequest';
  data?: {
    coin?: number;
    bet?: number;
    index?: number; // For bonus picks
    bet_denomination?: number;
    bet_betlevel?: number;
  };
  slotEvent?: 'bet' | 'freespin' | 'init' | 'paytable' | 'initfreespin';
  gameData?: any;
  cmd?: string;
}

export interface GameResponse {
  action: string;
  result: boolean | string;
  sesId: string | boolean;
  data: any;
  responseEvent?: string;
  responseType?: string;
  serverResponse?: any;
}

export interface SpinResult {
  action: string;
  result: boolean;
  sesId: string;
  data: {
    reelsSymbols: ReelsSymbols;
    spinWins: SpinWin[];
    totalWin: number;
    bonusWin: number;
    freeGames: number;
    currentFreeGame: number;
    balance: number;
    slotBet: number;
    gameState: string;
    scattersCount?: number;
    scattersWin?: number;
  };
}

export interface ReelsSymbols {
  reel1: number[];
  reel2: number[];
  reel3: number[];
  reel4: number[];
  reel5: number[];
  rp: number[]; // Reel positions
}

export interface SpinWin {
  type: string;
  selectedLine?: string;
  amount: string;
  wonSymbols: string[][];
  bonusName?: string;
  params?: any;
}

export interface ConnectionInfo {
  id: string;
  ws: any;
  sessionId?: string;
  gameName?: string;
  userId?: number;
  lastActivity: number;
}

export interface RedisMessage {
  channel: string;
  data: any;
}
