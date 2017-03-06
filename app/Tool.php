<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    protected $table = 'tools';

    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'id', 'updated_at', 'created_at'
    ];
}
