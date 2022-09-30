<?php

namespace App\Filters;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizSearch
{
    public static function apply(Request $filters)
    {
        $quiz = (new Quiz)->newQuery();

        //Dont return banned quizzes
        $quiz->doesntHave('ban');
        $quiz->where('published', true);


        if ($filters->input('onlyShowRecommended') == true) {
            $quiz->where('recommended', true);
        }

        if ($filters->has('searchTerm')) {
            $quiz->where('title', 'like', "{$filters->input('searchTerm')}%");
        }

        if ($filters->has('user')) {
            $quiz->whereHas('user', function ($query) use ($filters) {
                $query->where('username', 'like', "{$filters->input('user')}%");
            });
        }

        if ($filters->has('tag') && $filters->input('tag') != null) {
            $quiz->whereHas('tags', function ($query) use ($filters) {
                $query->where('tag_id', $filters->input('tag'));
            });
        }

        return $quiz;
    }
}
