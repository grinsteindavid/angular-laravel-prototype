<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Role;
use App\Person;
use Carbon\Carbon;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        $this->validate($request, [
            'password' => 'required|max:255',
            'email' => 'required|max:255',
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'date_of_birth' => 'required',
            'gender' => 'required'
        ]);

        if (User::where('email', $request->email)->get()->first()) {
            return response('El correo electronico ya esta en uso.', 500);
        }

        $person = new Person($request->all());
        $person->date_of_birth = Carbon::parse($request->date_of_birth);
        $person->save();

        $user = new User($request->all());
        // Crear token unico
        $token = bcrypt(str_random(60));
        while (true) {
            if (!User::where('api_token', $token)->get()->first()) {
                break;
            }
            $token = bcrypt(str_random(60));
        }
        $user->api_token = $token;
        $user->token_lifetime = Carbon::now()->addWeeks(1);
        $user->password = bcrypt($request->password);
        $user->role_id = Role::findRole('client');
        $user->person_id = $person->id;
        $user->status = true;
        $user->image = '/' . 'profiles_pictures/default.jpg';
        $user->save();
        return response()->json([
            'userToken' => $user->api_token, 'userRole' => $user->role(), 'pusher_key' => env('PUSHER_KEY')
        ]);
    }
}
