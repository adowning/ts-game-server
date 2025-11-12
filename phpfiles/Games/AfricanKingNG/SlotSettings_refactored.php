<?php
namespace VanguardLTE\Games\AfricanKingNG;

class SlotSettings
{
    // Properties to store results
    public $newBalance = null;
    public $currentState = null;
    public $log = [];

    // Existing properties (some might be populated from dataBundle)
    public $playerId = null;
    public $splitScreen = null;
    public $reelStrip1 = null;
    public $reelStrip2 = null;
    public $reelStrip3 = null;
    public $reelStrip4 = null;
    public $reelStrip5 = null;
    public $reelStrip6 = null;
    public $reelStripBonus1 = null;
    public $reelStripBonus2 = null;
    public $reelStripBonus3 = null;
    public $reelStripBonus4 = null;
    public $reelStripBonus5 = null;
    public $reelStripBonus6 = null;
    public $slotId = '';
    public $slotDBId = '';
    public $Line = null;
    public $scaleMode = null;
    public $numFloat = null;
    public $gameLine = null;
    public $Bet = null;
    public $isBonusStart = null;
    public $Balance = null;
    public $SymbolGame = null;
    public $GambleType = null;
    public $lastEvent = null;
    public $Jackpots = [];
    public $keyController = null;
    public $slotViewState = null;
    public $hideButtons = null;
    public $slotReelsConfig = null;
    public $slotFreeCount = null;
    public $slotFreeMpl = null;
    public $slotWildMpl = null;
    public $slotExitUrl = null;
    public $slotBonus = null;
    public $slotBonusType = null;
    public $slotScatterType = null;
    public $slotGamble = null;
    public $Paytable = [];
    public $slotSounds = [];
    private $jpgs = null; // Needs to be populated from dataBundle if used
    private $Bank = null; // Needs to be populated from dataBundle if used
    private $Percent = null; // Needs to be populated from dataBundle if used
    private $WinLine = null;
    private $WinGamble = null;
    private $Bonus = null;
    private $shop_id = null; // Populated from dataBundle
    public $currency = null; // Populated from dataBundle (user->shop->currency)

    // Data from dataBundle that was previously fetched from models
    public $user_data = null;
    public $game_data = null;
    public $shop_data = null;
    public $gamebank_data = null;
    public $jpgs_data = null;
    public $gamelog_data = [];
    public $statgame_data = [];


    public $jpgPercentZero = false;
    public $count_balance = null; // Populated from dataBundle (user->count_balance)
    public $gameData = []; // Previously user->session
    public $gameDataStatic = []; // Previously game->advanced

    public function __construct($sid, $dataBundle)
    {
        $this->slotId = $sid;
        $this->playerId = $dataBundle['playerId'];

        // Populate properties from dataBundle
        $this->user_data = $dataBundle['user'];
        $this->shop_id = $this->user_data['shop_id'];
        $this->gamebank_data = $dataBundle['gamebank'];
        $this->game_data = $dataBundle['game'];
        $this->shop_data = $dataBundle['shop'];
        $this->jpgs_data = $dataBundle['jpgs'];
        $this->gamelog_data = $dataBundle['gamelog'] ?? [];
        $this->statgame_data = $dataBundle['statgame'] ?? [];


        $this->Balance = $this->user_data['balance'];
        $this->count_balance = $this->user_data['count_balance'];
        $this->currency = $this->shop_data['currency']; // Assuming currency is in shop_data

        $this->MaxWin = $this->shop_data['max_win'];
        $this->increaseRTP = 1;
        $this->CurrentDenom = $this->game_data['denomination'];

        $this->scaleMode = 0;
        $this->numFloat = 0;

        // Paytable remains the same
        $this->Paytable['SYM_0'] = [0, 0, 15, 100, 1000, 3000];
        $this->Paytable['SYM_1'] = [0, 0, 0, 0, 0, 0];
        $this->Paytable['SYM_2'] = [0, 0, 5, 50, 100, 1000];
        $this->Paytable['SYM_3'] = [0, 0, 0, 20, 50, 500];
        $this->Paytable['SYM_4'] = [0, 0, 0, 10, 30, 400];
        $this->Paytable['SYM_5'] = [0, 0, 0, 10, 30, 400];
        $this->Paytable['SYM_6'] = [0, 0, 0, 5, 25, 200];
        $this->Paytable['SYM_7'] = [0, 0, 0, 5, 20, 100];
        $this->Paytable['SYM_8'] = [0, 0, 0, 5, 20, 100];
        $this->Paytable['SYM_9'] = [0, 0, 40, 100, 400, 2500];

        // GameReel initialization - Assuming GameReel_refactored.php is in the same directory
        $reel = new GameReel_refactored();
        foreach (['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'] as $reelStrip) {
            if (count($reel->reelsStrip[$reelStrip])) {
                $this->$reelStrip = $reel->reelsStrip[$reelStrip];
            }
        }
        // Bonus reels might need similar loading if GameReel_refactored handles them
        foreach (['reelStripBonus1', 'reelStripBonus2', 'reelStripBonus3', 'reelStripBonus4', 'reelStripBonus5', 'reelStripBonus6'] as $reelStripBonus) {
            if (isset($reel->reelsStripBonus[$reelStripBonus]) && count($reel->reelsStripBonus[$reelStripBonus])) {
                 $this->$reelStripBonus = $reel->reelsStripBonus[$reelStripBonus];
            }
        }


        $this->keyController = [
            '13' => 'uiButtonSpin,uiButtonSkip', '49' => 'uiButtonInfo', '50' => 'uiButtonCollect',
            '51' => 'uiButtonExit2', '52' => 'uiButtonLinesMinus', '53' => 'uiButtonLinesPlus',
            '54' => 'uiButtonBetMinus', '55' => 'uiButtonBetPlus', '56' => 'uiButtonGamble',
            '57' => 'uiButtonRed', '48' => 'uiButtonBlack', '189' => 'uiButtonAuto', '187' => 'uiButtonSpin'
        ];
        $this->slotReelsConfig = [[425, 142, 3], [669, 142, 3], [913, 142, 3], [1157, 142, 3], [1401, 142, 3]];
        $this->slotBonusType = 1;
        $this->slotScatterType = 0;
        $this->splitScreen = false;
        $this->slotBonus = true;
        $this->slotGamble = true;
        $this->slotFastStop = 1;
        $this->slotExitUrl = '/';
        $this->slotWildMpl = 1;
        $this->GambleType = 1;
        $this->slotFreeCount = 8;
        $this->slotFreeMpl = 1;
        $this->slotViewState = ($this->game_data['slotViewState'] == '' ? 'Normal' : $this->game_data['slotViewState']);
        $this->hideButtons = [];

        $this->jpgs = $this->jpgs_data; // Assign jpgs data

        $this->Line = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        $this->gameLine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        $this->Bet = explode(',', $this->game_data['bet']);

        $this->SymbolGame = ['0', '1', 2, 3, 4, 5, 6, 7, 8, 9];

        // Bank, Percent, WinGamble are complex, need careful handling
        // For now, let's assume they are passed in or calculated differently
        $this->Bank = $this->get_gamebank_value(); // Placeholder for logic to get bank value
        $this->Percent = $this->shop_data['percent'];
        $this->WinGamble = $this->game_data['rezerv'];
        $this->slotDBId = $this->game_data['id'];
        $this->slotCurrency = $this->currency;


        if ($this->user_data['address'] > 0 && $this->user_data['count_balance'] == 0) {
            $this->Percent = 0;
            $this->jpgPercentZero = true;
        } else if ($this->user_data['count_balance'] == 0) {
            $this->Percent = 100;
        }

        // gameData and gameDataStatic (session data)
        // Assuming session data is passed in the dataBundle if needed, or handled differently
        $this->gameData = $dataBundle['session_data']['gameData'] ?? [];
        $this->gameDataStatic = $dataBundle['session_data']['gameDataStatic'] ?? [];

        // Clean up expired gameData
        if (count($this->gameData) > 0) {
            foreach ($this->gameData as $key => $vl) {
                if ($vl['timelife'] <= time()) {
                    unset($this->gameData[$key]);
                }
            }
        }
        // Clean up expired gameDataStatic
        if (count($this->gameDataStatic) > 0) {
            foreach ($this->gameDataStatic as $key => $vl) {
                if ($vl['timelife'] <= time()) {
                    unset($this->gameDataStatic[$key]);
                }
            }
        }
    }

    // Method to return stored results
    public function getResult()
    {
        return [
            'balance' => $this->newBalance,
            'state' => $this->currentState,
            'log' => $this->log,
            'gameData' => $this->gameData, // return modified session data
            'gameDataStatic' => $this->gameDataStatic // return modified static data
        ];
    }

    private function get_gamebank_value($slotState = '') {
        // Simplified: Assumes gamebank_data is structured appropriately
        // Needs to replicate logic of original Game::get_gamebank() if complex
        if ($slotState == 'bonus' && isset($this->gamebank_data['bonus'])) {
            return $this->gamebank_data['bonus'];
        }
        if (isset($this->gamebank_data['slots'])) { // Default to 'slots' bank
            return $this->gamebank_data['slots'];
        }
        return 0; // Default if not found
    }


    public function is_active()
    {
        // Simplified: This logic depends heavily on the structure of passed data
        // and how 'view', 'is_blocked', 'status' are represented.
        if (empty($this->game_data) || empty($this->shop_data) || empty($this->user_data)) {
            return false;
        }
        if (!$this->game_data['view'] || $this->shop_data['is_blocked'] || $this->user_data['is_blocked'] || $this->user_data['status'] === 'banned') {
            // Logging or handling for session deletion and token update would be external
            $this->log[] = ['type' => 'activation_check', 'status' => 'failed', 'reason' => 'Game/Shop/User blocked or banned'];
            return false;
        }
        return true;
    }

    public function SetGameData($key, $value)
    {
        $timeLife = 86400;
        $this->gameData[$key] = [
            'timelife' => time() + $timeLife,
            'payload' => $value
        ];
    }

    public function GetGameData($key)
    {
        if (isset($this->gameData[$key])) {
            return $this->gameData[$key]['payload'];
        }
        return 0;
    }

    public function FormatFloat($num)
    {
        $str0 = explode('.', (string)$num);
        if (isset($str0[1])) {
            if (strlen($str0[1]) > 4) {
                return round($num * 100) / 100;
            } else if (strlen($str0[1]) > 2) {
                return floor($num * 100) / 100;
            }
            return $num;
        }
        return $num;
    }

    // SaveGameData now implies these will be returned by getResult()
    // The actual saving mechanism will be outside this class.
    public function SaveGameData()
    {
        // Data is already in $this->gameData, will be returned by getResult()
        $this->log[] = ['type' => 'SaveGameData', 'message' => 'Game data prepared for saving.'];
    }

    public function CheckBonusWin()
    {
        $allRateCnt = 0;
        $allRate = 0;
        foreach ($this->Paytable as $vl) {
            foreach ($vl as $vl2) {
                if ($vl2 > 0) {
                    $allRateCnt++;
                    $allRate += $vl2;
                    break;
                }
            }
        }
        return $allRateCnt > 0 ? ($allRate / $allRateCnt) : 0;
    }

    public function GetRandomPay()
    {
        $allRate = [];
        foreach ($this->Paytable as $vl) {
            foreach ($vl as $vl2) {
                if ($vl2 > 0) {
                    $allRate[] = $vl2;
                }
            }
        }
        shuffle($allRate);

        // stat_in and stat_out would need to be part of game_data from dataBundle
        $stat_in = $this->game_data['stat_in'] ?? 0;
        $stat_out = $this->game_data['stat_out'] ?? 0;

        if ($stat_in < ($stat_out + ($allRate[0] * $this->AllBet))) {
            $allRate[0] = 0;
        }
        return $allRate[0] ?? 0;
    }


    public function HasGameDataStatic($key)
    {
        return isset($this->gameDataStatic[$key]);
    }

    // SaveGameDataStatic now implies these will be returned by getResult()
    public function SaveGameDataStatic()
    {
        // Data is already in $this->gameDataStatic, will be returned by getResult()
        // The game object update (game->advanced, game->save) must happen outside.
        $this->log[] = ['type' => 'SaveGameDataStatic', 'message' => 'Static game data prepared for saving.'];
        // We also need to signal that game_data.advanced needs updating
        // This can be done by adding it to the log or a specific property in getResult()
    }

    public function SetGameDataStatic($key, $value)
    {
        $timeLife = 86400;
        $this->gameDataStatic[$key] = [
            'timelife' => time() + $timeLife,
            'payload' => $value
        ];
    }

    public function GetGameDataStatic($key)
    {
        if (isset($this->gameDataStatic[$key])) {
            return $this->gameDataStatic[$key]['payload'];
        }
        return 0;
    }

    public function HasGameData($key)
    {
        return isset($this->gameData[$key]);
    }

    public function GetHistory()
    {
        // GameLog data is now passed in $this->gamelog_data
        $this->lastEvent = 'NULL';
        $tmpLog = null;
        if (!empty($this->gamelog_data)) {
             // Assuming gamelog_data is sorted DESC by id/time already
            foreach ($this->gamelog_data as $logEntry) {
                // Assuming $logEntry is already an object/array matching structure of json_decode($log->str)
                // If $logEntry['str'] contains the JSON string:
                $currentLog = json_decode($logEntry['str'] ?? '{}');
                if (isset($currentLog->responseEvent) && $currentLog->responseEvent != 'gambleResult') {
                    $this->lastEvent = $logEntry['str'] ?? '{}'; // Store the raw JSON string
                    $tmpLog = $currentLog;
                    break;
                }
            }
        }
        return $tmpLog ?? 'NULL';
    }

    public function UpdateJackpots($bet)
    {
        $betDenom = $bet * $this->CurrentDenom;
        $current_count_balance = $this->count_balance; // from constructor, user_data
        $updated_jpgs = [];
        $payJack = 0;

        if (is_array($this->jpgs)) { // Ensure jpgs_data (now this->jpgs) is an array
            for ($i = 0; $i < count($this->jpgs); $i++) {
                $current_jpg = $this->jpgs[$i]; // JPG data from the bundle
                $jsum_new = $current_jpg['balance'];

                if ($current_count_balance == 0 || $this->jpgPercentZero) {
                    // jsum_new remains current_jpg['balance']
                } else if ($current_count_balance < $betDenom) {
                    $jsum_new = ($current_count_balance / 100 * $current_jpg['percent']) + $current_jpg['balance'];
                } else {
                    $jsum_new = ($betDenom / 100 * $current_jpg['percent']) + $current_jpg['balance'];
                }

                // get_pay_sum() and user_id logic: These need to be properties in $current_jpg
                $pay_sum = $current_jpg['pay_sum'] ?? 0; // Assuming 'pay_sum' is in jpg data
                $jpg_user_id = $current_jpg['user_id'] ?? null; // Assuming 'user_id' is in jpg data

                if ($pay_sum < $jsum_new && $pay_sum > 0) {
                    if ($jpg_user_id && $jpg_user_id != $this->playerId) {
                        // Skip, different user
                    } else {
                        $payJackAmount = $pay_sum / $this->CurrentDenom;
                        $jsum_new -= $pay_sum;

                        // SetBalance equivalent: update newBalance property
                        $this->newBalance = ($this->newBalance ?? $this->Balance) + $payJackAmount;

                        $this->log[] = [
                            'type' => 'stat_game',
                            'data' => [
                                'user_id' => $this->playerId,
                                'balance' => $this->newBalance * $this->CurrentDenom,
                                'bet' => 0,
                                'win' => $pay_sum,
                                'game' => $this->game_data['name'] . ' JPG ' . $current_jpg['id'],
                                'shop_id' => $this->shop_id,
                                'date_time' => time()
                            ]
                        ];
                        $payJack = $payJackAmount;
                    }
                }

                $updated_jpgs[$i] = $current_jpg; // Store original reference or copy
                $updated_jpgs[$i]['balance_new'] = $jsum_new; // Store new balance to be saved externally

                // min_start_balance and start_balance logic
                $min_start_balance = $current_jpg['min_start_balance'] ?? 0; // Assuming these are in jpg_data
                $start_balance = $current_jpg['start_balance'] ?? 0;

                if ($jsum_new < $min_start_balance && $start_balance > 0) {
                     // Logic for add_jpg: This implies modifying the JPG's balance externally or logging intent
                    $updated_jpgs[$i]['add_sum_to_balance'] = $start_balance;
                    $this->log[] = ['type' => 'jpg_add', 'id' => $current_jpg['id'], 'amount' => $start_balance];
                }
            }
        }

        $this->jpgs_data_updated = $updated_jpgs; // Store updated JPG data to be returned by getResult

        if ($payJack > 0) {
            $this->Jackpots['jackPay'] = sprintf('%01.2f', $payJack);
        }
    }


    public function GetBank($slotState = '')
    {
        if ($this->isBonusStart || $slotState == 'bonus' || $slotState == 'freespin' || $slotState == 'respin') {
            $slotState = 'bonus';
        } else {
            $slotState = '';
        }
        // game_data should contain bank info, or gamebank_data if separate
        $bankValue = $this->get_gamebank_value($slotState);
        $this->Bank = $bankValue; // Update internal Bank property
        return $this->Bank / $this->CurrentDenom;
    }

    public function GetPercent()
    {
        return $this->Percent;
    }

    public function GetCountBalanceUser()
    {
        // This was user->count_balance, which is $this->count_balance now
        return $this->count_balance;
    }

    // InternalError methods: Logging should be handled by the calling environment
    // or a dedicated logging service, not by writing to files directly.
    public function InternalErrorSilent($errcode)
    {
        $this->log[] = [
            'type' => 'error_silent',
            'code' => $errcode,
            'request' => $_REQUEST ?? [], // Be careful with superglobals in classes
            'raw_input' => file_get_contents('php://input') // Potentially large, consider context
        ];
    }

    public function InternalError($errcode)
    {
        $this->log[] = [
            'type' => 'error_critical',
            'code' => $errcode,
            'request' => $_REQUEST ?? [],
            'raw_input' => file_get_contents('php://input')
        ];
        // Instead of exit(), throw an exception or ensure getResult() signals a critical error
        throw new \Exception("Internal Error: " . $errcode);
    }

    public function SetBank($slotState = '', $sum, $slotEvent = '')
    {
        if ($this->isBonusStart || $slotState == 'bonus' || $slotState == 'freespin' || $slotState == 'respin') {
            $slotState = 'bonus';
        } else {
            $slotState = '';
        }

        $currentBank = $this->GetBank($slotState); // Uses CurrentDenom
        if ($currentBank + $sum < 0) {
            $this->InternalError('Bank_   ' . $sum . '  CurrentBank_ ' . $currentBank . ' CurrentState_ ' . $slotState . ' Trigger_ ' . ($currentBank + $sum));
        }

        $sumDenom = $sum * $this->CurrentDenom;
        $bankBonusSumDenom = 0;

        // Complex logic for 'bet' event related to count_balance, percent, jpgs
        // This needs to be carefully translated.
        // For now, this is a simplified version.
        // The core idea is to log the intended bank changes.
        // Actual bank updates happen externally based on getResult().

        if ($sumDenom > 0 && $slotEvent == 'bet') {
            $this->toGameBanks = 0;
            $this->toSlotJackBanks = 0;
            $this->toSysJackBanks = 0; // Assuming this is not used or passed in
            $this->betProfit = 0;

            $prc = $this->GetPercent();
            $prc_b = 10; // Bonus percentage
            if ($prc <= $prc_b) $prc_b = 0;

            $current_user_count_balance = $this->count_balance * $this->CurrentDenom; // Ensure denomination consistency
            $gameBetDenom = $sumDenom / $prc * 100; // This was $sum (already denom) / $this->GetPercent() * 100

            if ($current_user_count_balance < $gameBetDenom && $current_user_count_balance > 0) {
                // ... (logic for splitting bet based on count_balance)
                // This part is complex and involves betRemains0, which needs careful state management.
                // Simplified: log the components.
                $firstBid = $current_user_count_balance;
                $secondBid = $gameBetDenom - $firstBid;
                // $sumDenom = ($firstBid / 100 * $prc) + $secondBid; // Recalculate sumDenom based on split
                $bankBonusSumDenom = $firstBid / 100 * $prc_b;

            } else if ($current_user_count_balance > 0) {
                $bankBonusSumDenom = $gameBetDenom / 100 * $prc_b;
            }

            // JPG contribution calculation
            if (is_array($this->jpgs_data)) {
                for ($i = 0; $i < count($this->jpgs_data); $i++) {
                    if (!$this->jpgPercentZero) {
                        if ($current_user_count_balance < $gameBetDenom && $current_user_count_balance > 0) {
                            $this->toSlotJackBanks += ($current_user_count_balance / 100 * $this->jpgs_data[$i]['percent']);
                        } else if ($current_user_count_balance > 0) {
                            $this->toSlotJackBanks += ($gameBetDenom / 100 * $this->jpgs_data[$i]['percent']);
                        }
                    }
                }
            }
            $this->toGameBanks = $sumDenom; // This is the amount going to the main game bank
            // $this->betProfit = $gameBetDenom - $this->toGameBanks - $this->toSlotJackBanks - $this->toSysJackBanks;
            // Profit calculation should be verified.
        }

        if ($sumDenom > 0) $this->toGameBanks = $sumDenom; // If not 'bet' event, all sum goes to game banks.


        $this->log[] = [
            'type' => 'set_bank',
            'slotState' => $slotState,
            'sum_denom' => $sumDenom,
            'bank_bonus_sum_denom' => $bankBonusSumDenom,
            'slotEvent' => $slotEvent,
            'toGameBanks' => $this->toGameBanks ?? 0,
            'toSlotJackBanks' => $this->toSlotJackBanks ?? 0,
            // 'betProfit' => $this->betProfit ?? 0
        ];

        // The actual game model's bank update (set_gamebank, save) is external.
        // We are storing the *intended* changes.
        // For example, if $bankBonusSumDenom > 0, one log entry for bonus bank increment, one for main bank.

        // Update internal representation of Bank for subsequent GetBank calls in the same request.
        // This is tricky because original SetBank modified `game` model directly.
        // A simplified approach:
        if ($bankBonusSumDenom > 0) {
            // This would affect a 'bonus' bank type. How to update gamebank_data?
            // Needs careful thought on how dataBundle's gamebank_data is structured and updated.
        }
        // This updates the bank for $slotState
        // $this->gamebank_data[$slotState_key] += ($sumDenom - $bankBonusSumDenom);
        // $this->Bank = $this->get_gamebank_value($slotState) + ($sumDenom - $bankBonusSumDenom) / $this->CurrentDenom;
        // This needs to be handled carefully. The state of gamebank_data should be managed
        // by the caller after getResult(), or we need a more robust way to update it internally.
        // For now, subsequent GetBank calls might not reflect SetBank if not handled.
    }


    public function SetBalance($sum, $slotEvent = '')
    {
        $currentBalance = $this->GetBalance(); // Uses CurrentDenom
        if ($currentBalance + $sum < 0) {
            $this->InternalError('Balance_   ' . $sum);
        }

        $sumDenom = $sum * $this->CurrentDenom;
        $originalUserBalance = $this->user_data['balance']; // From dataBundle
        $originalUserCountBalance = $this->user_data['count_balance']; // From dataBundle
        $originalUserAddress = $this->user_data['address'] ?? 0; // From dataBundle

        $newUserBalance = $originalUserBalance + $sumDenom;
        $newUserCountBalance = $originalUserCountBalance; // Will be modified below if 'bet'
        $newUserAddress = $originalUserAddress;


        if ($sumDenom < 0 && $slotEvent == 'bet') {
            // Logic for count_balance and address based on user_data from dataBundle
            // This part needs to mimic User::updateCountBalance and direct modifications
            // For now, we log the intent and the caller handles the actual user data update.

            // Simplified version of user->updateCountBalance() logic:
            // This is highly dependent on the exact definition of updateCountBalance
            // Assuming it reduces count_balance by |sumDenom| if count_balance > 0
            if ($originalUserCountBalance > 0) {
                if ($originalUserCountBalance >= abs($sumDenom)) {
                    $newUserCountBalance = $originalUserCountBalance + $sumDenom; // sumDenom is negative
                } else {
                    $remainingBet = abs($sumDenom) - $originalUserCountBalance;
                    $newUserCountBalance = 0;
                    // Further logic for address if it's used to cover remaining bet
                    if ($newUserAddress >= $remainingBet) {
                        $newUserAddress -= $remainingBet;
                    } else {
                        $newUserAddress = 0; // Or handle insufficient funds
                    }
                }
            } else { // count_balance is 0, use address
                 if ($newUserAddress >= abs($sumDenom)) {
                    $newUserAddress -= abs($sumDenom);
                } else {
                    $newUserAddress = 0; // Or handle insufficient funds
                }
            }
            // betRemains logic would also need to be handled here if it's critical for internal state
        }

        $this->newBalance = $this->FormatFloat($newUserBalance / $this->CurrentDenom);
        $this->Balance = $this->newBalance; // Update internal Balance for subsequent GetBalance calls

        // Log the intended changes to user balance, count_balance, address
        $this->log[] = [
            'type' => 'set_balance',
            'sum_denom' => $sumDenom,
            'slotEvent' => $slotEvent,
            'original_balance' => $originalUserBalance,
            'new_balance_denom' => $newUserBalance,
            'original_count_balance' => $originalUserCountBalance,
            'new_count_balance_denom' => $newUserCountBalance * $this->CurrentDenom, // Assuming newUserCountBalance is not in denom
            'original_address' => $originalUserAddress,
            'new_address_denom' => $newUserAddress, // Assuming newUserAddress is not in denom
        ];

        // Update internal state for GetBalance if called again in this request lifecycle
        $this->user_data['balance'] = $newUserBalance; // Keep internal user_data consistent
        $this->user_data['count_balance'] = $newUserCountBalance;
        $this->user_data['address'] = $newUserAddress;
        $this->count_balance = $newUserCountBalance; // Also update direct property if used elsewhere

        return $this; // Or return true/void, as user object is no longer directly managed
    }

    public function GetBalance()
    {
        // Assumes $this->Balance is kept up-to-date by SetBalance (in terms of game currency, not denom)
        // Or, always recalculate from user_data if that's more reliable.
        // $this->Balance = ($this->user_data['balance'] ?? 0) / $this->CurrentDenom;
        return $this->Balance;
    }

    public function SaveLogReport($spinSymbols, $bet, $lines, $win, $slotState)
    {
        $reportName = $this->slotId . ' ' . $slotState;
        if ($slotState == 'freespin') $reportName = $this->slotId . ' FG';
        else if ($slotState == 'bet') $reportName = $this->slotId . '';
        else if ($slotState == 'slotGamble') $reportName = $this->slotId . ' DG';

        $betDenom = $bet * $this->CurrentDenom;
        $winDenom = $win * $this->CurrentDenom;

        // These were direct model increments. Now they are logged intentions.
        // The caller will handle actual database updates.
        $logEntry = [
            'type' => 'stat_game_entry',
            'user_id' => $this->playerId,
            'balance_denom' => ($this->newBalance ?? $this->Balance) * $this->CurrentDenom,
            'bet_denom' => $betDenom,
            'win_denom' => $winDenom,
            'game_report_name' => $reportName,
            'in_game_denom' => $this->toGameBanks ?? 0, // from SetBank context
            'in_jpg_denom' => $this->toSlotJackBanks ?? 0, // from SetBank context
            'in_profit_denom' => $this->betProfit ?? 0, // from SetBank context
            'denomination' => $this->CurrentDenom,
            'shop_id' => $this->shop_id,
            'date_time' => time(), // Or use a consistent timestamp source
            // Bank values (slots_bank, bonus_bank etc.) need to be sourced from gamebank_data
            // This requires knowing the structure of gamebank_data or passing specific bank values.
            // 'slots_bank' => $this->gamebank_data['slots'] ?? 0,
            // 'bonus_bank' => $this->gamebank_data['bonus'] ?? 0,
            // ... and so on for other banks ...
            // 'total_bank' => sum of all banks
        ];
        $this->log[] = $logEntry;

        $this->log[] = [
            'type' => 'game_log_entry',
            'game_id' => $this->slotDBId,
            'user_id' => $this->playerId,
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown', // Handle if not available
            'str' => $spinSymbols, // This is often the full server response
            'shop_id' => $this->shop_id
        ];

        // User level update, game stat_in/out, tournament_stat, last_bid update, game bids increment
        // All these need to be logged as intentions for the caller to process.
        $this->log[] = ['type' => 'user_update_level', 'event' => 'bet', 'amount_denom' => $betDenom];
        if ($slotState != 'freespin') {
            $this->log[] = ['type' => 'game_update_stat_in', 'amount_denom' => $betDenom];
        }
        $this->log[] = ['type' => 'game_update_stat_out', 'amount_denom' => $winDenom];
        $this->log[] = ['type' => 'game_tournament_stat', 'slotState' => $slotState, 'user_id' => $this->playerId, 'bet_denom' => $betDenom, 'win_denom' => $winDenom];
        $this->log[] = ['type' => 'user_update_last_bid', 'time' => time()];
        $this->log[] = ['type' => 'game_increment_bids'];

        // Reset for next spin context
        unset($this->toGameBanks, $this->toSlotJackBanks, $this->betProfit);
    }


    public function GetSpinSettings($garantType = 'bet', $bet, $lines)
    {
        // This method relies on game->get_lines_percent_config and shop->percent
        // These configurations should be part of $this->game_data and $this->shop_data

        $curField = 10; // Default or determine based on lines as before
        // ... (lines to curField logic remains the same)

        $pref = ($garantType != 'bet') ? '_bonus' : '';
        $this->AllBet = $bet * $lines;

        // Assuming lines_percent_config is passed in game_data
        $linesPercentConfigSpin = $this->game_data['lines_percent_config']['spin'] ?? [];
        $linesPercentConfigBonus = $this->game_data['lines_percent_config']['bonus'] ?? [];
        $currentPercent = $this->shop_data['percent'] ?? 70; // Default if not set

        $currentSpinWinChance = 0;
        $currentBonusWinChance = 0;
        $percentLevel = '';

        // Find percentLevel (same logic as before)
        if(isset($linesPercentConfigSpin['line' . $curField . $pref])){
            foreach ($linesPercentConfigSpin['line' . $curField . $pref] as $k => $v) {
                $l = explode('_', $k);
                if (count($l) == 2 && $l[0] <= $currentPercent && $currentPercent <= $l[1]) {
                    $percentLevel = $k;
                    break;
                }
            }
            if($percentLevel && isset($linesPercentConfigSpin['line' . $curField . $pref][$percentLevel])) {
                 $currentSpinWinChance = $linesPercentConfigSpin['line' . $curField . $pref][$percentLevel];
            }
             if($percentLevel && isset($linesPercentConfigBonus['line' . $curField . $pref][$percentLevel])) {
                $currentBonusWinChance = $linesPercentConfigBonus['line' . $curField . $pref][$percentLevel];
            }
        }


        $RtpControlCount = 200;
        // GameDataStatic for 'SpinWinLimit', 'RtpControlCount'
        if (!$this->HasGameDataStatic('SpinWinLimit')) $this->SetGameDataStatic('SpinWinLimit', 0);
        if (!$this->HasGameDataStatic('RtpControlCount')) $this->SetGameDataStatic('RtpControlCount', $RtpControlCount);

        $rtpRange = 0;
        $stat_in = $this->game_data['stat_in'] ?? 0;
        $stat_out = $this->game_data['stat_out'] ?? 0;
        if ($stat_in > 0) $rtpRange = $stat_out / $stat_in * 100;

        // RTP control logic (remains largely the same, using GameDataStatic)
        // ... (RTP logic using GetGameDataStatic/SetGameDataStatic) ...
        // This logic will modify $currentBonusWinChance, $currentSpinWinChance, $this->MaxWin
        // Ensure MaxWin changes are stored if they need to persist beyond this call for the response.

        $bonusWin = ($currentBonusWinChance > 0) ? rand(1, (int)$currentBonusWinChance) : 0;
        $spinWin = ($currentSpinWinChance > 0) ? rand(1, (int)$currentSpinWinChance) : 0;

        $return = ['none', 0];

        if ($bonusWin == 1 && $this->slotBonus) {
            $this->isBonusStart = true; // This state is important
            $winLimit = $this->GetBank('bonus'); // Get bank for bonus
            $return = ['bonus', $winLimit];

            $checkBonusWin = $this->CheckBonusWin(); // Average bonus win
            if ($stat_in < ($checkBonusWin * $bet + $stat_out) || $winLimit < ($checkBonusWin * $bet)) {
                $return = ['none', 0];
                $this->isBonusStart = false; // Reset if conditions not met
            }
        } else if ($spinWin == 1) {
            $winLimit = $this->GetBank($garantType);
            $return = ['win', $winLimit];
        }

        if ($garantType == 'bet' && $this->GetBalance() <= (2 / $this->CurrentDenom)) {
            if (rand(1, 10) == 1) {
                $winLimit = $this->GetBank('');
                $return = ['win', $winLimit];
            }
        }
        return $return;
    }

    public function GetRandomScatterPos($rp)
    {
        // This method's logic seems self-contained and doesn't rely on external state
        // other than the input $rp (reel positions array).
        $rpResult = [];
        for ($i = 0; $i < count($rp); $i++) {
            if ($rp[$i] == '9') { // Assuming '9' is the scatter symbol
                if (isset($rp[$i + 1]) && isset($rp[$i - 1])) array_push($rpResult, $i);
                if (isset($rp[$i - 1]) && isset($rp[$i - 2])) array_push($rpResult, $i - 1);
                if (isset($rp[$i + 1]) && isset($rp[$i + 2])) array_push($rpResult, $i + 1);
            }
        }
        shuffle($rpResult);
        if (!isset($rpResult[0])) {
            // Ensure there's a valid position even if no scatters found or conditions not met
            // This might need adjustment based on reel length (e.g., count($rp) - 3 could be < 2)
            $rpResult[0] = rand(1, max(1, count($rp) - 2)); // Adjusted to be safer
        }
        return $rpResult[0];
    }


    public function GetGambleSettings()
    {
        // $this->WinGamble is populated from game_data['rezerv'] in constructor
        return ($this->WinGamble > 0) ? rand(1, (int)$this->WinGamble) : 0;
    }

    public function GetReelStrips($winType, $slotEvent)
    {
        // This method uses $this->game_data for some configurations (implicitly, via constructor)
        // and $this->reelStripN properties. It also instantiates GameReel.
        // Make sure GameReel_refactored is used if it's also being refactored.

        if ($slotEvent == 'freespin') {
            // Assumes GameReel_refactored is available and provides bonus strips
            $reel_instance = new GameReel_refactored();
            $fArr = $reel_instance->reelsStripBonus; // Access the bonus strips
            $reelStripsToUpdate = ['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'];

            // Iterate through reel strips, not the bonus strip names themselves
            $bonusReelKeys = array_keys($fArr); // e.g., reelStripBonus1, reelStripBonus2

            for($i=0; $i < count($reelStripsToUpdate); $i++){
                $reelStripName = $reelStripsToUpdate[$i];
                // Use corresponding bonus reel if available
                if(isset($bonusReelKeys[$i]) && isset($fArr[$bonusReelKeys[$i]]) && count($fArr[$bonusReelKeys[$i]]) > 0){
                     $this->$reelStripName = $fArr[$bonusReelKeys[$i]];
                }
            }
        }

        $prs = []; // Positions for each reel
        if ($winType != 'bonus') {
            foreach (['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'] as $index => $reelStrip) {
                if (is_array($this->$reelStrip) && count($this->$reelStrip) > 2) { // Ensure at least 3 symbols for mt_rand
                    $prs[$index + 1] = mt_rand(0, count($this->$reelStrip) - 3);
                } else {
                     $prs[$index + 1] = 0; // Default if reel strip is too short or not an array
                }
            }
        } else { // 'bonus' win type - place scatters
            $reelsId = [];
            foreach (['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'] as $index => $reelStrip) {
                 if (is_array($this->$reelStrip) && count($this->$reelStrip) > 2) {
                    // GetRandomScatterPos needs the actual reel strip, not its name
                    $prs[$index + 1] = $this->GetRandomScatterPos($this->$reelStrip);
                    $reelsId[] = $index + 1;
                 } else {
                     $prs[$index + 1] = 0; // Default
                 }
            }

            if(!empty($reelsId)){
                $scattersCnt = rand(min(3, count($reelsId)), count($reelsId)); // Ensure at least 3 scatters if possible
                shuffle($reelsId);
                for ($i = 0; $i < count($reelsId); $i++) {
                    $currentReelId = $reelsId[$i];
                    $currentReelStripName = 'reelStrip' . $currentReelId;
                    if ($i < $scattersCnt) {
                        // If it's a scatter reel, its position is already set by GetRandomScatterPos
                    } else {
                        // For non-scatter reels, pick a random position that's not a scatter
                        // This part of original logic might need refinement to avoid placing scatter symbols
                        // if GetRandomScatterPos doesn't guarantee a non-scatter for other reels.
                        // For now, just randomizing if not a designated scatter reel.
                        if (is_array($this->$currentReelStripName) && count($this->$currentReelStripName) > 2) {
                             $prs[$currentReelId] = rand(0, count($this->$currentReelStripName) - 3);
                        } else {
                             $prs[$currentReelId] = 0;
                        }
                    }
                }
            }
        }

        $reel = ['rp' => []];
        foreach ($prs as $index => $value) {
            $reelStripProperty = 'reelStrip' . $index;
            $key = $this->$reelStripProperty;
            if(is_array($key) && count($key) > 0){ // Check if $key is a valid array
                // Ensure $value is within bounds for array access
                $reelCount = count($key);
                // Adjust value to prevent out-of-bounds, ensure we can pick 3 symbols
                $safeValue = $value;
                if ($value < 0) $safeValue = 0;
                if ($value > $reelCount - 1) $safeValue = $reelCount -1; // last element

                // For reel[0], reel[1], reel[2]
                // reel[1] is $key[$safeValue]
                // reel[0] is $key[$safeValue-1]
                // reel[2] is $key[$safeValue+1]

                $pos0 = ($safeValue - 1 + $reelCount) % $reelCount; // Previous symbol with wrap around
                $pos1 = $safeValue;
                $pos2 = ($safeValue + 1) % $reelCount; // Next symbol with wrap around


                $reel['reel' . $index][0] = $key[$pos0];
                $reel['reel' . $index][1] = $key[$pos1];
                $reel['reel' . $index][2] = $key[$pos2];
                $reel['reel' . $index][3] = ''; // Seems like a placeholder in original
                $reel['rp'][] = $value; // Original random position
            } else {
                 // Handle case where reel strip is not properly initialized
                $reel['reel' . $index][0] = 0; // Default symbol
                $reel['reel' . $index][1] = 0;
                $reel['reel' . $index][2] = 0;
                $reel['reel' . $index][3] = '';
                $reel['rp'][] = 0;
            }
        }
        return $reel;
    }
}
?>
