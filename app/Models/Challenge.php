<?php

namespace App\Models;

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
}
