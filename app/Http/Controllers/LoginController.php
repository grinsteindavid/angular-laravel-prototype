<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Room;
use Carbon\Carbon;

class LoginController extends Controller
{
    public function store(Request $request)
    {
        $this->validate($request, [
            'password' => 'required|max:255',
            'email' => 'required|max:255'
        ]);

        // Buscar usuario
        $user = User::where('email', $request->email)->get()->first();
        // Verificar datos
        if ($user && Hash::check($request->password, $user->password)) {
            // Verificar caducidad del token
            if (Carbon::parse($user->token_lifetime)->gt(Carbon::now())) {
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
            }
            $user->status = true;
            $user->save();
            // Enviar datos del chat
            $room = Room::findByUser($user->id, $user->role());
            $room_active = ($room) ? $room->active : false;
            $room_name = ($room) ? $room->name : null;
            return response()->json([
                'userToken' => $user->api_token, 'userRole' => $user->role(), 'pusher_key' => env('PUSHER_KEY'), 'room_name' => $room_name, 'room_active' => $room_active
            ]);
        }
        return response('Los datos proporcionados no son correctos.', 500);
    }
}
