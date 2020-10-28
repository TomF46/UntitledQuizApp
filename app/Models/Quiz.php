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

    public function tags()
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
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
        ];
    }

    public function mapDetailWithoutQuestions(User $user)
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
        ];
    }

    public function transformWithoutQuestions()
    {
        $this->questionsCount = count($this->questions);
        $this->totalPlays = count($this->scores);
        $this->totalLikes = $this->totalLikes();
        $this->totalDislikes = $this->totalDislikes();
        $this->tags = $this->tags()->get()->map(function ($tag) {
            return $tag->map();
        });
        $this->creator = $this->user->username;
        $this->creator_id = $this->user->id;
        return $this;
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
