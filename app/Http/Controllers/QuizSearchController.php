<?php

namespace App\Http\Controllers;

use App\Filters\QuizSearch;
use Illuminate\Http\Request;

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
