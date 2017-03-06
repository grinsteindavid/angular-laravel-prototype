<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Post;

class Comment extends Model
{
    protected $table = 'comments';

    protected $fillable = [
        'body',
    ];

    protected $hidden = [

    ];

    protected $appends = [
        'full_name', 'user_image', 'reply'
    ];

    public static function indexByPost($slug, $commentCounter)
    {
        $post = Post::where('slug', $slug)->get()->first();
        return DB::table('posts_comments')->where('post_id', $post->id)
            ->join('comments', 'posts_comments.comment_id', '=', 'comments.id')->select('comments.*')
            ->orderBy('created_at', 'desc')->offset($commentCounter * 5)->limit(5)->get();
    }

    public function associate_comment($slug)
    {
        $post = DB::table('posts')->where('slug', $slug)->get()->first();
        return DB::table('posts_comments')->insert(['post_id' => $post->id, 'comment_id' => $this->id]);
    }

    public function disassociate_comment()
    {
        return DB::table('posts_comments')->where('comment_id', $this->id)->delete();
    }

    // Accessors & Mutators
    public function getFullNameAttribute()
    {
        $user = User::find($this->user_id)->person();
        $full_name = $user->first_name.' '.$user->last_name;
        return $this->attributes['full_name'] = $full_name;
    }

    public function getUserImageAttribute()
    {
        $user = User::find($this->user_id);
        return $this->attributes['user_image'] = $user->image;
    }

    public function getReplyAttribute()
    {
        if ($this->reply_id) {
            $comment = $this->find($this->reply_id);
            return $this->attributes['reply'] = $comment;
        }
        return $this->attributes['reply'] = null;
    }
}
