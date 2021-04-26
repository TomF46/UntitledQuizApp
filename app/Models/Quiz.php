<?php

namespace App\Models;

use App\Likeable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory, Likeable;

    protected $fillable = [
        'user_id',
        'title',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }

    public function ban()
    {
        return $this->hasOne(QuizBan::class);
    }

    public function isBanned()
    {
        return $this->ban()->exists();
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($quiz) { // before delete() method call this
            $quiz->questions()->delete();
            // do the rest of the cleanup...
        });
    }

    public function mapOverview()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'questionsCount' => count($this->questions),
            'totalPlays' => count($this->scores),
            'totalLikes' => $this->totalLikes(),
            'totalDislikes' => $this->totalDislikes(),
            'tags' => $this->tags()->get()->map(function ($tag) {
                return $tag->map();
            }),
            'creator' => [
                "username" => $this->user->username,
                'id' => $this->user->id,
                'profile_image' => $this->user->profile_image_url ? $this->user->profile_image_url : config('globalVariables.default_profile_pictures'),
            ],
            'isBanned' => $this->isBanned(),
            'banId' => $this->isBanned() ? $this->ban->id : null
        ];
    }

    public function mapOverviewBanned()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'creator' => [
                "username" => $this->user->username,
                'id' => $this->user->id,
                'profile_image' => $this->user->profile_image_url ? $this->user->profile_image_url : config('globalVariables.default_profile_pictures'),
            ],
            'isBanned' => $this->isBanned(),
            'banId' => $this->isBanned() ? $this->ban->id : null,
            'reason' => $this->ban->reason
        ];
    }

    public function mapOverviewWithQuestions()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'questionsCount' => count($this->questions),
            'questions' => $this->questions()->with('answers')->get(),
            'totalPlays' => count($this->scores),
            'totalLikes' => $this->totalLikes(),
            'totalDislikes' => $this->totalDislikes(),
            'tags' => $this->tags()->get()->map(function ($tag) {
                return $tag->mapForSelect();
            }),
            'creator' => [
                "username" => $this->user->username,
                'id' => $this->user->id,
                'profile_image' => $this->user->profile_image_url ? $this->user->profile_image_url : config('globalVariables.default_profile_pictures'),
            ],
            'isBanned' => $this->isBanned(),
            'banId' => $this->isBanned() ? $this->ban->id : null
        ];
    }

    public function mapDetailWithoutAnswers(User $user)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'questions' => $this->removeAnswersFromQuestion($this->questions()->with('answers')->get()),
            'totalPlays' => count($this->scores),
            'totalLikes' => $this->totalLikes(),
            'totalDislikes' => $this->totalDislikes(),
            'tags' => $this->tags()->get()->map(function ($tag) {
                return $tag->map();
            }),
            'creator' => [
                "username" => $this->user->username,
                'id' => $this->user->id,
                'profile_image' => $this->user->profile_image_url ? $this->user->profile_image_url : config('globalVariables.default_profile_pictures'),
            ],
            'likedByUser' => $this->isLikedBy($user),
            'dislikedByUser' => $this->isDislikedBy($user),
            'comments' => $this->comments()->get()->map(function ($comment) {
                return $comment->map();
            }),
            'isBanned' => $this->isBanned(),
            'banId' => $this->isBanned() ? $this->ban->id : null
        ];
    }

    protected function removeAnswersFromQuestion($questions)
    {
        foreach ($questions as $question) {
            $this->removeAnswers($question);
        }
        return $questions;
    }

    protected function removeAnswers($question)
    {
        foreach ($question->answers as $answer) {
            unset($answer->is_correct);
        }
    }
}
