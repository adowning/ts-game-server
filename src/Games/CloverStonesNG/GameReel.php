<?php 
namespace VanguardLTE\Games\CloverStonesNG;

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
        // Assumes reels.txt is in the same directory as GameReel.php
        $reelsFilePath = __DIR__ . '/reels.txt';
        if (!file_exists($reelsFilePath)) {
            // Handle error: reels.txt not found
            error_log("Error: reels.txt not found at " . $reelsFilePath);
            return;
        }

        $temp = file($reelsFilePath);
        if ($temp === false) {
            error_log("Error: Could not read reels.txt at " . $reelsFilePath);
            return;
        }

        foreach ($temp as $str) {
            $parts = explode('=', $str, 2); // Limit explode to 2 parts
            if (count($parts) < 2) {
                continue; // Skip malformed lines
            }
            $reelKey = trim($parts[0]);
            $reelValues = trim($parts[1]);

            if (isset($this->reelsStrip[$reelKey])) {
                $data = explode(',', $reelValues);
                foreach ($data as $elem) {
                    $elem = trim($elem);
                    if ($elem !== '') {
                        $this->reelsStrip[$reelKey][] = $elem;
                    }
                }
            }
            if (isset($this->reelsStripBonus[$reelKey])) {
                $data = explode(',', $reelValues);
                foreach ($data as $elem) {
                    $elem = trim($elem);
                    if ($elem !== '') {
                        $this->reelsStripBonus[$reelKey][] = $elem;
                    }
                }
            }
        }
    }
}
