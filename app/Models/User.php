<?php

namespace App\Models;

use App\Followable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, Followable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'bio'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function incrementChallengePoints()
    {
        $this->challenge_points++;
        $this->save();
    }

    public function mapForEditing()
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'bio' => $this->bio,
            'profile_image' => $this->profile_image_url ? $this->profile_image_url : config('globalVariables.default_profile_pictures'),
        ];
    }

    public function map(User $user)
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
            'bio' => $this->bio,
            'profile_image' => $this->profile_image_url ? $this->profile_image_url : config('globalVariables.default_profile_pictures'),
            'totalQuizzesCreated' => Count($this->quizzes),
            'followerCount' => $this->followerCount(),
            'following' => $this->following($user),
            'challengePoints' => $this->challenge_points
        ];
    }

    public function mapForChallengeLeaderboard()
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'challengePoints' => $this->challenge_points
        ];
    }
}
