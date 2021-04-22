<?php

namespace App\Filters;

use App\Models\Challenge;
use Illuminate\Http\Request;

class ChallengeSearch
{
    public static function apply(Request $filters)
    {
        $currentUser = $filters->User();

        $challenge = (new Challenge)->newQuery();

        $challenge->whereHas('score', function ($query) {
            $query->whereHas('quiz', function ($query) {
                $query->doesntHave('ban');
            });
        });

        $challenge->where('recipient_id', '=', $currentUser->id)->orWhere('challenger_id', '=',  $currentUser->id);

        return $challenge;
    }
}
