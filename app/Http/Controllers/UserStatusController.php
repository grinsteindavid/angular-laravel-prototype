<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Carbon\Carbon;

class UserStatusController extends Controller
{
    public function restart(Request $request)
    {
        $user = User::findByToken($request->header('userToken'));
        if ($user) {
            $user->status = true;
            $user->save();
            return response('El estado del usuario ha sido actualizado.', 200);
        }
        return response('El usuario solicitado no existe.', 500);
    }

    public function restartAll(Request $request)
    {
        return User::where([
                ['status', '=', true],
                ['updated_at', '<=', Carbon::now()->subSeconds(20)->toDateTimeString()]
        ])->update(['status' => false]);
    }
}
