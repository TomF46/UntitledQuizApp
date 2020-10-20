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
            $quiz->questionsCount = count($quiz->questions);
            $quiz->totalPlays = count($quiz->scores);
            $quiz->totalLikes = $quiz->totalLikes();
            $quiz->totalDislikes = $quiz->totalDislikes();
            $quiz->tags = $quiz->tags()->get()->map(function ($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name
                ];
            });
            $quiz->creator = $quiz->user->username;
            $quiz->creator_id = $quiz->user->id;
            return $quiz;
        });

        return response()->json($paginator);
    }
}
