<?php

namespace App\Http\Controllers;

use App\Models\Answer;
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

        $paginator = Quiz::latest()->paginate(10);
        $paginator->getCollection()->transform(function ($quiz) {
            $quiz->questionsCount = count($quiz->questions);
            $quiz->totalPlays = count($quiz->scores);
            $quiz->tags = $quiz->tags()->get()->map(function ($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name
                ];
            });
            $quiz->creator = $quiz->user->username;
            $quiz->creator_id = $quiz->user->id;
            return $quiz;
        });

        return response()->json($paginator);
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

        $this->saveAnswers($quiz, $attributes['questions']);

        $quiz = $quiz->fresh();

        $quiz->tags()->attach($attributes['tags']);


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
            'questions' => $this->removeAnswersFromQuestion($quiz->questions()->with('answers')->get()),
            'totalPlays' => count($quiz->scores),
            'tags' => $quiz->tags()->get()->map(function ($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name
                ];
            }),
            'creator' => $quiz->user->username,
            'creator_id' => $quiz->user->id
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Quiz $quiz)
    {
        if ($quiz->user->id != $request->user()->id) return response()->json(['error' => 'unauthorized.'], 401);

        return response()->json([
            'id' => $quiz->id,
            'title' => $quiz->title,
            'description' => $quiz->description,
            'questions' => $quiz->questions()->with('answers')->get(),
            'tags' => $quiz->tags()->get()->map(function ($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name
                ];
            }),
            'creator' => $quiz->user->username,
            'creator_id' => $quiz->user->id
        ]);
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
        if ($quiz->user->id != $request->user()->id) return response()->json(['error' => 'Unauthorized.'], 401);

        $attributes = $this->validateQuiz($request);

        $questions = $this->createQuestions($attributes['questions']);

        $quiz->update($attributes);

        $quiz->tags()->sync($attributes['tags']);

        $quiz->questions()->delete();

        $quiz->questions()->saveMany($questions);

        $quiz = $quiz->fresh();

        $this->saveAnswers($quiz, $attributes['questions']);

        $quiz = $quiz->fresh();
        return response()->json($quiz);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Quiz $quiz)
    {
        if ($quiz->user->id != $request->user()->id) return response()->json(['error' => 'unauthorized.'], 401);

        $quiz->delete();
        return response()->noContent();
    }

    protected function removeAnswersFromQuestion($questions)
    {
        foreach ($questions as $question) {
            $this->removeAnswers($question);
        }
        return $questions;
    }

    protected function removeAnswers($question)
    {
        foreach ($question->answers as $answer) {
            unset($answer->is_correct);
        }
    }

    protected function saveAnswers($quiz, $requestQuestions)
    {
        $quizQuestions = $quiz->questions;
        $ordinal = 0;
        foreach ($quizQuestions as $question) {
            $answers = $this->createAnswers($requestQuestions[$ordinal]);
            $question->answers()->saveMany($answers);
            $ordinal++;
        }
    }

    protected function createAnswers($question)
    {
        $formattedAnswers = array();
        $answers = $question['answers'];

        foreach ($answers as $answer) {
            $formattedAnswers[] = new Answer([
                'text' => $answer['text'],
                'is_correct' => $answer['is_correct']
            ]);
        }

        return $formattedAnswers;
    }

    protected function createQuestions($questions)
    {
        $formattedQuestions = array();
        $ordinal = 0;
        foreach ($questions as $question) {
            $formattedQuestion = new Question([
                'text' => $question['text'],
                'ordinal' => $ordinal
            ]);
            $formattedQuestions[] = $formattedQuestion;
            $ordinal++;
        }
        return $formattedQuestions;
    }

    protected function validateQuiz(Request $request)
    {
        return $request->validate([
            'title' => 'required|max:255',
            'description' => 'required|max:255',
            'tags' => 'exists:tags,id',
            'questions.*.text' => 'required|max:255',
            'questions.*.answers.*.text' => 'required',
            'questions.*.answers.*.is_correct' => 'required',
        ]);
    }
}
