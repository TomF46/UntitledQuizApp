<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizCommentsController extends Controller
{
    public function store(Quiz $quiz, Request $request)
    {
        $attributes = $this->validateComment($request);

        $comment = Comment::create([
            'user_id' => $request->user()->id,
            'quiz_id' => $quiz->id,
            'text' => $attributes['text']
        ]);

        return response()->json($comment, 201);
    }

    public function show(Quiz $quiz)
    {
        $paginator = $quiz->comments()->orderBy('created_at', 'desc')->paginate(10);
        $paginator->getCollection()->transform(function ($comment) {
            return $comment->map();
        });

        return response()->json($paginator);
    }

    protected function validateComment(Request $request)
    {
        return $request->validate([
            'text' => ['required', 'string', 'max:500']
        ]);
    }
}
