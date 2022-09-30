<?php

namespace Tests\Feature;

use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use Tests\Helpers\TestHelper;


class QuizTest extends TestCase
{
    use RefreshDatabase;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = TestHelper::createAdminUser();
    }

    public function testCanGetQuizzes()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/quizzes');
        $response->assertStatus(200);
    }

    public function testCanGetSpecificQuiz()
    {
        $quiz = $this->testQuiz = Quiz::factory()->create();
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/quizzes/' . $quiz['id']);
        $response->assertStatus(200);
        $response->assertJson([
            'title' => $quiz['title']
        ]);
    }
#
    public function testCanGetRandomQuiz()
    {
        Quiz::factory()->count(10)->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/quizzes/random');
        $response->assertStatus(200);
    }

    public function testQuizOwnerCanPublishQuiz()
    {
        $quiz = Quiz::factory()->create([
            'user_id' => $this->user->id,
            'published' => false,
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/quizzes/' . $quiz['id'] . '/publish');
        $response->assertNoContent();
    }

    public function testUnauthorisedCantPublishQuiz()
    {
        $user2 = TestHelper::createUser();
        $quiz = Quiz::factory()->create([
            'user_id' => $user2->id,
            'published' => false,
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/quizzes/' . $quiz['id'] . '/publish');
        $response->assertStatus(401);
    }

    public function testCanAddQuiz()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/quizzes',
            [
                "id" => null,
                "title" => "Simple Test Quiz",
                "description" => "A simple test quiz",
                "tags" => [],
                "collaborators" => [],
                "publish" => true,
                "questions" =>
                [
                    [
                        "text" => "What is 1 + 1?",
                        "helpText" => null,
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
}
