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

        $paginator = Quiz::latest()->where('published', true)->doesntHave('ban')->paginate(10);
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
            'published' => $attributes['publish']
        ]);

        $quiz->questions()->saveMany($questions);

        $quiz = $quiz->fresh();

        $this->saveAnswers($quiz, $attributes['questions']);

        $quiz = $quiz->fresh();

        $quiz->tags()->attach($attributes['tags']);

        $quiz->collaborators()->attach($attributes['collaborators']);

        return response()->json($quiz, 201);
    }

    public function show(Request $request, Quiz $quiz)
    {
        $currentUser = $request->user();
        if (($quiz->isBanned() || !$quiz->published) && !$quiz->isOwner($currentUser) && !$currentUser->isAdmin()) return response()->json(['message' => 'Not Found!'], 404);

        $mappedQuiz = $quiz->mapDetailWithoutAnswers($request->User());
        return response()->json($mappedQuiz);
    }

    public function edit(Request $request, Quiz $quiz)
    {
        if (!$quiz->userCanManage($request->user())) return response()->json(['error' => 'unauthorized.'], 401);

        return response()->json($quiz->mapOverviewWithQuestions($request->user()));
    }

    public function update(Request $request, Quiz $quiz)
    {
        if (!$quiz->userCanManage($request->user())) return response()->json(['error' => 'Unauthorized.'], 401);

        $attributes = $this->validateQuiz($request);

        $questions = $this->createQuestions($attributes['questions']);

        $quiz->update($attributes);

        $quiz->tags()->sync($attributes['tags']);

        // Only owner can edit collaborators
        if ($quiz->isOwner($request->user())) $quiz->collaborators()->sync($attributes['collaborators']);

        $quiz->questions()->delete();

        $quiz->questions()->saveMany($questions);

        $quiz = $quiz->fresh();

        $this->saveAnswers($quiz, $attributes['questions']);

        if($attributes['publish'] == true) $quiz->publish();

        $quiz = $quiz->fresh();
        return response()->json($quiz);
    }

    public function destroy(Request $request, Quiz $quiz)
    {
        if (!$quiz->isOwner($request->user())) return response()->json(['error' => 'unauthorized.'], 401);

        $quiz->delete();
        return response()->noContent();
    }

    public function getRandomQuizId()
    {
        $quiz = Quiz::inRandomOrder()->first();
        return response()->json([
            'id' => $quiz->id
        ], 200);
    }

    public function publish(Request $request, Quiz $quiz)
    {
        if (!$quiz->isOwner($request->user())) return response()->json(['error' => 'unauthorized.'], 401);
        $quiz->publish();
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
                'helpText' => $question['helpText'],
                'image_url' => $question['image_url'],
                'video_url' => $question['video_url'],
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
            'collaborators' => 'exists:users,id',
            'publish' => 'required|boolean',
            'questions.*.text' => 'required|max:255',
            'questions.*.helpText' => 'nullable|max:255',
            'questions.*.image_url' => 'string|nullable',
            'questions.*.video_url' => 'string|nullable',
            'questions.*.answers.*.text' => 'required',
            'questions.*.answers.*.is_correct' => 'required',
        ]);
    }
}
