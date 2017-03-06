<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Category extends Model
{
    protected $table = 'categories';

    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'id', 'updated_at', 'created_at'
    ];

    protected $appends = [
        'solutions'
    ];

    public function solutions()
    {
        return $this->belongsToMany('App\Solution', 'solutions_categories');
    }

    public function disassociate()
    {
        return DB::table('solutions_categories')->where('category_id', $this->id)->delete();
    }

    // Accessors & Mutators
    public function getSolutionsAttribute()
    {
        $solutions = DB::table('solutions_categories')->where('category_id', $this->id)
            ->orderBy('created_at', 'desc')->get();
        return $this->attributes['solutions'] = $solutions;
    }

    public function setSolutionsAttribute($solutions)
    {
        return $this->attributes['solutions'] = $solutions;
    }
}
