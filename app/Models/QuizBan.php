<?php

namespace App\Models;

use App\Helpers\NotificationsHelper;
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

    public function admin()
    {
        return $this->belongsTo(User::class);
    }

    protected static function booted()
    {
        static::created(function ($ban) {
            $admin = User::find($ban->admin_id);
            NotificationsHelper::sendQuizBannedNotification($ban->quiz->user, $admin, $ban->quiz);
        });
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
