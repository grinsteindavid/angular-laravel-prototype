<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Post;
use App\Tag;
use App\User;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $choice_tag = $request->header('choice_tag');
        if ($choice_tag && $choice_tag !== 'Ninguna') {
            $request->header('choice_tag', 'Ninguna');
            $postCounter = $request->header('postCounter');
            $tag = Tag::where('name', $choice_tag)->get()->first();
            $posts = $tag->posts()->orderBy('created_at', 'desc')
                ->offset($postCounter * 10)->limit(10)->get();
            if ($posts->count() <= 0) {
                return response('Post couner < 0', 500);
            }
            return response()->json(['posts' => $posts]);
        }

        $postCounter = $request->header('postCounter');
        $posts = Post::orderBy('created_at', 'desc')
            ->offset($postCounter * 10)->limit(10)->get();
        if ($posts->count() <= 0) {
            return response('Post couner < 0', 500);
        }
        $postQuantity = Post::all()->count();
        return response()->json(['posts' => $posts, 'postQuantity' => $postQuantity]);
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
            'title' => 'required|max:255',
            'body' => 'required',
            'description' => 'required',
            'tags' => 'required',
        ]);

        $post = new Post($request->all());
        $post->slug = $this->slug($request->title);
        $post->views = 0;
        $post->user_id = User::findByToken($request->header('userToken'))->id;
        $post->save();

        foreach ($request->tags as $tag) {
            $post->associate_tag($tag);
        }

        $postCounter = $request->header('postCounter');
        $posts = Post::orderBy('created_at', 'desc')
            ->offset($postCounter * 10)->limit(10)->get();
        $postQuantity = Post::all()->count();
        return response()->json(['posts' => $posts, 'postQuantity' => $postQuantity]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $post = Post::where('slug', $id)->get()->first();
        if ($post) {
            $post->views += 1;
            $post->save();

            return response()->json(['post' => $post]);
        }
        return response('Post = null', 500);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $post = Post::where('slug', $id)->get()->first();
        if ($post) {
            return response()->json(['post' => $post]);
        }
        return response('Post = null', 500);
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
            'body' => 'required',
            'description' => 'required',
            'tags' => 'required',
        ]);

        $post = Post::where('slug', $id)->get()->first();
        if ($post) {
            $post->disassociate_tags();
            $post->update($request->all());

            $post->disassociate_tags();
            foreach ($request->tags as $tag) {
                $post->associate_tag($tag);
            }

            $postCounter = $request->header('postCounter');
            $posts = Post::orderBy('created_at', 'desc')
                ->offset($postCounter * 10)->limit(10)->get();
            $postQuantity = Post::all()->count();
            return response()->json(['posts' => $posts, 'postQuantity' => $postQuantity]);
        }
        return response('Post = null', 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $post = Post::where('slug', $id)->get()->first();
        if ($post) {
            $post->disassociate_tags();
            Post::destroy($post->id);

            $postCounter = $request->header('postCounter');
            $posts = Post::orderBy('created_at', 'desc')
                ->offset($postCounter * 10)->limit(10)->get();
            $postQuantity = Post::all()->count();
            return response()->json(['posts' => $posts, 'postQuantity' => $postQuantity]);
        }
        return response('Post = null', 500);
    }
}
