<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;

class QuizRecommendController extends Controller
{
    public function index()
    {
        $paginator = Quiz::where('recommended', true)->doesntHave('ban')->paginate(10);
        $paginator->getCollection()->transform(function ($quiz) {
            return $quiz->mapOverview();
        });

        return response()->json($paginator);
    }

    public function toggle(Request $request, Quiz $quiz)
    {
        $quiz->toggleRecommended();
        return response()->noContent();
    }
}
