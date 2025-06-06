<?php 
namespace VanguardLTE\Games\BananasNG;

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
    public $slotDBId = '';
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
    public $keyController = [];
    public $slotReelsConfig = [];

    public $slotBonusType = 1;
    public $slotScatterType = 0;
    public $splitScreen = false;
    public $slotBonus = true;
    public $slotGamble = true;
    public $slotFastStop = 1;
    public $slotExitUrl = '/';
    public $slotWildMpl = 1;
    public $GambleType = 1;
    public $slotFreeCount = 15;
    public $slotFreeMpl = 2;
    public $slotViewState = 'Normal';
    public $hideButtons = [];

    // In-memory game state
    public $gameData = [];
    public $gameDataStatic = []; 
    
    public $Jackpots = [];
    public $Bank = 0;
    public $WinGamble = 5;

    public $isBonusStart = false;
    public $SymbolGame = [];
    public $Line = [];
    public $gameLine = [];

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
        $this->gameDataStatic = $gameState['currentStaticData'] ?? [];

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
        $this->linesPercentConfigSpin = $gameSettings['lines_percent_config_spin'];
        $this->linesPercentConfigBonus = $gameSettings['lines_percent_config_bonus'];

        // Initialize Jackpots
        $this->Jackpots = $gameState['jackpotData'] ?? $config['jackpotSettings'] ?? [];

        // BananasNG specific Paytable
        $this->Paytable['SYM_0'] = [0,0,2,30,120,800]; // Wild (Banana)
        $this->Paytable['SYM_1'] = [0,0,2,30,120,800]; // Wild (Banana)
        $this->Paytable['SYM_2'] = [0,0,0,20,100,400];
        $this->Paytable['SYM_3'] = [0,0,0,20,70,250];
        $this->Paytable['SYM_4'] = [0,0,0,20,70,250];
        $this->Paytable['SYM_5'] = [0,0,0,10,50,120];
        $this->Paytable['SYM_6'] = [0,0,0,10,50,120];
        $this->Paytable['SYM_7'] = [0,0,0,4,30,100];
        $this->Paytable['SYM_8'] = [0,0,0,4,30,100];
        $this->Paytable['SYM_9'] = [0,0,0,4,30,100];
        $this->Paytable['SYM_10'] = [0,0,2,4,30,100];
        $this->Paytable['SYM_11'] = [0,0,2,4,20,500]; // Scatter
        $this->Paytable['SYM_12'] = [0,0,10,250,2500,9000]; // Bonus symbol

        // Load Reels
        $reelsObj = new GameReel();
        $reelStripsMapping = [
            'reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'
        ];
        foreach ($reelStripsMapping as $reelStripProperty) {
            if (isset($reelsObj->reelsStrip[$reelStripProperty]) && count($reelsObj->reelsStrip[$reelStripProperty])) {
                $this->$reelStripProperty = $reelsObj->reelsStrip[$reelStripProperty];
            }
        }

        $bonusReelPropertyMap = [
            'reelStripBonus1', 'reelStripBonus2', 'reelStripBonus3',
            'reelStripBonus4', 'reelStripBonus5', 'reelStripBonus6'
        ];
        foreach($bonusReelPropertyMap as $propName) {
            if (isset($reelsObj->reelsStripBonus[$propName]) && count($reelsObj->reelsStripBonus[$propName]) > 0) {
                 $this->$propName = $reelsObj->reelsStripBonus[$propName];
            }
        }

        // Static configurations
        $this->keyController = ['13' => 'uiButtonSpin,uiButtonSkip'];
        $this->slotReelsConfig = [[425,142,3], [669,142,3], [913,142,3], [1157,142,3], [1401,142,3]];
        $this->Line = array_map('strval', range(1,10)); // BananasNG has 10 lines
        $this->gameLine = $this->Line;
        $this->SymbolGame = ['0','1','2','3','4','5','6','7','8','9','10','11','12']; // BananasNG symbols

        // Initialize Bank
        $this->Bank = $gameState['currentBank'] ?? ($config['gameSettings']['initialBank'] ?? 100000);
        
        // Ensure essential gameDataStatic keys are present
        if (!isset($this->gameDataStatic['SpinWinLimit'])) {
            $this->SetGameDataStatic('SpinWinLimit', 0);
        }
        if (!isset($this->gameDataStatic['RtpControlCount'])) {
            $this->SetGameDataStatic('RtpControlCount', 200);
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

        foreach ($this->Jackpots as $i => &$jp) { 
            if (!isset($jp['balance']) || !isset($jp['percent'])) continue;
            $contribution = $bet / 100 * $jp['percent'];
            $jp['balance'] += $contribution;
        }
        unset($jp); 
        return $this->Jackpots; 
    }
    
    public function SetBank($sum, $slotState = '', $slotEvent = '')
    {
        $sumInDenom = $sum * $this->currentDenom;
        $this->Bank += $sumInDenom;
        if ($this->Bank < 0) {
            // Could be normal state if large win occurred
        }
    }

    public function GetBank($slotState = '')
    {
        return $this->Bank / ($this->currentDenom ?: 0.01);
    }
    
    public function GetPercent()
    {
        return $this->shopPercent;
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
        return $this->FormatFloat(is_numeric($this->Balance) ? $this->Balance : 0);
    }

    public function SaveLogReport($spinSymbols, $bet, $lines, $win, $slotState) { /* NO-OP */ }
    public function InternalErrorSilent($errcode) { error_log("InternalErrorSilent: " . print_r($errcode, true)); }
    public function InternalError($errcode) { 
        error_log("InternalError: " . print_r($errcode, true)); 
        throw new \Exception("Internal Server Error: " . (is_string($errcode) ? $errcode : json_encode($errcode)));
    }

    public function GetSpinSettings($bet, $lines, $garantType = 'bet')
    {
        $curField = 10; // Default for 10 lines (BananasNG)
        if ($lines >= 10) $curField = 10;
        else if ($lines >= 8) $curField = 9;
        else if ($lines >= 6) $curField = 7;
        else if ($lines >= 4) $curField = 5;
        else if ($lines >= 2) $curField = 3;
        else if ($lines == 1) $curField = 1;
        
        $pref = ($garantType != 'bet') ? '_bonus' : '';
        $this->AllBet = $bet * $lines; 

        $linesPercentConfigSpin = $this->linesPercentConfigSpin;
        $linesPercentConfigBonus = $this->linesPercentConfigBonus;
        $currentPercent = $this->shopPercent;

        $currentSpinWinChance = 100;
        $currentBonusWinChance = 1000;

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
        }

        // Determine percent level for bonus
        $configKeyBonus = 'line' . $curField . $pref;
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
        }

        // RTP Control Logic
        $rtpRange = $currentPercent; 
        if (($this->GetGameDataStatic('RtpControlCount') ?? 200) == 0) {
            if ($currentPercent + rand(1, 2) < $rtpRange && ($this->GetGameDataStatic('SpinWinLimit') ?? 0) <= 0) {
                $this->SetGameDataStatic('SpinWinLimit', rand(25, 50));
            }
        } else {
            $this->SetGameDataStatic('RtpControlCount', ($this->GetGameDataStatic('RtpControlCount') ?? 200) - 1);
        }

        $bonusWinTrigger = rand(1, $currentBonusWinChance > 0 ? $currentBonusWinChance : 10000);
        $spinWinTrigger = rand(1, $currentSpinWinChance > 0 ? $currentSpinWinChance : 100);

        $return = ['none', 0];

        if ($bonusWinTrigger == 1 && $this->slotBonus) {
            $this->isBonusStart = true; 
            $winLimit = $this->GetBank('bonus'); 
            $avgBonusPay = ($this->CheckBonusWin() ?: 1) * $this->AllBet; 
            if ($winLimit >= $avgBonusPay) { 
                $return = ['bonus', $winLimit];
            } else {
                 $this->isBonusStart = false; 
            }
        } else if ($spinWinTrigger == 1) {
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
        $activeReelStrips = [];
        $numReels = 0;

        for($r=1; $r<=6; $r++){
            $normalStripName = 'reelStrip'.$r;
            $bonusStripName = 'reelStripBonus'.$r;
            $currentStrip = [];

            if($slotEvent == 'freespin' && !empty($this->$bonusStripName)){
                $currentStrip = $this->$bonusStripName;
            } else if(!empty($this->$normalStripName)){
                $currentStrip = $this->$normalStripName;
            }

            if(!empty($currentStrip)){
                $activeReelStrips[$r] = $currentStrip;
                $numReels = $r;
            } else {
                if ($r == 1 && empty($currentStrip)) {
                     error_log("Error: Reel strip 1 is empty.");
                     return ['rp' => []];
                }
                if(empty($currentStrip) && $numReels >= $r) {
                    $numReels = $r -1;
                    break;
                }
            }
        }
        
        if ($numReels == 0) {
             error_log("No reel strips loaded in GetReelStrips.");
             return ['rp' => []]; 
        }

        $prs = [];
        $reelsToProcess = range(1, $numReels);

        if ($winType == 'bonus') { 
            $scattersToPlace = rand(min(3, $numReels), $numReels); 
            shuffle($reelsToProcess);

            foreach($reelsToProcess as $idx => $reelNum){
                $currentReelStripData = $activeReelStrips[$reelNum];
                if(empty($currentReelStripData) || count($currentReelStripData) < 3) {
                     $prs[$reelNum] = 0; continue;
                }
                if($idx < $scattersToPlace){
                    $prs[$reelNum] = $this->GetRandomScatterPos($currentReelStripData);
                } else {
                    $prs[$reelNum] = mt_rand(0, count($currentReelStripData) - 3);
                }
            }
        } else { 
            foreach($reelsToProcess as $reelNum){
                $currentReelStripData = $activeReelStrips[$reelNum];
                 if (empty($currentReelStripData) || count($currentReelStripData) < 3) {
                    $prs[$reelNum] = 0; continue;
                }
                $maxPos = count($currentReelStripData) - 3;
                $prs[$reelNum] = mt_rand(0, max(0, $maxPos));
            }
        }
        
        $reelResult = ['rp' => []];
        foreach ($prs as $reelIndexKey => $startPosition) {
            $currentReelStripData = $activeReelStrips[$reelIndexKey];
            if (empty($currentReelStripData) || count($currentReelStripData) < 3) { 
                for ($s=0; $s<3; $s++) $reelResult['reel' . $reelIndexKey][$s] = '0'; 
                $reelResult['rp'][] = 0;
                continue;
            }

            $pos = max(0, min($startPosition, count($currentReelStripData) - 3));
            
            $stripLen = count($currentReelStripData);
            $reelResult['reel' . $reelIndexKey][0] = $currentReelStripData[$pos % $stripLen];                   
            $reelResult['reel' . $reelIndexKey][1] = $currentReelStripData[($pos + 1) % $stripLen];             
            $reelResult['reel' . $reelIndexKey][2] = $currentReelStripData[($pos + 2) % $stripLen];             
            $reelResult['rp'][] = $pos;
        }

        return $reelResult;
    }

    private function GetRandomScatterPos($reelStrip)
    {
        $scatterSymbol = '11'; // BananasNG scatter
        $scatterPositions = [];
        
        for ($i = 0; $i < count($reelStrip) - 2; $i++) {
            if ($reelStrip[$i] == $scatterSymbol || $reelStrip[$i + 1] == $scatterSymbol || $reelStrip[$i + 2] == $scatterSymbol) {
                $scatterPositions[] = $i;
            }
        }
        
        if (!empty($scatterPositions)) {
            return $scatterPositions[array_rand($scatterPositions)];
        }
        
        return mt_rand(0, count($reelStrip) - 3);
    }

    public function GetRandomPay()
    {
        return mt_rand(1, 10) / 100;
    }
}
