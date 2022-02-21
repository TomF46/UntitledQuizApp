<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Friendship;
use App\Enums\FriendshipStatus;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use Tests\Helpers\TestHelper;


class FriendshipTest extends TestCase
{
    use RefreshDatabase;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = TestHelper::createAdminUser();
    }

    public function testCanGetFriendsList()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/friendships');
        $response->assertStatus(200);
    }

    public function testCanGetFriendRequestsList()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/friendship/requests');
        $response->assertStatus(200);
    }

    public function testCanSendFriendRequests()
    {
        $user = TestHelper::createUser();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
            ])->postJson('/api/users/' . $user->id  . '/friendRequest');
        $response->assertStatus(204);
    }

    public function testCanAcceptFriendRequests()
    {
        $friendship = Friendship::factory()->create([
            'recipient_id' => $this->user->id,
            'status' => FriendshipStatus::Requested
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
            ])->postJson('/api/friendships/' . $friendship->id  . '/acceptRequest');

        $response->assertStatus(204);
    }

    public function testCantAcceptFriendRequestsNotForUser()
    {
        $friendship = Friendship::factory()->create([
            'recipient_id' => $this->user->id,
            'status' => FriendshipStatus::Requested
        ]);

        $user3 = TestHelper::createUser();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($user3)
            ])->postJson('/api/friendships/' . $friendship->id  . '/acceptRequest');

        $response->assertStatus(401);
    }

    public function testCanRejectFriendRequests()
    {
        $friendship = Friendship::factory()->create([
            'recipient_id' => $this->user->id,
            'status' => FriendshipStatus::Requested
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
            ])->delete('/api/friendships/' . $friendship->id);

        $response->assertStatus(204);
    }

    public function testCantDeleteFriendRequestsNotForUser()
    {
        $friendship = Friendship::factory()->create([
            'recipient_id' => $this->user->id,
            'status' => FriendshipStatus::Requested
        ]);

        $user3 = TestHelper::createUser();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($user3)
            ])->delete('/api/friendships/' . $friendship->id);

        $response->assertStatus(401);
    }

    public function testCanRemoveFriend()
    {
        $friendship = Friendship::factory()->create([
            'recipient_id' => $this->user->id,
            'status' => FriendshipStatus::Accepted
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
            ])->delete('/api/friendships/' . $friendship->id);

        $response->assertStatus(204);
    }

    public function testCantRemoveFriendshipYourNotPartOf()
    {
        $friendship = Friendship::factory()->create([
            'recipient_id' => $this->user->id,
            'status' => FriendshipStatus::Accepted
        ]);

        $user3 = TestHelper::createUser();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($user3)
            ])->delete('/api/friendships/' . $friendship->id);

        $response->assertStatus(401);
    }
}
