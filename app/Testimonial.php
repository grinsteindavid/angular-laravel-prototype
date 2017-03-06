<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Solution;
use App\User;

class Testimonial extends Model
{
    protected $table = 'testimonials';

    protected $fillable = [
        'body',
    ];

    protected $hidden = [
    ];

    protected $appends = [
        'full_name', 'user_image'
    ];

    public function user()
    {
        return User::find($this->user_id);
    }

    public function request_association($slug)
    {
        $solution = Solution::where('slug', $slug)->get()->first();
        return DB::table('testimonials_requests')->insert(['solution_id' => $solution->id, 'testimonial_id' => $this->id, 'created_at' => Carbon::now()]);
    }

    public function disassociate_testimonial()
    {
        return DB::table('solutions_testimonials')->where('testimonial_id', $this->id)->delete();
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
}
