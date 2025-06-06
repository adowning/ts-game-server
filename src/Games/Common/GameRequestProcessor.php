<?php
namespace VanguardLTE\Games\Common; // A common namespace for shared utilities

// It's assumed that the debug_log function is available globally or in a way
// that can be called. If it's namespaced in each game's Server.php,
// then this helper might need its own logging or a passed-in logger.
// For this example, we'll assume a global or easily accessible debug_log.
// If not, calls to \VanguardLTE\Games\CloverStonesNG\debug_log will fail here.
// A better approach would be to define a common debug_log in this namespace
// or pass a logger instance.
// For now, let's adapt by checking if the game-specific one exists or use error_log.

if (!function_exists('VanguardLTE\Games\Common\generic_debug_log')) {
    function generic_debug_log($message, $gameName = null) {
        $gameSpecificDebugLog = 'VanguardLTE\\Games\\' . ($gameName ?: 'DefaultGame') . '\\debug_log';
        if ($gameName && function_exists($gameSpecificDebugLog)) {
            $gameSpecificDebugLog($message);
        } else { // Fallback
            $timestamp = date("Y-m-d H:i:s");
            $logFilePath = __DIR__ . '/_debug_request_processor.log'; 
            if (is_array($message) || is_object($message)) {
                $message = print_r($message, true);
            }
            file_put_contents($logFilePath, "[{$timestamp}] COMMON_DEBUG: " . $message . "\n", FILE_APPEND);
        }
    }
}


class ProcessedRequest
{
    public $action;
    public $userId;
    public $gameName;
    public $slotSettings;
    public $actionPayload;
    public $requestData; // The full parsed request data

    public function __construct($action, $userId, $gameName, $slotSettings, $actionPayload, $requestData)
    {
        $this->action = $action;
        $this->userId = $userId;
        $this->gameName = $gameName;
        $this->slotSettings = $slotSettings;
        $this->actionPayload = $actionPayload;
        $this->requestData = $requestData;
    }
}

class GameRequestProcessor
{
    private $baseGameNamespace = 'VanguardLTE\\Games\\';

    public function processIncomingRequest(): ProcessedRequest
    {
        \VanguardLTE\Games\Common\generic_debug_log("--- RequestProcessor: New Request ---");
        
        $rawPostData = $this->readInput();
        \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Raw Input Data: " . ($rawPostData ?: '(empty)'));

        $requestData = $this->parseJsonInput($rawPostData);
        \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Parsed Request Data: " . print_r($requestData, true));
        
        // Determine gameName first, as it's needed for namespacing other components
        // It should be part of every request if we have multiple games.
        // Default if not found, but this implies the Server.php needs to know its own game if generic.
        // For a truly generic processor, gameName MUST be in the request.
        $gameName = $this->determineGameName($requestData);
        \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Determined GameName: " . $gameName, $gameName);

        $action = $this->determineAction($requestData, $rawPostData, $gameName);
        \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Determined Action (reqId): " . $action, $gameName);

        $userId = $this->determineUserId($requestData, $gameName);
        \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: User ID: {$userId}, Game Name: {$gameName}", $gameName);

        $playerState = $this->extractPlayerState($requestData);
        $gameState = $this->extractGameState($requestData);
        $actionPayload = $this->extractActionPayload($requestData);

        $slotSettings = $this->initializeSlotSettings($gameName, $userId, $playerState, $gameState);
        \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: SlotSettings instantiated for {$gameName}. Initial Balance: " . $slotSettings->GetBalance() . ", Bank: " . $slotSettings->GetBank(), $gameName);

        return new ProcessedRequest($action, $userId, $gameName, $slotSettings, $actionPayload, $requestData);
    }

    private function readInput(): string
    {
        $rawPostData = '';
        if (defined('STDIN')) {
            // \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Attempting to read from STDIN...");
            while ($line = fgets(STDIN)) {
                $rawPostData .= $line;
            }
            // \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Read from STDIN (length: " . strlen($rawPostData) . "): " . ($rawPostData ? 'Data received' : '(empty)'));
        }

        if (empty($rawPostData)) {
            // \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: STDIN was empty or not available, trying php://input...");
            $rawPostData = file_get_contents('php://input');
            // \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Read from php://input (length: " . strlen($rawPostData) . "): " . ($rawPostData ? 'Data received' : '(empty)'));
        }
        return $rawPostData ?: "";
    }

    private function parseJsonInput(string $rawPostData)
    {
        if ($rawPostData === "") {
            return [];
        }
        $requestData = json_decode($rawPostData, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: JSON Decode Error: " . json_last_error_msg() . " | Raw: " . $rawPostData);
            throw new \Exception("Invalid JSON input: " . json_last_error_msg() . " Raw Data: " . substr($rawPostData, 0, 200));
        }
        return $requestData ?? [];
    }

    private function determineGameName(array $requestData): string
    {
        // Game name MUST be reliably in the request for a generic processor
        // that handles multiple games.
        $gameName = $requestData['gameName'] ?? null;
        if (!$gameName) {
            // Fallback or error if gameName is crucial and not found
            // For now, default to CloverStonesNG if not specified, but this makes it less generic.
            // \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: 'gameName' not found in request, defaulting. THIS SHOULD BE FIXED FOR A TRULY GENERIC PROCESSOR.");
            return 'CloverStonesNG'; // Or throw an Exception
        }
        return $gameName;
    }

    private function determineAction(array $requestData, string $rawPostData, string $gameName): string
    {
        $action = null;
        if (isset($requestData['action'])) {
            $action = $requestData['action'];
            \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Action found in \$requestData['action']: " . $action, $gameName);
        } elseif (isset($requestData['gameData']['cmd'])) {
            $action = $requestData['gameData']['cmd'];
            \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Action found in \$requestData['gameData']['cmd']: " . $action, $gameName);
        } else {
            \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Neither 'action' nor 'gameData.cmd' found in parsed requestData.", $gameName);
        }

        if (!$action) {
            if ($rawPostData !== "") {
                \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Warning: Action is NULL even though raw input data was present. Defaulting action.", $gameName);
            } else {
                \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Action is NULL and raw input was empty. Defaulting action.", $gameName);
            }
            return "APIVersionRequest"; // Default action
        }
        return $action;
    }

    private function determineUserId(array $requestData, string $gameName): string
    {
        return $requestData['userId'] ?? 'guest_cli';
    }

    private function extractPlayerState(array $requestData): array
    {
        return ['currentBalance' => $requestData['currentBalance'] ?? 0];
    }

    private function extractGameState(array $requestData): array
    {
        return [
            'currentSessionData' => $requestData['currentSessionData'] ?? [],
            'currentStaticData' => $requestData['currentStaticData'] ?? [],
            'jackpotData' => $requestData['jackpotData'] ?? [],
            'currentBank' => $requestData['currentBank'] ?? 0,
        ];
    }

    private function extractActionPayload(array $requestData): array
    {
        return $requestData['requestPayload'] ?? ($requestData['gameData']['data'] ?? []);
    }

    private function initializeSlotSettings(string $gameName, string $userId, array $playerState, array $gameState)
    {
        $configClass = $this->baseGameNamespace . $gameName . '\\Config';
        $slotSettingsClass = $this->baseGameNamespace . $gameName . '\\SlotSettings';

        // Autoloader should have handled class loading, but check for safety
        if (!class_exists($configClass)) {
            \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Config class '{$configClass}' not found for game '{$gameName}'.", $gameName);
            throw new \Exception("Config class '{$configClass}' not found for game '{$gameName}'. Ensure it is autoloadable.");
        }
        if (!class_exists($slotSettingsClass)) {
            \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: SlotSettings class '{$slotSettingsClass}' not found for game '{$gameName}'.", $gameName);
            throw new \Exception("SlotSettings class '{$slotSettingsClass}' not found for game '{$gameName}'. Ensure it is autoloadable.");
        }

        // Assuming game-specific Config classes have static methods to get settings
        $gameBaseConfig = method_exists($configClass, 'getGameSettings') ? $configClass::getGameSettings() : [];
        $shopBaseConfig = method_exists($configClass, 'getShopSettings') ? $configClass::getShopSettings() : [];
        $jackpotBaseConfig = method_exists($configClass, 'getJackpotSettings') ? $configClass::getJackpotSettings() : [];

        // Add default gameName to gameSettings if not present from Config
        if (empty($gameBaseConfig['name'])) {
            $gameBaseConfig['name'] = $gameName;
        }


        $mergedConfig = [
            'gameSettings' => $gameBaseConfig,
            'shopSettings' => $shopBaseConfig,
            'jackpotSettings' => $jackpotBaseConfig,
        ];
        \VanguardLTE\Games\Common\generic_debug_log("RequestProcessor: Merged Config loaded for {$gameName} SlotSettings.", $gameName);
        
        // It's assumed that the game-specific SlotSettings constructor expects:
        // ($gameName, $userId, $playerState, $gameState, $mergedConfig)
        return new $slotSettingsClass($gameName, $userId, $playerState, $gameState, $mergedConfig);
    }
}
