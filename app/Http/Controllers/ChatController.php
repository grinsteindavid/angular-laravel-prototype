<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Vinkla\Pusher\Facades\Pusher;
use App\User;
use App\Message;
use App\Room;

class ChatController extends Controller
{
    /**
     * Listado de mensajes por sala.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = User::findByToken($request->header('userToken'));
        if ($user) {
            $room = Room::findByUser($user->id, $user->role());
            if ($room) {
                $messages = $room->messages()->orderBy('created_at', 'desc')->limit(1000)->get();
                return response()->json(['messages' => $messages]);
            }
            return response('Usted no esta autorizado para leer estos mensajes.', 500);
        }
        return response('Usted no esta autorizado para leer estos mensajes.', 500);
    }

    /**
     * Guardar mensaje.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::findByToken($request->header('userToken'));
        $room = Room::findByUser($user->id, $user->role());
        if ($room && $room->active) {
            $message = Message::create(['body' => $request->body, 'user_id' => $user->id]);
            $message->associate_room($room->id);
            Pusher::trigger($room->name, 'new-message', ['message' => $message, 'room_active' => $room->active]);
            return response('Mensaje creado con exito.', 200);
        }
        return response('La sala no existe o esta cerrada.', 500);
    }

    /**
     * Cerrar sala.
     *
     *  @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function closeRoom(Request $request)
    {
        $admin = User::findByToken($request->header('userToken'));
        $room = Room::findByUser($admin->id, $admin->role());
        if ($room) {
            $room->active = false;
            $room->save();
            Pusher::trigger($room->name, 'new-message', ['room_active' => $room->active]);
            return response('La sala ha sido cerrada con exito.', 200);
        }
        return response('La sala no se encuentra disponible o usted no esta autorizado para realizar esta accion.', 500);
    }

    /**
     * Actualizar estado del chat.
     *
     * @return \Illuminate\Http\Response
     */
    public function checkStatus(Request $request)
    {
        $user = User::findByToken($request->header('userToken'));
        if ($user) {
            $room = Room::findByUser($user->id, $user->role());
            $room_active = ($room) ? $room->active : false;
            $room_name = ($room) ? $room->name : null;
            return response()->json(['room_name' => $room_name, 'room_active' => $room_active]);
        }
        return response('El usuario solicitado no existe.', 500);
    }
}
