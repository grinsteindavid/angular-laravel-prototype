<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Project extends Model
{
    protected $table = 'projects';

    protected $fillable = [
        'name', 'link', 'description'
    ];

    protected $hidden = [
        'id'
    ];

    protected $appends = [
        'solutions',
    ];

    public function associate_solution($solutionName)
    {
        $solution = DB::table('solutions')->where('name', $solutionName)->get()->first();
        return DB::table('solutions_projects')->insert(['solution_id' => $solution->id, 'project_id' => $this->id]);
    }

    public function disassociate_solutions()
    {
        return DB::table('solutions_projects')->where('project_id', $this->id)->delete();
    }

    // Accessors & Mutators
    public function getSolutionsAttribute()
    {
        $solutions = $this->belongsToMany('App\Solution', 'solutions_projects')
            ->orderBy('created_at', 'desc')->get();
        return $this->attributes['solutions'] = $solutions;
    }
}
