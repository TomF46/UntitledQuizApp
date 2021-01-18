<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserScoresController extends Controller
{
    public function show(User $user)
    {
        $paginator = $user->scores()->orderBy('score_percent', 'desc')->paginate(10);
        $paginator->getCollection()->transform(function ($score) {
            return $score->map();
        });

        return response()->json($paginator);
    }
}
