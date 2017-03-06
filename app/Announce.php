<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Announce extends Model
{
    protected $table = 'announces';

    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'id', 'updated_at', 'created_at'
    ];


}
