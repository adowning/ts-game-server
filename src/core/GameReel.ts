import { ReelStrip } from '../types/game.ts';

export class GameReel {
  public reelsStrip: ReelStrip = {
    reelStrip1: [],
    reelStrip2: [],
    reelStrip3: [],
    reelStrip4: [],
    reelStrip5: [],
    reelStrip6: [],
    reelStripBonus1: [],
    reelStripBonus2: [],
    reelStripBonus3: [],
    reelStripBonus4: [],
    reelStripBonus5: [],
    reelStripBonus6: []
  };

  constructor(reelData?: any) {
    if (reelData) {
      this.loadReelData(reelData);
    }
  }

  private loadReelData(reelData: any): void {
    // If reelData is a file path or string content, parse it
    if (typeof reelData === 'string') {
      this.parseReelFile(reelData);
    } else if (typeof reelData === 'object') {
      // Direct object assignment
      Object.assign(this.reelsStrip, reelData);
    }
  }

  private parseReelFile(content: string): void {
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || !trimmedLine.includes('=')) continue;
      
      const [reelName, reelValues] = trimmedLine.split('=');
      const reelKey = reelName.trim() as keyof ReelStrip;
      
      if (reelKey in this.reelsStrip && reelValues) {
        const symbols = reelValues.split(',')
          .map(s => s.trim())
          .filter(s => s !== '')
          .map(s => parseInt(s, 10))
          .filter(n => !isNaN(n));
        
        this.reelsStrip[reelKey] = symbols;
      }
    }
  }

  public getReelStrip(reelNumber: number, isBonus: boolean = false): number[] {
    const reelKey = isBonus 
      ? `reelStripBonus${reelNumber}` as keyof ReelStrip
      : `reelStrip${reelNumber}` as keyof ReelStrip;
    
    return this.reelsStrip[reelKey] || [];
  }

  public generateRandomPosition(reelNumber: number, isBonus: boolean = false): number {
    const reel = this.getReelStrip(reelNumber, isBonus);
    if (reel.length === 0) return 0;
    
    return Math.floor(Math.random() * (reel.length - 2));
  }

  public getSymbolsAtPosition(reelNumber: number, position: number, count: number = 3, isBonus: boolean = false): number[] {
    const reel = this.getReelStrip(reelNumber, isBonus);
    if (reel.length === 0) return [];
    
    const symbols: number[] = [];
    for (let i = 0; i < count; i++) {
      const symbolIndex = (position + i) % reel.length;
      symbols.push(reel[symbolIndex]);
    }
    
    return symbols;
  }

  public generateReelResult(rows: number = 3, isBonus: boolean = false): {
    reels: number[][];
    positions: number[];
  } {
    const reels: number[][] = [];
    const positions: number[] = [];
    
    for (let reelNum = 1; reelNum <= 5; reelNum++) {
      const position = this.generateRandomPosition(reelNum, isBonus);
      const symbols = this.getSymbolsAtPosition(reelNum, position, rows, isBonus);
      
      reels.push(symbols);
      positions.push(position);
    }
    
    return { reels, positions };
  }

  public setReelStrip(reelNumber: number, symbols: number[], isBonus: boolean = false): void {
    const reelKey = isBonus 
      ? `reelStripBonus${reelNumber}` as keyof ReelStrip
      : `reelStrip${reelNumber}` as keyof ReelStrip;
    
    if (reelKey in this.reelsStrip) {
      this.reelsStrip[reelKey] = [...symbols];
    }
  }

  public validateReelStrips(): boolean {
    const requiredReels = ['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5'];
    
    for (const reelKey of requiredReels) {
      const reel = this.reelsStrip[reelKey as keyof ReelStrip];
      if (!reel || reel.length === 0) {
        console.warn(`Missing or empty reel: ${reelKey}`);
        return false;
      }
    }
    
    return true;
  }

  public getReelInfo(): any {
    return {
      reelCount: 5,
      symbolCounts: {
        reel1: this.reelsStrip.reelStrip1.length,
        reel2: this.reelsStrip.reelStrip2.length,
        reel3: this.reelsStrip.reelStrip3.length,
        reel4: this.reelsStrip.reelStrip4.length,
        reel5: this.reelsStrip.reelStrip5.length
      },
      hasBonus: this.reelsStrip.reelStripBonus1.length > 0
    };
  }

  public static createFromFile(filePath: string): GameReel {
    try {
      // In a real implementation, you'd read the file
      // For now, we'll assume the file content is passed
      const gameReel = new GameReel();
      return gameReel;
    } catch (error) {
      console.error('Error creating GameReel from file:', error);
      return new GameReel();
    }
  }

  public static createFromJSON(jsonData: any): GameReel {
    const gameReel = new GameReel();
    gameReel.loadReelData(jsonData);
    return gameReel;
  }
}
