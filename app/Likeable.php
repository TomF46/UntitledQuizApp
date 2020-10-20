<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use App\Models\User;
use App\Models\Like;

trait Likeable
{
    public function scopeWithLikes(Builder $query)
    {
        $query->leftJoinSub(
            'select quiz_id, sum(liked) likes, sum(!liked) dislikes from likes group by quiz_id',
            'likes',
            'likes.quiz_id',
            'quiz.id'
        );
    }

    public function isLikedBy(User $user)
    {
        return (bool) $user->likes
            ->where('quiz_id', $this->id)
            ->where('liked', true)
            ->count();
    }

    public function totalLikes()
    {
        return $this->likes
            ->where('liked', true)
            ->count();
    }

    public function isDislikedBy(User $user)
    {
        return (bool) $user->likes
            ->where('quiz_id', $this->id)
            ->where('liked', false)
            ->count();
    }

    public function totalDislikes()
    {
        return $this->likes
            ->where('liked', false)
            ->count();
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function dislike($user = null)
    {
        return $this->like($user, false);
    }

    public function removeLikeOrDislike(User $user)
    {
        $likes = $user->likes->where('quiz_id', $this->id);
        foreach ($likes as $like) {
            $like->delete();
        }
    }

    public function like($user = null, $liked = true)
    {
        $this->likes()->updateOrCreate(
            [
                'user_id' => $user->id,
            ],
            [
                'liked' => $liked,
            ]
        );
    }
}
