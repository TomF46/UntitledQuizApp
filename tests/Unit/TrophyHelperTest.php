<?php

namespace Tests\Unit;

use App\Models\Event;
use App\Models\EventScore;
use App\Enums\EventStatus;
use App\Models\User;
use App\Helpers\TrophyHelper;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helpers\TestHelper;


class TrophyHelperTest extends TestCase
{
    use RefreshDatabase;

    public function testUsersRecieveTrophies()
    {
        $admin = TestHelper::createAdminUser();
        $event = Event::factory()->create([
            'status' => EventStatus::Completed
        ]);

        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();
        $user4 = User::factory()->create();

        EventScore::factory()->create([
            'user_id' => $user->id,
            'event_id' => $event->id,
            'score' => 10,
            'submissions' => 1
        ]);

        EventScore::factory()->create([
            'user_id' => $user2->id,
            'event_id' => $event->id,
            'score' => 8,
            'submissions' => 1
        ]);

        EventScore::factory()->create([
            'user_id' => $user3->id,
            'event_id' => $event->id,
            'score' => 4,
            'submissions' => 1
        ]);

        EventScore::factory()->create([
            'user_id' => $user4->id,
            'event_id' => $event->id,
            'score' => 2,
            'submissions' => 1
        ]);

        TrophyHelper::createTrophies($event, $admin);

        $this->assertEquals(2, count($user->trophies));
        $this->assertEquals(2, count($user2->trophies));
        $this->assertEquals(2, count($user3->trophies));
        //Only gets participation trophy
        $this->assertEquals(1, count($user4->trophies));

    }
}
