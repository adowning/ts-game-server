import { ConnectionInfo } from '../types/websocket'

export class ConnectionManager {
  private connections: Map<string, ConnectionInfo> = new Map()
  private userConnections: Map<number, string[]> = new Map()
  private gameConnections: Map<string, string[]> = new Map()

  public addConnection(ws: any, sessionId?: string, gameName?: string, userId?: number): string {
    const connectionId = this.generateConnectionId()

    const connectionInfo: ConnectionInfo = {
      id: connectionId,
      ws,
      sessionId,
      gameName,
      userId,
      lastActivity: Date.now(),
    }

    this.connections.set(connectionId, connectionInfo)

    // Index by user
    if (userId) {
      if (!this.userConnections.has(userId)) {
        this.userConnections.set(userId, [])
      }
      this.userConnections.get(userId)!.push(connectionId)
    }

    // Index by game
    if (gameName) {
      if (!this.gameConnections.has(gameName)) {
        this.gameConnections.set(gameName, [])
      }
      this.gameConnections.get(gameName)!.push(connectionId)
    }

    console.log(`Connection added: ${connectionId}, Total: ${this.connections.size}`)
    return connectionId
  }

  public removeConnection(ws: any): void {
    let connectionId: string | null = null

    // Find connection by WebSocket instance
    for (const [id, info] of this.connections.entries()) {
      if (info.ws === ws) {
        connectionId = id
        break
      }
    }

    if (!connectionId) return

    const connectionInfo = this.connections.get(connectionId)
    if (!connectionInfo) return

    // Remove from main connections
    this.connections.delete(connectionId)

    // Remove from user index
    if (connectionInfo.userId) {
      const userConns = this.userConnections.get(connectionInfo.userId)
      if (userConns) {
        const index = userConns.indexOf(connectionId)
        if (index > -1) {
          userConns.splice(index, 1)
        }
        if (userConns.length === 0) {
          this.userConnections.delete(connectionInfo.userId)
        }
      }
    }

    // Remove from game index
    if (connectionInfo.gameName) {
      const gameConns = this.gameConnections.get(connectionInfo.gameName)
      if (gameConns) {
        const index = gameConns.indexOf(connectionId)
        if (index > -1) {
          gameConns.splice(index, 1)
        }
        if (gameConns.length === 0) {
          this.gameConnections.delete(connectionInfo.gameName)
        }
      }
    }

    console.log(`Connection removed: ${connectionId}, Total: ${this.connections.size}`)
  }

  public getConnection(connectionId: string): ConnectionInfo | undefined {
    return this.connections.get(connectionId)
  }

  public updateConnection(connectionId: string, updates: Partial<ConnectionInfo>): void {
    const connection = this.connections.get(connectionId)
    if (connection) {
      Object.assign(connection, updates)
      connection.lastActivity = Date.now()
    }
  }

  public getUserConnections(userId: number): ConnectionInfo[] {
    const connectionIds = this.userConnections.get(userId) || []
    return connectionIds
      .map((id) => this.connections.get(id))
      .filter((conn): conn is ConnectionInfo => conn !== undefined)
  }

  public getGameConnections(gameName: string): ConnectionInfo[] {
    const connectionIds = this.gameConnections.get(gameName) || []
    return connectionIds
      .map((id) => this.connections.get(id))
      .filter((conn): conn is ConnectionInfo => conn !== undefined)
  }

  public broadcastToUser(userId: number, message: string): void {
    const connections = this.getUserConnections(userId)
    connections.forEach((conn) => {
      try {
        conn.ws.send(message)
      } catch (error) {
        console.error(`Error sending message to user ${userId}:`, error)
        this.removeConnection(conn.ws)
      }
    })
  }

  public broadcastToGame(gameName: string, message: string): void {
    const connections = this.getGameConnections(gameName)
    connections.forEach((conn) => {
      try {
        conn.ws.send(message)
      } catch (error) {
        console.error(`Error sending message to game ${gameName}:`, error)
        this.removeConnection(conn.ws)
      }
    })
  }

  public broadcastToAll(message: string): void {
    this.connections.forEach((conn) => {
      try {
        conn.ws.send(message)
      } catch (error) {
        console.error('Error broadcasting message:', error)
        this.removeConnection(conn.ws)
      }
    })
  }

  public cleanupInactiveConnections(timeoutMs: number = 300000): void {
    // 5 minutes
    const now = Date.now()
    const toRemove: string[] = []

    this.connections.forEach((conn, id) => {
      if (now - conn.lastActivity > timeoutMs) {
        toRemove.push(id)
      }
    })

    toRemove.forEach((id) => {
      const conn = this.connections.get(id)
      if (conn) {
        try {
          conn.ws.close()
        } catch (error) {
          console.error('Error closing inactive connection:', error)
        }
        this.removeConnection(conn.ws)
      }
    })

    if (toRemove.length > 0) {
      console.log(`Cleaned up ${toRemove.length} inactive connections`)
    }
  }

  public getStats(): any {
    return {
      totalConnections: this.connections.size,
      userConnections: this.userConnections.size,
      gameConnections: this.gameConnections.size,
      connectionsByGame: Object.fromEntries(
        Array.from(this.gameConnections.entries()).map(([game, conns]) => [game, conns.length])
      ),
    }
  }

  private generateConnectionId(): string {
    return `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Start cleanup interval
  public startCleanupInterval(intervalMs: number = 60000): void {
    // 1 minute
    setInterval(() => {
      this.cleanupInactiveConnections()
    }, intervalMs)
  }
}
