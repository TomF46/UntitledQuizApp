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
        return response()->json($score->map());
    }

    public function destroy(Score $score)
    {
        $score->delete();
        return response()->noContent();
    }
}
