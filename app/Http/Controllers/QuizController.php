<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function index()
    {

        $paginator = Quiz::latest()->paginate(10);
        $paginator->getCollection()->transform(function ($quiz) {
            return $quiz->mapOverview();
        });

        return response()->json($paginator);
    }

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

    public function show(Request $request, Quiz $quiz)
    {
        $mappedQuiz = $quiz->mapDetailWithoutAnswers($request->User());
        return response()->json($mappedQuiz);
    }

    public function edit(Request $request, Quiz $quiz)
    {
        if ($quiz->user->id != $request->user()->id) return response()->json(['error' => 'unauthorized.'], 401);

        return response()->json($quiz->mapOverviewWithQuestions());
    }

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

    public function destroy(Request $request, Quiz $quiz)
    {
        if ($quiz->user->id != $request->user()->id) return response()->json(['error' => 'unauthorized.'], 401);

        $quiz->delete();
        return response()->noContent();
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
                'image_url' => $question['image_url'],
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
            'questions.*.image_url' => 'string|nullable',
            'questions.*.answers.*.text' => 'required',
            'questions.*.answers.*.is_correct' => 'required',
        ]);
    }
}
