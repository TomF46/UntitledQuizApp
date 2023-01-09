<?php

namespace Tests\Unit;

use App\Models\Event;
use App\Enums\EventStatus;
use Tests\Helpers\TestHelper;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class EventTest extends TestCase
{
    use RefreshDatabase;

    public function testCanPublishEvent()
    {
        $user = TestHelper::createAdminUser();
        $event = Event::factory()->create([
            'status' => EventStatus::NotPublished
        ]);

        $event->publish($user);

        $this->assertEquals(EventStatus::Active, $event->status);
    }

    public function testCanEndEvent()
    {
        $user = TestHelper::createAdminUser();
        $event = Event::factory()->create([
            'status' => EventStatus::Active
        ]);

        $event->endEvent($user);

        $this->assertEquals(EventStatus::Completed, $event->status);
    }
}
