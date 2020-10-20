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
            $quiz->questionsCount = count($quiz->questions);
            $quiz->totalPlays = count($quiz->scores);
            $quiz->totalLikes = $quiz->totalLikes();
            $quiz->totalDislikes = $quiz->totalDislikes();
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

        return response()->json($response);
    }

    public function getFollowedUsers(Request $request)
    {
        $currentUser = $request->User();
        $following = $currentUser->follows()->paginate(10);
        $following->getCollection()->transform(function ($user) {
            $user->profile_image =  'https://picsum.photos/200';
            $user->followerCount = $user->followerCount();
            $user->totalQuizzesCreated = Count($user->quizzes);
            return $user;
        });

        return response()->json($following);
    }

    public function getPopularQuizzes()
    {
        $quizzes = Quiz::with('likes')->get()->sortByDesc(function ($quiz) {
            return $quiz->totalNetLikes();
        })->take(10)->values()->map(function ($quiz) {
            return [
                'id' => $quiz->id,
                'title' => $quiz->title,
                'description' => $quiz->description,
                'totalPlays' => count($quiz->scores),
                'totalLikes' => $quiz->totalLikes(),
                'totalDislikes' => $quiz->totalDislikes(),
                'tags' => $quiz->tags()->get()->map(function ($tag) {
                    return [
                        'id' => $tag->id,
                        'name' => $tag->name
                    ];
                }),
                'creator' => $quiz->user->username,
                'creator_id' => $quiz->user->id
            ];
        });

        return response()->json($quizzes);
    }
}
