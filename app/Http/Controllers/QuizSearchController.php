<?php

namespace App\Http\Controllers;

use App\Filters\QuizSearch;
use Illuminate\Http\Request;

class QuizSearchController extends Controller
{
    public function filter(Request $request)
    {
        $quizzes = QuizSearch::apply($request);
        
        if($request->input('showNewestFirst')){
           $quizzes = $quizzes->latest();
        }
        
        $paginator = $quizzes->paginate(10);
        $paginator->getCollection()->transform(function ($quiz) {
            return $quiz->mapOverview();
        });

        return response()->json($paginator);
    }
}
