<?php

namespace App\Filters;

use App\Models\Quiz;
use Illuminate\Http\Request;

class BannedQuizSearch
{
    public static function apply(Request $filters)
    {
        $quiz = (new Quiz)->newQuery();

        //Only return banned quizzes
        $quiz->has('ban');

        if ($filters->has('searchTerm')) {
            $quiz->where('title', 'like', "{$filters->input('searchTerm')}%");
        }

        if ($filters->has('user')) {
            $quiz->whereHas('user', function ($query) use ($filters) {
                $query->where('username', 'like', "{$filters->input('user')}%");
            });
        }

        return $quiz;
    }
}
