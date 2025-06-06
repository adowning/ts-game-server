import { PrismaClient, User, Game, Shop } from '@prisma/client';
import { PlayerWithShop, GameWithShop, SessionGameData } from '../types/player.ts';
import { GameState, BankingConfig, ReelStrip } from '../types/game.ts';
import prisma from '../database/client.ts';

export class SlotSettings {
  public slotId: string;
  public slotDBId: number;
  public playerId: number;
  public user: PlayerWithShop;
  public game: GameWithShop;
  public shop: Shop;
  
  // Game configuration
  public Paytable: Record<string, number[]> = {};
  public reelStrip1: number[] = [];
  public reelStrip2: number[] = [];
  public reelStrip3: number[] = [];
  public reelStrip4: number[] = [];
  public reelStrip5: number[] = [];
  public reelStrip6: number[] = [];
  
  // Bonus reels
  public reelStripBonus1: number[] = [];
  public reelStripBonus2: number[] = [];
  public reelStripBonus3: number[] = [];
  public reelStripBonus4: number[] = [];
  public reelStripBonus5: number[] = [];
  public reelStripBonus6: number[] = [];
  
  // Game settings
  public Bet: number[] = [];
  public Line: number[] = [];
  public gameLine: number[] = [];
  public SymbolGame: string[] = [];
  public Denominations: number[] = [0.01, 0.02, 0.05, 0.10, 0.20, 0.50, 1.00];
  
  // Current state
  public CurrentDenom: number = 0.01;
  public CurrentDenomination: number = 0.01;
  public MaxWin: number = 10000;
  public increaseRTP: boolean = true;
  
  // Game features
  public slotBonus: boolean = true;
  public slotGamble: boolean = true;
  public slotWildMpl: number = 1;
  public slotFreeMpl: number = 1;
  public slotFreeCount: number = 8;
  
  // Banking
  private Bank: number = 0;
  private Percent: number = 90;
  
  // Session data
  private gameData: Record<string, SessionGameData> = {};
  private gameDataStatic: Record<string, SessionGameData> = {};
  
  public slotCurrency: string = 'USD';

  constructor(slotId: string, playerId: number, user: PlayerWithShop, game: GameWithShop) {
    this.slotId = slotId;
    this.playerId = playerId;
    this.user = user;
    this.game = game;
    this.shop = user.shop;
    this.slotDBId = game.id;
    this.slotCurrency = user.shop.currency;
    
    this.initializeSettings();
  }

  private initializeSettings(): void {
    // Parse bet values
    this.Bet = this.game.bet.split(',').map(b => parseFloat(b));
    
    // Set banking values
    this.MaxWin = this.shop.max_win.toNumber();
    this.Percent = this.shop.percent;
    this.CurrentDenom = this.game.denomination.toNumber();
    this.CurrentDenomination = this.game.denomination.toNumber();
    
    // Initialize lines (standard 20-line setup for most NG games)
    this.Line = Array.from({ length: 20 }, (_, i) => i + 1);
    this.gameLine = Array.from({ length: 20 }, (_, i) => i + 1);
    
    // Load session data
    this.loadSessionData();
    this.loadGameData();
  }

  private loadSessionData(): void {
    if (this.user.session) {
      try {
        this.gameData = JSON.parse(this.user.session);
        // Clean expired data
        const now = Date.now();
        Object.keys(this.gameData).forEach(key => {
          if (this.gameData[key]?.timelife && this.gameData[key].timelife <= now) {
            delete this.gameData[key];
          }
        });
      } catch (error) {
        console.error('Error loading session data:', error);
        this.gameData = {};
      }
    }
  }

  private loadGameData(): void {
    if (this.game.advanced) {
      try {
        this.gameDataStatic = JSON.parse(this.game.advanced);
        // Clean expired data
        const now = Date.now();
        Object.keys(this.gameDataStatic).forEach(key => {
          if (this.gameDataStatic[key]?.timelife && this.gameDataStatic[key].timelife <= now) {
            delete this.gameDataStatic[key];
          }
        });
      } catch (error) {
        console.error('Error loading game data:', error);
        this.gameDataStatic = {};
      }
    }
  }

  public async GetBalance(): Promise<number> {
    const user = await prisma.user.findUnique({
      where: { id: this.playerId }
    });
    return user?.balance.toNumber() || 0;
  }

  public async SetBalance(amount: number, event: string): Promise<void> {
    await prisma.user.update({
      where: { id: this.playerId },
      data: { balance: { increment: amount } }
    });
    
    // Update local user object
    this.user.balance = this.user.balance.add(amount);
  }

  public GetGameData(key: string): any {
    return this.gameData[key]?.payload || 0;
  }

  public SetGameData(key: string, value: any): void {
    const timeLife = 86400000; // 24 hours in milliseconds
    this.gameData[key] = {
      timelife: Date.now() + timeLife,
      payload: value
    };
  }

  public GetGameDataStatic(key: string): any {
    return this.gameDataStatic[key]?.payload || 0;
  }

  public SetGameDataStatic(key: string, value: any): void {
    const timeLife = 86400000; // 24 hours in milliseconds
    this.gameDataStatic[key] = {
      timelife: Date.now() + timeLife,
      payload: value
    };
  }

  public async SaveGameData(): Promise<void> {
    await prisma.user.update({
      where: { id: this.playerId },
      data: { session: JSON.stringify(this.gameData) }
    });
  }

  public async SaveGameDataStatic(): Promise<void> {
    await prisma.game.update({
      where: { id: this.game.id },
      data: { advanced: JSON.stringify(this.gameDataStatic) }
    });
  }

  public async GetHistory(): Promise<any> {
    const logs = await prisma.gameLog.findMany({
      where: {
        user_id: this.playerId,
        game_id: this.slotDBId
      },
      orderBy: { id: 'desc' },
      take: 10
    });

    for (const log of logs) {
      try {
        const logData = JSON.parse(log.str);
        if (logData.responseEvent !== 'gambleResult') {
          return logData;
        }
      } catch (error) {
        console.error('Error parsing log data:', error);
      }
    }
    return null;
  }

  public is_active(): boolean {
    if (!this.game.view || this.shop.is_blocked || this.user.is_blocked) {
      return false;
    }
    return true;
  }

  public FormatFloat(num: number): number {
    return Math.round(num * 100) / 100;
  }

  public GetBank(): number {
    return this.Bank;
  }

  public SetBank(event: string, amount: number): void {
    this.Bank += amount;
  }

  public GetPercent(): number {
    return this.Percent;
  }

  public GetRandomPay(): number {
    const allRates: number[] = [];
    Object.values(this.Paytable).forEach(payouts => {
      payouts.forEach(payout => {
        if (payout > 0) {
          allRates.push(payout);
        }
      });
    });
    
    if (allRates.length === 0) return 0;
    
    const randomIndex = Math.floor(Math.random() * allRates.length);
    return allRates[randomIndex] || 0;
  }
}
