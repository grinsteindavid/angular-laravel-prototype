<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';

    protected $fillable = [
        'role',
    ];

    protected $hidden = [
        'id'
    ];

    public static function findRole($role)
    {
        $instance = new static;
        return $instance->where('role', $role)->get()->first()->id;
    }
}
