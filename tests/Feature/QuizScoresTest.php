<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;
use App\Models\Role;
use App\Enums\Roles;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class QuizScoresTest extends TestCase
{
    use RefreshDatabase;

    public $user;
    public $token;
    public $testQuiz;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = User::factory()->create();
        $role = new Role([
            'role' => Roles::ADMINISTRATOR
        ]);
        $this->user->role()->save($role);
        $pat = $this->user->createToken('Personal Access Token');
        $this->token = $pat->accessToken;
        $this->addTestQuiz();
    }

    public function testCanAddSubmission()
    {
        $path = '/api/quizzes/' . $this->testQuiz->id  . '/scores';
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            $path,
            [
                "answers" => [
                    [
                        "question_id" => $this->testQuiz->questions[0]->id,
                        "answer_id" => $this->testQuiz->questions[0]->answers[2]->id
                    ]
                ]
            ]
        );
        $response->assertStatus(201);
    }

    protected function addTestQuiz()
    {
        $this->testQuiz = Quiz::factory()
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
    }
}
