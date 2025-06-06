<?php
namespace VanguardLTE\Games\AfricanKingNG;

class GameReel_refactored
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
        // Use __DIR__ for relative path to reels.txt
        $reelsFilePath = __DIR__ . '/reels.txt';

        if (file_exists($reelsFilePath)) {
            $temp = file($reelsFilePath);
            if ($temp === false) {
                // Handle error: file could not be read
                // You might want to log this or throw an exception
                error_log("Failed to read reels file: " . $reelsFilePath);
                return;
            }

            foreach ($temp as $str) {
                $strParts = explode('=', $str);
                if (count($strParts) === 2) {
                    $reelName = trim($strParts[0]);
                    $reelData = explode(',', trim($strParts[1]));

                    if (isset($this->reelsStrip[$reelName])) {
                        $this->reelsStrip[$reelName] = []; // Initialize to ensure clean data
                        foreach ($reelData as $elem) {
                            $trimmedElem = trim($elem);
                            if ($trimmedElem !== '') {
                                $this->reelsStrip[$reelName][] = $trimmedElem;
                            }
                        }
                    }
                    // It seems the original code intended to populate bonus strips
                    // with the same logic if the key matched.
                    // For example, if reels.txt had "reelStripBonus1=...", it would populate it.
                    if (isset($this->reelsStripBonus[$reelName])) {
                        $this->reelsStripBonus[$reelName] = []; // Initialize
                        foreach ($reelData as $elem) {
                            $trimmedElem = trim($elem);
                            if ($trimmedElem !== '') {
                                $this->reelsStripBonus[$reelName][] = $trimmedElem;
                            }
                        }
                    }
                }
            }
        } else {
            // Handle error: file does not exist
            // Log this or throw an exception based on how critical this file is
            error_log("Reels file not found: " . $reelsFilePath);
        }
    }
}
?>
