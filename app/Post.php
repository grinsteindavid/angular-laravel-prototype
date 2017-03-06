<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\User;

class Post extends Model
{
    protected $table = 'posts';

    protected $fillable = [
        'title', 'body', 'description'
    ];

    protected $hidden = [
        'id', 'user_id'
    ];

    protected $appends = [
        'writer_name', 'tags', 'user_image'
    ];

    public function comments()
    {
        return $this->belongsToMany('App\Comment', 'posts_comments');
    }

    public function associate_tag($tagName)
    {
        $tag = DB::table('tags')->where('name', $tagName)->get()->first();
        return DB::table('tags_posts')->insert(['tag_id' => $tag->id, 'post_id' => $this->id]);
    }

    public function disassociate_tags()
    {
        return DB::table('tags_posts')->where('post_id', $this->id)->delete();
    }

    // Accessors & Mutators
    public function getWriterNameAttribute()
    {
        $writerName = User::find($this->user_id)->full_name();
        return $this->attributes['writer_name'] = $writerName;
    }

    public function getUserImageAttribute()
    {
        $user = User::find($this->user_id);
        return $this->attributes['user_image'] = $user->image;
    }

    public function getTagsAttribute()
    {
        $tags = DB::table('tags_posts')->where('post_id', $this->id)
            ->join('tags', 'tags_posts.tag_id', '=', 'tags.id')->select('tags.name', 'tags.slug')->get();
        return $this->attributes['tags'] = $tags;
    }
}
