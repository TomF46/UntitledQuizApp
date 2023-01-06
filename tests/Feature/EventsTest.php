<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Enums\EventStatus;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use Tests\Helpers\TestHelper;


class EventsTest extends TestCase
{
    use RefreshDatabase;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = TestHelper::createAdminUser();
    }

    public function testCanGetEvents()
    {
        $totalCreated = 5;
        Event::factory()->count($totalCreated)->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/events');
        $response->assertStatus(200);
        $response->assertJson([
            'total' => $totalCreated
        ]);
    }

    public function testCanGetEvent()
    {
        $event = Event::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/events/' . $event->id);
        $response->assertStatus(200);
        $response->assertJson([
            'id' => $event->id
        ]);
    }

    public function testCanAddUniversalEvent()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/events',
            [
                "name" => "Simple Test Event",
                "description" => "A simple test Event",
                "universal" => true,
                "tags" => [],
                "publish" => true,
                'score_group_1' => 0,
                'score_group_2' => 5,
                'score_group_3' => 10,
                'score_group_4' => 15,
                'score_max' => 25,
            ]
        );

        $response->assertStatus(201);
    }

    public function testCanPublishEvent()
    {
        $event = Event::factory()->create([
            'status' => EventStatus::NotPublished
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/events/' . $event->id . '/publish');
        $response->assertStatus(204);
        
        $response2 = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/events/' . $event->id);
        $response2->assertStatus(200);
        $response2->assertJson([
            'status' => EventStatus::Active
        ]);
    }

    public function testCanEndEvent()
    {
        $event = Event::factory()->create([
            'status' => EventStatus::Active
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/events/' . $event->id . '/end');
        $response->assertStatus(204);

        $response2 = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/events/' . $event->id);
        $response2->assertStatus(200);
        $response2->assertJson([
            'status' => EventStatus::Completed
        ]);
    }
}
