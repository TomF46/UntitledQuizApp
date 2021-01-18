<?php

namespace App\Http\Controllers;

use App\Models\Score;

class ScoresController extends Controller
{
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
