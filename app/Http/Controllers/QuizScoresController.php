<?php

namespace App\Http\Controllers;

use App\Models\Answer;
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

        return response()->json($score, 201);
    }

    public function show(Quiz $quiz)
    {
        $paginator = $quiz->scores()->orderBy('score_percent', 'desc')->paginate(10);
        $paginator->getCollection()->transform(function ($score) {
            return $score->transform();
        });

        return response()->json($paginator);
    }

    protected function validateAnswers(Request $request)
    {
        return $request->validate([
            'questions.*.id' => 'required',
            'questions.*.answer_id' => 'required',
        ]);
    }
}
