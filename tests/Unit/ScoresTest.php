<?php

namespace Tests\Unit;

use App\Models\Score;
use App\Models\Quiz;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class ScoresTest extends TestCase
{
    use RefreshDatabase;

    public function testCanGetUserScores()
    {
        $user = User::factory()->create();

        Quiz::factory()
            ->has(
                Score::factory()
                    ->count(3)
                    ->state([
                        'user_id' => $user->id
                    ])
            )->create();

        $this->assertEquals(3, count($user->scores));
    }

    public function testCanGetQuizzesScores()
    {
        $user = User::factory()->create();

        $quiz = Quiz::factory()
            ->has(
                Score::factory()
                    ->count(2)
                    ->state([
                        'user_id' => $user->id
                    ])
            )->create();

        $this->assertEquals(2, count($quiz->scores));
    }
}
