<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;
use App\Models\Score;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testCanCreateUser()
    {
        $user = new User([
            'username' => 'Test user',
            'email' => 'test@email.com',
            'password' => 'hash'
        ]);

        $this->assertEquals('test@email.com', $user->email);
    }

    public function testCanGetUserQuizzes()
    {
        $user = User::factory()
            ->has(
                Quiz::factory()
                    ->count(2)
                    ->has(
                        Question::factory()
                            ->count(4)
                            ->state(new Sequence(
                                ['ordinal' => 0],
                                ['ordinal' => 1],
                                ['ordinal' => 2],
                                ['ordinal' => 3]
                            ))
                            ->has(
                                Answer::factory()
                                    ->count(4)
                                    ->state(new Sequence(
                                        ['is_correct' => false],
                                        ['is_correct' => true],
                                        ['is_correct' => false],
                                        ['is_correct' => false]
                                    ))
                            )
                    )
            )
            ->create();

        $this->assertEquals(2, count($user->quizzes));
    }

    public function testCanGetUserScoress()
    {
        $user = User::factory()->create();

        User::factory()
            ->has(
                Quiz::factory()
                    ->has(
                        Score::factory()
                            ->count(3)
                            ->state([
                                'user_id' => $user->id
                            ])
                    )
            )
            ->create();

        $this->assertEquals(3, count($user->scores));
    }

    public function testCanIncrementChallengePoints()
    {
        $user = User::factory()->create();
        $this->assertEquals(0, $user->challenge_points);
        $user->incrementChallengePoints();
        $this->assertEquals(1, $user->challenge_points);
    }
}
