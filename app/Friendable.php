<?php

namespace App;

use App\Models\User;
use App\Exception;
use Illuminate\Support\Facades\DB;
use App\Models\Friendship;
use App\Enums\FriendshipStatus;

trait Friendable
{

    public function sendFriendRequest(User $user)
    {
        $friendship = Friendship::create([
            'user1_id' => $this->id,
            'user2_id' => $user->id,
        ]);

        return $friendship;
    }

    public function acceptFriendRequestById(int $id)
    {
        $friendship = Friendship::find($id);

        $friendship->status = FriendshipStatus::Accepted;
        $friendship->save();
    }

    public function removeFriendOrFriendRequestById(int $id)
    {
        $friendship = Friendship::find($id);

        $friendship->delete();
    }

    public function friendsRequestList()
    {
        return Friendship::where('status', FriendshipStatus::Requested)
            ->where('user1_id', $this->id)
            ->orWhere('user2_id', $this->id)
            ->get();
    }

    public function friendsList()
    {
        return Friendship::where('status', FriendshipStatus::Accepted)
            ->where('user1_id', $this->id)
            ->orWhere('user2_id', $this->id)
            ->get();
    }
}