<?php

namespace Tests\Unit;

use App\Models\Score;
use App\Models\Quiz;
use App\Models\User;
use App\Models\Challenge;
use App\Enums\ChallengeStatus;
use App\Enums\NotificationType;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class ChallengesTest extends TestCase
{
    use RefreshDatabase;

    public function testCanGetChallengesForUser()
    {
        $challenger = User::factory()->create();
        $recipient = User::factory()->create();
        $quiz = Quiz::factory()->create();
        $score = Score::factory()->create(
            [
                'user_id' => $challenger->id,
                'quiz_id' => $quiz->id
            ]
        );

        $challenge = Challenge::factory()->create(
            [
                'challenger_id' => $challenger->id,
                'recipient_id' => $recipient->id,
                'score_id' => $score->id,
                'status' => ChallengeStatus::NotStarted
            ]
        );

        $this->assertEquals(1, count($recipient->getChallenges()));
    }

    public function testUserGetsNotifiedWhenTheyGetAChallenge()
    {
        $challenger = User::factory()->create();
        $recipient = User::factory()->create();
        $quiz = Quiz::factory()->create();
        $score = Score::factory()->create(
            [
                'user_id' => $challenger->id,
                'quiz_id' => $quiz->id
            ]
        );

        $challenge = Challenge::factory()->create(
            [
                'challenger_id' => $challenger->id,
                'recipient_id' => $recipient->id,
                'score_id' => $score->id,
                'status' => ChallengeStatus::NotStarted
            ]
        );

        $this->assertEquals(1, $recipient->notifications->count());
        $notification = $user->notifications->first();
        $this->assertEquals(NotificationType::ChallengeRecieved, $notification->type);
    }
}
