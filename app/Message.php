<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\User;

class Message extends Model
{
    protected $table = 'messages';

    protected $fillable = [
        'body', 'user_id',
    ];

    protected $hidden = [
        'user_id',
    ];

    protected $appends = [
        'full_name', 'image'
    ];

    public function associate_room($room_id)
    {
        return DB::table('rooms_messages')->insert(['room_id' => $room_id, 'message_id' => $this->id]);
    }

    // Accessors & Mutators
    public function getFullNameAttribute()
    {
        $user = User::find($this->user_id);
        return $this->attributes['full_name'] = $user->full_name();
    }

    public function getImageAttribute()
    {
        $user = User::find($this->user_id);
        return $this->attributes['image'] = $user->image;
    }
}
