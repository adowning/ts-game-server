<?php
// export_game_config_utility.php

// Basic error reporting for CLI
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

if ($argc < 3) {
    echo json_encode(['error' => 'Missing arguments: Game Name and Game Base Path are required.', 'usage' => 'php export_game_config_utility.php <GameName> <PathToGameDirectory>']);
    exit(1);
}

$gameName = $argv[1]; // e.g., CloverStonesNG
$gameBasePath = rtrim($argv[2], '/\\'); // e.g., /path/to/project/src/games/CloverStonesNG

if (!is_dir($gameBasePath)) {
    echo json_encode(['error' => "Game base path not found or is not a directory: {$gameBasePath}"]);
    exit(1);
}

// Define the namespace based on the game name (adjust if your namespacing is different)
$gameNamespace = 'VanguardLTE\\Games\\' . $gameName;
$slotSettingsClass = $gameNamespace . '\\SlotSettings';
$configClass = $gameNamespace . '\\Config';
$gameReelClass = $gameNamespace . '\\GameReel'; // Assuming GameReel is also namespaced

// --- Simple Autoloader for this script's context ---
// It assumes SlotSettings.php, Config.php, GameReel.php are directly within $gameBasePath
spl_autoload_register(function ($class) use ($gameNamespace, $gameBasePath) {
    if (strpos($class, $gameNamespace . '\\') === 0) {
        $relativeClass = str_replace($gameNamespace . '\\', '', $class);
        $file = $gameBasePath . '/' . str_replace('\\', '/', $relativeClass) . '.php';
        if (file_exists($file)) {
            require_once $file;
            return true;
        }
    }
    return false;
});
// --- End Autoloader ---

// Manually try to include files if autoloader might not catch them or for precedence
$filesToInclude = [
    $gameBasePath . '/Config.php',       // Load Config first if it exists
    $gameBasePath . '/GameReel.php',     // Then GameReel
    $gameBasePath . '/SlotSettings.php'  // Finally SlotSettings
];
foreach($filesToInclude as $file) {
    if (file_exists($file)) {
        require_once $file;
    }
}


if (!class_exists($slotSettingsClass, false)) { // `false` to not trigger autoload here, rely on above includes
    echo json_encode(['error' => "SlotSettings class '{$slotSettingsClass}' not found after attempting to include from {$gameBasePath}/SlotSettings.php"]);
    exit(1);
}

try {
    // For standalone SlotSettings, we need to prepare dummy/default state & config
    // These are needed for the constructor of the refactored CloverStonesNG/SlotSettings
    $dummyPlayerState = ['currentBalance' => 0];
    $dummyGameState = [
        'currentSessionData' => [],
        'currentStaticData' => [],
        'jackpotData' => [],
        'currentBank' => 0,
    ];

    $gameSpecificConfig = [
        'gameSettings' => [ // Provide some defaults in case Config.php is missing or incomplete
            'name' => $gameName, 'slotDBId' => $gameName . '_db_id',
            'bet' => [1, 2, 5, 10, 20, 50, 100], 'denomination' => 0.01,
            'slotViewState' => 'Normal', 'slotFreeCount' => 10, 'slotFreeMpl' => 2,
            'slotWildMpl' => 1, 'rezerv' => 5,
            'lines_percent_config_spin' => [], 'lines_percent_config_bonus' => []
        ],
        'shopSettings' => ['currency' => 'USD', 'percent' => 95, 'max_win' => 5000],
        'jackpotSettings' => []
    ];

    if (class_exists($configClass, false)) {
        if (method_exists($configClass, 'getGameSettings')) {
            $gameSpecificConfig['gameSettings'] = array_merge($gameSpecificConfig['gameSettings'], $configClass::getGameSettings());
        }
        if (method_exists($configClass, 'getShopSettings')) {
            $gameSpecificConfig['shopSettings'] = array_merge($gameSpecificConfig['shopSettings'], $configClass::getShopSettings());
        }
        if (method_exists($configClass, 'getJackpotSettings')) {
            $gameSpecificConfig['jackpotSettings'] = $configClass::getJackpotSettings();
        }
    } else {
        // Optional: log that game-specific Config.php was not found
        // error_log("[{$gameName}] Config.php (class {$configClass}) not found or loaded. Using defaults for exporter.");
    }
    
    // Ensure GameReel is loaded for SlotSettings that might depend on it in constructor
    if (class_exists($gameReelClass, false)) {
        // If GameReel needs specific pathing for reels.txt, it should handle it internally,
        // ideally using __DIR__ from its own file if it's made standalone.
        // The constructor for SlotSettings might instantiate GameReel.
    }


    $slotSettingsInstance = new $slotSettingsClass(
        $gameName,
        'config_exporter_user', // dummy userId
        $dummyPlayerState,
        $dummyGameState,
        $gameSpecificConfig    // Pass the potentially merged or default config
    );

    if (!method_exists($slotSettingsInstance, 'exportConfigForGenericTemplate')) {
        echo json_encode([
            'error' => "Method 'exportConfigForGenericTemplate' not found in class '{$slotSettingsClass}'.",
            'details' => "Please add this method to {$gameBasePath}/SlotSettings.php. It should return an associative array of the game's configuration."
        ]);
        exit(1);
    }

    $configData = $slotSettingsInstance->exportConfigForGenericTemplate();
    header('Content-Type: application/json'); // Good practice, though for CLI it's mainly for clarity
    echo json_encode($configData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

} catch (\Throwable $e) { // Catch Throwable for PHP 7+ to get all errors/exceptions
    echo json_encode([
        'error' => "Exception during '{$gameName}' config export: " . $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString()
    ]);
    exit(1);
}
