export class GameReel {
  public reelStrip1: number[]
  public reelStrip2: number[]
  public reelStrip3: number[]
  public reelStrip4: number[]
  public reelStrip5: number[]

  constructor() {
    // Based on the PHP reels.txt file, these are the reel strips for CloverStonesNG
    // Each number represents a symbol (0-10, where 0 is wild)
    
    this.reelStrip1 = [
      2, 4, 1, 3, 1, 2, 5, 0, 4, 4, 4, 4, 2, 7, 6, 10, 3, 8, 7, 2, 9, 5, 5, 5, 5, 0, 4, 2, 7, 6, 6, 6, 6, 3, 8, 7, 7, 7, 7, 5, 3, 1, 0, 5, 8, 3, 3, 3, 3, 6, 1, 1, 1, 1, 2, 9, 9, 9, 9, 9, 5, 10, 0, 4, 2, 7, 6, 3, 8, 8, 8, 8, 7, 8, 2, 8, 4, 2, 6, 8, 4, 2, 1, 0, 6, 3, 3, 3, 3, 4, 1, 0, 2, 5, 1, 4, 2, 7, 6, 3, 8, 10, 10, 10, 10, 7, 8, 2, 2, 2, 2, 0, 3
    ]

    this.reelStrip2 = [
      2, 4, 1, 3, 1, 2, 5, 0, 4, 4, 4, 4, 2, 7, 6, 10, 3, 8, 7, 2, 9, 5, 5, 5, 5, 0, 4, 2, 7, 6, 6, 6, 6, 3, 8, 7, 7, 7, 7, 5, 3, 1, 0, 5, 8, 3, 3, 3, 3, 6, 1, 1, 1, 1, 2, 9, 9, 9, 9, 9, 5, 10, 0, 4, 2, 7, 6, 3, 8, 8, 8, 8, 7, 8, 2, 8, 4, 2, 6, 8, 4, 2, 1, 0, 6, 3, 3, 3, 3, 4, 1, 0, 2, 5, 1, 4, 2, 7, 6, 3, 8, 10, 10, 10, 10, 7, 8, 2, 2, 2, 2, 0, 3
    ]

    this.reelStrip3 = [
      2, 4, 1, 3, 1, 2, 5, 0, 4, 4, 4, 4, 2, 7, 6, 10, 3, 8, 7, 2, 9, 5, 5, 5, 5, 0, 4, 2, 7, 6, 6, 6, 6, 3, 8, 7, 7, 7, 7, 5, 3, 1, 0, 5, 8, 3, 3, 3, 3, 6, 1, 1, 1, 1, 2, 9, 9, 9, 9, 9, 5, 10, 0, 4, 2, 7, 6, 3, 8, 8, 8, 8, 7, 8, 2, 8, 4, 2, 6, 8, 4, 2, 1, 0, 6, 3, 3, 3, 3, 4, 1, 0, 2, 5, 1, 4, 2, 7, 6, 3, 8, 10, 10, 10, 10, 7, 8, 2, 2, 2, 2, 0, 3
    ]

    this.reelStrip4 = [
      2, 4, 1, 3, 1, 2, 5, 0, 4, 4, 4, 4, 2, 7, 6, 10, 3, 8, 7, 2, 9, 5, 5, 5, 5, 0, 4, 2, 7, 6, 6, 6, 6, 3, 8, 7, 7, 7, 7, 5, 3, 1, 0, 5, 8, 3, 3, 3, 3, 6, 1, 1, 1, 1, 2, 9, 9, 9, 9, 9, 5, 10, 0, 4, 2, 7, 6, 3, 8, 8, 8, 8, 7, 8, 2, 8, 4, 2, 6, 8, 4, 2, 1, 0, 6, 3, 3, 3, 3, 4, 1, 0, 2, 5, 1, 4, 2, 7, 6, 3, 8, 10, 10, 10, 10, 7, 8, 2, 2, 2, 2, 0, 3
    ]

    this.reelStrip5 = [
      2, 4, 1, 3, 1, 2, 5, 0, 4, 4, 4, 4, 2, 7, 6, 10, 3, 8, 7, 2, 9, 5, 5, 5, 5, 0, 4, 2, 7, 6, 6, 6, 6, 3, 8, 7, 7, 7, 7, 5, 3, 1, 0, 5, 8, 3, 3, 3, 3, 6, 1, 1, 1, 1, 2, 9, 9, 9, 9, 9, 5, 10, 0, 4, 2, 7, 6, 3, 8, 8, 8, 8, 7, 8, 2, 8, 4, 2, 6, 8, 4, 2, 1, 0, 6, 3, 3, 3, 3, 4, 1, 0, 2, 5, 1, 4, 2, 7, 6, 3, 8, 10, 10, 10, 10, 7, 8, 2, 2, 2, 2, 0, 3
    ]
  }

  // Get random reel positions for a spin (4 rows visible)
  getRandomReelPositions(): {
    reel1: number[]
    reel2: number[]
    reel3: number[]
    reel4: number[]
    reel5: number[]
  } {
    const pos1 = Math.floor(Math.random() * (this.reelStrip1.length - 4))
    const pos2 = Math.floor(Math.random() * (this.reelStrip2.length - 4))
    const pos3 = Math.floor(Math.random() * (this.reelStrip3.length - 4))
    const pos4 = Math.floor(Math.random() * (this.reelStrip4.length - 4))
    const pos5 = Math.floor(Math.random() * (this.reelStrip5.length - 4))

    return {
      reel1: [
        this.reelStrip1[pos1],
        this.reelStrip1[pos1 + 1],
        this.reelStrip1[pos1 + 2],
        this.reelStrip1[pos1 + 3]
      ],
      reel2: [
        this.reelStrip2[pos2],
        this.reelStrip2[pos2 + 1],
        this.reelStrip2[pos2 + 2],
        this.reelStrip2[pos2 + 3]
      ],
      reel3: [
        this.reelStrip3[pos3],
        this.reelStrip3[pos3 + 1],
        this.reelStrip3[pos3 + 2],
        this.reelStrip3[pos3 + 3]
      ],
      reel4: [
        this.reelStrip4[pos4],
        this.reelStrip4[pos4 + 1],
        this.reelStrip4[pos4 + 2],
        this.reelStrip4[pos4 + 3]
      ],
      reel5: [
        this.reelStrip5[pos5],
        this.reelStrip5[pos5 + 1],
        this.reelStrip5[pos5 + 2],
        this.reelStrip5[pos5 + 3]
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
        this.reelStrip1[pos1 + 2],
        this.reelStrip1[pos1 + 3]
      ],
      reel2: [
        this.reelStrip2[pos2],
        this.reelStrip2[pos2 + 1],
        this.reelStrip2[pos2 + 2],
        this.reelStrip2[pos2 + 3]
      ],
      reel3: [
        this.reelStrip3[pos3],
        this.reelStrip3[pos3 + 1],
        this.reelStrip3[pos3 + 2],
        this.reelStrip3[pos3 + 3]
      ],
      reel4: [
        this.reelStrip4[pos4],
        this.reelStrip4[pos4 + 1],
        this.reelStrip4[pos4 + 2],
        this.reelStrip4[pos4 + 3]
      ],
      reel5: [
        this.reelStrip5[pos5],
        this.reelStrip5[pos5 + 1],
        this.reelStrip5[pos5 + 2],
        this.reelStrip5[pos5 + 3]
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
      // Try to get scatter symbols for bonus
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
    // CloverStonesNG doesn't have traditional scatters, but we can create bonus scenarios
    // For now, return random positions
    return this.getRandomReelPositions()
  }

  private getWinningReelPositions(): {
    reel1: number[]
    reel2: number[]
    reel3: number[]
    reel4: number[]
    reel5: number[]
  } {
    // Try to align some high-value symbols
    const highValueSymbols = [0, 1, 2, 3] // Wild and high-value symbols
    const targetSymbol = highValueSymbols[Math.floor(Math.random() * highValueSymbols.length)]
    
    const positions1 = this.findSymbolPositions(this.reelStrip1, targetSymbol)
    const positions2 = this.findSymbolPositions(this.reelStrip2, targetSymbol)
    const positions3 = this.findSymbolPositions(this.reelStrip3, targetSymbol)

    const pos1 = positions1.length > 0 ? positions1[Math.floor(Math.random() * positions1.length)] : Math.floor(Math.random() * (this.reelStrip1.length - 4))
    const pos2 = positions2.length > 0 ? positions2[Math.floor(Math.random() * positions2.length)] : Math.floor(Math.random() * (this.reelStrip2.length - 4))
    const pos3 = positions3.length > 0 ? positions3[Math.floor(Math.random() * positions3.length)] : Math.floor(Math.random() * (this.reelStrip3.length - 4))

    return this.getReelPositions(pos1, pos2, pos3,
      Math.floor(Math.random() * (this.reelStrip4.length - 4)),
      Math.floor(Math.random() * (this.reelStrip5.length - 4))
    )
  }

  private findSymbolPositions(reelStrip: number[], symbol: number): number[] {
    const positions: number[] = []
    for (let i = 0; i < reelStrip.length - 3; i++) {
      if (reelStrip[i] === symbol || reelStrip[i + 1] === symbol || reelStrip[i + 2] === symbol || reelStrip[i + 3] === symbol) {
        positions.push(i)
      }
    }
    return positions
  }

  // Offset reels for cascading wins (CloverStonesNG specific feature)
  offsetReels(reels: any): {
    reel1: number[]
    reel2: number[]
    reel3: number[]
    reel4: number[]
    reel5: number[]
  } {
    const newReels: any = {
      reel1: [],
      reel2: [],
      reel3: [],
      reel4: [],
      reel5: []
    }

    // Remove winning symbols (marked as -1) and shift remaining symbols down
    for (let r = 1; r <= 5; r++) {
      for (let p = 3; p >= 0; p--) {
        if (reels[`reel${r}`][p] !== -1) {
          newReels[`reel${r}`].unshift(reels[`reel${r}`][p])
        }
      }
    }

    // Fill empty positions with new random symbols
    for (let r = 1; r <= 5; r++) {
      while (newReels[`reel${r}`].length < 4) {
        newReels[`reel${r}`].unshift(Math.floor(Math.random() * 11)) // 0-10 symbols
      }
    }

    return newReels
  }
}
