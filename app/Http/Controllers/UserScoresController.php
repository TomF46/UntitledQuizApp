<?php

namespace App\Http\Controllers;

use App\Models\Score;
use App\Models\User;
use Illuminate\Http\Request;

use function PHPSTORM_META\map;

class UserScoresController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Score  $Score
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $paginator = $user->scores()->orderBy('score_percent', 'desc')->paginate(15);
        $paginator->getCollection()->transform(function ($score) {
            $score->username = $score->user->username;
            $score->user_id = $score->user->id;
            $score->quiz_name = $score->quiz->title;
            $score->quiz_id = $score->quiz->id;
            return $score;
        });

        return response()->json($paginator);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Score  $ScoreW
     * @return \Illuminate\Http\Response
     */
    public function edit(Score $Score)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Score  $Score
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Score $Score)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Score  $Score
     * @return \Illuminate\Http\Response
     */
    public function destroy(Score $Score)
    {
        //
    }
}
