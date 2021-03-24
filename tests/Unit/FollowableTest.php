<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class FollowableTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanFollowAnotherUser()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $user->follow($user2);

        $this->assertEquals(true, $user2->followedBy($user));
    }

    public function testUserCanUnfollowAnotherUser()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $user->follow($user2);

        $this->assertEquals(true, $user2->followedBy($user));

        $user->unfollow($user2);

        $this->assertEquals(false, $user2->followedBy($user));
    }

    public function testUserCanToggleFollowAnotherUser()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $user->toggleFollow($user2);

        $this->assertEquals(true, $user2->followedBy($user));

        $user->toggleFollow($user2);

        $this->assertEquals(false, $user2->followedBy($user));
    }

    public function testCanCalculateUsersNumberOfFollowers()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();

        $user2->follow($user);
        $user3->follow($user);

        $this->assertEquals(2, $user->followerCount());
    }
}
