<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Quiz;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class LikeableTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanLikeQuiz()
    {
        $user = User::factory()->create();

        $quiz = Quiz::factory()->create();

        $quiz->like($user);

        $this->assertEquals(1, $quiz->totalLikes());
    }

    public function testUserCanRemoveLike()
    {
        $user = User::factory()->create();

        $quiz = Quiz::factory()->create();

        $quiz->like($user);

        $this->assertEquals(1, $quiz->totalLikes());

        $quiz->removeLikeOrDislike($user);

        $this->assertEquals(1, $quiz->totalLikes());
    }

    public function testUserCanDislikeQuiz()
    {
        $user = User::factory()->create();

        $quiz = Quiz::factory()->create();

        $quiz->dislike($user);

        $this->assertEquals(1, $quiz->totalDislikes());
    }

    public function testUserCanRemoveDislike()
    {
        $user = User::factory()->create();

        $quiz = Quiz::factory()->create();

        $quiz->dislike($user);

        $this->assertEquals(1, $quiz->totalDislikes());

        $quiz->removeLikeOrDislike($user);

        $this->assertEquals(1, $quiz->totalDislikes());
    }

    public function testCanCalculateNetlikeQuiz()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();

        $quiz = Quiz::factory()->create();

        $quiz->like($user);
        $quiz->dislike($user2);
        $quiz->dislike($user3);

        $this->assertEquals(-1, $quiz->totalNetLikes());
    }
}
