<?php

namespace App\Http\Controllers;

use App\Enums\ChallengeStatus;
use App\Models\Answer;
use App\Models\Challenge;
use App\Models\Score;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizScoresController extends Controller
{
    public function store(Quiz $quiz, Request $request)
    {
        $attributes = $this->validateAnswers($request);
        $questions = $attributes['questions'];

        $maxScore = count($questions);
        $currentScore = 0;

        //TODO improve its weaknesses
        foreach ($questions as $question) {
            $is_correct = Answer::find($question['answer_id'])->is_correct;
            if ($is_correct == true) $currentScore++;
        }

        $percentScore = ($currentScore / $maxScore) * 100;

        $score = Score::create([
            'user_id' => $request->user()->id,
            'quiz_id' => $quiz->id,
            'score' => $currentScore,
            "score_percent" => $percentScore
        ]);

        if ($request->get('challengeId')) {
            return $this->handleChallengeResponse($score, $request->get('challengeId'));
        };

        return response()->json($score, 201);
    }

    public function show(Quiz $quiz)
    {
        $paginator = $quiz->scores()->orderBy('score_percent', 'desc')->paginate(10);
        $paginator->getCollection()->transform(function ($score) {
            return $score->map();
        });

        return response()->json($paginator);
    }

    public function showMyHighScore(Request $request, Quiz $quiz)
    {
        $currentUser = $request->User();
        $highScore = $quiz->scores()->where('user_id', $currentUser->id)->orderBy('score_percent', 'desc')->first();
        if ($highScore == null) return response()->json($highScore);
        return response()->json($highScore->map());
    }

    protected function handleChallengeResponse(Score $score, $challengeId)
    {
        $challenge = Challenge::find($challengeId);

        if ($score->user->id != $challenge->recipient->id) return response()->json(['error' => 'User who submitted score does not match challenge recipient'], 400);
        if ($challenge->status != ChallengeStatus::NotStarted) return response()->json(['error' => 'Challenge has already been attempted'], 400);

        if ($score->score_percent >= $challenge->score->score_percent) {
            $challenge->status = ChallengeStatus::Success;
        } else {
            $challenge->status = ChallengeStatus::Failed;
        }

        $challenge->save();

        return response()->json($score, 201);
    }

    protected function validateAnswers(Request $request)
    {
        return $request->validate([
            'questions.*.id' => 'required',
            'questions.*.answer_id' => 'required',
        ]);
    }
}
