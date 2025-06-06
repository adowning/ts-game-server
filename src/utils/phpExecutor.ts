import { $ } from 'bun'
import path from 'path'

export interface PHPExecutionResult {
  success: boolean
  output: string // This will be the JSON string from the refactored PHP server
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
   * Execute a PHP file with a data bundle via stdin
   */
  async executePhpFile(
    phpFilePath: string,
    dataBundle: any = {} // This bundle is directly passed as JSON
  ): Promise<PHPExecutionResult> {
    try {
      const absolutePhpPath = path.resolve(this.workingDirectory, phpFilePath)

      // Environment variables might still be useful for PHP's context,
      // though Server_refactored.php primarily uses the input bundle.
      const env = {
        ...process.env,
        REQUEST_METHOD: 'POST', // Still good practice to set
        CONTENT_TYPE: 'application/json', // Standard for JSON input
        // Other CGI-like variables can be set if needed by any underlying PHP functions
        // SCRIPT_NAME, SCRIPT_FILENAME etc. are usually set by web server context
        // For CLI execution, their relevance is minimal unless script specifically checks them.
      }

      const jsonData = JSON.stringify(dataBundle)

      // Bun's $`` handles piping and command execution elegantly.
      // Ensure jsonData is properly escaped if it were part of the command string itself,
      // but for stdin, it's passed as is.
      const command = [`echo '${jsonData}'`, '|', this.phpPath, absolutePhpPath];
      const result = await $(command.join(' ')).env(env).quiet()

      return {
        success: result.exitCode === 0,
        output: result.stdout.toString(),
        error: result.stderr.toString() || undefined, // Ensure empty stderr is undefined
        exitCode: result.exitCode,
      }
    } catch (error: any) {
      // Handle cases where the command execution itself fails (e.g., PHP not found)
      // 'error' from Bun's $ execution often includes stdout, stderr, exitCode if process ran but failed.
      // If it's a JS error before process execution, it'll be a standard Error.
      return {
        success: false,
        output: error?.stdout?.toString() || '',
        error: error?.stderr?.toString() || (error instanceof Error ? error.message : 'Unknown error during PHP execution'),
        exitCode: error?.exitCode === undefined ? -1 : error.exitCode,
      }
    }
  }

  /**
   * Execute any game's refactored PHP server
   * @param gameName Name of the game (e.g., AfricanKingNG)
   * @param gameInputBundle The complete data bundle expected by the PHP script
   */
  async executeGameServer(
    gameName: string,
    gameInputBundle: any // This is the GameInputData bundle
  ): Promise<PHPExecutionResult> {
    // Path to the refactored server script
    const phpFile = `phpfiles/Games/${gameName}/Server_refactored.php`;
    // Note: Original used src/phpfiles/... path. Assuming phpfiles is at root now based on task context.
    // If src/ is indeed part of the path, it should be `src/phpfiles/Games/...`

    // The gameInputBundle is passed directly
    return this.executePhpFile(phpFile, gameInputBundle);
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
