<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $table = 'people';

    protected $fillable = [
        'first_name', 'last_name', 'date_of_birth', 'gender'
    ];

    protected $hidden = [
        'id', 'updated_at', 'created_at'
    ];
}
