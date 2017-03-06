<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $tagCounter = $request->header('tagCounter');
        $tags = Tag::orderBy('created_at', 'desc')
            ->offset($tagCounter * 10)->limit(10)->get();
        $tagQuantity = Tag::all()->count();
        return response()->json(['tags' => $tags, 'tagQuantity' => $tagQuantity]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function IndexNames()
    {
        $tags = Tag::all()->pluck('name');
        return response()->json(['tags' => $tags]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tag = new Tag($request->all());
        $tag->slug = $this->slug($request->name);
        $tag->save();

        $tagCounter = $request->header('tagCounter');
        $tags = Tag::orderBy('updated_at', 'desc')
            ->offset($tagCounter * 10)->limit(10)->get();
        $tagQuantity = Tag::all()->count();
        return response()->json(['tags' => $tags, 'tagQuantity' => $tagQuantity]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $tag = Tag::where('slug', $id)->get()->first();
        if ($tag) {
            return response()->json(['tag' => $tag]);
        }
        return response(false, 500);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $tag = Tag::where('slug', $id)->get()->first();
        if ($tag) {
            $tag->name = $request->name;
            $tag->slug = $this->slug($request->name);
            $tag->save();

            $tagCounter = $request->header('tagCounter');
            $tags = Tag::orderBy('updated_at', 'desc')
                ->offset($tagCounter * 10)->limit(10)->get();
            $tagQuantity = Tag::all()->count();
            return response()->json(['tags' => $tags, 'tagQuantity' => $tagQuantity]);
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
        $tag = Tag::where('slug', $id)->get()->first();
        if ($tag) {
            $tag->disassociate();
            Tag::destroy($tag->id);

            $tagCounter = $request->header('tagCounter');
            $tags = Tag::orderBy('updated_at', 'desc')
                ->offset($tagCounter * 10)->limit(10)->get();
            $tagQuantity = Tag::all()->count();
            return response()->json(['tags' => $tags, 'tagQuantity' => $tagQuantity]);
        }
        return response(false, 500);
    }
}
