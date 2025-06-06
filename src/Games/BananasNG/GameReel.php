<?php 
namespace VanguardLTE\Games\BananasNG;

class GameReel
{
    public $reelsStrip = [
        'reelStrip1' => [], 
        'reelStrip2' => [], 
        'reelStrip3' => [], 
        'reelStrip4' => [], 
        'reelStrip5' => [], 
        'reelStrip6' => []
    ];
    public $reelsStripBonus = [
        'reelStripBonus1' => [], 
        'reelStripBonus2' => [], 
        'reelStripBonus3' => [], 
        'reelStripBonus4' => [], 
        'reelStripBonus5' => [], 
        'reelStripBonus6' => []
    ];
    
    public function __construct()
    {
        // Load reels from local reels.txt file instead of using base_path()
        $reelsFile = __DIR__ . '/reels.txt';
        if (!file_exists($reelsFile)) {
            error_log("BananasNG reels.txt file not found at: " . $reelsFile);
            return;
        }
        
        $temp = file($reelsFile);
        foreach( $temp as $str ) 
        {
            $str = explode('=', $str);
            if( isset($this->reelsStrip[$str[0]]) ) 
            {
                $data = explode(',', $str[1]);
                foreach( $data as $elem ) 
                {
                    $elem = trim($elem);
                    if( $elem != '' ) 
                    {
                        $this->reelsStrip[$str[0]][] = $elem;
                    }
                }
            }
            if( isset($this->reelsStripBonus[$str[0]]) ) 
            {
                $data = explode(',', $str[1]);
                foreach( $data as $elem ) 
                {
                    $elem = trim($elem);
                    if( $elem != '' ) 
                    {
                        $this->reelsStripBonus[$str[0]][] = $elem;
                    }
                }
            }
        }
    }
}
