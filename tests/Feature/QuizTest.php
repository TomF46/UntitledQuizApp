<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class QuizTest extends TestCase
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
        $pat = $this->user->createToken('Personal Access Token');
        $this->token = $pat->accessToken;
        $this->addTestQuiz();
    }

    public function testCanGetQuizzes()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/quizzes');
        $response->assertStatus(200);
    }

    public function testCanGetSpecificQuiz()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/quizzes/' . $this->testQuiz['id']);
        $response->assertStatus(200);
        $response->assertJson([
            'title' => $this->testQuiz['title']
        ]);
    }

    public function testCanAddQuiz()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            '/api/quizzes',
            [
                "id" => null,
                "title" => "Simple Test Quiz",
                "description" => "A simple test quiz",
                "tags" => [],
                "questions" =>
                [
                    [
                        "text" => "What is 1 + 1?",
                        "answers" => [
                            [
                                "text" => "5",
                                "is_correct" => false
                            ],
                            [
                                "text" => "3",
                                "is_correct" => false
                            ],
                            [
                                "text" => "2",
                                "is_correct" => true
                            ],
                            [
                                "text" => "0",
                                "is_correct" => false
                            ]
                        ],
                        "image_url" => null
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
