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
        $response = Quiz::WhereIn('user_id', $following)->where('published', true)->doesntHave('ban')->paginate(10);
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
        $quizzes = Quiz::with('likes')->where('published', true)->doesntHave('ban')->get()->sortByDesc(function ($quiz) {
            return $quiz->totalNetLikes();
        })->take(10)->values()->map(function ($quiz) {
            return $quiz->mapOverview();
        });

        return response()->json($quizzes);
    }

    public function getUnreadNotifications(Request $request)
    {
        $currentUser = $request->User();
        $paginator = $currentUser->notifications()->where('read', false)->latest()->paginate(5);
        $paginator->getCollection()->transform(function ($notification){
            return $notification->map();
        });

        return response()->json($paginator);
    }

    public function getUsersUnpublishedQuizzes(Request $request)
    {
        $currentUser = $request->User();
        $quizzes = Quiz::Where('user_id', $currentUser->id)->where('published', false)->paginate(5);
        $quizzes->getCollection()->transform(function ($quiz) {
            return $quiz->mapOverview();
        });

        return response()->json($quizzes);
    }
}
