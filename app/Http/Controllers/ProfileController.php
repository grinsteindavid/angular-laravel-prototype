<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $token = $request->header('userToken');
        $user = User::findByToken($token);
        if ($user) {
            return response()->json($user);
        }
        return response(false, 500);
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|max:255',
            'password' => 'required|max:255'
        ]);

        $token = $request->header('userToken');
        $user = User::findByToken($token);
        if ($user && Hash::check($request->password, $user->password)) {
            if ($request->picture) {
                $imageName = $user->id.'.'.$request->picture->getClientOriginalExtension();
                $request->picture->move(public_path('profiles_pictures'), $imageName);
                $user->image = '/profiles_pictures'.'/'.$imageName;
            }
            $user->email = $request->email;
            $user->save();
            $user->person->update($request->person);
            return response()->json($user);
        }
        return response('La contrasena es incorrecta.', 500);
    }
}
