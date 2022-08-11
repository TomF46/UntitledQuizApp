<?php

namespace App\Http\Controllers;

use App\Filters\BannedQuizSearch;
use App\Models\QuizBan;
use App\Models\Quiz;
use App\Helpers\NotificationsHelper;
use Illuminate\Http\Request;

class QuizBanController extends Controller
{
    public function filter(Request $request)
    {
        $paginator = BannedQuizSearch::apply($request)->paginate(10);
        $paginator->getCollection()->transform(function ($quiz) {
            return $quiz->mapOverviewBanned();
        });

        return response()->json($paginator);
    }

    public function show(QuizBan $quizBan, Request $request)
    {
        $currentUser = $request->user();
        if ($quizBan->quizOwner()->id != $currentUser->id && !$currentUser->isAdmin()) return response()->json(['error' => 'unauthorized.'], 401);
        return response()->json($quizBan->map());
    }

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

    public function remove(Quiz $quiz, Request $request)
    {
        $quiz->ban()->delete();
        NotificationsHelper::sendQuizUnbannedNotification($quiz->user, $request->user(), $quiz);
        return response()->json(['success' => 'success'], 200);
    }


    protected function validateBan(Request $request)
    {
        return $request->validate([
            'reason' => ['required', 'string', 'max:500']
        ]);
    }
}
