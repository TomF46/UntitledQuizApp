<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{
    public function getQuizzesByFollowedUser(Request $request)
    {
        $currentUser = $request->User();
        $following = $currentUser->follows()->pluck('id');
        $response = Quiz::WhereIn('user_id', $following)->paginate(10);
        $response->getCollection()->transform(function ($quiz) {
            return $quiz->transformWithoutQuestions();
        });

        return response()->json($response);
    }

    public function getFollowedUsers(Request $request)
    {
        $currentUser = $request->User();
        $following = $currentUser->follows()->paginate(10);
        $following->getCollection()->transform(function ($user) {
            return $user->transform();
        });

        return response()->json($following);
    }

    public function getPopularQuizzes()
    {
        $quizzes = Quiz::with('likes')->get()->sortByDesc(function ($quiz) {
            return $quiz->totalNetLikes();
        })->take(10)->values()->map(function ($quiz) {
            return $quiz->mapOverview();
        });

        return response()->json($quizzes);
    }
}
