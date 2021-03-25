<?php

namespace Tests\Unit;

use App\Models\Comment;
use App\Models\Quiz;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class CommentsTest extends TestCase
{
    use RefreshDatabase;

    public function testCanGetCommentForQuiz()
    {
        $user = User::factory()->create();
        $quiz = Quiz::factory()->create();
        $comment = Comment::factory()
            ->create([
                'user_id' => $user->id,
                'quiz_id' => $quiz->id
            ]);

        $this->assertEquals(1, count($quiz->comments));
    }

    public function testCanGetMultipleCommentForQuiz()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $quiz = Quiz::factory()->create();

        $comment = Comment::factory()
            ->create([
                'user_id' => $user->id,
                'quiz_id' => $quiz->id
            ]);

        $comment2 = Comment::factory()
            ->create([
                'user_id' => $user2->id,
                'quiz_id' => $quiz->id
            ]);

        $this->assertEquals(2, count($quiz->comments));
    }
}
