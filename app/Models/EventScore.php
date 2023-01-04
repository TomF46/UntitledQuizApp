<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventScore extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'event_id',
        'score'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function eventScores()
    {
        return $this->hasMany(Event::class);
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'username' => $this->user->username,
            'user_id' => $this->user->id,
            'event_name' => $this->event->name,
            'event_id' => $this->event->id,
            'score' => $this->score
        ];
    }
}
