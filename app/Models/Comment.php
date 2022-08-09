<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'quiz_id',
        'text',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function isAuthor(User $user)
    {
        return $this->user->id == $user->id;
    }

    public function remove()
    {
        $this->removed = true;
        $this->save();
    }

    public function map(User $user)
    {
        return [
            'id' => $this->id,
            'username' => $this->removed ? "[Removed]" : $this->user->username,
            'user_id' => $this->removed ? null : $this->user->id,
            'user_img' => !$this->removed && $this->user->profile_image_url ? $this->user->profile_image_url : config('globalVariables.default_profile_pictures'),
            'quiz_name' => $this->quiz->title,
            'quiz_id' => $this->quiz->id,
            'text' => $this->removed ? "[Comment removed]" : $this->text,
            'updated_at' => $this->updated_at,
            'canDelete' => ($this->isAuthor($user) || $user->isAdmin()) && !$this->removed,
            'canEdit' => $this->isAuthor($user) && !$this->removed
        ];
    }
}
