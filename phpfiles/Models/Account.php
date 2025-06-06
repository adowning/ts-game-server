<?php 
namespace VanguardLTE
{
    class Account extends \Illuminate\Database\Eloquent\Model
    {
        protected $table = 'accounts';
        protected $fillable = [
            'id',
            'php_id', 
            'pb_id', 
            'balance', 
            'coins', 
            'name',
            'field'
        ];
        public static function boot()
        {
            parent::boot();
        }
    }

}
