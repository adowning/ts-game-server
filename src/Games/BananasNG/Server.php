<?php
namespace VanguardLTE\Games\BananasNG;

// Set a default timezone if not set in php.ini to avoid warnings with time()
if (!ini_get('date.timezone')) {
    date_default_timezone_set('UTC');
}

// --- Debugging Helper ---
if (!function_exists('VanguardLTE\Games\BananasNG\debug_log')) {
    function debug_log($message) {
        $timestamp = date("Y-m-d H:i:s");
        $logFilePath = __DIR__ . '/_debug_server.log'; 
        if (is_array($message) || is_object($message)) {
            $message = print_r($message, true);
        }
        file_put_contents($logFilePath, "[{$timestamp}] DEBUG: " . $message . "\n", FILE_APPEND);
    }
}

spl_autoload_register(function ($class) {
    $prefix = 'VanguardLTE\\Games\\BananasNG\\';
    $base_dir = __DIR__ . '/'; 
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';
    if (file_exists($file)) {
        require_once $file; 
    } else {
        error_log("Autoloader Error: Class file not found for {$class} at {$file}");
    }
});

class Server
{
    public function handleRequest()
    {
        \VanguardLTE\Games\BananasNG\debug_log("--- New BananasNG Request ---");
        $response = '';
        try {
            // Read input data
            $rawPostData = '';
            if (defined('STDIN')) {
                while ($line = fgets(STDIN)) {
                    $rawPostData .= $line;
                }
            }

            if (empty($rawPostData)) {
                $rawPostData = file_get_contents('php://input');
            }
            
            if ($rawPostData === false) { 
                $rawPostData = ""; 
            }
            
            $requestData = json_decode($rawPostData, true);
            if ($rawPostData !== "" && json_last_error() !== JSON_ERROR_NONE) { 
                 \VanguardLTE\Games\BananasNG\debug_log("JSON Decode Error: " . json_last_error_msg());
                 throw new \Exception("Invalid JSON input: " . json_last_error_msg());
            }
            if ($requestData === null) $requestData = []; 

            // Determine action
            $action = null;
            if (is_array($requestData)) {
                if (isset($requestData['action'])) {
                    $action = $requestData['action'];
                } elseif (isset($requestData['gameData']['cmd'])) {
                    $action = $requestData['gameData']['cmd'];
                }
            }
            
            if (!$action) {
                $action = "APIVersionRequest"; 
            }
            \VanguardLTE\Games\BananasNG\debug_log("Determined Action: " . $action);

            // Extract request data
            $userId = is_array($requestData) && isset($requestData['userId']) ? $requestData['userId'] : 'guest_cli';
            $gameName = 'BananasNG';

            $playerState = [
                'currentBalance' => is_array($requestData) && isset($requestData['currentBalance']) ? $requestData['currentBalance'] : 1000,
            ];

            $gameState = [
                'currentSessionData' => is_array($requestData) && isset($requestData['currentSessionData']) ? $requestData['currentSessionData'] : [],
                'currentStaticData' => is_array($requestData) && isset($requestData['currentStaticData']) ? $requestData['currentStaticData'] : [],
                'jackpotData' => is_array($requestData) && isset($requestData['jackpotData']) ? $requestData['jackpotData'] : [],
                'currentBank' => is_array($requestData) && isset($requestData['currentBank']) ? $requestData['currentBank'] : 10000,
            ];

            $actionPayload = [];
            if(is_array($requestData)){
                $actionPayload = $requestData['requestPayload'] ?? ($requestData['gameData']['data'] ?? []);
            }

            // Initialize configuration
            $gameBaseConfig = Config::getGameSettings();
            $shopBaseConfig = Config::getShopSettings();
            $jackpotBaseConfig = Config::getJackpotSettings();

            $mergedConfig = [
                'gameSettings' => $gameBaseConfig,
                'shopSettings' => $shopBaseConfig,
                'jackpotSettings' => $jackpotBaseConfig,
            ];

            // Initialize SlotSettings
            $slotSettings = new SlotSettings($gameName, $userId, $playerState, $gameState, $mergedConfig);
            \VanguardLTE\Games\BananasNG\debug_log("SlotSettings instantiated. Initial Balance: " . $slotSettings->GetBalance());

            $result_tmp = [];

            // Handle different actions
            switch ($action) {
                case 'APIVersionRequest':
                    $result_tmp[] = '{"action":"APIVersionResponse","result":true,"sesId":false,"data":{"router":"v3.12","transportConfig":{"reconnectTimeout":500000000000}}}';
                    break;

                case 'CheckBrokenGameRequest':
                     $result_tmp[] = '{"action":"CheckBrokenGameResponse","result":"true","sesId":"false","data":{"haveBrokenGame":"false"}}';
                     break;
                
                case 'AuthRequest':
                    $result_tmp[] = $this->handleAuthRequest($slotSettings);
                    break;

                case 'BalanceRequest':
                    $result_tmp[] = $this->handleBalanceRequest($slotSettings);
                    break;
                
                case 'PickBonusItemRequest':
                    $result_tmp[] = $this->handlePickBonusItemRequest($slotSettings, $actionPayload);
                    break;

                case 'FreeSpinRequest':
                case 'SpinRequest':
                    $result_tmp[] = $this->handleSpinRequest($slotSettings, $action, $actionPayload);
                    break;

                default:
                    $result_tmp[] = json_encode([
                        "responseEvent" => "error",
                        "responseType" => "unknown_action",
                        "serverResponse" => "Unknown action: " . $action
                    ]);
                    break;
            }

            $response = implode('------', $result_tmp); 

        } catch (\Exception $e) {
            \VanguardLTE\Games\BananasNG\debug_log("FATAL EXCEPTION: " . $e->getMessage());
            $response = json_encode([
                "responseEvent" => "error",
                "responseType" => "general_error",
                "message" => $e->getMessage(),
            ]);
        }
        
        if (php_sapi_name() !== 'cli') { 
            header('Content-Type: application/json');
        }
        echo $response; 
        \VanguardLTE\Games\BananasNG\debug_log("--- Request Handled ---");
    }

    private function handleAuthRequest($slotSettings)
    {
        $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0);
        $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
        
        $authData = [
            "snivy" => "proxy standalone v1.1 CLI",
            "supportedFeatures" => ["Offers"],
            "sessionId" => bin2hex(random_bytes(16)), 
            "defaultLines" => array_map('strval', range(0,9)), // BananasNG has 10 lines (0-9)
            "bets" => array_map('strval', $slotSettings->Bet),
            "betMultiplier" => "1.0000000",
            "defaultBet" => (string)($slotSettings->Bet[0] ?? 1),
            "defaultCoinValue" => (string)($slotSettings->currentDenom ?? 0.01),
            "coinValues" => [(string)($slotSettings->currentDenom ?? 0.01)],
            "gameParameters" => [
                "availableLines" => [],
                "rtp" => "92.18", // BananasNG specific RTP
                "payouts" => [],
                "initialSymbols" => [["8","6","7","8","4"],["7","0","12","3","9"],["0","8","9","10","0"]] // BananasNG specific
            ],
            "jackpotsEnabled" => !empty($slotSettings->Jackpots) ? "true" : "false",
            "gameModes" => "[]"
        ];

        // BananasNG specific payouts
        foreach($slotSettings->Paytable as $symKey => $pays) {
            if(!is_array($pays)) continue;
            $symbolId = str_replace('SYM_', '', $symKey);
            for($i=2; $i<count($pays); $i++){
                if($pays[$i] > 0) {
                    $authData['gameParameters']['payouts'][] = [
                        'payout' => (string)$pays[$i],
                        'symbols' => array_fill(0, $i-1, $symbolId), 
                        'type' => ($symbolId == '11') ? 'scatter' : 'basic'
                    ];
                }
            }
        }

        // BananasNG specific line definitions (10 lines)
        $bananasLines = [
            [1,1,1,1,1], [0,0,0,0,0], [2,2,2,2,2], [0,1,2,1,0], [2,1,0,1,2],
            [1,2,2,2,1], [1,0,0,0,1], [2,2,1,0,0], [0,0,1,2,2], [2,1,1,1,0]
        ];
        foreach($bananasLines as $line) {
            $authData['gameParameters']['availableLines'][] = array_map('strval', $line);
        }

        return json_encode([
            "action" => "AuthResponse",
            "result" => "true",
            "sesId" => $authData['sessionId'],
            "data" => $authData
        ]);
    }

    private function handleBalanceRequest($slotSettings)
    {
        return json_encode([
            "action" => "BalanceResponse",
            "result" => "true",
            "sesId" => bin2hex(random_bytes(16)), 
            "data" => [
                "entries" => "0.00", 
                "totalAmount" => (string)$slotSettings->GetBalance(),
                "currency" => $slotSettings->currency ?? "USD"
            ]
        ]);
    }

    private function handlePickBonusItemRequest($slotSettings, $actionPayload)
    {
        $bonusSymbol = $actionPayload['index'] ?? '0';
        $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', $bonusSymbol);

        return json_encode([
            "action" => "PickBonusItemResponse",
            "result" => "true",
            "sesId" => bin2hex(random_bytes(16)),
            "data" => [
                "state" => "PickBonus",
                "params" => [
                    "picksRemain" => "0",
                    "expandingSymbols" => [$bonusSymbol]
                ]
            ]
        ]);
    }

    private function handleSpinRequest($slotSettings, $action, $actionPayload)
    {
        $slotEvent = ($action == 'FreeSpinRequest') ? 'freespin' : 'bet';
        $lines = 10; // BananasNG has 10 lines
        $coinBet = $actionPayload['coin'] ?? ($slotSettings->Bet[0] ?? 1);
        $lineMultiplier = $actionPayload['bet'] ?? 1;

        $betLine = $coinBet * $lineMultiplier;
        $allbet = $betLine * $lines;

        if ($slotEvent == 'bet') {
            if ($slotSettings->GetBalance() < $allbet) {
                throw new \Exception("Insufficient balance for the bet.");
            }
            $slotSettings->SetBalance(-1 * $allbet, $slotEvent);
            $bankSum = $allbet / 100 * $slotSettings->GetPercent();
            $slotSettings->SetBank($bankSum, $slotEvent, $slotEvent);

            $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0);
            $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
            $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
        } else {
            $currentFS = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') + 1;
            $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', $currentFS);
        }

        $winTypeTmp = $slotSettings->GetSpinSettings($betLine, $lines, $slotEvent);
        $winType = $winTypeTmp[0];
        $spinWinLimit = $winTypeTmp[1];

        // Simplified spin logic for BananasNG
        $totalWin = 0;
        $reels = $slotSettings->GetReelStrips($winType, $slotEvent);
        $lineWins = [];

        // Simple win calculation - just return basic response
        if ($totalWin > 0) {
            $slotSettings->SetBalance($totalWin);
            $slotSettings->SetBank(-1 * $totalWin, $slotEvent);
        }

        $currentFreeGames = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
        $totalFreeGames = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
        $finalBonusWin = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');

        if ($slotEvent == 'freespin' && $totalWin > 0) {
            $finalBonusWin += $totalWin;
            $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $finalBonusWin);
        }

        return json_encode([
            "action" => ($slotEvent == 'freespin' ? "FreeSpinResponse" : "SpinResponse"),
            "result" => "true",
            "sesId" => bin2hex(random_bytes(16)),
            "serverResponse" => [
                "slotLines" => $lines,
                "slotBet" => $betLine,
                "totalFreeGames" => $totalFreeGames,
                "currentFreeGames" => $currentFreeGames,
                "Balance" => $slotSettings->GetBalance(),
                "afterBalance" => $slotSettings->GetBalance(),
                "bonusWin" => $finalBonusWin,
                "totalWin" => $totalWin,
                "winLines" => $lineWins,
                "reelsSymbols" => $reels,
                "Jackpots" => $slotSettings->GetCurrentJackpotData(),
            ],
            "newBalance" => $slotSettings->GetBalance(),
            "newSessionData" => $slotSettings->GetCurrentSessionData(),
            "newStaticData" => $slotSettings->GetCurrentStaticData(),
            "newJackpotData" => $slotSettings->GetCurrentJackpotData(),
            "newBank" => $slotSettings->GetBank('') * ($slotSettings->currentDenom ?? 0.01),
        ]);
    }
}

// Instantiate and run the server logic when this script is executed
$server = new Server();
$server->handleRequest();
