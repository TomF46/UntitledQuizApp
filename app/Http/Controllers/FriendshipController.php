<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Friendship;
use Illuminate\Http\Request;

class FriendshipController extends Controller
{
    public function index(Request $request)
    {
        $currentUser = $request->User();

        $paginator = $request->user()->friendsListPaginated();
        $paginator->getCollection()->transform(function ($friendship) use ($currentUser){
            return $friendship->mapForFriendList($currentUser);
        });
        return response()->json($paginator);
    }

    public function requests(Request $request)
    {
        $currentUser = $request->User();

        $paginator = $request->user()->friendRequestsListPaginated();
        $paginator->getCollection()->transform(function ($friendship) use ($currentUser){
            return $friendship->mapForFriendRequestsList($currentUser);
        });
        return response()->json($paginator);
    }

    public function sendRequest(Request $request, User $user)
    {
        $request->user()->sendFriendRequest($user);
        return response()->noContent();
    }

    public function acceptRequest(Request $request, Friendship $friendship)
    {
        if(!$friendship->userIsRecipient($request->user())) return response()->json(['error' => 'unauthorized.'], 401);

        $request->user()->acceptFriendRequestById($friendship->id);
        return response()->noContent();
    }

    public function rejectOrRemoveFriendship(Request $request, Friendship $friendship)
    {
        if(!$friendship->userCanManage($request->user())) return response()->json(['error' => 'unauthorized.'], 401);

        $request->user()->removeFriendOrFriendRequestById($friendship->id);
        return response()->noContent();
    }
}
