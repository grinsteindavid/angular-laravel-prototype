<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Category;

class Solution extends Model
{
    protected $table = 'solutions';

    protected $fillable = [
        'name', 'description', 'features', 'link'
    ];

    protected $hidden = [
        'id', 'updated_at'
    ];

    protected $appends = [
        'testimonials', 'categories'
    ];

    public function testimonials()
    {
        return $this->belongsToMany('App\Testimonial', 'solutions_testimonials');
    }

    public function associate_category($categoryName)
    {
        $category = DB::table('categories')->where('name', $categoryName)->get()->first();
        return DB::table('solutions_categories')->insert(['category_id' => $category->id, 'solution_id' => $this->id]);
    }

    public function disassociate_categories()
    {
        return DB::table('solutions_categories')->where('solution_id', $this->id)->delete();
    }

    // Accessors & Mutators
    public function getTestimonialsAttribute()
    {
        $testimonials = $this->belongsToMany('App\Testimonial', 'solutions_testimonials')
            ->orderBy('created_at', 'desc')->get();
        return $this->attributes['testimonials'] = $testimonials;
    }

    public function getCategoriesAttribute()
    {
        $categories = DB::table('solutions_categories')->where('solution_id', $this->id)
            ->join('categories', 'solutions_categories.category_id', '=', 'categories.id')->select('categories.name', 'categories.slug')->get();
        return $this->attributes['categories'] = $categories;
    }
}
