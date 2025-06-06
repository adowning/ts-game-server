import { phpExecutor } from '../utils/phpExecutor.ts'
import { createErrorResponse } from '../utils/messageEncoder.ts'
import prisma from '../database/client.ts'
import { Decimal } from '@prisma/client/runtime/binary'

export interface WebSocketMessage {
  gameName?: string
  sessionId?: string
  cookie?: string
  action?: string
  [key: string]: any
}

export interface PlayerWithShop {
  id: number
  username: string
  balance: number
  shop_id: number
  remember_token: string
  shop?: {
    id: number
    currency: string
    percent: number
    max_win: string
  }
}

export class PHPGameHandler {
  /**
   * Process game message using PHP backend
   */
  public async processGameMessage(data: WebSocketMessage): Promise<string> {
    try {
      const { gameName, sessionId, cookie, ...gameData } = data

      if (!gameName) {
        return createErrorResponse('Game name is required')
      }

      // Validate session and get user
      const user = await this.validateSession(sessionId, cookie)
      if (!user) {
        return createErrorResponse('invalid login')
      }

      // Get game configuration
      const game = await prisma.game.findFirst({
        where: {
          name: gameName,
          shop_id: user.shop_id,
        },
        include: { shop: true },
      })

      if (!game || !game.view) {
        return createErrorResponse('Game is disabled')
      }

      // Execute the PHP game server
      const result = await phpExecutor.executeGameServer(
        gameName,
        gameData,
        sessionId || '',
        cookie
      )

      if (!result.success) {
        console.error(`PHP execution failed for ${gameName}:`, result.error)
        return createErrorResponse('Game server error')
      }

      // Parse the PHP response
      let phpResponse = result.output.trim()

      // Handle different response formats from PHP
      if (phpResponse.includes(':::')) {
        // Extract JSON from protocol format
        const parts = phpResponse.split(':::')
        if (parts.length >= 2) {
          phpResponse = parts[1] as string
        }
      }

      // Validate that we have valid JSON
      try {
        JSON.parse(phpResponse)
        return phpResponse
      } catch (parseError) {
        console.error('Invalid JSON response from PHP:', phpResponse)
        return createErrorResponse('Invalid server response')
      }
    } catch (error) {
      console.error('PHP game processing error:', error)
      return createErrorResponse('Internal server error')
    }
  }

  /**
   * Process CloverStonesNG specifically
   */
  public async processCloverStonesNG(data: WebSocketMessage): Promise<string> {
    try {
      const { gameName, sessionId, cookie, ...gameData } = data
      const user: PlayerWithShop = {
        id: 1,
        username: 'test',
        // email: 'test@test.com',
        balance: 100,
        // count_balance: 0,
        shop_id: 1,
        // is_blocked: false,
        // status: 'ACTIVE',
        // address: 0,
        // session: null,
        remember_token: 'null',
        // created_at: new Date(),
        // updated_at: new Date(),
        shop: {
          id: 1,
          // name: 'test',
          currency: 'USD',
          percent: 90,
          max_win: '10000',
          // shop_limit: Decimal(100),
          // created_at: new Date(),
          // updated_at: new Date(),
          // is_blocked: false,
        },
      }
      // Validate session and get user
      // const user = await this.validateSession(sessionId, cookie)
      if (!user) {
        return createErrorResponse('invalid login')
      }

      // Execute CloverStonesNG PHP server
      const result = await phpExecutor.executeCloverStonesNG(
        gameData,
        sessionId || '',
        gameName || 'CloverStonesNG',
        cookie
      )

      if (!result.success) {
        console.error('CloverStonesNG PHP execution failed:', result.error)
        return createErrorResponse('Game server error')
      }

      // Parse and return the response
      let phpResponse = result.output.trim()

      if (phpResponse.includes(':::')) {
        const parts = phpResponse.split(':::')
        if (parts.length >= 2) {
          phpResponse = parts[1] as string
        }
      }

      try {
        JSON.parse(phpResponse)
        return phpResponse
      } catch (parseError) {
        console.error('Invalid JSON response from CloverStonesNG PHP:', phpResponse)
        return createErrorResponse('Invalid server response')
      }
    } catch (error) {
      console.error('CloverStonesNG processing error:', error)
      return createErrorResponse('Internal server error')
    }
  }

  /**
   * Validate session and get user data
   */
  private async validateSession(
    sessionId?: string,
    cookie?: string
  ): Promise<PlayerWithShop | null> {
    if (!sessionId && !cookie) {
      return null
    }

    try {
      let user = null

      if (sessionId) {
        user = await prisma.user.findFirst({
          where: { remember_token: sessionId },
          include: { shop: true },
        })
      }

      // If no user found and we have a cookie, try to parse it
      if (!user && cookie) {
        // For now, fall back to test user
        user = await prisma.user.findFirst({
          where: { username: 'testuser' },
          include: { shop: true },
        })
      }

      return user as unknown as PlayerWithShop
    } catch (error) {
      console.error('Session validation error:', error)
      return null
    }
  }

  /**
   * Check if PHP backend is available
   */
  public async checkPHPAvailability(): Promise<boolean> {
    return await phpExecutor.checkPhpAvailability()
  }

  /**
   * Get PHP version info
   */
  public async getPHPVersion(): Promise<string | null> {
    return await phpExecutor.getPhpVersion()
  }
}
