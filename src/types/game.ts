export interface GameConfig {
  id: string;
  name: string;
  title: string;
  lines: number;
  reels: number;
  rows: number;
  symbols: string[];
  wilds: string[];
  scatters: string[];
  bonusSymbols: string[];
  paytable: Record<string, number[]>;
  denominations: number[];
  bets: number[];
  maxWin: number;
  rtp: number;
  volatility: 'low' | 'medium' | 'high';
  features: GameFeature[];
}

export interface GameFeature {
  type: 'freespins' | 'bonus' | 'gamble' | 'wild' | 'scatter';
  config: any;
}

export interface ReelStrip {
  reelStrip1: number[];
  reelStrip2: number[];
  reelStrip3: number[];
  reelStrip4: number[];
  reelStrip5: number[];
  reelStrip6?: number[];
  reelStripBonus1?: number[];
  reelStripBonus2?: number[];
  reelStripBonus3?: number[];
  reelStripBonus4?: number[];
  reelStripBonus5?: number[];
  reelStripBonus6?: number[];
}

export interface PaylineConfig {
  id: number;
  positions: number[][];
}

export interface GameState {
  userId: number;
  gameId: string;
  balance: number;
  currentBet: number;
  currentDenom: number;
  freeGames: number;
  currentFreeGame: number;
  bonusWin: number;
  totalWin: number;
  gameMode: 'normal' | 'freespin' | 'bonus';
  bonusState: number;
  lastSpin?: SpinData;
  sessionData: Record<string, any>;
}

export interface SpinData {
  reels: number[][];
  wins: WinData[];
  totalWin: number;
  scatterWin: number;
  freeSpinsTriggered: number;
  bonusTriggered: boolean;
  multiplier: number;
}

export interface WinData {
  line: number;
  symbol: string;
  count: number;
  positions: number[][];
  payout: number;
  multiplier: number;
}

export interface BankingConfig {
  percent: number;
  maxWin: number;
  minWin: number;
  increaseRTP: boolean;
}

export interface RTPSettings {
  target: number;
  current: number;
  variance: number;
  adjustment: number;
}
