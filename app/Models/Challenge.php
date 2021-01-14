<?php

namespace App\Models;

use App\Enums\ChallengeStatus;
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

    public function transform()
    {
        $this->challengerUsername = $this->challenger->username;
        $this->recipientUsername = $this->recipient->username;
        $this->quiz_id = $this->score->quiz->id;
        return $this;
    }

    public function map()
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
            'status' => $this->getStatusText($this->status)
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
}
