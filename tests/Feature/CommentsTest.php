<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class CommentsTest extends TestCase
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

    public function testCanAddComment()
    {
        $path = '/api/quizzes/' . $this->testQuiz['id']  . '/comments';
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            $path,
            [
                "text" => "This is a test comment"
            ]
        );
        $response->assertStatus(201);
    }

    protected function addTestQuiz()
    {
        $this->testQuiz = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            '/api/quizzes',
            [
                "id" => null,
                "title" => "Test Quiz",
                "description" => "A Test quiz",
                "tags" => [],
                "questions" =>
                [
                    [
                        "text" => "What is 10 + 10?",
                        "answers" => [
                            [
                                "text" => "17",
                                "is_correct" => false
                            ],
                            [
                                "text" => "20",
                                "is_correct" => true
                            ],
                            [
                                "text" => "30",
                                "is_correct" => false
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
    }
}
