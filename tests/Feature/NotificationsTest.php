<?php

namespace Tests\Feature;

use App\Models\Notification;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use Tests\Helpers\TestHelper;


class NotificationsTest extends TestCase
{
    use RefreshDatabase;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = TestHelper::createAdminUser();
    }

    public function testCanGetNotifications()
    {
        $user1 = TestHelper::createUser();

        $notifications = Notification::factory()->count(2)->create([
            'recipient_id' => $user1->id,
        ]);
        
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($user1)
        ])->get('/api/notifications');
        
        $response->assertStatus(200);
        $response->assertJson([
            'total' => 2
        ]);
    }

    public function testCanOnlyGetOwnNotifications()
    {
        $user1 = TestHelper::createUser();
        $user2 = TestHelper::createUser();

        $notifications = Notification::factory()->count(2)->create([
            'recipient_id' => $user1->id,
        ]);
        
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($user2)
        ])->get('/api/notifications');
        
        $response->assertStatus(200);
        $response->assertJson([
            'total' => 0
        ]);
    }

    public function testCanReadNotification()
    {
        $user1 = TestHelper::createUser();

        $notification = Notification::factory()->create([
            'recipient_id' => $user1->id,
        ]);
        
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($user1)
        ])->put('/api/notifications/' . $notification->id . '/read' );
        
        $notification = $notification->fresh();

        $response->assertStatus(204);
        $this->assertEquals(true ,$notification->read);

    }
}
