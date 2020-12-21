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

    public function map()
    {
        return [
            'id' => $this->id,
            'username' => $this->user->username,
            'user_id' => $this->user->id,
            'quiz_name' => $this->quiz->title,
            'quiz_id' => $this->quiz->id,
            'text' => $this->text,
            'created_at' => $this->created_at
        ];
    }

    public function transform()
    {
        $this->username = $this->user->username;
        $this->user_id = $this->user->id;
        $this->quiz_name = $this->quiz->title;
        $this->quiz_id = $this->quiz->id;
        return $this;
    }
}
