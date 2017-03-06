<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Tool;

class ToolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $toolCounter = $request->header('toolCounter');
        $tools = Tool::orderBy('updated_at', 'desc')
            ->offset($toolCounter * 10)->limit(10)->get();
        $toolQuantity = Tool::all()->count();
        return response()->json(['tools' => $tools, 'toolQuantity' => $toolQuantity]);
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
            'description' => 'required'
        ]);

        $tool = new Tool();
        $tool->name = $request->name;
        $tool->description = $request->description;
        $tool->slug = $this->slug($request->name);
        if ($request->picture) {
            $imageName = $tool->slug.'.'.$request->picture->getClientOriginalExtension();
            $request->picture->move(public_path('tools_pictures'), $imageName);
            $tool->image = '/tools_pictures'.'/'.$imageName;
        } else {
            $tool->image = '/tools_pictures/default.jpg';
        }
        $tool->save();

        $toolCounter = $request->header('toolCounter');
        $tools = Tool::orderBy('updated_at', 'desc')
            ->offset($toolCounter * 10)->limit(10)->get();
        $toolQuantity = Tool::all()->count();
        return response()->json(['tools' => $tools, 'toolQuantity' => $toolQuantity]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $tool = Tool::where('slug', $id)->get()->first();
        if ($tool) {
            return response()->json(['tool' => $tool]);
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
            'description' => 'required'
        ]);

        $tool = Tool::where('slug', $id)->get()->first();
        if ($tool) {
            if ($request->picture) {
                $imageName = $tool->slug.'.'.$request->picture->getClientOriginalExtension();
                $request->picture->move(public_path('tools_pictures'), $imageName);
                $tool->image = '/tools_pictures'.'/'.$imageName;
            }
            $tool->description = $request->description;
            $tool->save();

            $toolCounter = $request->header('toolCounter');
            $tools = Tool::orderBy('updated_at', 'desc')
                ->offset($toolCounter * 10)->limit(10)->get();
            $toolQuantity = Tool::all()->count();
            return response()->json(['tools' => $tools, 'toolQuantity' => $toolQuantity]);
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
        $tool = Tool::where('slug', $id)->get()->first();
        if ($tool) {
            Tool::destroy($tool->id);

            $toolCounter = $request->header('toolCounter');
            $tools = Tool::orderBy('updated_at', 'desc')
                ->offset($toolCounter * 10)->limit(10)->get();
            $toolQuantity = Tool::all()->count();
            return response()->json(['tools' => $tools, 'toolQuantity' => $toolQuantity]);
        }
        return response(false, 500);
    }
}
