<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Score;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizScoresController extends Controller
{
    public function index()
    {
    }

    public function create()
    {
        //
    }

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

        return response()->json($score, 201);
    }

    public function show(Quiz $quiz)
    {
        return response()->json($quiz->scores->map(function ($score) {
            return [
                'id' => $score->id,
                'username' => $score->user->username,
                'user_id' => $score->user->id,
                'quiz_name' => $score->quiz->title,
                'quiz_id' => $score->quiz->id,
                'score' => $score->score,
                'score_percent' => $score->score_percent
            ];
        }));
    }

    public function edit(Score $Score)
    {
    }

    public function update(Request $request, Score $Score)
    {
        //
    }

    public function destroy(Score $Score)
    {
        //
    }

    protected function validateAnswers(Request $request)
    {
        return $request->validate([
            'questions.*.id' => 'required',
            'questions.*.answer_id' => 'required',
        ]);
    }
}
