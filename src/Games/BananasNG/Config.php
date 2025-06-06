<?php
namespace VanguardLTE\Games\BananasNG;

class Config
{
    public static function getGameSettings()
    {
        // BananasNG specific game settings
        return [
            'name' => 'BananasNG',
            'slotDBId' => 'bananasng_db_id',
            'bet' => [1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50, 100, 200, 400, 800], // BananasNG bet options
            'denomination' => 0.01,
            'slotViewState' => 'Normal',
            'slotFreeCount' => 15, // Free spins count
            'slotFreeMpl' => 2, // Free spin multiplier
            'slotWildMpl' => 1, // Wild multiplier
            'lines_percent_config_spin' => self::getLinesPercentConfig(),
            'lines_percent_config_bonus' => self::getLinesPercentConfig(),
            'rezerv' => 5,
        ];
    }

    public static function getShopSettings()
    {
        // Shop settings for BananasNG
        return [
            'currency' => 'USD',
            'percent' => 92, // BananasNG RTP is 92.18%
            'max_win' => 5000,
        ];
    }

    public static function getJackpotSettings()
    {
        // BananasNG jackpot settings
        return [
            // Example jackpots - can be customized
        ];
    }

    private static function getLinesPercentConfig()
    {
        // BananasNG specific lines percent configuration
        // This controls win frequency based on shop percentage and lines played
        $config = [];
        $levels = ['0_90', '90_92', '92_94', '94_96', '96_98', '98_100'];
        $fields = [1, 3, 5, 7, 9, 10]; // For BananasNG's 10 lines

        foreach ($fields as $field) {
            $key = 'line' . $field;
            foreach ($levels as $level) {
                // BananasNG specific win chance calculations
                $baseChance = 100 - (int)explode('_', $level)[0];
                $config[$key][$level] = max(5, $baseChance + $field * 2);
            }
            
            // Bonus configurations
            $keyBonus = 'line' . $field . '_bonus';
             foreach ($levels as $level) {
                $baseChance = 500 - (int)explode('_', $level)[0] * 2;
                $config[$keyBonus][$level] = max(100, $baseChance + $field * 10);
            }
        }
        return $config;
    }
}
