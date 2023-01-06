<?php

namespace App\Services;

use App\Models\User;
use App\Models\Event;
use App\Models\EventScore;
use App\Models\Score;
use App\Enums\EventStatus;


class EventService
{
    public function checkIfCountsTowardsEvent(Score $score)
    {

        $events = Event::where('status', EventStatus::Active);
        $events = $events->whereHas('includedTags', function ($query) use ($score) {
            $query->whereIn('id', $score->quiz->tags->map(function ($tag){
                return $tag->id;
            }));
        })->orWhere('universal', true)->get();
        
        foreach ($events as $event) {
            $points = $this->getPointsScored($score, $event);

            $record = EventScore::where([
                ['user_id', $score->user->id],
                ['event_id', $event->id],
            ])->first();

            if($record){
                $record->score = $record->score + $points;
                $record->save();
            } else {
                EventScore::create([
                    'user_id' => $score->user->id,
                    'event_id' => $event->id,
                    'score' => $points
                ]);
            }
        }
        
    }

    private function getPointsScored(Score $score, Event $event)
    {
        $pointsScored = 0;

        if($score->score_percent < 25){
            $pointsScored = $event->score_group_1;
        } elseif ($score->score_percent < 50)  {
            $pointsScored = $event->score_group_2;
        } elseif ($score->score_percent < 75)  {
            $pointsScored = $event->score_group_3;
        } elseif ($score->score_percent < 100)  {
            $pointsScored = $event->score_group_4;
        } else {
            $pointsScored = $event->score_max;
        }

        return $pointsScored;
    }
}