<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Challenge;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChallengesController extends Controller
{
    public function index(Request $request)
    {
        $currentUser = $request->User();
        $paginator = challenge::Where('recipient_id', $currentUser->id)->paginate(10);
        $paginator->getCollection()->transform(function ($challenge) {
            return $challenge->transform();
        });
        return response()->json($paginator);
    }

    public function store(Request $request)
    {
        $currentUser = $request->User();
        $attributes = $this->validateChallenge($request);

        $challenge = challenge::create([
            'challenger_id' => $currentUser->id,
            'recipient_id' =>  $attributes['recipient_id'],
            'score_id' => $attributes['score_id'],
        ]);

        return response()->json($challenge, 201);
    }

    protected function validateChallenge(Request $request)
    {
        return $request->validate([
            'recipient_id' => ['required', 'exists:users,id'],
            'score_id' => ['required', 'exists:scores,id'],
        ]);
    }
}
