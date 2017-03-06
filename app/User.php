<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Role;
use App\Person;

class User extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'email'
    ];

    protected $hidden = [
        'id', 'status', 'password', 'api_token', 'token_lifetime', 'person_id', 'role_id', 'updated_at', 'created_at'
    ];

    protected $appends = [
        'person'
    ];

    public function role()
    {
        return Role::find($this->role_id)->role;
    }

    public static function findByToken($token)
    {
        $instance = new static;
        return $instance->where('api_token', $token)->get()->first();
    }

    public function checkRoles($roles)
    {
        foreach ($roles as $role) {
            if ($role === $this->role()) {
                return true;
            }
        }
        return false;
    }

    public function person()
    {
        return Person::find($this->person_id);
    }

    public function full_name()
    {
        $person = Person::find($this->person_id);
        $name = $person->first_name . ' ' . $person->last_name;
        return $name;
    }

    // Accessors & Mutators
    public function getPersonAttribute()
    {
        return $this->attributes['person'] = Person::find($this->person_id);
    }

    public function setPersonAttribute($person)
    {
        return $this->attributes['person'] = $person;
    }
}
