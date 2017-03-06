<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Testimonial;
use App\User;
use App\Solution;

class TestimonialController extends Controller
{
    public function index(Request $request, $solution_slug)
    {
        $testimonialCounter = $request->header('testimonialCounter');
        $solution = Solution::where('slug', $solution_slug)->get()->first();
        $testimonials = $solution->testimonials()->orderBy('created_at', 'desc')
                ->offset($testimonialCounter * 5)->limit(5)->get();
        if ($testimonials->count() <= 0) {
            return response(false, 500);
        }
        return response()->json(['testimonials' => $testimonials]);
    }

    public function store(Request $request, $solution_slug)
    {
        $testimonial = new Testimonial($request->all());
        $testimonial->user_id = User::findByToken($request->header('userToken'))->id;
        $testimonial->save();
        $testimonial->request_association($solution_slug);

        $testimonialCounter = $request->header('testimonialCounter');
        $solution = Solution::where('slug', $solution_slug)->get()->first();
        $testimonials = $solution->testimonials()->orderBy('created_at', 'desc')
                ->offset($testimonialCounter * 5)->limit(5)->get();
        return response()->json(['testimonials' => $testimonials]);
    }

    public function destroy(Request $request, $solution_slug, $testimonial_id)
    {
        $testimonial = Testimonial::find($testimonial_id);
        if ($testimonial) {
            $testimonial->disassociate_testimonial();
            Testimonial::destroy($testimonial->id);

            $testimonialCounter = $request->header('testimonialCounter');
            $solution = Solution::where('slug', $solution_slug)->get()->first();
            $testimonials = $solution->testimonials()->orderBy('created_at', 'desc')
                    ->offset($testimonialCounter * 5)->limit(5)->get();
            return response()->json(['testimonials' => $testimonials]);
        }
        return response(false, 500);
    }
}
