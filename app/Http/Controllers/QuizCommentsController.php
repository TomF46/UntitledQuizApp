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
        $currentUser = $request->user();
        $paginator = $quiz->comments()->orderBy('created_at', 'desc')->paginate(10);
        $paginator->getCollection()->transform(function ($comment) use ($currentUser) {
            return $comment->map($currentUser);
        });

        return response()->json($paginator);
    }

    public function update(Request $request, Comment $comment)
    {
        $currentUser = $request->user();
        if (!$comment->isAuthor($currentUser)) return response()->json(['error' => 'unauthorized.'], 401);

        $attributes = $this->validateComment($request);
        $comment->text = $attributes['text'];
        $comment->save();

        $comment = $comment->fresh();
        return response()->json($comment);
    }

    public function remove(Request $request, Comment $comment)
    {
        $currentUser = $request->user();
        if ($comment->isAuthor($currentUser) || $currentUser->isAdmin()){
            $comment->remove();
            return response()->noContent();
        } 

        return response()->json(['error' => 'unauthorized.'], 401);
    }

    protected function validateComment(Request $request)
    {
        return $request->validate([
            'text' => ['required', 'string', 'max:500']
        ]);
    }
}
