<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Quiz::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes = $this->validateQuiz($request);

        $questions = $this->createQuestions($attributes['questions']);

        $quiz = Quiz::create([
            'user_id' => $request->user()->id,
            'title' => $attributes['title'],
            'description' => $attributes['description'],
        ]);

        $quiz->questions()->saveMany($questions);

        $quiz = $quiz->fresh();

        return response()->json($quiz, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function show(Quiz $quiz)
    {
        return response()->json([
            'id' => $quiz->id,
            'title' => $quiz->title,
            'description' => $quiz->description,
            'questions' => $quiz->questions,
            'creator' => $quiz->user->username
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function edit(Quiz $quiz)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Quiz $quiz)
    {
        $quiz->update($this->validateQuiz($request));
        return response()->json($quiz);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return response()->noContent();
    }

    protected function createQuestions($questions)
    {
        $formattedQuestions = array();
        $ordinal = 0;
        foreach ($questions as $question) {
            $formattedQuestions[] = new Question([
                'text' => $question['text'],
                'ordinal' => $ordinal,
                'answer_id' => $question['answer_id']
            ]);
            $ordinal++;
        }
        return $formattedQuestions;
    }

    protected function validateQuiz(Request $request)
    {
        return $request->validate([
            'title' => 'required|max:255',
            'description' => 'required|max:255',
            'questions.*.text' => 'required|max:255',
            'questions.*.answer_id' => 'required',
        ]);
    }
}
