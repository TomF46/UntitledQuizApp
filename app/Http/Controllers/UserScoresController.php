<?php

namespace App\Http\Controllers;

use App\Models\Score;
use App\Models\User;
use Illuminate\Http\Request;

class UserScoresController extends Controller
{
    public function show(User $user)
    {
        $paginator = $user->scores()->orderBy('score_percent', 'desc')->paginate(10);
        $paginator->getCollection()->transform(function ($score) {
            return $score->transform();
        });

        return response()->json($paginator);
    }
}
