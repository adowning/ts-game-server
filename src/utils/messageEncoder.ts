/**
 * Message encoding/decoding utilities based on the existing WebSocket protocol
 * Ported from PTWebSocket/Server.js and PTWebSocket/Slots.js
 */

import destr from 'destr'
import { jsonrepair } from 'jsonrepair'

export function decodeMessage(arrayBuffer: ArrayBuffer): string {
  let result = ''
  let i = 0
  var c = 0
  var c2 = 0
  let c3 = 0

  const data = new Uint8Array(arrayBuffer)

  // If we have a BOM skip it
  if (data.length >= 3 && data[0] === 0xef && data[1] === 0xbb && data[2] === 0xbf) {
    i = 3
  }

  while (i < data.length) {
    c = data[i]

    if (c < 128) {
      result += String.fromCharCode(c)
      i++
    } else if (c > 191 && c < 224) {
      if (i + 1 >= data.length) {
        break // UTF-8 Decode failed. Two byte character was truncated.
      }
      c2 = data[i + 1]
      result += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
      i += 2
    } else {
      if (i + 2 >= data.length) {
        break // UTF-8 Decode failed. Multi byte character was truncated.
      }
      c2 = data[i + 1]
      c3 = data[i + 2]
      result += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
      i += 3
    }
  }
  return result
}

export function encodeMessage(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length * 1) // 1 byte for each char
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

export function hexToArrayBuffer(hex: string): ArrayBuffer {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected input to be a string')
  }

  if (hex.length % 2 !== 0) {
    throw new RangeError('Expected string to be an even number of characters')
  }

  const view = new Uint8Array(Math.round(hex.length / 2))

  for (let i = 0; i < hex.length; i += 2) {
    view[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }

  return view.buffer
}

export function parseWebSocketMessage(message: string): any {
  // Handle the protocol format: "data:::json"
  const parts = message.toString().split(':::')
  let gameData
  // console.log(parts.length)
  if (parts.length < 2) {
    return null
  }

  if (parts[1] != undefined) {
    let a = parts[1].replaceAll('"i_t"', '')
    a = a.replaceAll('"i_l"', '')
    // const simpleCookieMatch = parts[1].match(/"cookie":"([^"]*)"/)
    // console.log(simpleCookieMatch)
    var _gameData = JSON.parse(a)
    gameData = _gameData

    // try {
    //   // gameData = destr(parts[1]) as any
    // } catch (e) {
    //   console.log(e)
    //   return
    // }

    /*---------CQ---------*/

    if (gameData.vals != undefined) {
      if (gameData.irq != undefined) {
        // ws.send('~m~67~m~~j~{"err":0,"irs":1,"vals":[1,-2147483648,2,-503893983],"msg":null}');
        return { type: 'irq', data: gameData }
        return
      }

      gameData = gameData.vals[0]
    }

    /*-----------------------*/

    var originalCookie = gameData.cookie
    var sessionId = gameData.sessionId
    // delete gameData.cookie
    // gameData.cookie = ''

    const gameName = gameData.gameName
    // else{
    //  param={};
    //  ck='';
    // }
    let jsonString = parts[1]

    // PHP-to-TypeScript compatibility fix
    // The original PHP server was more forgiving with malformed JSON
    // We need to handle the cookie field that contains unescaped JSON

    // Strategy: Remove the problematic cookie field entirely
    // The cookie field often contains unescaped JSON which breaks parsing
    // let originalCookie: string | null = null

    // // Try to extract cookie value before removing it (simple case only)
    // if (jsonString) {
    // console.log(gameData.cookie)
    const token = gameData.cookie.split('laravel_session=')[1].split(';')[0]
    // console.log(token)
    const userId = 'cmbk4rnom0000zsmd5vf7mst1'
    // const simpleCookieMatch = gameData.cookie.match(/"cookie":"([^"]*)"/)
    // console.log(simpleCookieMatch)

    // if (simpleCookieMatch && simpleCookieMatch[1] && !simpleCookieMatch[1].includes('{')) {
    //   originalCookie = simpleCookieMatch[1]
    //   console.log(originalCookie)
    // }
    //   // Remove cookie field entirely - handle various problematic formats
    //   // This is more reliable than trying to fix the malformed JSON
    // jsonString = jsonString.replace(/"cookie":"[^"]*"(?:,\s*)?/g, '')
    // jsonString = jsonString.replace(/"cookie":"[^"]*(?:\\.[^"]*)*"(?:,\s*)?/g, '')
    // jsonString = jsonString.replace(/"cookie":"[^"]*\{[^}]*\}[^"]*"(?:,\s*)?/g, '')

    // //   // Clean up any trailing commas that might be left after removing cookie
    // jsonString = jsonString.replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas before } or ]
    // jsonString = jsonString.replace(/([{\[]\s*),/g, '$1') // Remove leading commas after { or [
    // jsonString = jsonString.replace(/,\s*,/g, ',') // Remove double commas
    // }

    // if (!jsonString) {
    //   return null
    // }

    // const jsonData = JSON.parse(jsonString)
    // console.log(jsonData)
    // // Handle CQ protocol (vals array format)
    // if (jsonData.vals !== undefined) {
    //   if (jsonData.irq !== undefined) {
    //     return { type: 'irq', data: jsonData }
    //   }
    //   return jsonData.vals[0]
    // }

    // Handle NG game format with gameData wrapper
    // if (jsonData.gameData) {
    // Extract the main properties and merge with gameData
    // const { gameData, sessionId, gameName } = jsonData
    // console.log({
    //   ...gameData,
    //   sessionId,
    //   gameName,
    //   userId,
    //   action: gameData.gameData.action,
    //   cookie: originalCookie, // Preserve original cookie if needed
    // })
    return {
      ...gameData,
      sessionId,
      gameName,
      userId,
      action: gameData.gameData.action,
      cookie: originalCookie, // Preserve original cookie if needed
    }
  }

  //   return jsonData
  // } catch (error) {
  // Silently handle parsing errors and try fallback methods

  // Fallback: Try to extract just the essential game data
  try {
    const parts = message.toString().split(':::')
    if (parts.length >= 2) {
      let jsonString = parts[1]

      if (!jsonString) {
        return null
      }

      // More aggressive approach: manually extract the gameData object
      const gameDataMatch = jsonString.match(/"gameData":\s*(\{[^}]*\})/s)
      const sessionIdMatch = jsonString.match(/"sessionId":\s*"([^"]*)"/)
      const gameNameMatch = jsonString.match(/"gameName":\s*"([^"]*)"/)

      if (gameDataMatch && gameDataMatch[1]) {
        try {
          const gameData = JSON.parse(gameDataMatch[1])
          return {
            ...gameData,
            sessionId: sessionIdMatch ? sessionIdMatch[1] : null,
            gameName: gameNameMatch ? gameNameMatch[1] : null,
            cookie: 'extracted_fallback',
          }
        } catch (gameDataError) {
          // Silently handle gameData parsing errors
        }
      }

      // Last resort: try to remove cookie entirely and parse
      jsonString = jsonString.replace(/"cookie":"[^"]*(?:\\.[^"]*)*"(?:,\s*)?/g, '')
      jsonString = jsonString.replace(/,(\s*[}\]])/g, '$1') // Clean trailing commas

      const jsonData = JSON.parse(jsonString)

      if (jsonData.gameData) {
        const { gameData, sessionId, gameName } = jsonData
        return {
          ...gameData,
          sessionId,
          gameName,
          cookie: 'removed_fallback',
        }
      }

      return jsonData
    }
  } catch (secondError) {
    // Silently handle all parsing failures
  }

  return null
}

export function createGameResponse(
  action: string,
  result: boolean | string,
  sesId: string | boolean,
  data: any
): string {
  return JSON.stringify({
    action,
    result,
    sesId,
    data,
  })
}

export function createErrorResponse(message: string, responseType: string = ''): string {
  return JSON.stringify({
    responseEvent: 'error',
    responseType,
    serverResponse: message,
  })
}

export function createIRQResponse(): string {
  return '~m~67~m~~j~{"err":0,"irs":1,"vals":[1,-2147483648,2,-503893983],"msg":null}'
}
