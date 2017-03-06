<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Solution;
use App\Category;

class SolutionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $choice_category = $request->header('choice_category');
        if ($choice_category && $choice_category !== 'Ninguna') {
            $request->header('choice_category', 'Ninguna');
            $solutionCounter = $request->header('solutionCounter');
            $category = Category::where('name', $choice_category)->get()->first();
            $solutions = $category->solutions()->orderBy('created_at', 'desc')
                ->offset($solutionCounter * 10)->limit(10)->get();

            if ($solutions->count() <= 0) {
                return response(false, 500);
            }
            return response()->json(['solutions' => $solutions]);
        }

        $solutionCounter = $request->header('solutionCounter');
        $solutions = Solution::orderBy('updated_at', 'desc')
            ->offset($solutionCounter * 10)->limit(10)->get();
        if ($solutions->count() <= 0) {
            return response(false, 500);
        }
        $solutionQuantity = Solution::all()->count();
        return response()->json(['solutions' => $solutions, 'solutionQuantity' => $solutionQuantity]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function IndexNames()
    {
        $solutions = Solution::all()->pluck('name');
        return response()->json(['solutions' => $solutions]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'description' => 'required',
            'features' => 'required',
            'link' => 'required|max:255',
            'categories' => 'required',
        ]);

        $solution = new Solution($request->all());
        if ($request->picture) {
            $pictureName = $this->slug($request->name).'.'.$request->picture->getClientOriginalExtension();
            $request->picture->move(public_path('solutions_pictures'), $pictureName);
            $solution->image = '/solutions_pictures'.'/'.$pictureName;
        } else {
            $solution->image = '/solutions_pictures/default.jpg';
        }
        $solution->slug = $this->slug($request->name);
        $solution->save();

        $solution->associate_category($request->categories);

        $solutionCounter = $request->header('solutionCounter');
        $solutions = Solution::orderBy('updated_at', 'desc')
            ->offset($solutionCounter * 10)->limit(10)->get();
        $solutionQuantity = Solution::all()->count();
        return response()->json(['solutions' => $solutions, 'solutionQuantity' => $solutionQuantity]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $solution = Solution::where('slug', $id)->get()->first();
        if ($solution) {
            return response()->json(['solution' => $solution]);
        }
        return response(false, 500);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $solution = Solution::where('slug', $id)->get()->first();
        if ($solution) {
            return response()->json(['solution' => $solution]);
        }
        return response(false, 500);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'description' => 'required',
            'features' => 'required',
            'link' => 'required|max:255',
            'categories' => 'required'
        ]);

        $solution = Solution::where('slug', $id)->get()->first();
        if ($solution) {
            $solution->description = $request->description;
            $solution->link = $request->link;
            if ($request->picture) {
                $pictureName = $this->slug($request->name).'.'.$request->picture->getClientOriginalExtension();
                $request->picture->move(public_path('solutions_pictures'), $pictureName);
                $solution->image = '/solutions_pictures'.'/'.$pictureName;
            }
            $solution->save();

            $solution->disassociate_categories();
            $solution->associate_category($request->categories);

            $solutionCounter = $request->header('solutionCounter');
            $solutions = Solution::orderBy('updated_at', 'desc')
                ->offset($solutionCounter * 10)->limit(10)->get();
            $solutionQuantity = Solution::all()->count();
            return response()->json(['solutions' => $solutions, 'solutionQuantity' => $solutionQuantity]);
        }
        return response(false, 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $solution = Solution::where('slug', $id)->get()->first();
        if ($solution) {
            $solution->disassociate_categories();
            Solution::destroy($solution->id);

            $solutionCounter = $request->header('solutionCounter');
            $solutions = Solution::orderBy('updated_at', 'desc')
                ->offset($solutionCounter * 10)->limit(10)->get();
            $solutionQuantity = Solution::all()->count();
            return response()->json(['solutions' => $solutions, 'solutionQuantity' => $solutionQuantity]);
        }
        return response(false, 500);
    }
}
