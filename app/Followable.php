<?php

namespace App;

use App\Models\User;
use Illuminate\Support\Facades\DB;

trait Followable
{

    public function follow(User $user)
    {
        return $this->follows()->save($user);
    }

    public function unfollow(User $user)
    {
        return $this->follows()->detach($user);
    }

    public function toggleFollow(User $user)
    {
        return $this->follows()->toggle($user);
    }

    public function followedBy(User $user)
    {
        return DB::table('follows')
            ->where('user_id', $user->id)
            ->where('following_user_id', $this->id)
            ->count();
    }

    public function followerCount()
    {
        return DB::table('follows')
            ->where('following_user_id', $this->id)
            ->count();
    }

    public function follows()
    {
        return $this->belongsToMany(User::class, 'follows', 'user_id', 'following_user_id');
    }
}
