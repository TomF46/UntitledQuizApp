<?php

namespace App\Http\Controllers;

use App\Enums\ChallengeStatus;
use App\Filters\ChallengeSearch;
use App\Models\Challenge;
use App\Models\Score;
use Illuminate\Http\Request;

class ChallengesController extends Controller
{
    public function index(Request $request)
    {
        $currentUser = $request->User();
        $paginator = challenge::Where([['recipient_id', $currentUser->id], ['status', ChallengeStatus::NotStarted]])->paginate(5);
        $paginator->getCollection()->transform(function ($challenge) use ($currentUser) {
            return $challenge->map($currentUser);
        });
        return response()->json($paginator);
    }

    public function filter(Request $request)
    {
        $currentUser = $request->User();
        $paginator = ChallengeSearch::apply($request)->paginate(20);
        $paginator->getCollection()->transform(function ($challenge) use ($currentUser) {
            return $challenge->map($currentUser);
        });

        return response()->json($paginator);
    }

    public function store(Request $request)
    {
        $currentUser = $request->User();
        $attributes = $this->validateChallenge($request);

        if ($attributes['recipient_id'] == $currentUser->id) return response()->json(['error' => 'Recipient must not be the same as challenger.'], 400);

        // make sure score belongs to challenger
        $score = Score::find($attributes['score_id']);
        if ($score->user->id != $currentUser->id) return response()->json(['error' => 'Score must belong to challenger.'], 400);

        $challenge = challenge::create([
            'challenger_id' => $currentUser->id,
            'recipient_id' =>  $attributes['recipient_id'],
            'score_id' => $score->id,
        ]);

        return response()->json($challenge, 201);
    }

    public function show(Challenge $challenge, Request $request)
    {
        $currentUser = $request->User();
        return response()->json($challenge->map($currentUser));
    }

    public function destroy(Request $request, Challenge $challenge)
    {
        if ($challenge->challenger->id != $request->user()->id) return response()->json(['error' => 'unauthorized.'], 401);

        $challenge->delete();
        return response()->noContent();
    }

    protected function validateChallenge(Request $request)
    {
        return $request->validate([
            'recipient_id' => ['required', 'exists:users,id'],
            'score_id' => ['required', 'exists:scores,id'],
        ]);
    }
}
