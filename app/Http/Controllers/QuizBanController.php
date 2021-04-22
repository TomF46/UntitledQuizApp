<?php

namespace App\Http\Controllers;

use App\Models\QuizBan;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizBanController extends Controller
{
    public function store(Quiz $quiz, Request $request)
    {
        if ($quiz->isBanned()) return response()->json(['success' => 'success'], 200);

        $attributes = $this->validateBan($request);

        $ban = new QuizBan([
            'reason' => $attributes['reason'],
            'admin_id' =>  $request->user()->id,
        ]);
        $quiz->ban()->save($ban);

        return response()->json(['success' => 'success'], 200);
    }

    public function remove(Quiz $quiz)
    {
        $quiz->ban()->delete();
        return response()->json(['success' => 'success'], 200);
    }


    protected function validateBan(Request $request)
    {
        return $request->validate([
            'reason' => ['required', 'string', 'max:500']
        ]);
    }
}
