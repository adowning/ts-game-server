// parse_all_games.js
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process') // Using spawnSync for simplicity in a build-like script

/**
 * List of games to parse.
 * Each object should have:
 * - name: The game's unique identifier (e.g., CloverStonesNG, ZenZenCashNG),
 * which should also match the namespace part and potentially a folder name.
 * - slotSettingsPath: Relative or absolute path to the game's main SlotSettings.php file.
 * - gameReelPath: (Optional) Relative or absolute path to the game's GameReel.php file if it's separate.
 * - reelsTxtPath: (Optional) Relative or absolute path to the game's reels.txt file.
 * - configPath: (Optional) Relative or absolute path to a game-specific Config.php if used by its standalone SlotSettings.
 */
const gamesToParse = [
  {
    name: 'CloverStonesNG',
    // Assuming all necessary PHP files for CloverStonesNG (SlotSettings.php, GameReel.php, Config.php)
    // and reels.txt are in this directory or can be found by the PHP exporter
    // relative to SlotSettings.php using __DIR__.
    basePath: './src/phpfiles/Games/CloverStonesNG', // Path to the game's directory
  },
  // Example for another game (you would need to prepare its files similarly)
  // {
  //     name: 'ZenZenCashNG',
  //     basePath: './src/games/ZenZenCashNG'
  // },
  // Add other game configurations here
]

// Path to your PHP exporter script (we'll create this next)
const phpExporterScriptPath = path.resolve(__dirname, 'helper.php')
const phpExecutable = 'php' // Or specify the full path to your PHP executable

const allGamesMasterConfig = {}

function main() {
  if (!fs.existsSync(phpExporterScriptPath)) {
    console.error(`PHP Exporter script not found at: ${phpExporterScriptPath}`)
    console.error('Please create this script (see documentation/next step).')
    return
  }

  for (const gameInfo of gamesToParse) {
    console.log(`\nAttempting to parse configuration for game: ${gameInfo.name}...`)
    console.log(`Using game base path: ${path.resolve(__dirname, gameInfo.basePath)}`)

    // Arguments to pass to the PHP exporter script:
    // 1. Game Name (used for namespacing and potentially locating files)
    // 2. Base Path to the game's files (where SlotSettings.php, etc., reside)
    const args = [
      phpExporterScriptPath, // The script to execute
      gameInfo.name,
      path.resolve(__dirname, gameInfo.basePath), // Absolute path to the game's directory
    ]

    const phpProcess = spawnSync(phpExecutable, args, {
      encoding: 'utf-8',
      timeout: 15000, // 15 seconds timeout per game
      // cwd: path.dirname(phpExporterScriptPath) // Run exporter from its own directory
      // OR run from project root if paths are relative to that
    })

    if (phpProcess.error) {
      console.error(`[${gameInfo.name}] Error spawning PHP process:`, phpProcess.error.message)
      allGamesMasterConfig[gameInfo.name] = {
        error: `Spawning PHP failed: ${phpProcess.error.message}`,
      }
      continue
    }

    if (phpProcess.stderr) {
      // Log stderr, but don't necessarily treat it as a fatal error for parsing stdout,
      // as PHP warnings/notices go to stderr.
      console.warn(`[${gameInfo.name}] PHP STDERR:\n${phpProcess.stderr.trim()}`)
    }

    if (phpProcess.status !== 0 && !phpProcess.stdout) {
      console.error(
        `[${gameInfo.name}] PHP script exited with code ${phpProcess.status} and no STDOUT. Check STDERR above.`
      )
      allGamesMasterConfig[gameInfo.name] = {
        error: `PHP script error (code ${phpProcess.status})`,
        stderr: phpProcess.stderr.trim(),
      }
      continue
    }

    const output = phpProcess.stdout.trim()
    if (!output) {
      console.error(
        `[${gameInfo.name}] PHP script produced no STDOUT. Exit code: ${phpProcess.status}. Check STDERR.`
      )
      allGamesMasterConfig[gameInfo.name] = {
        error: `PHP script produced no STDOUT (code ${phpProcess.status})`,
        stderr: phpProcess.stderr.trim(),
      }
      continue
    }

    try {
      // Find the start of the JSON (in case of preceding debug echos from PHP)
      const jsonStartIndex = output.indexOf('{')
      if (jsonStartIndex === -1) {
        throw new Error('No JSON object found in PHP output.')
      }
      const jsonString = output.substring(jsonStartIndex)
      const gameConfig = JSON.parse(jsonString)

      if (gameConfig.error) {
        console.error(`[${gameInfo.name}] Error reported by PHP exporter:`, gameConfig.error)
        if (gameConfig.details) console.error(`[${gameInfo.name}] Details:`, gameConfig.details)
        allGamesMasterConfig[gameInfo.name] = gameConfig // Store the error object
      } else {
        allGamesMasterConfig[gameInfo.name] = gameConfig
        console.log(`[${gameInfo.name}] Successfully parsed and extracted configuration.`)
      }
    } catch (e) {
      console.error(`[${gameInfo.name}] Error parsing JSON output from PHP:`, e.message)
      console.error(`[${gameInfo.name}] Raw PHP STDOUT that caused error:\n---\n${output}\n---`)
      allGamesMasterConfig[gameInfo.name] = {
        error: 'JSON_PARSE_ERROR',
        message: e.message,
        raw_output: output,
      }
    }
  }

  const outputFilePath = path.resolve(__dirname, 'all_games_configurations.json')
  try {
    fs.writeFileSync(outputFilePath, JSON.stringify(allGamesMasterConfig, null, 2))
    console.log(`\nAll processed game configurations saved to: ${outputFilePath}`)
  } catch (e) {
    console.error('Error writing final JSON configuration file:', e)
  }
}

main().catch((e) => {
  console.error('Unhandled error in main execution:', e)
})
