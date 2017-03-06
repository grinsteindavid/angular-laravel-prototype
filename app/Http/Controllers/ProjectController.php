<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Project;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $projectCounter = $request->header('projectCounter');
        $projects = Project::orderBy('created_at', 'desc')
            ->offset($projectCounter * 10)->limit(10)->get();
        $projectQuantity = Project::all()->count();
        return response()->json(['projects' => $projects, 'projectQuantity' => $projectQuantity]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function IndexNames()
    {
        $projects = Project::all()->pluck('name');
        return response()->json(['projects' => $projects]);
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
            'link' => 'required|max:255',
            'description' => 'required',
            'solutions' => 'required'
        ]);

        $project = new Project($request->all());
        if ($request->picture) {
            $thumbnailName = $this->slug($request->name).'.'.$request->picture->getClientOriginalExtension();
            $request->picture->move(public_path('projects_pictures'), $thumbnailName);
            $project->thumbnail = '/projects_pictures'.'/'.$thumbnailName;
        }
        $project->slug = $this->slug($request->name);
        $project->save();

        foreach ($request->solutions as $solution) {
            $project->associate_solution($solution);
        }

        $projectCounter = $request->header('projectCounter');
        $projects = Project::orderBy('created_at', 'desc')
            ->offset($projectCounter * 10)->limit(10)->get();
        $projectQuantity = Project::all()->count();
        return response()->json(['projects' => $projects, 'projectQuantity' => $projectQuantity]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $project = Project::where('slug', $id)->get()->first();
        if ($project) {
            return response()->json(['project' => $project]);
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
            'link' => 'required|max:255',
            'description' => 'required',
            'solutions' => 'required'
        ]);

        $project = Project::where('slug', $id)->get()->first();
        if ($project) {
            $project->description = $request->description;
            $project->link = $request->link;
            if ($request->picture) {
                $thumbnailName = $this->slug($request->name).'.'.$request->picture->getClientOriginalExtension();
                $request->picture->move(public_path('projects_pictures'), $thumbnailName);
                $project->thumbnail = '/projects_pictures'.'/'.$thumbnailName;
            } else {
                $project->thumbnail = '/projects_pictures/default.jpg';
            }
            $project->save();

            $project->disassociate_solutions();
            foreach ($request->solutions as $solution) {
                $project->associate_solution($solution);
            }

            $projectCounter = $request->header('projectCounter');
            $projects = Project::orderBy('created_at', 'desc')
                ->offset($projectCounter * 10)->limit(10)->get();
            $projectQuantity = Project::all()->count();
            return response()->json(['projects' => $projects, 'projectQuantity' => $projectQuantity]);
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
        $project = Project::where('slug', $id)->get()->first();
        if ($project) {
            $project->disassociate_solutions();
            Project::destroy($project->id);

            $projectCounter = $request->header('projectCounter');
            $projects = Project::orderBy('created_at', 'desc')
                ->offset($projectCounter * 10)->limit(10)->get();
            $projectQuantity = Project::all()->count();
            return response()->json(['projects' => $projects, 'projectQuantity' => $projectQuantity]);
        }
        return response(false, 500);
    }
}
