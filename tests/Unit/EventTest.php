<?php

namespace Tests\Unit;

use App\Models\Event;
use App\Enums\EventStatus;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class EventTest extends TestCase
{
    use RefreshDatabase;

    public function testCanPublishEvent()
    {
        $event = Event::factory()->create([
            'status' => EventStatus::NotPublished
        ]);

        $event->publish();

        $this->assertEquals(EventStatus::Active, $event->status);
    }

    public function testCanEndEvent()
    {
        $event = Event::factory()->create([
            'status' => EventStatus::Active
        ]);

        $event->endEvent();

        $this->assertEquals(EventStatus::Completed, $event->status);
    }
}
