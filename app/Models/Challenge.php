<?php

namespace App\Models;

use App\Enums\ChallengeStatus;
use App\Helpers\NotificationsHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    use HasFactory;

    protected $fillable = [
        'challenger_id',
        'recipient_id',
        'score_id',
        'status'
    ];

    public function challenger()
    {
        return $this->belongsTo(User::class);
    }

    public function recipient()
    {
        return $this->belongsTo(User::class);
    }

    public function score()
    {
        return $this->belongsTo(Score::class);
    }

    protected static function booted()
    {
        static::created(function ($notification) {
            NotificationsHelper::sendChallengeRecievedNotification($notification->recipient, $notification->challenger, $notification->score->quiz);
        });
    }

    public function map(User $user)
    {
        return [
            'id' => $this->id,
            'challengerId' => $this->challenger->id,
            'challengerUsername' => $this->challenger->username,
            'recipientId' => $this->recipient->id,
            'recipientUsername' => $this->recipient->username,
            'quizId' => $this->score->quiz->id,
            'quizName' => $this->score->quiz->title,
            'scorePercentToBeat' => $this->score->score_percent,
            'status' => $this->getStatusText($this->status),
            'userCanAttempt' => $this->canUserAttempt($user->id, $this->status, $this->recipient->id)
        ];
    }

    protected function getStatusText($status)
    {
        switch ($status) {
            case ChallengeStatus::NotStarted:
                return "Not Started";
                break;
            case ChallengeStatus::Success:
                return "Success";
                break;
            case ChallengeStatus::Failed:
                return "Failed";
                break;
        }
    }

    protected function canUserAttempt($userId, $status, $recipientId)
    {
        if ($status != ChallengeStatus::NotStarted) return false;
        if ($recipientId != $userId) return false;

        return true;
    }
}
