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
        return response()->json($user->scores()->orderBy('score_percent', 'desc')->get()->map(function ($score) {
            return [
                'id' => $score->id,
                'username' => $score->user->username,
                'user_id' => $score->user->id,
                'quiz_name' => $score->quiz->title,
                'quiz_id' => $score->quiz->id,
                'score' => $score->score,
                'score_percent' => $score->score_percent
            ];
        }));
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
