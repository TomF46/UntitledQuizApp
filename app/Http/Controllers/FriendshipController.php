<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Friendship;
use Illuminate\Http\Request;

class FriendshipController extends Controller
{
    public function index(Request $request)
    {
        return response()->json($request->user()->friendsList());
    }

    public function requests()
    {
        return response()->json($request->user()->friendsRequestList());
    }

    public function sendRequest(Request $request, User $user)
    {
        $request->user()->sendFriendRequest($user);
        return response()->noContent();
    }

    public function acceptRequest(Request $request, Friendship $friendship)
    {
        if($friendship->user1_id != $request->user()->id && $friendship->user2_id != $request->user()->id) return response()->json(['error' => 'unauthorized.'], 401);

        $request->user()->acceptFriendRequestById($friendship->id);
        return response()->noContent();
    }

    public function rejectOrRemoveFriendship(Request $request, Friendship $friendship)
    {
        if($friendship->user1_id != $request->user()->id && $friendship->user2_id != $request->user()->id) return response()->json(['error' => 'unauthorized.'], 401);

        $request->user()->removeFriendOrFriendRequestById($friendship->id);
        return response()->noContent();
    }
}
