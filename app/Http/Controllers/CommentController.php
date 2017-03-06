<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Post;
use App\User;

class CommentController extends Controller
{
    public function index(Request $request, $post_slug)
    {
        $commentCounter = $request->header('commentCounter');
        $post = Post::where('slug', $post_slug)->get()->first();
        $comments = $post->comments()->orderBy('created_at', 'desc')
                ->offset($commentCounter * 5)->limit(5)->get();
        if ($comments->count() <= 0) {
            return response(false, 500);
        }
        return response()->json(['comments' => $comments]);
    }

    public function store(Request $request, $post_slug)
    {
        $comment = new Comment($request->all());
        $comment->user_id = User::findByToken($request->header('userToken'))->id;
        if ($request->reply_id) {
            $comment->reply_id = $request->reply_id;
        }
        $comment->save();
        $comment->associate_comment($post_slug);

        $commentCounter = $request->header('commentCounter');
        $post = Post::where('slug', $post_slug)->get()->first();
        $comments = $post->comments()->orderBy('created_at', 'desc')
                ->offset($commentCounter * 5)->limit(5)->get();
        return response()->json(['comments' => $comments]);
    }

    public function destroy(Request $request, $post_slug, $comment_id)
    {
        $comment = Comment::find($comment_id);
        if ($comment) {
            $comment->disassociate_comment();
            Comment::destroy($comment->id);

            $commentCounter = $request->header('commentCounter');
            $post = Post::where('slug', $post_slug)->get()->first();
            $comments = $post->comments()->orderBy('created_at', 'desc')
                    ->offset($commentCounter * 5)->limit(5)->get();
            return response()->json(['comments' => $comments]);
        }
        return response(false, 500);
    }
}
