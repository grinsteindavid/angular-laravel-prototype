<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Announce;

class AnnounceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $announceCounter = $request->header('announceCounter');
        $announces = Announce::orderBy('updated_at', 'desc')
            ->offset($announceCounter * 10)->limit(10)->get();
        $announceQuantity = Announce::all()->count();
        return response()->json(['announces' => $announces, 'announceQuantity' => $announceQuantity]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'title' => 'required|max:255',
            'description' => 'required',
            'picture' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:1048',
        ]);

        $announce = new Announce();
        $announce->name = $request->name;
        $announce->title = $request->title;
        $announce->description = $request->description;
        $announce->slug = $this->slug($request->name);
        $imageName = $this->slug($request->name).'.'.$request->picture->getClientOriginalExtension();
        $request->picture->move(public_path('announces_pictures'), $imageName);
        $announce->image = '/announces_pictures'.'/'.$imageName;
        $announce->save();

        $announceCounter = $request->header('announceCounter');
        $announces = Announce::orderBy('updated_at', 'desc')
            ->offset($announceCounter * 10)->limit(10)->get();
        $announceQuantity = Announce::all()->count();
        return response()->json(['announces' => $announces, 'announceQuantity' => $announceQuantity]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $announce = Announce::where('slug', $id)->get()->first();
        if ($announce) {
            return response()->json(['announce' => $announce]);
        }
        return response(false, 500);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required|max:255',
            'description' => 'required'
        ]);

        $announce = Announce::where('slug', $id)->get()->first();
        if ($announce) {
            if ($request->picture) {
                $imageName = $announce->image.'.'.$request->picture->getClientOriginalExtension();
                $request->picture->move(public_path('announces_pictures'), $imageName);
                $announce->image = '/announces_pictures'.'/'.$imageName;
            }
            $announce->title = $request->title;
            $announce->description = $request->description;
            $announce->save();

            $announceCounter = $request->header('announceCounter');
            $announces = Announce::orderBy('updated_at', 'desc')
                ->offset($announceCounter * 10)->limit(10)->get();
            $announceQuantity = Announce::all()->count();
            return response()->json(['announces' => $announces, 'announceQuantity' => $announceQuantity]);
        }
        return response(false, 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $announce = Announce::where('slug', $id)->get()->first();
        if ($announce) {
            Announce::destroy($announce->id);

            $announceCounter = $request->header('announceCounter');
            $announces = Announce::orderBy('updated_at', 'desc')
                ->offset($announceCounter * 10)->limit(10)->get();
            $announceQuantity = Announce::all()->count();
            return response()->json(['announces' => $announces, 'announceQuantity' => $announceQuantity]);
        }
        return response(false, 500);
    }
}
