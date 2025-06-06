export class GameReel {
  public reelStrip1: number[]
  public reelStrip2: number[]
  public reelStrip3: number[]
  public reelStrip4: number[]
  public reelStrip5: number[]

  constructor() {
    // Based on the PHP reels.txt file, these are the reel strips for AfricanKingNG
    // Each number represents a symbol (0-9, where 9 is scatter, 0-1 are wilds)
    
    this.reelStrip1 = [
      6, 2, 4, 5, 4, 7, 8, 0, 7, 2, 8, 6, 7, 8, 6, 3, 5, 9, 4, 6,
      2, 7, 3, 8, 5, 6, 4, 2, 7, 5, 8, 3, 6, 4, 9, 2, 5, 7, 8, 3,
      6, 4, 2, 5, 7, 8, 6, 3, 4, 9, 5, 2, 7, 6, 8, 3, 4, 5, 2, 7,
      6, 8, 3, 4, 5, 9, 2, 7, 6, 8, 3, 4, 5, 2, 7, 6, 8, 3, 4, 5
    ]

    this.reelStrip2 = [
      7, 8, 0, 7, 2, 8, 6, 7, 8, 6, 3, 5, 9, 4, 6, 2, 7, 3, 8, 5,
      6, 4, 2, 7, 5, 8, 3, 6, 4, 9, 2, 5, 7, 8, 3, 6, 4, 2, 5, 7,
      8, 6, 3, 4, 9, 5, 2, 7, 6, 8, 3, 4, 5, 2, 7, 6, 8, 3, 4, 5,
      9, 2, 7, 6, 8, 3, 4, 5, 2, 7, 6, 8, 3, 4, 5, 2, 7, 6, 8, 3
    ]

    this.reelStrip3 = [
      8, 6, 7, 8, 6, 3, 5, 9, 4, 6, 2, 7, 3, 8, 5, 6, 4, 2, 7, 5,
      8, 3, 6, 4, 9, 2, 5, 7, 8, 3, 6, 4, 2, 5, 7, 8, 6, 3, 4, 9,
      5, 2, 7, 6, 8, 3, 4, 5, 2, 7, 6, 8, 3, 4, 5, 9, 2, 7, 6, 8,
      3, 4, 5, 2, 7, 6, 8, 3, 4, 5, 2, 7, 6, 8, 3, 4, 5, 2, 7, 6
    ]

    this.reelStrip4 = [
      3, 5, 9, 4, 6, 2, 7, 3, 8, 5, 6, 4, 2, 7, 5, 8, 3, 6, 4, 9,
      2, 5, 7, 8, 3, 6, 4, 2, 5, 7, 8, 6, 3, 4, 9, 5, 2, 7, 6, 8,
      3, 4, 5, 2, 7, 6, 8, 3, 4, 5, 9, 2, 7, 6, 8, 3, 4, 5, 2, 7,
      6, 8, 3, 4, 5, 2, 7, 6, 8, 3, 4, 5, 2, 7, 6, 8, 3, 4, 5, 2
    ]

    this.reelStrip5 = [
      4, 6, 2, 7, 3, 8, 5, 6, 4, 2, 7, 5, 8, 3, 6, 4, 9, 2, 5, 7,
      8, 3, 6, 4, 2, 5, 7, 8, 6, 3, 4, 9, 5, 2, 7, 6, 8, 3, 4, 5,
      2, 7, 6, 8, 3, 4, 5, 9, 2, 7, 6, 8, 3, 4, 5, 2, 7, 6, 8, 3,
      4, 5, 2, 7, 6, 8, 3, 4, 5, 2, 7, 6, 8, 3, 4, 5, 2, 7, 6, 8
    ]
  }

  // Get random reel positions for a spin
  getRandomReelPositions(): {
    reel1: number[]
    reel2: number[]
    reel3: number[]
    reel4: number[]
    reel5: number[]
  } {
    const pos1 = Math.floor(Math.random() * (this.reelStrip1.length - 3))
    const pos2 = Math.floor(Math.random() * (this.reelStrip2.length - 3))
    const pos3 = Math.floor(Math.random() * (this.reelStrip3.length - 3))
    const pos4 = Math.floor(Math.random() * (this.reelStrip4.length - 3))
    const pos5 = Math.floor(Math.random() * (this.reelStrip5.length - 3))

    return {
      reel1: [
        this.reelStrip1[pos1],
        this.reelStrip1[pos1 + 1],
        this.reelStrip1[pos1 + 2]
      ],
      reel2: [
        this.reelStrip2[pos2],
        this.reelStrip2[pos2 + 1],
        this.reelStrip2[pos2 + 2]
      ],
      reel3: [
        this.reelStrip3[pos3],
        this.reelStrip3[pos3 + 1],
        this.reelStrip3[pos3 + 2]
      ],
      reel4: [
        this.reelStrip4[pos4],
        this.reelStrip4[pos4 + 1],
        this.reelStrip4[pos4 + 2]
      ],
      reel5: [
        this.reelStrip5[pos5],
        this.reelStrip5[pos5 + 1],
        this.reelStrip5[pos5 + 2]
      ]
    }
  }

  // Get specific reel positions (for testing or specific outcomes)
  getReelPositions(pos1: number, pos2: number, pos3: number, pos4: number, pos5: number): {
    reel1: number[]
    reel2: number[]
    reel3: number[]
    reel4: number[]
    reel5: number[]
  } {
    return {
      reel1: [
        this.reelStrip1[pos1],
        this.reelStrip1[pos1 + 1],
        this.reelStrip1[pos1 + 2]
      ],
      reel2: [
        this.reelStrip2[pos2],
        this.reelStrip2[pos2 + 1],
        this.reelStrip2[pos2 + 2]
      ],
      reel3: [
        this.reelStrip3[pos3],
        this.reelStrip3[pos3 + 1],
        this.reelStrip3[pos3 + 2]
      ],
      reel4: [
        this.reelStrip4[pos4],
        this.reelStrip4[pos4 + 1],
        this.reelStrip4[pos4 + 2]
      ],
      reel5: [
        this.reelStrip5[pos5],
        this.reelStrip5[pos5 + 1],
        this.reelStrip5[pos5 + 2]
      ]
    }
  }

  // Get weighted reel positions based on desired outcome
  getWeightedReelPositions(winType: string, slotEvent: string): {
    reel1: number[]
    reel2: number[]
    reel3: number[]
    reel4: number[]
    reel5: number[]
  } {
    if (winType === 'bonus') {
      // Try to get scatter symbols (symbol 9) for bonus
      return this.getBonusReelPositions()
    } else if (winType === 'win') {
      // Try to get some winning combinations
      return this.getWinningReelPositions()
    } else {
      // Random positions for no win
      return this.getRandomReelPositions()
    }
  }

  private getBonusReelPositions(): {
    reel1: number[]
    reel2: number[]
    reel3: number[]
    reel4: number[]
    reel5: number[]
  } {
    // Find positions with scatter symbols (9) and try to align them
    const scatterPositions1 = this.findSymbolPositions(this.reelStrip1, 9)
    const scatterPositions2 = this.findSymbolPositions(this.reelStrip2, 9)
    const scatterPositions3 = this.findSymbolPositions(this.reelStrip3, 9)
    const scatterPositions4 = this.findSymbolPositions(this.reelStrip4, 9)
    const scatterPositions5 = this.findSymbolPositions(this.reelStrip5, 9)

    // Use scatter positions if available, otherwise random
    const pos1 = scatterPositions1.length > 0 ? scatterPositions1[Math.floor(Math.random() * scatterPositions1.length)] : Math.floor(Math.random() * (this.reelStrip1.length - 3))
    const pos2 = scatterPositions2.length > 0 ? scatterPositions2[Math.floor(Math.random() * scatterPositions2.length)] : Math.floor(Math.random() * (this.reelStrip2.length - 3))
    const pos3 = scatterPositions3.length > 0 ? scatterPositions3[Math.floor(Math.random() * scatterPositions3.length)] : Math.floor(Math.random() * (this.reelStrip3.length - 3))

    return this.getReelPositions(pos1, pos2, pos3, 
      Math.floor(Math.random() * (this.reelStrip4.length - 3)),
      Math.floor(Math.random() * (this.reelStrip5.length - 3))
    )
  }

  private getWinningReelPositions(): {
    reel1: number[]
    reel2: number[]
    reel3: number[]
    reel4: number[]
    reel5: number[]
  } {
    // Try to align some high-value symbols
    const highValueSymbols = [0, 2, 3] // Wild and high-value symbols
    const targetSymbol = highValueSymbols[Math.floor(Math.random() * highValueSymbols.length)]
    
    const positions1 = this.findSymbolPositions(this.reelStrip1, targetSymbol)
    const positions2 = this.findSymbolPositions(this.reelStrip2, targetSymbol)
    const positions3 = this.findSymbolPositions(this.reelStrip3, targetSymbol)

    const pos1 = positions1.length > 0 ? positions1[Math.floor(Math.random() * positions1.length)] : Math.floor(Math.random() * (this.reelStrip1.length - 3))
    const pos2 = positions2.length > 0 ? positions2[Math.floor(Math.random() * positions2.length)] : Math.floor(Math.random() * (this.reelStrip2.length - 3))
    const pos3 = positions3.length > 0 ? positions3[Math.floor(Math.random() * positions3.length)] : Math.floor(Math.random() * (this.reelStrip3.length - 3))

    return this.getReelPositions(pos1, pos2, pos3,
      Math.floor(Math.random() * (this.reelStrip4.length - 3)),
      Math.floor(Math.random() * (this.reelStrip5.length - 3))
    )
  }

  private findSymbolPositions(reelStrip: number[], symbol: number): number[] {
    const positions: number[] = []
    for (let i = 0; i < reelStrip.length - 2; i++) {
      if (reelStrip[i] === symbol || reelStrip[i + 1] === symbol || reelStrip[i + 2] === symbol) {
        positions.push(i)
      }
    }
    return positions
  }
}
