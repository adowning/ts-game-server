<?php
// This Server.php now assumes it's for a specific game, e.g., CloverStonesNG
// Or, if truly generic, it would get $gameName from the request processor
// and then load game-specific elements dynamically, which is more complex.
// For now, let's assume this Server.php is part of the CloverStonesNG game module.
namespace VanguardLTE\Games\CloverStonesNG; // Game-specific namespace

// Set a default timezone if not set in php.ini to avoid warnings with time()
if (!ini_get('date.timezone')) {
    date_default_timezone_set('UTC');
}

// --- Game-Specific Debugging Helper ---
// This is now specific to CloverStonesNG and will be used by the Common helper if found.
if (!function_exists('VanguardLTE\Games\CloverStonesNG\debug_log')) {
    function debug_log($message) {
        $timestamp = date("Y-m-d H:i:s");
        $logFilePath = __DIR__ . '/_debug_server_CloverStonesNG.log'; 
        if (is_array($message) || is_object($message)) {
            $message = print_r($message, true);
        }
        file_put_contents($logFilePath, "[{$timestamp}] CLOVERSTONES_DEBUG: " . $message . "\n", FILE_APPEND);
    }
}
// --- End Game-Specific Debugging Helper ---

// Autoloader for game-specific classes (SlotSettings, Config, GameReel)
// AND the common GameRequestProcessor if it's not globally autoloaded.
spl_autoload_register(function ($class) {
    // Try game-specific namespace first
    $gamePrefix = 'VanguardLTE\\Games\\CloverStonesNG\\';
    $gameBaseDir = __DIR__ . '/';
    
    if (strncmp($gamePrefix, $class, strlen($gamePrefix)) === 0) {
        $relativeClass = substr($class, strlen($gamePrefix));
        $file = $gameBaseDir . str_replace('\\', '/', $relativeClass) . '.php';
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }

    // Try common namespace (assuming GameRequestProcessor is in a 'Common' subdir relative to a root 'Games' dir)
    // Adjust this path based on your actual project structure.
    // Example: if Games/Common/GameRequestProcessor.php and Games/CloverStonesNG/Server.php
    $commonPrefix = 'VanguardLTE\\Games\\Common\\';
    // Path might be like __DIR__ . '/../Common/'
    // For simplicity, let's assume it's in a known relative path or globally included.
    // If GameRequestProcessor.php is in the same directory as this Server.php for now:
    $commonBaseDir = __DIR__ . '/../Common'; // ADJUST THIS PATH
    if (strncmp($commonPrefix, $class, strlen($commonPrefix)) === 0) {
        $relativeClass = substr($class, strlen($commonPrefix));
        // Adjust the path to where GameRequestProcessor.php is.
        // Example: if Common is a sibling directory to CloverStonesNG
        $file = $gameBaseDir . '../Common/' . str_replace('\\', '/', $relativeClass) . '.php';
        if (file_exists($file)) {
            require_once $file;
            return;
        } else {
             // Use the game-specific debug_log if available, otherwise error_log
            if (function_exists('VanguardLTE\Games\CloverStonesNG\debug_log')) {
                \VanguardLTE\Games\CloverStonesNG\debug_log("Autoloader: Common class {$class} not found at {$file}");
            } else {
                error_log("Autoloader: Common class {$class} not found at {$file}");
            }
        }
    }
});

// Explicitly require the GameRequestProcessor if not handled by autoloader reliably
// ADJUST PATH AS NEEDED. Assume it's in a 'Common' directory relative to 'CloverStonesNG'
$requestProcessorPath = __DIR__ . '/../Common/GameRequestProcessor.php'; 
if (file_exists($requestProcessorPath)) {
    require_once $requestProcessorPath;
} else {
    if (function_exists('VanguardLTE\Games\CloverStonesNG\debug_log')) {
        \VanguardLTE\Games\CloverStonesNG\debug_log("FATAL: GameRequestProcessor.php not found at " . $requestProcessorPath . " - current dir " . __DIR__);
    } else {
         error_log("FATAL: GameRequestProcessor.php not found at " . $requestProcessorPath);
    }
    echo json_encode(["error" => "Core request processor not found. Path: " . $requestProcessorPath]);
    exit;
}


class Server // This is now VanguardLTE\Games\CloverStonesNG\Server
{
    public function handleRequest()
    {
        $response = '';
        try {
            // Use the Common GameRequestProcessor
            // It's crucial that the GameRequestProcessor can find and load
            // VanguardLTE\Games\CloverStonesNG\Config and VanguardLTE\Games\CloverStonesNG\SlotSettings
            if(!class_exists('VanguardLTE\Games\Common\GameRequestProcessor')){
                 if (function_exists('VanguardLTE\Games\CloverStonesNG\debug_log')) {
                    \VanguardLTE\Games\CloverStonesNG\debug_log("FATAL: GameRequestProcessor class does not exist even after explicit require.");
                } else {
                    error_log("FATAL: GameRequestProcessor class does not exist even after explicit require.");
                }
                echo json_encode(["error" => "Core GameRequestProcessor class not loaded."]);
                exit;
            }

            $requestProcessor = new \VanguardLTE\Games\Common\GameRequestProcessor();
            $processedRequest = $requestProcessor->processIncomingRequest();

            $action = $processedRequest->action;
            $userId = $processedRequest->userId;
            $gameName = $processedRequest->gameName; // Should be CloverStonesNG if determined correctly
            $slotSettings = $processedRequest->slotSettings; // This is an instance of CloverStonesNG\SlotSettings
            $actionPayload = $processedRequest->actionPayload;
            // $requestData = $processedRequest->requestData; // Full parsed data if needed

            // Ensure we are processing for the correct game if this Server.php is game-specific
            if ($gameName !== 'CloverStonesNG') { // Make sure this matches the gameName used in GameRequestProcessor's default
                 \VanguardLTE\Games\CloverStonesNG\debug_log("Warning: This CloverStonesNG Server received a request intended for game: {$gameName}. Expected CloverStonesNG.");
            }


            $result_tmp = [];
            $reqId = $action; 

            // ---- Instantiate the GameRequestHandlerHelper for common actions ----
            $requestHelper = null;
            $commonRequestHandlerPath = __DIR__ . '/../Common/GameRequestHandlerHelper.php';
            if (file_exists($commonRequestHandlerPath)) {
                require_once $commonRequestHandlerPath;
                 if(class_exists('VanguardLTE\Games\Common\GameRequestHandlerHelper')) {
                    $requestHelper = new \VanguardLTE\Games\Common\GameRequestHandlerHelper();
                } else {
                    \VanguardLTE\Games\CloverStonesNG\debug_log("ERROR: GameRequestHandlerHelper class not found after include.");
                }
            } else {
                 \VanguardLTE\Games\CloverStonesNG\debug_log("ERROR: GameRequestHandlerHelper.php not found at " . $commonRequestHandlerPath);
            }
            // ------------------------------------------------------------------


            switch ($reqId) {
                case 'APIVersionRequest':
                    \VanguardLTE\Games\CloverStonesNG\debug_log("Handling APIVersionRequest");
                    if ($requestHelper) $result_tmp[] = $requestHelper->handleAPIVersionRequest();
                    else $result_tmp[] = '{"action":"APIVersionResponse","result":true,"sesId":false,"data":{"router":"v3.12","transportConfig":{"reconnectTimeout":5000}}}'; 
                    break;

                case 'CheckBrokenGameRequest':
                     \VanguardLTE\Games\CloverStonesNG\debug_log("Handling CheckBrokenGameRequest");
                     if ($requestHelper) $result_tmp[] = $requestHelper->handleCheckBrokenGameRequest();
                     else  $result_tmp[] = '{"action":"CheckBrokenGameResponse","result":"true","sesId":"false","data":{"haveBrokenGame":"false"}}'; 
                     break;
                
                case 'AuthRequest':
                    \VanguardLTE\Games\CloverStonesNG\debug_log("Handling AuthRequest for user: {$userId}");
                    // Ensure SlotSettings has the getAuthenticationDetails method for the helper
                    // and initializeSessionForAuth if used by the helper.
                    $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0); 
                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                    $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                    $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', 0);

                    if ($requestHelper && method_exists($slotSettings, 'getAuthenticationDetails')) {
                        $result_tmp[] = $requestHelper->handleAuthRequest($slotSettings);
                    } else {
                        \VanguardLTE\Games\CloverStonesNG\debug_log("AuthRequest: Using direct implementation (helper or SlotSettings::getAuthenticationDetails missing).");
                        // Build AuthData manually specific to CloverStonesNG
                        $authData = [
                            "snivy" => "proxy standalone v1.1 CLI - CloverStonesNG",
                            "supportedFeatures" => ["Offers"],
                            "sessionId" => bin2hex(random_bytes(16)),
                            "defaultLines" => array_map('strval', range(0,19)),
                            "bets" => array_map('strval', $slotSettings->Bet),
                            "betMultiplier" => "1.0000000",
                            "defaultBet" => (string)($slotSettings->Bet[0] ?? 1),
                            "defaultCoinValue" => (string)($slotSettings->currentDenom ?? 0.01),
                            "coinValues" => [(string)($slotSettings->currentDenom ?? 0.01)],
                            "gameParameters" => [
                                "availableLines" => [],
                                "rtp" => "95.00", // Example
                                "payouts" => [] 
                            ],
                            "jackpotsEnabled" => !empty($slotSettings->Jackpots) ? "true" : "false",
                            "gameModes" => "[]"
                        ];
                         foreach($slotSettings->Paytable as $symKey => $pays) {
                            if(!is_array($pays)) continue;
                            $symbolId = str_replace('SYM_', '', $symKey);
                            for($i=3; $i<count($pays); $i++){ 
                                if($pays[$i] > 0) {
                                    $authData['gameParameters']['payouts'][] = [
                                        'payout' => (string)$pays[$i],
                                        'symbols' => array_fill(0, $i-1, $symbolId), 
                                        'type' => 'basic'
                                    ];
                                }
                            }
                        }
                        for ($l=0; $l<20; $l++) { 
                             $lineDef = [];
                             for($r_coord=0; $r_coord<5; $r_coord++) $lineDef[] = (string)(($l+$r_coord)%3 +1); 
                             $authData['gameParameters']['availableLines'][] = $lineDef;
                        }
                         $result_tmp[] = json_encode(["action" => "AuthResponse", "result" => "true", "sesId" => $authData['sessionId'], "data" => $authData]);
                    }
                    break;

                case 'BalanceRequest':
                    \VanguardLTE\Games\CloverStonesNG\debug_log("Handling BalanceRequest. Current Balance: " . $slotSettings->GetBalance());
                    if ($requestHelper) $result_tmp[] = $requestHelper->handleBalanceRequest($slotSettings);
                    else $result_tmp[] = json_encode([
                        "action" => "BalanceResponse", "result" => "true", "sesId" => bin2hex(random_bytes(16)),
                        "data" => ["entries" => "0.00", "totalAmount" => (string)$slotSettings->GetBalance(), "currency" => $slotSettings->currency ?? "USD"]
                    ]); 
                    break;
                
                case 'PickBonusItemRequest':
                    $bonusSymbol = $actionPayload['index'] ?? '0'; 
                    \VanguardLTE\Games\CloverStonesNG\debug_log("Handling PickBonusItemRequest. Picked Index: {$bonusSymbol}");
                    $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', $bonusSymbol);
                    $result_tmp[] = json_encode([
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
                    break;

                case 'FreeSpinRequest':
                case 'SpinRequest':
                    $slotEvent = ($reqId == 'FreeSpinRequest') ? 'freespin' : 'bet';
                    \VanguardLTE\Games\CloverStonesNG\debug_log("Handling {$reqId} (SlotEvent: {$slotEvent}) for {$gameName}");
                    $lines = 20; 
                    $coinBet = $actionPayload['coin'] ?? ($slotSettings->Bet[0] ?? 1); 
                    $lineMultiplier = $actionPayload['bet'] ?? 1; 
                    
                    $betLine = $coinBet * $lineMultiplier; 
                    $allbet = $betLine * $lines; 
                    \VanguardLTE\Games\CloverStonesNG\debug_log("Bet per Line: {$betLine}, Total Bet: {$allbet}, Lines: {$lines}");
                    \VanguardLTE\Games\CloverStonesNG\debug_log("Balance BEFORE bet/spin: " . $slotSettings->GetBalance());

                    if ($slotEvent == 'bet') {
                        if ($slotSettings->GetBalance() < $allbet) {
                            \VanguardLTE\Games\CloverStonesNG\debug_log("Error: Insufficient balance. Needed: {$allbet}, Has: {$slotSettings->GetBalance()}");
                            throw new \Exception("Insufficient balance for the bet. Needed: $allbet, Has: {$slotSettings->GetBalance()}");
                        }
                        $slotSettings->SetBalance(-1 * $allbet, $slotEvent);
                        \VanguardLTE\Games\CloverStonesNG\debug_log("Balance AFTER bet deduction: " . $slotSettings->GetBalance());
                        $bankSum = $allbet / 100 * $slotSettings->GetPercent();
                        $slotSettings->SetBank($bankSum, $slotEvent, $slotEvent); 
                        \VanguardLTE\Games\CloverStonesNG\debug_log("Bank AFTER bet addition: " . $slotSettings->GetBank($slotEvent));

                        if(!empty($slotSettings->Jackpots)) $slotSettings->UpdateJackpots($allbet);

                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', 0);
                    } else { 
                        $currentFS = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') + 1;
                        $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', $currentFS);
                        \VanguardLTE\Games\CloverStonesNG\debug_log("Free Spin number: {$currentFS}");
                    }
                    
                    $winTypeTmp = $slotSettings->GetSpinSettings($betLine, $lines, $slotEvent);
                    $winType = $winTypeTmp[0];
                    $spinWinLimit = $winTypeTmp[1];
                    \VanguardLTE\Games\CloverStonesNG\debug_log("Spin Settings: WinType='{$winType}', SpinWinLimit={$spinWinLimit}");

                    $totalWin = 0;
                    $reels = null;
                    $isBonusAwardedThisSpin = false;
                    $bonusMpl = ($slotEvent == 'freespin') ? ($slotSettings->slotFreeMpl ?? 2) : 1;
                    $currentStageLineWins = []; 
                    $reelsForResponse = [];
                    $reelsForCascade = [];
                    $spinLoopIteration = 0;

                    for ($i = 0; $i <= 200; $i++) { 
                        $spinLoopIteration = $i;
                        $totalWin = 0;
                        $currentStageLineWins = []; 
                        $reels = $slotSettings->GetReelStrips($winType, $slotEvent);
                        if(empty($reels['rp'])){
                             \VanguardLTE\Games\CloverStonesNG\debug_log("Spin Loop {$i}: GetReelStrips returned empty/invalid reels. WinType: {$winType}");
                             continue; 
                        }
                        $reelsForResponse = $reels; 
                        $reelsForCascade = $reels; 

                        $cascadingStages = 0;
                        $maxCascades = 10; 
                        $cascadeMultiplier = ($slotEvent == 'freespin') ? ($slotSettings->GetGameData($slotSettings->slotId.'CascadeMultiplier') ?? 1) : 1;

                        do { 
                            $cascadingStages++;
                            $stageWinThisCascade = 0;
                            $stageLineWinsThisCascadeIteration = []; 
                            
                            if ($cascadingStages > 1) {
                                $reelsForCascade = $slotSettings->OffsetReels($reelsForCascade);
                                if ($slotEvent == 'freespin') {
                                     $cascadeMultiplier = min(15, $cascadeMultiplier + (($cascadeMultiplier < 5) ? 1 : (($cascadeMultiplier < 10) ? 2 : 5)) );
                                }
                            }
                            
                            for ($k = 0; $k < $lines; $k++) { 
                                $lineCoordsDef = $this->getLineCoords($k); 
                                if(!$lineCoordsDef) {
                                    continue; 
                                }

                                foreach ($slotSettings->SymbolGame as $csym_idx => $csym) {
                                     if ($csym == ($slotSettings->Paytable['SYM_9'][0] ?? '9') && $slotSettings->slotScatterType == 0) continue; 
                                     if (!isset($slotSettings->Paytable['SYM_' . $csym])) continue;

                                    $s = []; 
                                    $validSymbolPath = true;
                                    for($r_idx=0; $r_idx<5; $r_idx++){ 
                                        if(!isset($lineCoordsDef[$r_idx]) || 
                                           !isset($reelsForCascade['reel'.($r_idx+1)]) || 
                                           !isset($reelsForCascade['reel'.($r_idx+1)][$lineCoordsDef[$r_idx][1]])) {
                                            $validSymbolPath = false; break;
                                        }
                                        $s[$r_idx] = $reelsForCascade['reel'.($r_idx+1)][$lineCoordsDef[$r_idx][1]];
                                    }
                                    if(!$validSymbolPath) continue;

                                    $wildSymbol = '0'; 
                                    $winLength = 0;
                                    $actualSymbolsInWinPos = []; 

                                    for ($reelIdx = 0; $reelIdx < 5; $reelIdx++) {
                                        if (isset($s[$reelIdx]) && ($s[$reelIdx] == $csym || $s[$reelIdx] == $wildSymbol)) {
                                            $winLength++;
                                            $actualSymbolsInWinPos[] = [$reelIdx, $lineCoordsDef[$reelIdx][1]];
                                        } else {
                                            break;
                                        }
                                    }
                                    
                                    if ($winLength >= 3 && isset($slotSettings->Paytable['SYM_' . $csym][$winLength])) { 
                                        $payoutMultiplier = $slotSettings->Paytable['SYM_' . $csym][$winLength];
                                        if ($payoutMultiplier > 0) {
                                            $currentLineWinAmount = $payoutMultiplier * $betLine * $bonusMpl * $cascadeMultiplier;
                                            
                                            $existingWinAmountOnLineForThisSymbol = 0;
                                            $indexOfExistingWin = -1;

                                            foreach($stageLineWinsThisCascadeIteration as $idx => $existingWin){
                                                if($existingWin['selectedLine'] == $k ) {
                                                    $existingWinAmountOnLineForThisSymbol = $existingWin['amount']; 
                                                    if ($currentLineWinAmount > $existingWinAmountOnLineForThisSymbol) $indexOfExistingWin = $idx;
                                                    break; 
                                                }
                                            }

                                            if ($currentLineWinAmount > $existingWinAmountOnLineForThisSymbol) {
                                                if($indexOfExistingWin !== -1) { 
                                                    array_splice($stageLineWinsThisCascadeIteration, $indexOfExistingWin, 1);
                                                }
                                                
                                                $stageLineWinsThisCascadeIteration[] = [
                                                    "type" => "LineWinAmount",
                                                    "selectedLine" => $k, 
                                                    "amount" => $currentLineWinAmount,
                                                    "wonSymbols" => $actualSymbolsInWinPos,
                                                    "symbol" => $csym, 
                                                    "length" => $winLength 
                                                ];
                                            }
                                        }
                                    }
                                } 
                            } 
                            
                            $currentCascadeIterationTotalWin = 0;
                            foreach($stageLineWinsThisCascadeIteration as $winDetail){
                                $currentCascadeIterationTotalWin += $winDetail['amount'];
                            }
                            if ($currentCascadeIterationTotalWin > 0) {
                                foreach($stageLineWinsThisCascadeIteration as $winDetail){
                                    if(isset($winDetail['wonSymbols']) && is_array($winDetail['wonSymbols'])){
                                        foreach($winDetail['wonSymbols'] as $symCoord){
                                             if(isset($reelsForCascade['reel'.($symCoord[0]+1)][$symCoord[1]])){
                                                $reelsForCascade['reel'.($symCoord[0]+1)][$symCoord[1]] = -1; 
                                             }
                                        }
                                    }
                                }
                                $totalWin += $currentCascadeIterationTotalWin;
                                $currentStageLineWins = array_merge($currentStageLineWins, $stageLineWinsThisCascadeIteration); 
                            }
                            
                            if ($cascadingStages > 0 && $currentCascadeIterationTotalWin == 0) break; 

                        } while ($currentCascadeIterationTotalWin > 0 && $cascadingStages < $maxCascades);
                        
                        $scatterSymbol = '9'; 
                        $scatterCount = 0;
                        if(is_array($reelsForResponse) && !empty($reelsForResponse['reel1'])){ 
                            for ($r_sc = 1; $r_sc <= 5; $r_sc++) {
                                if(!isset($reelsForResponse['reel' . $r_sc])) continue;
                                for ($p_sc = 0; $p_sc < 4; $p_sc++) { 
                                    if (isset($reelsForResponse['reel' . $r_sc][$p_sc]) && $reelsForResponse['reel' . $r_sc][$p_sc] == $scatterSymbol) {
                                        $scatterCount++;
                                    }
                                }
                            }
                        }

                        if ($scatterCount >= 3 && $slotSettings->slotBonus) {
                            $isBonusAwardedThisSpin = true;
                        }
                        
                        if ($slotEvent == 'freespin') { 
                           $slotSettings->SetGameData($slotSettings->slotId.'CascadeMultiplier', $cascadeMultiplier);
                        }

                        $canBreak = false;
                        if ($winType == 'none') {
                            if ($totalWin == 0 && !$isBonusAwardedThisSpin) $canBreak = true; 
                            else if ($totalWin > 0 && $totalWin <= $spinWinLimit && !$isBonusAwardedThisSpin) $canBreak = true; 
                            else if ($isBonusAwardedThisSpin && $totalWin <= $spinWinLimit ) $canBreak = true; 
                        } else if ($winType == 'win') {
                            if ($totalWin > 0 && $totalWin <= $spinWinLimit && !$isBonusAwardedThisSpin) $canBreak = true;
                        } else if ($winType == 'bonus') {
                            if ($isBonusAwardedThisSpin && $totalWin <= $spinWinLimit) $canBreak = true;
                            else if (!$isBonusAwardedThisSpin && $totalWin == 0) continue; 
                        }

                        if($i > 150 && $totalWin == 0 && $winType != 'bonus' && !$isBonusAwardedThisSpin) {
                            $canBreak = true; 
                        }
                        if ($canBreak) {
                             break;
                        }
                         if ($i == 200) \VanguardLTE\Games\CloverStonesNG\debug_log("Spin loop MAXED OUT (200 iterations). Finalizing with current result. WinType={$winType}, TotalWin={$totalWin}, Limit={$spinWinLimit}, BonusAwarded={$isBonusAwardedThisSpin}");
                    } 
                    \VanguardLTE\Games\CloverStonesNG\debug_log("Spin generation finished after {$spinLoopIteration} iterations. Final TotalWin: {$totalWin}");

                    if ($totalWin > 0) {
                        $slotSettings->SetBalance($totalWin);
                        $slotSettings->SetBank(-1 * $totalWin, $slotEvent); 
                        \VanguardLTE\Games\CloverStonesNG\debug_log("Balance AFTER win: " . $slotSettings->GetBalance() . ", Bank AFTER win: " . $slotSettings->GetBank($slotEvent));
                    }
                    
                    $currentFreeGames = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame');
                    $totalFreeGames = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');

                    if ($isBonusAwardedThisSpin) {
                        $isRetrigger = ($totalFreeGames > 0 && $currentFreeGames > 0 && $currentFreeGames <= $totalFreeGames); 
                        if ($isRetrigger || ($slotEvent == 'bet' && $isBonusAwardedThisSpin) ) {
                             $totalFreeGames += $slotSettings->slotFreeCount;
                             \VanguardLTE\Games\CloverStonesNG\debug_log("Free Spins Awarded/Retriggered. New Total: {$totalFreeGames}");
                             if($slotEvent == 'bet'){ 
                                 $currentFreeGames = 0; 
                                 $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0); 
                                 $slotSettings->SetGameData($slotSettings->slotId . 'CascadeMultiplier', 1);
                             }
                        }
                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $totalFreeGames);
                    }
                    
                    $bonusSymbolForResponse = $slotSettings->GetGameData($slotSettings->slotId . 'BonusSymbol');
                    if ($bonusSymbolForResponse === 0 || $bonusSymbolForResponse === null || $bonusSymbolForResponse === false) $bonusSymbolForResponse = -1;

                    $finalBonusWin = $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin');
                    if ($slotEvent == 'freespin' && $totalWin > 0) {
                         $finalBonusWin += $totalWin;
                         $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $finalBonusWin);
                    }
                    \VanguardLTE\Games\CloverStonesNG\debug_log("Final BonusWin for response: {$finalBonusWin}, Total Free Games: {$totalFreeGames}, Current Free Game: {$currentFreeGames}");

                    $spinResponseDetails = [
                        "BonusSymbol" => (int)$bonusSymbolForResponse,
                        "slotLines" => $lines,
                        "slotBet" => $betLine, 
                        "totalFreeGames" => $totalFreeGames,
                        "currentFreeGames" => $currentFreeGames,
                        "Balance" => $slotSettings->GetBalance(),
                        "afterBalance" => $slotSettings->GetBalance(), 
                        "bonusWin" => $finalBonusWin, 
                        "totalWin" => $totalWin, 
                        "winLines" => $currentStageLineWins, 
                        "reelsSymbols" => $reelsForResponse, 
                        "Jackpots" => $slotSettings->GetCurrentJackpotData(), 
                    ];

                    $finalResponseData = [
                        "state" => ($totalFreeGames > 0 && $currentFreeGames < $totalFreeGames) ? "FreeSpins" : "Ready",
                        "spinResult" => [
                            "type" => "SpinResult",
                            "rows" => $this->formatReelsForResponse($reelsForResponse)
                        ]
                    ];
                     if ($slotEvent == 'freespin') {
                        $finalResponseData["totalBonusWin"] = (string)$finalBonusWin;
                        $finalResponseData["freeSpinRemain"] = (string)($totalFreeGames - $currentFreeGames);
                        $finalResponseData["freeSpinsTotal"] = (string)$totalFreeGames;
                        $finalResponseData["cascadeMultiplier"] = $slotSettings->GetGameData($slotSettings->slotId.'CascadeMultiplier') ?? 1;

                        if ($currentFreeGames >= $totalFreeGames && $totalFreeGames > 0) { 
                             $finalResponseData["state"] = "Ready";
                             \VanguardLTE\Games\CloverStonesNG\debug_log("Free Spins session ended.");
                             $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                             $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                             $slotSettings->SetGameData($slotSettings->slotId . 'CascadeMultiplier', 1);
                        }
                    }

                    $result_tmp[] = json_encode([
                        "action" => ($slotEvent == 'freespin' ? "FreeSpinResponse" : "SpinResponse"),
                        "result" => "true",
                        "sesId" => bin2hex(random_bytes(16)),
                        "serverResponse" => $spinResponseDetails, 
                        "data" => $finalResponseData,
                        "newBalance" => $slotSettings->GetBalance(),
                        "newSessionData" => $slotSettings->GetCurrentSessionData(),
                        "newStaticData" => $slotSettings->GetCurrentStaticData(),
                        "newJackpotData" => $slotSettings->GetCurrentJackpotData(),
                        "newBank" => $slotSettings->GetBank('') * ($slotSettings->currentDenom ?? 0.01),
                    ]);
                    break;
                default:
                    \VanguardLTE\Games\CloverStonesNG\debug_log("Error: Unknown action received: " . $reqId);
                    $result_tmp[] = json_encode([
                        "responseEvent" => "error",
                        "responseType" => "unknown_action",
                        "serverResponse" => "Unknown action: " . $reqId
                    ]);
                    break;
            }

            $response = implode('------', $result_tmp); 

        } catch (\Exception $e) {
            \VanguardLTE\Games\CloverStonesNG\debug_log("FATAL EXCEPTION: " . $e->getMessage() . " File: " . $e->getFile() . " Line: " . $e->getLine() . " Trace: " . substr($e->getTraceAsString(),0,1000));
            $response = json_encode([
                "responseEvent" => "error",
                "responseType" => "general_error",
                "message" => $e->getMessage(),
                "file" => $e->getFile(),
                "line" => $e->getLine(),
            ]);
        }
        
        if (php_sapi_name() !== 'cli') { 
            header('Content-Type: application/json');
        }
        echo $response; 
        \VanguardLTE\Games\CloverStonesNG\debug_log("--- Request Handled ---");
    }

    private function getLineCoords($lineIndex) {
        $lines = [
            [[0,1],[1,1],[2,1],[3,1],[4,1]], [[0,0],[1,0],[2,0],[3,0],[4,0]],
            [[0,2],[1,2],[2,2],[3,2],[4,2]], [[0,0],[1,1],[2,2],[3,1],[4,0]],
            [[0,2],[1,1],[2,0],[3,1],[4,2]], [[0,0],[1,0],[2,1],[3,2],[4,2]],
            [[0,2],[1,2],[2,1],[3,0],[4,0]], [[0,1],[1,0],[2,0],[3,0],[4,1]],
            [[0,1],[1,2],[2,2],[3,2],[4,1]], [[0,0],[1,1],[2,1],[3,1],[4,0]],
            [[0,2],[1,1],[2,1],[3,1],[4,2]], [[0,1],[1,0],[2,1],[3,2],[4,1]],
            [[0,1],[1,2],[2,1],[3,0],[4,1]], [[0,0],[1,1],[2,0],[3,1],[4,0]],
            [[0,2],[1,1],[2,2],[3,1],[4,2]], [[0,0],[1,0],[2,2],[3,0],[4,0]],
            [[0,2],[1,2],[2,0],[3,2],[4,2]], [[0,1],[1,0],[2,2],[3,0],[4,1]],
            [[0,1],[1,2],[2,0],[3,2],[4,1]], [[0,0],[1,1],[2,0],[3,1],[4,0]],
        ];
        return $lines[$lineIndex % count($lines)] ?? null; 
    }

    private function formatReelsForResponse($reels) {
        $outputRows = [];
        $numSymbolsPerReelInResponse = 4; 
        
        if (empty($reels) || !isset($reels['reel1']) || !is_array($reels['reel1'])) {
            \VanguardLTE\Games\CloverStonesNG\debug_log("formatReelsForResponse: Reels data is empty or invalid. Input: " . print_r($reels, true));
             for ($symIdx = 0; $symIdx < $numSymbolsPerReelInResponse; $symIdx++) {
                $outputRows[] = array_fill(0, 5, "0"); 
            }
            return $outputRows;
        }


        for ($symbolDisplayIndex = 0; $symbolDisplayIndex < $numSymbolsPerReelInResponse; $symbolDisplayIndex++) {
            $row = [];
            for ($reelNum = 1; $reelNum <= 5; $reelNum++) { 
                if (isset($reels['reel' . $reelNum][$symbolDisplayIndex])) {
                    $row[] = (string)$reels['reel' . $reelNum][$symbolDisplayIndex];
                } else {
                    \VanguardLTE\Games\CloverStonesNG\debug_log("formatReelsForResponse: Missing symbol data for reel {$reelNum}, index {$symbolDisplayIndex}");
                    $row[] = "0"; 
                }
            }
            $outputRows[] = $row;
        }
        return $outputRows;
    }
}

// Instantiate and run the server logic when this script is executed
$server = new Server();
$server->handleRequest();
