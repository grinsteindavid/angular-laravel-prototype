<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TestimonialRequest;
use App\Solution;
use App\Testimonial;

class TestimonialRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $testimonialRequestCounter = $request->header('testimonialRequestCounter');
        $testimonialRequests = TestimonialRequest::orderBy('created_at', 'desc')
            ->offset($testimonialRequestCounter * 10)->limit(10)->get();
        $testimonialRequestQuantity = TestimonialRequest::all()->count();
        return response()->json(['testimonialRequests' => $testimonialRequests, 'testimonialRequestQuantity' => $testimonialRequestQuantity]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $testimonialRequest = TestimonialRequest::find($request->id);
        $testimonialRequest->allowTestimonial($testimonialRequest->solution_id, $testimonialRequest->testimonial_id);
        TestimonialRequest::destroy($testimonialRequest->id);

        $testimonialRequestCounter = $request->header('testimonialRequestCounter');
        $testimonialRequests = TestimonialRequest::orderBy('created_at', 'desc')
            ->offset($testimonialRequestCounter * 10)->limit(10)->get();
        $testimonialRequestQuantity = TestimonialRequest::all()->count();
        return response()->json(['testimonialRequests' => $testimonialRequests, 'testimonialRequestQuantity' => $testimonialRequestQuantity]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $testimonialRequest = TestimonialRequest::find($id);
        $testimonial_id = $testimonialRequest->testimonial_id;
        TestimonialRequest::destroy($id);
        Testimonial::destroy($testimonial_id);


        $testimonialRequestCounter = $request->header('testimonialRequestCounter');
        $testimonialRequests = TestimonialRequest::orderBy('created_at', 'desc')
            ->offset($testimonialRequestCounter * 10)->limit(10)->get();
        $testimonialRequestQuantity = TestimonialRequest::all()->count();
        return response()->json(['testimonialRequests' => $testimonialRequests, 'testimonialRequestQuantity' => $testimonialRequestQuantity]);
    }
}
