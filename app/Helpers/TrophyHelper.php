<?php

namespace App\Helpers;

use App\Helpers\NotificationsHelper;
use App\Models\User;
use App\Models\Trophy;
use App\Models\Event;
use App\Enums\TrophyTier;


class TrophyHelper
{
    public static function createTrophies(Event $event, User $admin)
    {
        $participationTrophy = Trophy::create([
            'event_id' => $event->id,
            'name' => $event->name . " participation",
            'description' => "Thanks for participating in " . $event->name,
            'tier' => TrophyTier::Participation
        ]);

        foreach ($event->scores as $score) {
            $user = $score->user;
            $user->trophies()->attach($participationTrophy);
            $user->save();
            NotificationsHelper::sendTrophyWonNotification($user, $admin, $participationTrophy);
        }

        list( $first, $second, $third) = $event->getTop3();

        $bronzeTrophy = Trophy::create([
            'event_id' => $event->id,
            'name' => $event->name . " bronze",
            'description' => "Well done you were 3rd place in " . $event->name,
            'tier' => TrophyTier::Bronze
        ]);

        $third->user->trophies()->attach($bronzeTrophy);
        NotificationsHelper::sendTrophyWonNotification($third->user, $admin, $bronzeTrophy);

        $silverTrophy = Trophy::create([
            'event_id' => $event->id,
            'name' => $event->name . " silver",
            'description' => "Well done you were 2nd place in " . $event->name,
            'tier' => TrophyTier::Silver
        ]);

        $second->user->trophies()->attach($silverTrophy);
        NotificationsHelper::sendTrophyWonNotification($second->user, $admin, $silverTrophy);

        $goldTrophy = Trophy::create([
            'event_id' => $event->id,
            'name' => $event->name . " gold",
            'description' => "Well done you were 1st place in " . $event->name,
            'tier' => TrophyTier::Gold
        ]);

        $first->user->trophies()->attach($goldTrophy);
        NotificationsHelper::sendTrophyWonNotification($first->user, $admin, $goldTrophy);
    }
}