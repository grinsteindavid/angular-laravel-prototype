<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Room extends Model
{
    protected $table = 'rooms';

    protected $fillable = [
        'name', 'client_id', 'admin_id', 'active'
    ];

    protected $hidden = [
        'admin_id', 'client_id'
    ];

    protected $appends = [
    ];

    public function messages()
    {
        return $this->belongsToMany('App\Message', 'rooms_messages');
    }

    public static function hasClient($client_id)
    {
        $instance = new static;
        return $instance->where([
            ['client_id', '=', $client_id],
            ['active', '=', 1]
        ])->get()->first();
    }

    public static function hasAdmin($admin_id)
    {
        $instance = new static;
        return $instance->where([
            ['admin_id', '=', $admin_id],
            ['active', '=', 1]
        ])->get()->first();
    }

    public static function findByName($name)
    {
        $instance = new static;
        return $instance->where('name', $name)->get()->first();
    }

    public static function findByUser($user_id, $role)
    {
        if ($role === 'admin') {
            $cond = 'admin_id';
        }
        elseif ($role === 'client') {
            $cond = 'client_id';
        }

        $instance = new static;
        return $instance->where([
            [$cond, '=', $user_id],
            ['active', '=', 1]
        ])->get()->first();
    }

    public static function findByUserToOpen($client_id, $admin_id)
    {
        $instance = new static;
        return $instance->where([
            ['client_id', '=', $client_id],
            ['admin_id', '=', $admin_id]
        ])->get()->first();
    }
}
