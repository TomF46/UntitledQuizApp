<?php

namespace Tests\Feature;

use App\Models\Event;
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
}
