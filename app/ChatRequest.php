<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class ChatRequest extends Model
{
    protected $table = 'chat_requests';

    protected $fillable = [
        'user_id'
    ];

    protected $hidden = [
        'user_id',
    ];

    protected $appends = [
        'full_name', 'active'
    ];

    public function client()
    {
        return User::find($this->user_id);
    }

    public static function findByClient($client_id)
    {
        $instance = new static;
        return $instance->where('user_id', $client_id)->get()->first();
    }

    // Accessors & Mutators
    public function getFullNameAttribute()
    {
        $user = User::find($this->user_id);
        return $this->attributes['full_name'] = $user->full_name();
    }

    public function getActiveAttribute()
    {
        $user = User::find($this->user_id);
        return $this->attributes['active'] = $user->status;
    }
}
