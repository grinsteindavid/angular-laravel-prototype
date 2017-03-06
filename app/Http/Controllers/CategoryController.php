<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categoryCounter = $request->header('categoryCounter');
        $categories = Category::orderBy('updated_at', 'desc')
            ->offset($categoryCounter * 10)->limit(10)->get();
        $categoryQuantity = Category::all()->count();
        return response()->json(['categories' => $categories, 'categoryQuantity' => $categoryQuantity]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function IndexNames()
    {
        $categories = Category::all()->pluck('name');
        return response()->json(['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $category = new Category($request->all());
        $category->slug = $this->slug($request->name);
        $category->save();

        $categoryCounter = $request->header('categoryCounter');
        $categories = Category::orderBy('updated_at', 'desc')
            ->offset($categoryCounter * 10)->limit(10)->get();
        $categoryQuantity = Category::all()->count();
        return response()->json(['categories' => $categories, 'categoryQuantity' => $categoryQuantity]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $category = Category::where('slug', $id)->get()->first();
        if ($category) {
            return response()->json(['category' => $category]);
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
        //
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
        $category = Category::where('slug', $id)->get()->first();
        if ($category) {
            $category->name = $request->name;
            $category->slug = $this->slug($request->name);
            $category->save();

            $categoryCounter = $request->header('categoryCounter');
            $categories = Category::orderBy('updated_at', 'desc')
                ->offset($categoryCounter * 10)->limit(10)->get();
            $categoryQuantity = Category::all()->count();
            return response()->json(['categories' => $categories, 'categoryQuantity' => $categoryQuantity]);
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
        $category = Category::where('slug', $id)->get()->first();
        if ($category) {
            $category->disassociate();
            Category::destroy($category->id);

            $categoryCounter = $request->header('categoryCounter');
            $categories = Category::orderBy('updated_at', 'desc')
                ->offset($categoryCounter * 10)->limit(10)->get();
            $categoryQuantity = Category::all()->count();
            return response()->json(['categories' => $categories, 'categoryQuantity' => $categoryQuantity]);
        }
        return response(false, 500);
    }
}
