import { $ } from 'bun'
import path from 'path'

export interface PHPExecutionResult {
  success: boolean
  output: string
  error?: string
  exitCode?: number
}

export class PHPExecutor {
  private phpPath: string
  private workingDirectory: string

  constructor() {
    this.phpPath = 'php' // Assumes PHP is in PATH
    this.workingDirectory = process.cwd()
  }

  /**
   * Execute a PHP file with POST data
   */
  async executePhpFile(
    phpFilePath: string,
    postData: any = {},
    sessionId?: string,
    cookie?: string
  ): Promise<PHPExecutionResult> {
    try {
      const absolutePhpPath = path.resolve(this.workingDirectory, phpFilePath)
      console.log(absolutePhpPath)
      // Prepare environment variables to simulate HTTP request
      const env = {
        ...process.env,
        REQUEST_METHOD: 'POST',
        CONTENT_TYPE: 'application/json',
        HTTP_COOKIE: cookie || '',
        QUERY_STRING: sessionId ? `sessionId=${sessionId}` : '',
        REQUEST_URI: phpFilePath,
        SERVER_NAME: 'localhost',
        SERVER_PORT: '3000',
        SCRIPT_NAME: phpFilePath,
        SCRIPT_FILENAME: absolutePhpPath,
      }

      // Convert POST data to JSON for php://input
      const jsonData = JSON.stringify(postData)
      console.log(jsonData)
      console.log(this.phpPath)
      console.log(absolutePhpPath)

      // Execute PHP with the JSON data as stdin
      const result = await $`echo ${jsonData} | ${this.phpPath} ${absolutePhpPath}`.env(env).quiet()
      console.log(result)
      console.log(result.stdout.toString())
      console.log(result.stderr.toString())
      // console.log(result.json())
      console.log(result.text())
      Object.entries(result).forEach(([key, value]) => {
        console.log(`${key}: ${value}`)
      })
      return {
        success: result.exitCode === 0,
        output: result.stdout.toString(),
        error: result.stderr.toString() || undefined,
        exitCode: result.exitCode,
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        exitCode: -1,
      }
    }
  }

  /**
   * Execute CloverStonesNG PHP server
   */
  async executeCloverStonesNG(
    gameData: any,
    sessionId: string,
    gameName: string,
    cookie?: string
  ): Promise<PHPExecutionResult> {
    const phpFile = 'src/phpfiles/Games/CloverStonesNG/Server.php'
    console.log(phpFile)
    // Prepare the request data in the format expected by the PHP server
    const requestData = {
      gameData,
      sessionId,
      gameName,
      cookie: cookie || '',
    }

    return this.executePhpFile(phpFile, requestData, sessionId, cookie)
  }

  /**
   * Execute any game's PHP server
   */
  async executeGameServer(
    gameName: string,
    gameData: any,
    sessionId: string,
    cookie?: string
  ): Promise<PHPExecutionResult> {
    const phpFile = `src/phpfiles/Games/${gameName}/Server.php`

    const requestData = {
      gameData,
      sessionId,
      gameName,
      cookie: cookie || '',
    }

    return this.executePhpFile(phpFile, requestData, sessionId, cookie)
  }

  /**
   * Check if PHP is available
   */
  async checkPhpAvailability(): Promise<boolean> {
    try {
      const result = await $`${this.phpPath} --version`.quiet()
      return result.exitCode === 0
    } catch {
      return false
    }
  }

  /**
   * Get PHP version
   */
  async getPhpVersion(): Promise<string | null> {
    try {
      const result = await $`${this.phpPath} --version`.quiet()
      if (result.exitCode === 0) {
        const output = result.stdout.toString()
        const match = output.match(/PHP (\d+\.\d+\.\d+)/)
        return match ? match[1] : null
      }
      return null
    } catch {
      return null
    }
  }
}

// Singleton instance
export const phpExecutor = new PHPExecutor()
