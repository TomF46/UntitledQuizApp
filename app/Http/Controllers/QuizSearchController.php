<?php

namespace App\Http\Controllers;

use App\Filters\QuizSearch;
use App\Models\Answer;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuizSearchController extends Controller
{
    public function filter(Request $request)
    {
        $paginator = QuizSearch::apply($request)->paginate(10);
        $paginator->getCollection()->transform(function ($quiz) {
            return $quiz->transformWithoutQuestions();
        });

        return response()->json($paginator);
    }
}
