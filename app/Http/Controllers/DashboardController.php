<?php

namespace App\Http\Controllers;

use App\Enums\Roles;
use App\Models\Quiz;
use App\Models\Role;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getQuizzesByFollowedUser(Request $request)
    {
        $currentUser = $request->User();
        $following = $currentUser->follows()->pluck('id');
        $response = Quiz::WhereIn('user_id', $following)->doesntHave('ban')->paginate(10);
        $response->getCollection()->transform(function ($quiz) {
            return $quiz->mapOverview();
        });

        return response()->json($response);
    }

    public function getFollowedUsers(Request $request)
    {
        $currentUser = $request->User();
        $following = $currentUser->follows()->whereHas('role', function ($query) {
            $query->where('role', '!=', Roles::BANNED);
        })->paginate(10);
        $following->getCollection()->transform(function ($user) use ($currentUser) {
            return $user->map($currentUser);
        });

        return response()->json($following);
    }

    public function getPopularQuizzes()
    {
        $quizzes = Quiz::with('likes')->doesntHave('ban')->get()->sortByDesc(function ($quiz) {
            return $quiz->totalNetLikes();
        })->take(10)->values()->map(function ($quiz) {
            return $quiz->mapOverview();
        });

        return response()->json($quizzes);
    }
}
