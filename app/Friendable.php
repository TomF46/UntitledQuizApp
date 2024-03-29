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
            'sender_id' => $this->id,
            'recipient_id' => $user->id,
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
            ->where(function($q){
                $q->where('sender_id', $this->id)
                ->orWhere('recipient_id', $this->id);
        })->get();
    }

    public function friendsList()
    {
        return Friendship::where('status', FriendshipStatus::Accepted)
            ->where(function($q){
                $q->where('sender_id', $this->id)
                ->orWhere('recipient_id', $this->id);
        })->get();

    }

    public function friendRequestsListPaginated()
    {
        return Friendship::where('status', FriendshipStatus::Requested)
            ->where(function($q){
                $q->where('sender_id', $this->id)
                ->orWhere('recipient_id', $this->id);
        })->paginate(10);
    }

    public function friendsListPaginated()
    {
        return Friendship::where('status', FriendshipStatus::Accepted)
            ->where(function($q){
                $q->where('sender_id', $this->id)
                ->orWhere('recipient_id', $this->id);
        })->paginate(10);

    }

    public function isFriendsWith(User $user)
    {
        $matches = Friendship::where('status', FriendshipStatus::Accepted)
            ->where(function($q) use ($user){
                $q->where([['sender_id', $this->id],['recipient_id', $user->id]])
            ->orWhere([['recipient_id', $this->id],['sender_id', $user->id]]);
        })->count();

        return $matches > 0;
    }

    public function hasFriendRequest(User $user)
    {
        $matches = Friendship::where('status', FriendshipStatus::Requested)
            ->where(function($q) use ($user){
                $q->where([['sender_id', $this->id],['recipient_id', $user->id]])
                ->orWhere([['recipient_id', $this->id],['sender_id', $user->id]]);
        })->count();

        return $matches > 0;
    }
}