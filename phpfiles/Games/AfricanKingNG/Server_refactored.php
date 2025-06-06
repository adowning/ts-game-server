<?php
namespace VanguardLTE\Games\AfricanKingNG;

set_time_limit(5);
require_once __DIR__ . '/SlotSettings_refactored.php';

class Server_refactored
{
    // Define line configurations statically or load from a config file if they don't change
    private static $linesId = [
        [2,2,2,2,2],[1,1,1,1,1],[3,3,3,3,3],[1,2,3,2,1],[3,2,1,2,3],
        [2,1,2,3,2],[2,3,2,1,2],[1,1,2,3,3],[3,3,2,1,1],[1,2,1,2,1],
        [3,2,3,2,3],[2,1,1,1,2],[1,3,3,3,1],[1,2,2,2,1],[3,2,2,2,3],
        [2,2,1,2,2],[2,2,3,2,2],[1,3,1,3,1],[3,1,3,1,3],[3,1,2,1,3]
    ];

    public function handleRequest()
    {
        $gameName = 'AfricanKingNG';
        $output = ['success' => false, 'error' => null, 'log' => [], 'action' => '', 'response' => null, 'balance' => null, 'state' => null, 'sesId' => session_id() ?: uniqid()];
        $slotSettings = null; // Define here for visibility in catch block
        $reqId = 'unknown_action'; // Default reqId

        try {
            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) throw new \Exception("Failed to read input data.");

            $postData = json_decode($rawInput, true);
            if (json_last_error() !== JSON_ERROR_NONE) throw new \Exception("Invalid JSON input: " . json_last_error_msg());

            $slotSettings = new SlotSettings_refactored($gameName, $postData);
            $output['log'] = array_merge($output['log'], $slotSettings->log); // Initial logs from SlotSettings constructor

            if (isset($postData['gameData']['cmd'])) {
                $reqId = $postData['gameData']['cmd'];
                $actionPayload = $postData['gameData'];
            } elseif (isset($postData['action'])) {
                $reqId = $postData['action'];
                $actionPayload = $postData;
            } else {
                throw new \Exception("Incorrect action specified.");
            }
            $output['action'] = $reqId;

            if (!$slotSettings->is_active()) {
                throw new \Exception("Game is disabled");
            }

            $responseSpecificData = null;

            switch ($reqId) {
                case 'InitRequest':
                    $responseSpecificData = ["id" => 16183084]; // Example static response part
                    $output['action'] = "InitResponce"; // Original server had typo "Responce"
                    break;

                case 'EventsRequest':
                    $responseSpecificData = [];
                     $output['action'] = "EventsResponce"; // Original server had typo "Responce"
                    break;

                case 'APIVersionRequest':
                    $responseSpecificData = ["router" => "v3.12", "transportConfig" => ["reconnectTimeout" => 500000000000]];
                    break;

                case 'CheckBrokenGameRequest':
                     $responseSpecificData = ["haveBrokenGame" => "false"];
                     break;

                case 'AuthRequest':
                    $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0);
                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                    $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                    $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', 0);
                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeBalance', $slotSettings->GetBalance());
                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', 0);
                    $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', -1);

                    $lastEvent = $slotSettings->GetHistory();
                    $initialSymbolsArr = [];
                    $restoreString = "";

                    if ($lastEvent != 'NULL' && is_object($lastEvent) && isset($lastEvent->serverResponse)) {
                        $srv = $lastEvent->serverResponse;
                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $srv->bonusWin ?? 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $srv->totalFreeGames ?? 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', $srv->currentFreeGames ?? 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', $srv->bonusWin ?? 0); // Or totalWin from last spin?
                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusSymbol', $srv->BonusSymbol ?? -1);

                        if (isset($srv->reelsSymbols->reel1) && is_array($srv->reelsSymbols->reel1)) { // Check if reel1 exists and is an array
                            for ($r = 0; $r < 3; $r++) {
                                $rowSymbols = [];
                                for ($c = 1; $c <= 5; $c++) {
                                    $reelProp = 'reel' . $c;
                                    $rowSymbols[] = $srv->reelsSymbols->$reelProp[$r] ?? '0';
                                }
                                $initialSymbolsArr[] = $rowSymbols;
                            }
                        } else if (isset($srv->reelsSymbols->rows) && is_array($srv->reelsSymbols->rows)) { // Alternative structure
                             $initialSymbolsArr = $srv->reelsSymbols->rows;
                        }


                        if (($srv->totalFreeGames ?? 0) > ($srv->currentFreeGames ?? 0)) {
                            $fBonusWin = $srv->bonusWin ?? 0;
                            $fTotal = $srv->totalFreeGames ?? 0;
                            $fCurrent = $srv->currentFreeGames ?? 0;
                            $fRemain = $fTotal - $fCurrent;
                            $initialSymbolsJson = json_encode($initialSymbolsArr);
                            $restoreString = ',"restoredGameCode":"340","lastResponse":{"spinResult":{"type":"SpinResult","rows":' . $initialSymbolsJson . '},"freeSpinsTotal":"' . $fTotal . '","freeSpinRemain":"' . $fRemain . '","totalBonusWin":"' . $fBonusWin . '","state":"FreeSpins","expandingSymbols":["1"]}'; // Assuming '1' is default expanding symbol
                        }
                    } else {
                        $reels = $slotSettings->GetReelStrips('none', 'bet');
                        for ($r = 0; $r < 3; $r++) {
                            $rowSymbols = [];
                            for ($c = 1; $c <= 5; $c++) $rowSymbols[] = $reels['reel' . $c][$r] ?? '0';
                            $initialSymbolsArr[] = $rowSymbols;
                        }
                        $slotSettings->SetGameData($slotSettings->slotId . 'initialSymbols', json_encode($initialSymbolsArr));
                    }
                    if (empty($initialSymbolsArr)) { // Ensure initialSymbolsArr is populated
                        $reels = $slotSettings->GetReelStrips('none', 'bet');
                         for ($r = 0; $r < 3; $r++) {
                            $rowSymbols = [];
                            for ($c = 1; $c <= 5; $c++) $rowSymbols[] = $reels['reel' . $c][$r] ?? '0';
                            $initialSymbolsArr[] = $rowSymbols;
                        }
                    }


                    $payouts = [];
                    foreach ($slotSettings->Paytable as $symKey => $payline) {
                        $symbol = str_replace('SYM_', '', $symKey);
                        for ($i = 0; $i < count($payline); $i++) {
                            if ($payline[$i] > 0) {
                                $payouts[] = ["payout" => (string)$payline[$i], "symbols" => array_fill(0, $i + 1, $symbol), "type" => ($symbol == '9' ? "scatter" : "basic")];
                            }
                        }
                    }
                    // Available lines definition from original game
                    $availableLines = [["1","1","1","1","1"],["0","0","0","0","0"],["2","2","2","2","2"],["0","1","2","1","0"],["2","1","0","1","2"],["1","0","1","2","1"],["1","2","1","0","1"],["0","0","1","2","2"],["2","2","1","0","0"],["0","1","0","1","0"],["2","1","2","1","2"],["1","0","0","0","1"],["1","2","2","2","1"],["0","1","1","1","0"],["2","1","1","1","2"],["1","1","0","1","1"],["1","1","2","1","1"],["0","2","0","2","0"],["2","0","2","0","2"],["2","0","1","0","2"]];

                    $authData = [
                        "snivy" => "proxy v6.10.48 (API v4.23)", "supportedFeatures" => ["Offers", "Jackpots", "InstantJackpots", "SweepStakes"],
                        "sessionId" => $output['sesId'], "defaultLines" => array_map('strval', range(0, 19)),
                        "bets" => $slotSettings->Bet, "betMultiplier" => "1.5000000", "defaultBet" => $slotSettings->Bet[0] ?? "1",
                        "defaultCoinValue" => $slotSettings->CurrentDenom, "coinValues" => [$slotSettings->CurrentDenom],
                        "gameParameters" => ["availableLines" => $availableLines, "rtp" => $slotSettings->GetPercent() . "%", "payouts" => $payouts, "initialSymbols" => $initialSymbolsArr],
                        "jackpotsEnabled" => "true", "gameModes" => "[]"
                    ];
                    // Manually construct JSON for AuthResponse to include restoreString correctly
                    $responseSpecificJson = '{"action":"AuthResponse","result":"true","sesId":"' . $output['sesId'] . '","data":' . json_encode($authData) . $restoreString . '}';
                    // Since responseSpecificData is usually an array, we'll set it to be the JSON string for this specific case.
                    // This is a bit of a hack; ideally, the structure of $responseSpecificData should be consistent.
                    $responseSpecificData = json_decode($responseSpecificJson, true)['data']; // Keep it as array for consistency in $output
                    if($restoreString) $responseSpecificData['restoredGameCode'] = "340"; // Add fields from restoreString
                    if(isset(json_decode($restoreString,true)['lastResponse'])) $responseSpecificData['lastResponse'] = json_decode($restoreString,true)['lastResponse'];


                    break;

                case 'BalanceRequest':
                    $responseSpecificData = ["entries" => "0.00", "totalAmount" => (string)$slotSettings->GetBalance(), "currency" => $slotSettings->currency];
                    break;

                case 'PickBonusItemRequest':
                    $itemIndex = $actionPayload['data']['index'];
                    $items = $slotSettings->GetGameData($slotSettings->slotId . 'Items') ?: [];
                    $bonusState = $slotSettings->GetGameData($slotSettings->slotId . 'BonusState');
                    $picksLeft = $slotSettings->GetGameData($slotSettings->slotId . 'Picks') ?: 0;
                    $selectedItems = $slotSettings->GetGameData($slotSettings->slotId . 'SelectedItems') ?: [];

                    if ($bonusState != 2) { // Not in pick bonus state
                        throw new \Exception("Not in PickBonus state or invalid bonus state.");
                    }
                    if (in_array($itemIndex, $selectedItems)) {
                        throw new \Exception("Item already selected.");
                    }

                    $selectedItems[] = $itemIndex;
                    $picksLeft--;

                    $itemValues = [1, 2, 3]; // Possible item values (e.g., free spins)
                    shuffle($itemValues);
                    $wonValue = $itemValues[0]; // Player wins this many additional free spins

                    $currentFreeGames = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') ?: 0;
                    $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $currentFreeGames + $wonValue);

                    $pickResponse = [];
                    $pickResponse['lastPick'] = ($picksLeft == 0) ? 'true' : 'false';
                    $pickResponse['bonusItem'] = ["type" => "IndexedItem", "index" => (string)$itemIndex, "value" => "1" . $wonValue, "picked" => "true"]; // value format from original

                    $items[] = $pickResponse['bonusItem']; // Add current pick to items list

                    if ($picksLeft == 0) {
                        $pickResponse['state'] = 'FreeSpins';
                        $totalFreeSpins = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames');
                        $pickResponse['params'] = ["freeSpins" => (string)$totalFreeSpins, "multiplier" => "1", "freeSpinRemain" => (string)$totalFreeSpins, "freeSpinsTotal" => (string)$totalFreeSpins];

                        // Reveal unpicked items
                        for ($i = 1; $i <= 25; $i++) { // Assuming 25 items total
                            if (!in_array($i, $selectedItems)) {
                                shuffle($itemValues);
                                $items[] = ["type" => "IndexedItem", "index" => (string)$i, "value" => "1" . $itemValues[0], "picked" => "false"];
                            }
                        }
                        $pickResponse['items'] = $items;
                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusState', 0); // End bonus state
                    } else {
                        $pickResponse['state'] = 'PickBonus';
                        $pickResponse['params'] = ["freeSpins" => (string)$slotSettings->GetGameData($slotSettings->slotId . 'FreeGames')];
                        // No 'items' array in response if not last pick, as per original
                    }

                    $slotSettings->SetGameData($slotSettings->slotId . 'Picks', $picksLeft);
                    $slotSettings->SetGameData($slotSettings->slotId . 'Items', $items); // Save revealed/picked items
                    $slotSettings->SetGameData($slotSettings->slotId . 'SelectedItems', $selectedItems);

                    $responseSpecificData = $pickResponse;
                    break;


                case 'SpinRequest':
                case 'FreeSpinRequest':
                    $linesPlayedCount = $actionPayload['data']['lineCnt'] ?? 20; // Default to 20 lines if not specified
                    $activeLineIndices = $actionPayload['data']['lines'] ?? array_keys(array_slice(self::$linesId, 0, $linesPlayedCount)); // Get indices of lines played

                    $betPerLine = $actionPayload['data']['coin'] * $actionPayload['data']['bet'];
                    $totalBet = $betPerLine * $linesPlayedCount;
                    $currentSlotEvent = ($reqId == 'FreeSpinRequest') ? 'freespin' : 'bet';
                    $bonusMultiplier = 1;

                    if ($currentSlotEvent == 'bet') {
                        if ($slotSettings->GetBalance() < $totalBet && ($slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') ?? 0) <= 0) {
                            throw new \Exception("Invalid balance for SpinRequest");
                        }
                        $slotSettings->SetBalance(-1 * $totalBet, 'bet');
                        $bankSum = $totalBet / 100 * $slotSettings->GetPercent();
                        $slotSettings->SetBank('bet', $bankSum, 'bet');
                        $slotSettings->UpdateJackpots($totalBet);

                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', 0);
                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeBalance', $slotSettings->GetBalance());
                        $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', 0);
                    } else { // freespin
                        $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', ($slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') ?? 0) + 1);
                        $bonusMultiplier = $slotSettings->slotFreeMpl ?? 1;
                    }

                    $winTypeTmp = $slotSettings->GetSpinSettings($currentSlotEvent, $betPerLine, $linesPlayedCount);
                    $winType = $winTypeTmp[0];
                    $spinWinLimit = $winTypeTmp[1];

                    $totalWin = 0;
                    $lineWinsData = [];
                    $finalReels = null;
                    $scattersCount = 0;
                    $reelsForLoop = null;

                    for ($i = 0; $i <= 2000; $i++) {
                        $totalWin = 0; // Reset for each attempt in loop
                        $lineWinsData = [];
                        $scattersCount = 0;
                        $scattersPos = [];

                        $reelsForLoop = $slotSettings->GetReelStrips($winType, $currentSlotEvent);
                        if ($currentSlotEvent == 'freespin') { // Original logic to force a wild reel during freespin
                            $rreel = rand(1, 5);
                            $reelsForLoop['reel' . $rreel][0] = '1'; // Assuming '1' is a wild symbol
                            $reelsForLoop['reel' . $rreel][1] = '1';
                            $reelsForLoop['reel' . $rreel][2] = '1';
                        }

                        list($currentTotalWin, $currentLineWinsData, $currentScattersCount, $currentScattersPos) = $this->calculateWins(
                            $reelsForLoop, $betPerLine, $linesPlayedCount, $slotSettings, $bonusMultiplier, $activeLineIndices
                        );
                        $totalWin = $currentTotalWin;
                        $lineWinsData = $currentLineWinsData;
                        $scattersCount = $currentScattersCount;
                        // $scattersPos = $currentScattersPos; // Not directly used in break logic here

                        // Break conditions from original server
                        if ($i > 1000) $winType = 'none'; // Force 'none' type after many attempts
                        if ($i > 1500) throw new \Exception("Bad Reel Strip / Spin loop timeout. TotalWin: " . $totalWin);

                        if ($slotSettings->MaxWin > 0 && ($totalWin * $slotSettings->CurrentDenom) > $slotSettings->MaxWin) {
                            // Win exceeds max win, re-spin
                        } else {
                            $minWin = $slotSettings->GetRandomPay(); // This might be a very small value or 0
                            if ($i > 700) $minWin = 0; // Disable minWin forcing after 700 attempts

                            if ($slotSettings->increaseRTP && $winType == 'win' && $totalWin < ($minWin * $totalBet)) {
                                // RTP increase logic, try again if win is too low
                            } else {
                                if ($scattersCount >= 2 && $winType != 'bonus') { // Original had: if ($scattersCount >= 3 && $winType != 'bonus')
                                    // If enough scatters but not a bonus type, might re-spin or break depending on game rules
                                    // Original just continues, so we might break if this is a desired outcome for non-bonus
                                    if ($totalWin <= $spinWinLimit) break; // Or some other condition
                                } else if ($totalWin <= $spinWinLimit && $winType == 'bonus') {
                                    $cBank = $slotSettings->GetBank($currentSlotEvent);
                                    if ($cBank < $spinWinLimit) $spinWinLimit = $cBank; else break;
                                } else if ($totalWin > 0 && $totalWin <= $spinWinLimit && $winType == 'win') {
                                    $cBank = $slotSettings->GetBank($currentSlotEvent);
                                    if ($cBank < $spinWinLimit) $spinWinLimit = $cBank; else break;
                                } else if ($totalWin == 0 && $winType == 'none') {
                                    break;
                                }
                            }
                        }
                    }
                    $finalReels = $reelsForLoop; // Reels from the last iteration of the loop

                    if ($totalWin > 0) {
                        $slotSettings->SetBalance($totalWin);
                        $slotSettings->SetBank($currentSlotEvent, -1 * $totalWin);
                    }

                    $reportWin = $totalWin;
                    if ($currentSlotEvent == 'freespin') {
                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', ($slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') ?? 0) + $totalWin);
                        // TotalWin for freespin is cumulative within the bonus round
                        $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', ($slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') ?? 0));
                    } else {
                        $slotSettings->SetGameData($slotSettings->slotId . 'TotalWin', $totalWin);
                    }

                    $currentFreeGames = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') ?? 0;
                    $currentFreeGameCount = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') ?? 0;
                    $gameState = ($currentFreeGames > $currentFreeGameCount && $currentSlotEvent == 'freespin') ? "FreeSpins" : "Ready";


                    if ($scattersCount >= 3 && $slotSettings->slotBonus) {
                        $gameState = 'PickBonus'; // Transition to PickBonus state
                        $slotSettings->SetGameData($slotSettings->slotId . 'Picks', 3); // Set number of picks
                        $slotSettings->SetGameData($slotSettings->slotId . 'BonusState', 2); // Set bonus state to PickBonus
                        $slotSettings->SetGameData($slotSettings->slotId . 'SelectedItems', []);
                        $slotSettings->SetGameData($slotSettings->slotId . 'Items', []); // Clear items for new bonus round

                        // If it's not a freespin event that triggers bonus, set initial free games from scatter trigger
                        if ($currentSlotEvent != 'freespin') {
                            $slotSettings->SetGameData($slotSettings->slotId . 'FreeStartWin', $totalWin);
                            $slotSettings->SetGameData($slotSettings->slotId . 'BonusWin', $totalWin); // BonusWin starts with trigger win
                             // Initial free games from slotFreeCount is handled by PickBonus logic now
                            // $slotSettings->SetGameData($slotSettings->slotId . 'FreeGames', $slotSettings->slotFreeCount);
                            $slotSettings->SetGameData($slotSettings->slotId . 'CurrentFreeGame', 0); // Reset for new FS round
                        }
                         // Add scatter win to lineWinsData if it's a bonus trigger
                        if(isset($slotSettings->Paytable['SYM_9'][$scattersCount-1]) && $slotSettings->Paytable['SYM_9'][$scattersCount-1] > 0) {
                            $scatterPay = $slotSettings->Paytable['SYM_9'][$scattersCount-1] * $totalBet; // Scatter usually on total bet
                            // This might double count if calculateWins already added scatter to totalWin and lineWinsData
                            // Ensure calculateWins returns distinct line wins and scatter wins or adjust here.
                            // For now, assuming calculateWins included it.
                            // If PickBonus is triggered, the scatter win might be part of a "Bonus" type win string
                            // $lineWinsData[] = '{"type":"Bonus","bonusName":"PickBonus","params":{"fields":"25","freeSpins":"' . $slotSettings->slotFreeCount.'"},"amount":"'.$scatterPay.'","wonSymbols":['.implode(',', $currentScattersPos).']}';
                        }
                    }


                    $reelsSymbolsForResponse = [];
                    for ($r = 0; $r < 3; $r++) {
                        $row = [];
                        for ($c = 1; $c <= 5; $c++) $row[] = $finalReels['reel' . $c][$r] ?? '0';
                        $reelsSymbolsForResponse[] = $row;
                    }

                    $spinResponseData = [
                        "spinResult" => ["type" => "SpinResult", "rows" => $reelsSymbolsForResponse],
                        "state" => $gameState, // Updated based on scatter trigger
                    ];
                    if ($totalWin > 0) {
                        $spinResponseData["slotWin"] = ["totalWin" => (string)$totalWin, "lineWinAmounts" => $lineWinsData, "canGamble" => "false"];
                    }

                    // Add free spin specific data to response if in free spins
                    if ($gameState == "FreeSpins" || $currentSlotEvent == 'freespin') {
                         $currentFreeGames = $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') ?? 0;
                         $currentFreeGameCount = $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') ?? 0;
                        $spinResponseData["totalBonusWin"] = (string)($slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') ?? 0);
                        $spinResponseData["freeSpinRemain"] = (string)max(0, $currentFreeGames - $currentFreeGameCount);
                        $spinResponseData["freeSpinsTotal"] = (string)$currentFreeGames;
                        if ($currentFreeGames <= $currentFreeGameCount && $currentFreeGames > 0) { // Last free spin completed
                            $spinResponseData["state"] = "Ready"; // Transition back to Ready
                            $initialSymbolsForBase = $slotSettings->GetGameData($slotSettings->slotId . 'initialSymbols');
                            if ($initialSymbolsForBase) {
                                // $spinResponseData["gameParameters"]["initialSymbols"] = json_decode($initialSymbolsForBase, true);
                            }
                        }
                    }

                    // Store initial symbols for next base game if current spin is not freespin and not triggering bonus
                    if ($currentSlotEvent == 'bet' && $gameState != 'PickBonus') {
                        $slotSettings->SetGameData($slotSettings->slotId . 'initialSymbols', json_encode($reelsSymbolsForResponse));
                    }

                    $output['action'] = ($currentSlotEvent == 'freespin') ? "FreeSpinResponse" : "SpinResponse";
                    $responseSpecificData = $spinResponseData;

                    // Construct server response for logging (mimicking original format)
                    $logResponse = [
                        "responseEvent" => "spin", "responseType" => $currentSlotEvent,
                        "serverResponse" => [
                            "BonusSymbol" => $slotSettings->GetGameData($slotSettings->slotId . 'BonusSymbol'),
                            "slotLines" => $linesPlayedCount, "slotBet" => $betPerLine,
                            "totalFreeGames" => $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') ?? 0,
                            "currentFreeGames" => $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') ?? 0,
                            "Balance" => $slotSettings->GetBalance(), "afterBalance" => $slotSettings->GetBalance(),
                            "bonusWin" => $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') ?? 0,
                            "freeStartWin" => $slotSettings->GetGameData($slotSettings->slotId . 'FreeStartWin') ?? 0,
                            "totalWin" => $totalWin, "winLines" => [], "bonusInfo" => [], // winLines and bonusInfo might need population
                            "Jackpots" => $slotSettings->Jackpots,
                            "reelsSymbols" => $finalReels // Original structure with rp, reel1 etc.
                        ]
                    ];
                    $slotSettings->SaveLogReport(json_encode($logResponse), $totalBet, $linesPlayedCount, $reportWin, $currentSlotEvent);
                    break;

                default:
                    throw new \Exception("Unknown request ID: " . $reqId);
            }

            $gameResult = $slotSettings->getResult();
            $output['log'] = array_merge($output['log'], $gameResult['log']); // Merge logs from slotSettings execution

            $output['balance'] = $gameResult['balance'] ?? $slotSettings->GetBalance();
            $output['state'] = [
                'slotViewState' => $slotSettings->slotViewState,
                'freeSpinsLeft' => max(0, ($slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') ?? 0) - ($slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') ?? 0)),
                'totalFreeSpins' => $slotSettings->GetGameData($slotSettings->slotId . 'FreeGames') ?? 0,
                'currentFreeSpin' => $slotSettings->GetGameData($slotSettings->slotId . 'CurrentFreeGame') ?? 0,
                'bonusWin' => $slotSettings->GetGameData($slotSettings->slotId . 'BonusWin') ?? 0,
                'bonusState' => $slotSettings->GetGameData($slotSettings->slotId . 'BonusState') ?? 0, // For PickBonus
                'picksLeft' => $slotSettings->GetGameData($slotSettings->slotId . 'Picks') ?? 0,     // For PickBonus
            ];
            $output['response'] = $responseSpecificData;
            $output['success'] = true;

        } catch (\Exception $e) {
            $output['error'] = ['message' => $e->getMessage(), 'code' => $e->getCode(), 'file' => $e->getFile(), 'line' => $e->getLine()];
            $output['success'] = false;
            if ($slotSettings instanceof SlotSettings_refactored) {
                 $slotSettings->InternalErrorSilent($e); // Log exception to SlotSettings log
                 $gameResult = $slotSettings->getResult();
                 $output['log'] = array_merge($output['log'], $gameResult['log']);
            } else {
                 $output['log'][] = ['type' => 'exception_early', 'data' => $output['error']];
            }
        }

        header('Content-Type: application/json');
        echo json_encode($output);
        exit;
    }

    private function calculateWins($reels, $betPerLine, $numLinesPlayed, $slotSettings, $bonusMpl, $activeLinesIndices) {
        $totalWin = 0;
        $lineWinsOutput = [];
        $scattersCount = 0;
        $scattersPos = [];

        $wildSymbols = ['0', '1'];
        $scatterSymbol = '9';

        // $cWins is used in original to track max win for a line, useful if multiple symbol types could win on same line
        $cWins = array_fill(0, count(self::$linesId), 0);


        foreach ($activeLinesIndices as $lineIdx) {
            if (!isset(self::$linesId[$lineIdx])) continue;
            $currentLineDef = self::$linesId[$lineIdx];
            $tmpStringWin = ''; // Stores the JSON string for the winning line

            // Iterate through each symbol in the game's paytable (excluding scatter)
            foreach ($slotSettings->SymbolGame as $csym) {
                if ($csym == $scatterSymbol || !isset($slotSettings->Paytable['SYM_' . $csym])) continue;

                $s = []; // Symbols on the current payline
                $p = []; // Positions of symbols on the current payline (for JSON output)
                for($reelI = 0; $reelI < 5; $reelI++){
                    $s[$reelI] = $reels['reel' . ($reelI + 1)][$currentLineDef[$reelI] - 1];
                    $p[$reelI] = $currentLineDef[$reelI] - 1;
                }

                // Check for wins from left to right (5, 4, 3, 2 symbols)
                for ($matchCount = 5; $matchCount >= 1; $matchCount--) {
                    if ($slotSettings->Paytable['SYM_' . $csym][$matchCount-1] > 0) { // Check if payout exists for this symbol and count
                        $isMatch = true;
                        $effectiveWildsThisMatch = 0;
                        $actualMatchedSymbol = $csym;

                        for ($k = 0; $k < $matchCount; $k++) {
                            if ($s[$k] == $csym) { // Direct match
                            } else if (in_array($s[$k], $wildSymbols)) { // Wild match
                                $effectiveWildsThisMatch++;
                            } else {
                                $isMatch = false; // No match for this symbol at this position
                                break;
                            }
                        }

                        if ($isMatch) {
                            // Original logic: if all symbols in match are wild, it might not count for specific symbol, or has special rule
                            // $allWildsInMatch = ($effectiveWildsThisMatch == $matchCount);
                            // if($allWildsInMatch && specific_condition_for_all_wilds) continue;

                            $currentSymbolPayout = $slotSettings->Paytable['SYM_' . $csym][$matchCount-1];
                            $winAmount = $currentSymbolPayout * $betPerLine * $bonusMpl;

                            // Wild Multiplier application (if any wilds contributed and it's not all wilds for a symbol that doesn't pay all wilds)
                            if ($effectiveWildsThisMatch > 0 && $slotSettings->slotWildMpl > 1 /*&& !allWildsInMatch*/) {
                                // This condition was: (in_array($s[0], $wild) || ... ) - check if any symbol in the match length is wild
                                $hasWildInActiveMatch = false;
                                for($wm=0; $wm < $matchCount; $wm++) if(in_array($s[$wm], $wildSymbols)) $hasWildInActiveMatch = true;

                                if($hasWildInActiveMatch && $effectiveWildsThisMatch < $matchCount) { // if there's a mix of actual symbol and wild
                                   // $winAmount *= $slotSettings->slotWildMpl;
                                } else if ($effectiveWildsThisMatch == $matchCount && $csym == '0') { // Original game specific: if lion (SYM_0) is made of wilds
                                    // $winAmount *= $slotSettings->slotWildMpl; // Or specific multiplier
                                }
                            }


                            if ($cWins[$lineIdx] < $winAmount) { // Check if this win is greater than previously found win on this line
                                $cWins[$lineIdx] = $winAmount;
                                $wonSymbolsJson = [];
                                for ($symPos = 0; $symPos < $matchCount; $symPos++) {
                                    $wonSymbolsJson[] = '["' . $symPos . '","' . $p[$symPos] . '"]';
                                }
                                $tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' . $lineIdx . '","amount":"' . $winAmount . '","wonSymbols":[' . implode(',', $wonSymbolsJson) . ']}';
                            }
                        }
                    }
                }
            }
            if ($cWins[$lineIdx] > 0 && $tmpStringWin != '') {
                $lineWinsOutput[] = $tmpStringWin;
                $totalWin += $cWins[$lineIdx];
            }
        }

        // Scatter calculation (based on total count on all reels)
        $scatterPositionsFound = [];
        for ($r = 0; $r < 3; $r++) { // Iterate all visible reel positions (3 rows)
            for ($c = 1; $c <= 5; $c++) { // 5 reels
                if (isset($reels['reel' . $c][$r]) && $reels['reel' . $c][$r] == $scatterSymbol) {
                    $scattersCount++;
                    $scatterPositionsFound[] = '["' . ($c - 1) . '","' . $r . '"]';
                }
            }
        }

        if ($scattersCount > 0 && isset($slotSettings->Paytable['SYM_' . $scatterSymbol][$scattersCount -1]) && $slotSettings->Paytable['SYM_' . $scatterSymbol][$scattersCount-1] > 0) {
            $scatterWinMultiplier = $slotSettings->Paytable['SYM_' . $scatterSymbol][$scattersCount-1];
             // Scatter wins are often multiplied by total bet in many games, not betPerLine. Original used $betLine * $lines.
            $scatterWinAmount = $scatterWinMultiplier * ($betPerLine * $numLinesPlayed) * $bonusMpl;
            $totalWin += $scatterWinAmount;
            if ($scatterWinAmount > 0) {
                 $lineWinsOutput[] = '{"type":"ScatterWinAmount","amount":"' . $scatterWinAmount . '","wonSymbols":[' . implode(',', $scatterPositionsFound) . ']}';
            }
        }

        return [$totalWin, $lineWinsOutput, $scattersCount, $scatterPositionsFound];
    }
}

// Example of how to call it (remove or comment out for library use)
// if ($_SERVER['REQUEST_METHOD'] === 'POST' || isset($_GET['action'])) {
//     $server = new Server_refactored();
//     $server->handleRequest();
// }
?>
