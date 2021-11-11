<?php

namespace Tests\Feature;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use Tests\Helpers\TestHelper;


class QuizScoresTest extends TestCase
{
    use RefreshDatabase;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = TestHelper::createAdminUser();
    }

    public function testCanAddSubmission()
    {
        $quiz = Quiz::factory()
        ->has(
            Question::factory()
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
        )->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/quizzes/' . $quiz->id  . '/scores',
            [
                "answers" => [
                    [
                        "question_id" => $quiz->questions[0]->id,
                        "answer_id" => $quiz->questions[0]->answers[1]->id
                    ]
                ]
            ]
        );
        $response->assertStatus(201);
    }
}
