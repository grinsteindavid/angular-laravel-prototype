<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tag extends Model
{
    protected $table = 'tags';

    protected $fillable = [
        'name',
    ];

    protected $hidden = [
        'id', 'updated_at', 'created_at'
    ];

    protected $appends = [
        'posts'
    ];

    public function disassociate()
    {
        return DB::table('tags_posts')->where('tag_id', $this->id)->delete();
    }

    public function posts()
    {
        return $this->belongsToMany('App\Post', 'tags_posts');
    }

    // Accessors & Mutators
    public function getPostsAttribute()
    {
        $posts = DB::table('tags_posts')->where('tag_id', $this->id)
            ->orderBy('created_at', 'desc')->get();
        return $this->attributes['posts'] = $posts;
    }
}
