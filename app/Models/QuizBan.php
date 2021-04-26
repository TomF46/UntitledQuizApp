<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizBan extends Model
{
    // use HasFactory;
    public $timestamps = true;
    protected $fillable = [
        'reason',
        'admin_id'
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function quizOwner()
    {
        return $this->quiz->user;
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'quizTitle' => $this->quiz->title,
            'reason' => $this->reason
        ];
    }
}
