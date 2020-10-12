<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Score;
use App\Models\Quiz;
use Illuminate\Http\Request;

class ScoresController extends Controller
{
    public function index()
    {
    }

    public function show(Score $score)
    {
        return response()->json([
            'id' => $score->id,
            'username' => $score->user->username,
            'quiz_name' => $score->quiz->title,
            'score' => $score->score,
            'score_percent' => $score->score_percent
        ]);
    }

    public function destroy(Score $score)
    {
        $score->delete();
        return response()->noContent();
    }
}
