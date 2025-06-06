<?php
namespace VanguardLTE\Games\CloverStonesNG;

class Config
{
    public static function getGameSettings()
    {
        // These values would have come from the 'games' table
        return [
            'name' => 'CloverStonesNG',
            'slotDBId' => 'cloverstonesng_db_id', // Example DB ID
            'bet' => [1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50, 100, 200, 400], // Bet options
            'denomination' => 0.01, // Default denomination
            'slotViewState' => 'Normal',
            'slotFreeCount' => 15,
            'slotFreeMpl' => 2,
            'slotWildMpl' => 1,
            // Lines percent config - simplified for this example.
            // In a real scenario, this complex structure needs to be fully defined.
            'lines_percent_config_spin' => self::getLinesPercentConfig(),
            'lines_percent_config_bonus' => self::getLinesPercentConfig(), // Often similar or slightly different
            'rezerv' => 5, // WinGamble from SlotSettings constructor
            // Add other 'game' table related settings here
        ];
    }

    public static function getShopSettings()
    {
        // These values would have come from the 'shops' table
        return [
            'currency' => 'USD',
            'percent' => 74, // Actual shop RTP percentage from database
            'max_win' => 100, // Actual max win amount from database
            // Add other 'shop' table related settings here
        ];
    }

    public static function getJackpotSettings()
    {
        // Simulated jackpot data if not passed by client
        // In a truly stateless server, client might need to pass current jackpot states.
        // For this example, we'll define some static ones.
        return [
            // Example:
            // ['id' => 'jp1', 'balance' => 1000, 'percent' => 1, 'min_balance' => 500, 'start_balance' => 500, 'pay_sum' => 0, 'user_id' => null],
            // ['id' => 'jp2', 'balance' => 5000, 'percent' => 0.5, 'min_balance' => 2000, 'start_balance' => 2000, 'pay_sum' => 0, 'user_id' => null]
        ];
    }

    private static function getLinesPercentConfig()
    {
        // Actual database configuration from w_games table
        return [
            'line1' => ['74_80' => 15, '82_88' => 9, '90_96' => 7],
            'line3' => ['74_80' => 15, '82_88' => 9, '90_96' => 7],
            'line5' => ['74_80' => 12, '82_88' => 8, '90_96' => 6],
            'line7' => ['74_80' => 12, '82_88' => 8, '90_96' => 6],
            'line9' => ['74_80' => 10, '82_88' => 7, '90_96' => 5],
            'line10' => ['74_80' => 10, '82_88' => 7, '90_96' => 5],
            // Bonus configurations
            'line1_bonus' => ['74_80' => 15, '82_88' => 9, '90_96' => 7],
            'line3_bonus' => ['74_80' => 15, '82_88' => 9, '90_96' => 7],
            'line5_bonus' => ['74_80' => 12, '82_88' => 8, '90_96' => 6],
            'line7_bonus' => ['74_80' => 12, '82_88' => 8, '90_96' => 6],
            'line9_bonus' => ['74_80' => 10, '82_88' => 7, '90_96' => 5],
            'line10_bonus' => ['74_80' => 10, '82_88' => 7, '90_96' => 5],
        ];
    }
}

