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
        $questionAnswers = $attributes['answers'];
        $maxScore = count($questionAnswers);
        $currentScore = 0;
        $quiz = $quiz->mapOverviewWithQuestions();

        $index = 0;
        foreach ($quiz['questions'] as $question) {
            $answer = $questionAnswers[$index];
            $index++;
            // Check question at index matches expected question for quiz at index
            if ($answer['question_id'] != $question['id']) return response()->json(['error' => 'Inputted question does not match expected question for this quiz'], 400);
            // Find stored answer given and check its question_id matches the one it has been submitted for
            $answerObj = Answer::find($answer['answer_id']);
            if ($answerObj['question_id'] != $question['id'])  return response()->json(['error' => 'Inputted answer does not match optional answers for question it is submitted for'], 400);
            if ($answerObj->is_correct == true) $currentScore++;
        }

        $percentScore = ($currentScore / $maxScore) * 100;

        $score = Score::create([
            'user_id' => $request->user()->id,
            'quiz_id' => $quiz['id'],
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
        if ($quiz->isBanned()) return response()->json(['message' => 'Not Found!'], 404);
        $paginator = $quiz->scores()->orderBy('score_percent', 'desc')->paginate(10);
        $paginator->getCollection()->transform(function ($score) {
            return $score->map();
        });

        return response()->json($paginator);
    }

    public function showMyHighScore(Request $request, Quiz $quiz)
    {
        if ($quiz->isBanned()) return response()->json(['message' => 'Not Found!'], 404);
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
            $challenge->recipient->incrementChallengePoints();
        } else {
            $challenge->status = ChallengeStatus::Failed;
            $challenge->challenger->incrementChallengePoints();
        }

        $challenge->save();

        return response()->json($score, 201);
    }

    protected function validateAnswers(Request $request)
    {
        return $request->validate([
            'answers.*.question_id' => 'required',
            'answers.*.answer_id' => 'required',
        ]);
    }
}
