<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Room;
use App\ChatRequest;

class ChatRequestController extends Controller
{
    /**
     * Lista de solicitudes de chat.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $requestCounter = $request->header('requestCounter');
        $chatRequests = ChatRequest::orderBy('created_at', 'desc')
            ->offset($requestCounter * 10)->limit(10)->get();
        $requestQuantity = ChatRequest::all()->count();
        return response()->json(['chatRequests' => $chatRequests, 'requestQuantity' => $requestQuantity]);
    }

    /**
     * Crear solicitud.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $client = User::findByToken($request->header('userToken'));
        // Evitar duplicados
        if (!ChatRequest::findByClient($client->id) && !Room::hasClient($client->id)) {
            return ChatRequest::create(['user_id' => $client->id]);
        }
        return response('Usted ya ha creado una solicitud.', 500);
    }

    /**
     * Rechazar solicitud.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $requestCounter = $request->header('requestCounter');
        $chatRequests = ChatRequest::orderBy('created_at', 'desc')
            ->offset($requestCounter * 10)->limit(10)->get();
        $requestQuantity = ChatRequest::all()->count();
        ChatRequest::destroy($id);

        return response()->json(['chatRequests' => $chatRequests, 'requestQuantity' => $requestQuantity]);
    }

    /**
     * Aceptar solicitud y crear sala.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function acceptRequest(Request $request, $id)
    {
        $client = ChatRequest::find($id)->client();
        $admin = User::findByToken($request->header('userToken'));
        $room = Room::findByUserToOpen($client->id, $admin->id);
        if ($room && !$room->active) {
            $room->active = true;
            $room->save();
            ChatRequest::destroy($id);
            return response()->json(['room_name' => $room->name, 'room_active' => $room->active]);
        }
        if (!Room::hasAdmin($admin->id) && !Room::hasClient($client->id)) {
            $room_name = str_random(10);
            while (true) {
                if (!Room::where('name', $room_name)->get()->first()) {
                    break;
                }
                $room_name = str_random(10);
            }
            Room::create([
            'name' => $room_name, 'admin_id' => $admin->id, 'client_id' => $client->id, 'active' => true
            ]);
            ChatRequest::destroy($id);
            return response()->json(['room_name' => $admin->email, 'room_active' => true]);
        }
        return response('El administrador o el cliente estan en una sala activa.', 500);
    }
}
