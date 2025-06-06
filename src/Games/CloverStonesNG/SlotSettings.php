<?php 
namespace VanguardLTE\Games\CloverStonesNG;

// Required if GameReel is in the same namespace and directory
// require_once __DIR__ . '/GameReel.php'; 
// Config class might also be needed if not autoloaded
// require_once __DIR__ . '/Config.php'; 

class SlotSettings
{
    // Properties that will be initialized by constructor or from config
    public $playerId = null;
    public $Balance = null;
    public $currentDenom = null;
    public $Bet = null;
    public $shopPercent = null;
    public $MaxWin = null;
    public $slotId = '';
    public $slotDBId = ''; // For reference, if needed by any existing logic string
    public $currency = null;

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

    public $Paytable = [];
    public $keyController = []; // Static, can be kept
    public $slotReelsConfig = []; // Static, can be kept

    public $slotBonusType = 1;
    public $slotScatterType = 0;
    public $splitScreen = false;
    public $slotBonus = true;
    public $slotGamble = true; // Gamble logic would need similar refactoring if used
    public $slotFastStop = 1;
    public $slotExitUrl = '/'; // Default
    public $slotWildMpl = 1;
    public $GambleType = 1;
    public $slotFreeCount = 15;
    public $slotFreeMpl = 2;
    public $slotViewState = 'Normal';
    public $hideButtons = [];

    // In-memory game state (previously from user->session)
    public $gameData = [];
    // In-memory static game state (previously from game->advanced)
    public $gameDataStatic = []; 
    
    public $Jackpots = []; // In-memory jackpots
    public $Bank = 0;      // In-memory bank
    public $WinGamble = 5; // Default, was game->rezerv

    public $isBonusStart = false;
    public $SymbolGame = [];
    public $Line = []; // Paylines
    public $gameLine = []; // Active paylines (can be same as Line)

    // For GetSpinSettings
    private $AllBet = 0;
    private $linesPercentConfigSpin = [];
    private $linesPercentConfigBonus = [];


    public function __construct($gameName, $userId, $playerState, $gameState, $config)
    {
        $this->slotId = $gameName;
        $this->playerId = $userId;

        // Initialize from $playerState (dynamic per user)
        $this->Balance = $playerState['currentBalance'] ?? 0;
        $this->gameData = $gameState['currentSessionData'] ?? [];
        $this->gameDataStatic = $gameState['currentStaticData'] ?? []; // Or initialize if empty

        // Initialize from $config (static for the game/shop)
        $gameSettings = $config['gameSettings'];
        $shopSettings = $config['shopSettings'];
        
        $this->currency = $shopSettings['currency'];
        $this->currentDenom = $gameSettings['denomination'];
        $this->Bet = $gameSettings['bet'];
        $this->shopPercent = $shopSettings['percent'];
        $this->MaxWin = $shopSettings['max_win'];
        $this->slotDBId = $gameSettings['slotDBId'];
        $this->slotViewState = $gameSettings['slotViewState'];
        $this->slotFreeCount = $gameSettings['slotFreeCount'];
        $this->slotFreeMpl = $gameSettings['slotFreeMpl'];
        $this->slotWildMpl = $gameSettings['slotWildMpl'];
        $this->WinGamble = $gameSettings['rezerv'] ?? 5;

        // Set up proper win chance configurations (from actual database config)
        $this->linesPercentConfigSpin = $gameSettings['lines_percent_config_spin'] ?? [
            'line1' => ['74_80' => 15, '82_88' => 9, '90_96' => 7],
            'line3' => ['74_80' => 15, '82_88' => 9, '90_96' => 7],
            'line5' => ['74_80' => 12, '82_88' => 8, '90_96' => 6],
            'line7' => ['74_80' => 12, '82_88' => 8, '90_96' => 6],
            'line9' => ['74_80' => 10, '82_88' => 7, '90_96' => 5],
            'line10' => ['74_80' => 10, '82_88' => 7, '90_96' => 5],
        ];

        $this->linesPercentConfigBonus = $gameSettings['lines_percent_config_bonus'] ?? [
            'line1' => ['74_80' => 100, '82_88' => 50, '90_96' => 40],
            'line3' => ['74_80' => 100, '82_88' => 50, '90_96' => 40],
            'line5' => ['74_80' => 100, '82_88' => 50, '90_96' => 40],
            'line7' => ['74_80' => 50, '82_88' => 40, '90_96' => 30],
            'line9' => ['74_80' => 50, '82_88' => 40, '90_96' => 30],
            'line10' => ['74_80' => 50, '82_88' => 40, '90_96' => 30],
        ];

        // Initialize Jackpots (can be passed in gameState or use config default)
        $this->Jackpots = $gameState['jackpotData'] ?? $config['jackpotSettings'] ?? [];


        // Paytable (static, from original)
        $this->Paytable['SYM_0'] = [0,0,0,0,0,0]; // Wild (usually doesn't have its own direct payout line like this)
        $this->Paytable['SYM_1'] = [0,0,0,16,32,80];
        $this->Paytable['SYM_2'] = [0,0,0,16,24,48];
        $this->Paytable['SYM_3'] = [0,0,0,16,24,48];
        $this->Paytable['SYM_4'] = [0,0,0,8,16,32];
        $this->Paytable['SYM_5'] = [0,0,0,8,16,32];
        $this->Paytable['SYM_6'] = [0,0,0,4,8,16];
        $this->Paytable['SYM_7'] = [0,0,0,4,8,16];
        $this->Paytable['SYM_8'] = [0,0,0,4,8,16];
        $this->Paytable['SYM_9'] = [0,0,0,4,8,16]; // Scatter (payouts might be different, e.g., based on total bet)
        $this->Paytable['SYM_10'] = [0,0,0,4,8,16];
        // Note: Original Server.php had more symbols in auth response (11,12,13,14,15, 100-108)
        // Ensure this Paytable matches all symbols used in reels and win calculations.

        // Load Reels
        $reelsObj = new GameReel(); // GameReel constructor loads from reels.txt
        $reelStripsMapping = [
            'reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'
        ];
        foreach ($reelStripsMapping as $reelStripProperty) {
            if (isset($reelsObj->reelsStrip[$reelStripProperty]) && count($reelsObj->reelsStrip[$reelStripProperty])) {
                $this->$reelStripProperty = $reelsObj->reelsStrip[$reelStripProperty];
            }
        }
        // For Bonus reels: Original SlotSettings used these property names
        $bonusReelPropertyMap = [
            'reelStripBonus1', 'reelStripBonus2', 'reelStripBonus3',
            'reelStripBonus4', 'reelStripBonus5', 'reelStripBonus6'
        ];
        // GameReel loads bonus strips with keys like 'reelStripBonus1', 'reelStripBonus2', etc.
        foreach($bonusReelPropertyMap as $propName) {
            if (isset($reelsObj->reelsStripBonus[$propName]) && count($reelsObj->reelsStripBonus[$propName]) > 0) {
                 $this->$propName = $reelsObj->reelsStripBonus[$propName];
            }
        }


        // Static configurations from original
        $this->keyController = ['13' => 'uiButtonSpin,uiButtonSkip', /* ... more ... */ ]; // Ensure this is fully populated if used
        $this->slotReelsConfig = [[425,142,3], [669,142,3], [913,142,3], [1157,142,3], [1401,142,3]];
        $this->Line = array_map('strval', range(1,20)); // Lines 1-20 (or as defined by game)
        $this->gameLine = $this->Line; // Default all lines active
        $this->SymbolGame = ['0','1','2','3','4','5','6','7','8','9','10']; // Available symbols used in logic

        // Initialize Bank (can be passed in gameState or start from 0 or a config value)
        $this->Bank = $gameState['currentBank'] ?? ($config['gameSettings']['initialBank'] ?? 100000); // Example initial bank if not passed
        
        // Ensure essential gameDataStatic keys are present
        if (!isset($this->gameDataStatic['SpinWinLimit'])) {
            $this->SetGameDataStatic('SpinWinLimit', 0);
        }
        if (!isset($this->gameDataStatic['RtpControlCount'])) {
            $this->SetGameDataStatic('RtpControlCount', 200); // Default RtpControlCount
        }
    }

    public function is_active()
    {
        return true;
    }

    public function SetGameData($key, $value)
    {
        $timeLife = 86400; 
        $this->gameData[$key] = ['timelife' => time() + $timeLife, 'payload' => $value];
    }

    public function GetGameData($key)
    {
        if (isset($this->gameData[$key])) {
            return $this->gameData[$key]['payload'];
        }
        return 0;
    }
    
    public function HasGameData($key)
    {
        return isset($this->gameData[$key]);
    }

    public function GetCurrentSessionData() {
        return $this->gameData;
    }
    
    public function GetCurrentStaticData() {
        return $this->gameDataStatic;
    }
    
    public function GetCurrentJackpotData() {
        return $this->Jackpots;
    }


    public function SetGameDataStatic($key, $value)
    {
        $timeLife = 86400 * 30; 
        $this->gameDataStatic[$key] = ['timelife' => time() + $timeLife, 'payload' => $value];
    }

    public function GetGameDataStatic($key)
    {
        if (isset($this->gameDataStatic[$key])) {
            return $this->gameDataStatic[$key]['payload'];
        }
        return 0;
    }
    
    public function HasGameDataStatic($key)
    {
        return isset($this->gameDataStatic[$key]);
    }
    
    public function SaveGameData() { /* NO-OP */ }
    public function SaveGameDataStatic() { /* NO-OP */ }


    public function FormatFloat($num)
    {
        return round($num, 2); 
    }


    public function GetHistory()
    {
        return 'NULL'; 
    }

    public function UpdateJackpots($bet)
    {
        $bet = $bet * $this->currentDenom;
        // $payJack = 0; // Not used in current simplified version

        foreach ($this->Jackpots as $i => &$jp) { 
            if (!isset($jp['balance']) || !isset($jp['percent'])) continue;
            $contribution = $bet / 100 * $jp['percent'];
            $jp['balance'] += $contribution;
        }
        unset($jp); 
        return $this->Jackpots; 
    }
    
    // MODIFIED: $sum is required and comes first.
    public function SetBank($sum, $slotState = '', $slotEvent = '')
    {
        $sumInDenom = $sum * $this->currentDenom;
        $this->Bank += $sumInDenom; // sum is win (negative) or bet (positive for bank)
        if ($this->Bank < 0) {
            // error_log("Warning: Bank trying to go negative. Bank: {$this->Bank}, Sum: {$sumInDenom}");
            // $this->Bank = 0; // Or handle more gracefully depending on game rules.
            // This could be a normal state if a large win just occurred.
        }
    }

    // MODIFIED: Added $slotState as optional parameter
    public function GetBank($slotState = '')
    {
        // If different banks for bonus/normal are needed, $slotState can be used here.
        // For now, single bank.
        return $this->Bank / ($this->currentDenom ?: 0.01); // Ensure currentDenom is not zero
    }
    
    public function GetPercent()
    {
        return $this->shopPercent;
    }

    public function GetStatIn()
    {
        // In original, this comes from game->stat_in (total money bet)
        // For simplified implementation, return a reasonable value
        return $this->GetGameDataStatic('StatIn') ?: 10000;
    }

    public function GetStatOut()
    {
        // In original, this comes from game->stat_out (total money won)
        // For simplified implementation, return a reasonable value
        return $this->GetGameDataStatic('StatOut') ?: 9500;
    }
    
    public function SetBalance($sum, $slotEvent = '')
    {
        if ($this->Balance + $sum < 0 && $slotEvent == 'bet') {
             error_log('Error: Balance cannot go below zero on bet. Current: '.$this->Balance.', Bet: '.$sum);
             return false; 
        }
        $this->Balance += $sum;
        $this->Balance = $this->FormatFloat($this->Balance);
        return true;
    }

    public function GetBalance()
    {
        // Ensure Balance is a number before formatting
        return $this->FormatFloat(is_numeric($this->Balance) ? $this->Balance : 0);
    }

    public function SaveLogReport($spinSymbols, $bet, $lines, $win, $slotState) {
        // Update game statistics for RTP calculation
        $this->updateGameStats($bet * $lines, $win);
    }

    private function updateGameStats($betAmount, $winAmount) {
        // This would update the database stat_in and stat_out columns
        // For now, we'll use a simple file-based approach for demonstration
        $statsFile = __DIR__ . '/game_stats.json';
        $stats = [];

        if (file_exists($statsFile)) {
            $stats = json_decode(file_get_contents($statsFile), true) ?: [];
        }

        if (!isset($stats[$this->slotId])) {
            $stats[$this->slotId] = ['stat_in' => 0, 'stat_out' => 0];
        }

        $stats[$this->slotId]['stat_in'] += $betAmount;
        $stats[$this->slotId]['stat_out'] += $winAmount;

        $jsonContent = json_encode($stats, JSON_PRETTY_PRINT);
        $writeResult = file_put_contents($statsFile, $jsonContent);

        // Log the update for debugging (commented out for production)
        // error_log("Updated stats for {$this->slotId}: bet=$betAmount, win=$winAmount, total_in={$stats[$this->slotId]['stat_in']}, total_out={$stats[$this->slotId]['stat_out']}");
    }
    public function InternalErrorSilent($errcode) { error_log("InternalErrorSilent: " . print_r($errcode, true)); }
    public function InternalError($errcode) { 
        error_log("InternalError: " . print_r($errcode, true)); 
        throw new \Exception("Internal Server Error: " . (is_string($errcode) ? $errcode : json_encode($errcode)));
    }

    // MODIFIED: $bet and $lines are required and come first.
    public function GetSpinSettings($bet, $lines, $garantType = 'bet')
    {
        $curField = 10; // Default for 10 lines
        // Determine curField based on lines active (matching original logic)
        switch($lines) {
            case 10:
                $curField = 10;
                break;
            case 9:
            case 8:
                $curField = 9;
                break;
            case 7:
            case 6:
                $curField = 7;
                break;
            case 5:
            case 4:
                $curField = 5;
                break;
            case 3:
            case 2:
                $curField = 3;
                break;
            case 1:
                $curField = 1;
                break;
            default:
                $curField = 10;
                break;
        }

        $pref = ($garantType != 'bet') ? '_bonus' : '';
        $this->AllBet = $bet * $lines;

        $linesPercentConfigSpin = $this->linesPercentConfigSpin;
        $linesPercentConfigBonus = $this->linesPercentConfigBonus;
        $currentPercent = $this->shopPercent;

        $currentSpinWinChance = 20; // Default: 1 in 20 chance (5% win rate)
        $currentBonusWinChance = 400; // Default: 1 in 400 chance

        // Determine percent level for spin
        $configKeySpin = 'line' . $curField . $pref;
        if (isset($linesPercentConfigSpin[$configKeySpin])) {
            foreach ($linesPercentConfigSpin[$configKeySpin] as $k => $v) {
                $l = explode('_', $k);
                if (count($l) == 2) {
                    $l0 = (int)$l[0];
                    $l1 = (int)$l[1];
                    if ($l0 <= $currentPercent && $currentPercent <= $l1) {
                        $currentSpinWinChance = $v;
                        break;
                    }
                }
            }
        } else {
             error_log("Spin config not found for: {$configKeySpin} at percent {$currentPercent}");
        }

        // Determine percent level for bonus
        $configKeyBonus = 'line' . $curField . $pref; // Usually same key structure
        if (isset($linesPercentConfigBonus[$configKeyBonus])) {
            foreach ($linesPercentConfigBonus[$configKeyBonus] as $k_bonus => $v_bonus) {
                $l_bonus = explode('_', $k_bonus);
                 if (count($l_bonus) == 2) {
                    $l0_bonus = (int)$l_bonus[0];
                    $l1_bonus = (int)$l_bonus[1];
                    if ($l0_bonus <= $currentPercent && $currentPercent <= $l1_bonus) {
                        $currentBonusWinChance = $v_bonus;
                        break;
                    }
                }
            }
        } else {
            error_log("Bonus config not found for: {$configKeyBonus} at percent {$currentPercent}");
        }

        // RTP Control Logic (simplified from original)
        $rtpRange = $currentPercent; 
        if (($this->GetGameDataStatic('RtpControlCount') ?? 200) == 0) {
            if ($currentPercent + rand(1, 2) < $rtpRange && ($this->GetGameDataStatic('SpinWinLimit') ?? 0) <= 0) {
                $this->SetGameDataStatic('SpinWinLimit', rand(25, 50));
            }
        } else {
            $this->SetGameDataStatic('RtpControlCount', ($this->GetGameDataStatic('RtpControlCount') ?? 200) - 1);
        }

        $bonusWin = rand(1, $currentBonusWinChance);
        $spinWin = rand(1, $currentSpinWinChance);

        // DEBUG: Log win chance calculations (commented out for production)
        // error_log("DEBUG: curField=$curField, percent=$currentPercent, spinChance=$currentSpinWinChance, bonusChance=$currentBonusWinChance");
        // error_log("DEBUG: spinTrigger=$spinWinTrigger, bonusTrigger=$bonusWinTrigger");

        $return = ['none', 0]; // Default: no guaranteed win, win limit 0

        if ($bonusWin == 1 && $this->slotBonus) {
            $this->isBonusStart = true;
            $winLimit = $this->GetBank('bonus');
            $avgBonusPay = ($this->CheckBonusWin() ?: 1) * $this->AllBet;
            if ($winLimit >= $avgBonusPay) {
                $return = ['bonus', $winLimit];
            } else {
                 $this->isBonusStart = false;
            }
        } else if ($spinWin == 1) {
            $winLimit = $this->GetBank($garantType);
            $return = ['win', $winLimit];
        }
        
        if ($garantType == 'bet' && $this->GetBalance() <= (2 / ($this->currentDenom ?: 0.01)) ) {
            if (rand(1, 10) == 1) {
                $winLimit = $this->GetBank(''); 
                $return = ['win', $winLimit];
            }
        }
        return $return;
    }
    
    public function CheckBonusWin()
    {
        $allRateCnt = 0;
        $allRate = 0;
        foreach ($this->Paytable as $vl) {
            if(!is_array($vl)) continue;
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

    public function GetReelStrips($winType, $slotEvent)
    {
        // Load bonus reels for free spins (matching original logic)
        if( $slotEvent == 'freespin' )
        {
            $reel = new GameReel();
            $fArr = $reel->reelsStripBonus;
            foreach( [
                'reelStrip1',
                'reelStrip2',
                'reelStrip3',
                'reelStrip4',
                'reelStrip5',
                'reelStrip6'
            ] as $reelStrip )
            {
                $curReel = array_shift($fArr);
                if( count($curReel) )
                {
                    $this->$reelStrip = $curReel;
                }
            }
        }

        if( $winType != 'bonus' )
        {
            $prs = [];
            foreach( [
                'reelStrip1',
                'reelStrip2',
                'reelStrip3',
                'reelStrip4',
                'reelStrip5',
                'reelStrip6'
            ] as $index => $reelStrip )
            {
                if( is_array($this->$reelStrip) && count($this->$reelStrip) > 0 )
                {
                    $prs[$index + 1] = mt_rand(1, count($this->$reelStrip) - 4);
                }
            }
        }
        else
        {
            $reelsId = [];
            foreach( [
                'reelStrip1',
                'reelStrip2',
                'reelStrip3',
                'reelStrip4',
                'reelStrip5',
                'reelStrip6'
            ] as $index => $reelStrip )
            {
                if( is_array($this->$reelStrip) && count($this->$reelStrip) > 0 )
                {
                    $prs[$index + 1] = $this->GetRandomScatterPos($this->$reelStrip);
                    $reelsId[] = $index + 1;
                }
            }
            $scattersCnt = rand(3, count($reelsId));
            shuffle($reelsId);
            for( $i = 0; $i < count($reelsId); $i++ )
            {
                if( $i < $scattersCnt )
                {
                    $prs[$reelsId[$i]] = $this->GetRandomScatterPos($this->{'reelStrip' . $reelsId[$i]});
                }
                else
                {
                    $prs[$reelsId[$i]] = rand(1, count($this->{'reelStrip' . $reelsId[$i]}) - 4);
                }
            }
        }

        $reel = [
            'rp' => []
        ];
        foreach( $prs as $index => $value )
        {
            $key = $this->{'reelStrip' . $index};
            $key[-1] = $key[count($key) - 1];
            $reel['reel' . $index][0] = $key[$value - 1];
            $reel['reel' . $index][1] = $key[$value];
            $reel['reel' . $index][2] = $key[$value + 1];
            $reel['reel' . $index][3] = $key[$value + 2];
            $reel['rp'][] = $value;
        }
        return $reel;
    }
    
    public function GetRandomScatterPos($rp)
    {
        $rpResult = [];
        for( $i = 0; $i < count($rp); $i++ )
        {
            if( $rp[$i] == '9' )
            {
                if( isset($rp[$i + 1]) && isset($rp[$i - 1]) )
                {
                    array_push($rpResult, $i);
                }
                if( isset($rp[$i - 1]) && isset($rp[$i - 2]) )
                {
                    array_push($rpResult, $i - 1);
                }
                if( isset($rp[$i + 1]) && isset($rp[$i + 2]) )
                {
                    array_push($rpResult, $i + 1);
                }
            }
        }
        shuffle($rpResult);
        if( !isset($rpResult[0]) )
        {
            $rpResult[0] = rand(2, count($rp) - 3);
        }
        return $rpResult[0];
    }

    public function GetGambleSettings()
    {
        return rand(1, $this->WinGamble > 0 ? $this->WinGamble : 2); 
    }

    public function OffsetReels($reels)
    {
        $newReels = [];
        $numReelsActive = 0; // Determine how many reels are in the input 'reels' array
        for ($r = 1; $r <= 6; $r++) { // Max 6 reels usually
            if (isset($reels['reel' . $r]) && is_array($reels['reel' . $r])) {
                $numReelsActive = $r;
            } else {
                break; // Stop if reels are not consecutive
            }
        }
        if ($numReelsActive == 0) return $reels; // No reels to offset

        for ($r = 1; $r <= $numReelsActive; $r++) {
            $newReels['reel' . $r] = []; // Initialize for this reel
            $currentReelSymbolsFromCascade = [];
            // Collect non-removed symbols (-1) from bottom up (original had 4 positions)
            // The input $reels['reelX'] should have 4 symbols [sym_above, vis1, vis2, vis3_or_below]
            for ($p = 3; $p >= 0; $p--) { // Iterate through the 4 symbol positions on the reel
                if (isset($reels['reel' . $r][$p]) && $reels['reel' . $r][$p] != -1) {
                    array_unshift($currentReelSymbolsFromCascade, $reels['reel' . $r][$p]);
                }
            }
            // Fill remaining top positions with new random symbols (up to 4 symbols per reel)
            $fillCount = 4 - count($currentReelSymbolsFromCascade);
            for ($f = 0; $f < $fillCount; $f++) {
                if(empty($this->SymbolGame)) { // Safety check
                    array_unshift($currentReelSymbolsFromCascade, '0'); // Default symbol if SymbolGame is empty
                    continue;
                }
                $randomIndex = array_rand($this->SymbolGame);
                array_unshift($currentReelSymbolsFromCascade, $this->SymbolGame[$randomIndex]);
            }
            $newReels['reel' . $r] = $currentReelSymbolsFromCascade;
        }
        $newReels['rp'] = $reels['rp'] ?? array_fill(0, $numReelsActive, 0); 
        return $newReels;
    }
}
