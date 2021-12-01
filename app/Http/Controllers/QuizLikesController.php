<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;

class QuizLikesController extends Controller
{
    public function like(Request $request, Quiz $quiz)
    {
        $quiz->like($request->User());

        return response()->noContent();
    }

    public function dislike(Request $request, Quiz $quiz)
    {
        $quiz->dislike($request->User());

        return response()->noContent();
    }

    public function remove(Request $request, Quiz $quiz)
    {
        $quiz->removeLikeOrDislike($request->User());

        return response()->noContent();
    }
}
