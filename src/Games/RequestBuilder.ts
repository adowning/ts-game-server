// src/Games/RequestBuilder.ts
import { spawn } from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import prisma from '../prisma' // Assuming prisma client is here

// Interfaces for request and response structures
// These should align with what your PHP server expects and returns,
// and also with your Prisma User model for session data.

export interface JackpotState {
  id: string
  balance: number
  percent?: number
  gameName?: string // Useful for associating jackpots with games
}

export interface GameRequestPayload {
  coin?: number
  bet?: number
  index?: number // For PickBonusItem, etc.
  // Add other action-specific fields as needed
}

export interface GameRequestStructure {
  action: string
  userId: string
  gameName: string
  currentBalance: number // User's main currency balance
  currentSessionData: Record<string, any> // Corresponds to sessionDataJson in Prisma (game-specific session state)
  currentStaticData: Record<string, any> // Corresponds to persistentGameDataJson in Prisma
  jackpotData: JackpotState[] // Corresponds to jackpotStateJson in Prisma
  currentBank?: number // Derived from currentSessionData (e.g., CloverStonesNGBank)
  requestPayload?: GameRequestPayload
}

export interface ServerResponse {
  action: string
  result: 'true' | 'false' | boolean
  sesId?: string
  serverResponse?: any
  data?: any
  newBalance?: number
  newSessionData?: Record<string, any>
  newStaticData?: Record<string, any>
  newJackpotData?: JackpotState[]
  newBank?: number // This will be used to update the game-specific bank in sessionDataJson
  // Error fields
  responseEvent?: string
  responseType?: string
  message?: string
  file?: string
  line?: number
}

function buildGameRequestObject(
  action: string,
  userId: string,
  gameName: string,
  currentBalance: number,
  currentSessionData: Record<string, any>, // This will include the game-specific bank
  currentStaticData: Record<string, any>,
  jackpotData: JackpotState[],
  // currentBank is now expected to be part of currentSessionData or handled internally by PHP
  requestPayload?: GameRequestPayload
): GameRequestStructure {
  // Extract game-specific bank from currentSessionData if it exists
  const gameBankKey = `${gameName}Bank`
  const currentBank = currentSessionData[gameBankKey] || 0

  const request: GameRequestStructure = {
    action,
    userId,
    gameName,
    currentBalance,
    currentSessionData,
    currentStaticData,
    jackpotData,
    currentBank: Number(currentBank) || 0, // Ensure it's a number
    requestPayload,
  }
  return request
}

async function executePhpCommand(
  phpScriptPath: string, // Absolute path to the Server.php for the specific game
  requestObject: GameRequestStructure
): Promise<ServerResponse> {
  return new Promise((resolve, reject) => {
    const phpExecutable = 'php'
    const scriptDir = path.dirname(phpScriptPath)
    const scriptFile = path.basename(phpScriptPath)

    // console.log(`[RequestBuilder] Executing PHP: ${phpExecutable} ${scriptFile} in ${scriptDir}`)
    console.log(
      `[RequestBuilder] Sending to PHP:`,
      JSON.stringify(requestObject, null, 2).substring(0, 500) + '...'
    )

    const phpProcess = spawn(
      phpExecutable,
      [
        '-d',
        'display_errors=stderr',
        '-d',
        'error_reporting=E_ALL', // Report all errors and warnings
        scriptFile,
      ],
      {
        cwd: scriptDir,
        env: { ...process.env },
      }
    )

    let stdoutData = ''
    let stderrData = ''

    phpProcess.stdout.on('data', (data) => {
      stdoutData += data.toString()
    })

    phpProcess.stderr.on('data', (data) => {
      stderrData += data.toString()
      // Log PHP warnings/errors immediately from PHP's stderr
      console.warn(
        `[RequestBuilder] PHP STDERR for ${requestObject.gameName} (${
          requestObject.action
        }):\n${data.toString()}`
      )
    })

    phpProcess.on('error', (error) => {
      console.error(
        `[RequestBuilder] Failed to start PHP process for ${requestObject.gameName}: ${error.message}`
      )
      reject(new Error(`PHP process spawn error: ${error.message}`))
    })

    phpProcess.on('close', (code) => {
      // console.log(
      //   `[RequestBuilder] PHP process for ${requestObject.gameName} closed with code ${code}.`
      // )
      // console.log(
      //   `[RequestBuilder] PHP STDOUT (raw, first 500 chars): ${stdoutData.substring(0, 500)}...`
      // )
      if (stderrData) {
        console.warn(`[RequestBuilder] PHP STDERR (full): ${stderrData}`)
      }

      if (code !== 0 && stdoutData.trim() === '' && stderrData.includes('Fatal error')) {
        console.error(`[RequestBuilder] PHP script exited with code ${code} due to Fatal Error.`)
        reject(
          new Error(
            `PHP script execution failed with code ${code}. Fatal Error: ${stderrData.substring(
              0,
              500
            )}...`
          )
        )
        return
      }
      if (code !== 0 && stdoutData.trim() === '') {
        console.error(`[RequestBuilder] PHP script exited with code ${code} and no STDOUT.`)
        reject(
          new Error(
            `PHP script exited with code ${code}. Error: ${
              stderrData || 'Unknown PHP error, no stdout.'
            }`
          )
        )
        return
      }

      try {
        let responseToParse = stdoutData
        const jsonStart = stdoutData.indexOf('{')
        const jsonEnd = stdoutData.lastIndexOf('}')

        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          responseToParse = stdoutData.substring(jsonStart, jsonEnd + 1)
        } else if (!stdoutData.trim().startsWith('{') || !stdoutData.trim().endsWith('}')) {
          if (code !== 0 || stderrData.trim() !== '') {
            console.error(`[RequestBuilder] PHP script non-JSON output with code ${code}.`)
            reject(
              new Error(
                `PHP script returned non-JSON output. Code: ${code}. Output: ${stdoutData.substring(
                  0,
                  200
                )}... STDERR: ${stderrData.substring(0, 200)}...`
              )
            )
            return
          }
        }

        const parsedResponse: ServerResponse = JSON.parse(responseToParse)
        if (
          parsedResponse.responseEvent === 'error' ||
          String(parsedResponse.result).toLowerCase() === 'false'
        ) {
          console.warn(
            `[RequestBuilder] PHP script for ${requestObject.gameName} returned an application error:`,
            parsedResponse
          )
        }
        resolve(parsedResponse)
      } catch (parseError: any) {
        console.error(
          `[RequestBuilder] Failed to parse PHP response JSON for ${requestObject.gameName}.`
        )
        console.error(`[RequestBuilder] Parse error:`, parseError)
        reject(
          new Error(
            `Failed to parse PHP JSON response: ${
              parseError.message
            }. Raw output: ${stdoutData.substring(0, 200)}...`
          )
        )
      }
    })

    try {
      const requestJsonString = JSON.stringify(requestObject)
      phpProcess.stdin.write(requestJsonString)
      phpProcess.stdin.end()
    } catch (stringifyError: any) {
      console.error(
        `[RequestBuilder] Failed to stringify request object for ${requestObject.gameName}:`,
        stringifyError
      )
      phpProcess.kill()
      reject(new Error(`Failed to stringify request for PHP: ${stringifyError.message}`))
    }
  })
}

/**
 * Main function to process a game request.
 * It fetches user data, calls the PHP backend, and updates user data.
 */
export async function processGameRequest(
  userId: string,
  gameName: string,
  action: string,
  payload?: GameRequestPayload
): Promise<ServerResponse | { error: string; details?: any }> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      console.error(`[RequestBuilder] User not found: ${userId}`)
      return { error: 'User not found' }
    }

    // Prepare data from Prisma model for the PHP script
    const currentBalance = user.balance
    // Ensure JSON fields are parsed if they are strings, or used directly if already objects
    const currentSessionData =
      typeof user.sessionDataJson === 'string'
        ? JSON.parse(user.sessionDataJson || '{}')
        : user.sessionDataJson || {}
    const currentStaticData =
      typeof user.persistentGameDataJson === 'string'
        ? JSON.parse(user.persistentGameDataJson || '{}')
        : user.persistentGameDataJson || {}
    const jackpotData =
      typeof user.jackpotStateJson === 'string'
        ? JSON.parse(user.jackpotStateJson || '[]')
        : user.jackpotStateJson || []

    // Path to the game-specific Server.php (adjust this logic as needed)
    // This assumes a directory structure like ./src/games/[GameName]/Server.php
    // relative to the project root where this script is eventually run from.
    const phpScriptPath = path.resolve(process.cwd(), 'src', 'Games', gameName, 'Server.php')
    // console.log(`[RequestBuilder] Resolved PHP Script Path for ${gameName}: ${phpScriptPath}`)

    if (!fs.existsSync(phpScriptPath)) {
      console.error(
        `[RequestBuilder] PHP Server script not found for game ${gameName} at ${phpScriptPath}`
      )
      return { error: `Server script for game ${gameName} not found.` }
    }

    const requestObject = buildGameRequestObject(
      action,
      userId,
      gameName,
      Number(currentBalance),
      currentSessionData,
      currentStaticData,
      jackpotData,
      payload
    )

    const phpResponse = await executePhpCommand(phpScriptPath, requestObject)

    // Update user data based on the response from PHP
    let updatedSessionData = phpResponse.newSessionData || currentSessionData
    const gameBankKey = `${gameName}Bank`

    if (phpResponse.newBank !== undefined) {
      updatedSessionData = {
        ...updatedSessionData,
        [gameBankKey]: phpResponse.newBank,
      }
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        balance:
          phpResponse.newBalance !== undefined ? Number(phpResponse.newBalance) : currentBalance,
        sessionDataJson: updatedSessionData,
        persistentGameDataJson: phpResponse.newStaticData || currentStaticData,
        jackpotStateJson: phpResponse.newJackpotData || jackpotData,
      },
    })
    // console.log(
    //   `[RequestBuilder] User ${userId} data updated for game ${gameName} after action ${action}.`
    // )

    return phpResponse
  } catch (error: any) {
    console.error(
      `[RequestBuilder] Error in processGameRequest for ${gameName} (${action}):`,
      error
    )
    return {
      error: `Failed to process game request: ${error.message}`,
      details: error.stack,
    }
  }
}
