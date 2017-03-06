<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\User;
use App\Testimonial;

class TestimonialRequest extends Model
{
    protected $table = 'testimonials_requests';

    protected $fillable = [
    ];

    protected $hidden = [
        'testimonial_id', 'solution_id'
    ];

    protected $appends = [
        'body', 'full_name'
    ];

    public function allowTestimonial($solution_id, $testimonial_id)
    {
        return DB::table('solutions_testimonials')->insert(['solution_id' => $solution_id, 'testimonial_id' => $testimonial_id, 'created_at' => Carbon::now()]);
    }

    // Accessors & Mutators
    public function getFullNameAttribute()
    {
        $user = Testimonial::find($this->testimonial_id)->user()->person();
        $full_name = $user->first_name.' '.$user->last_name;
        return $this->attributes['full_name'] = $full_name;
    }

    public function getBodyAttribute()
    {
        $body = Testimonial::find($this->testimonial_id)->body;
        return $this->attributes['body'] = $body;
    }
}
