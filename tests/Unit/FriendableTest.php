<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Friendship;
use App\Enums\FriendshipStatus;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class FriendableTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanFriendRequestUser()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $user->sendFriendRequest($user2);

        $this->assertTrue($user2->hasFriendRequest($user));
        $this->assertFalse($user->isFriendsWith($user2));
    }

    public function testUserCanAcceptFriendRequest()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $request = $user->sendFriendRequest($user2);
        $user2->acceptFriendRequestById($request->id);

        $this->assertFalse($user2->hasFriendRequest($user));
        $this->assertTrue($user->isFriendsWith($user2));
    }

    public function testUserCanRejectFriendRequest()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $request = $user->sendFriendRequest($user2);
        $user2->removeFriendOrFriendRequestById($request->id);

        $this->assertFalse($user2->hasFriendRequest($user));
        $this->assertFalse($user->isFriendsWith($user2));
    }

    public function testUserCanRetractFriendRequest()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $request = $user->sendFriendRequest($user2);
        $user->removeFriendOrFriendRequestById($request->id);

        $this->assertFalse($user2->hasFriendRequest($user));
        $this->assertFalse($user->isFriendsWith($user2));
    }

    public function testUserCanRemoveFriend()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $request = $user->sendFriendRequest($user2);
        $user2->acceptFriendRequestById($request->id);
        $user2->removeFriendOrFriendRequestById($request->id);

        $this->assertFalse($user2->hasFriendRequest($user));
        $this->assertFalse($user->isFriendsWith($user2));
    }

    public function testUserCanRemoveFriendThatTheySent()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $request = $user->sendFriendRequest($user2);
        $user2->acceptFriendRequestById($request->id);
        $user->removeFriendOrFriendRequestById($request->id);

        $this->assertFalse($user2->hasFriendRequest($user));
        $this->assertFalse($user->isFriendsWith($user2));
    }
}
