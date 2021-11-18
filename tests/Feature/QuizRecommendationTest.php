<?php

namespace Tests\Feature;

use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use Tests\Helpers\TestHelper;


class QuizRecommendationTest extends TestCase
{
    use RefreshDatabase;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = TestHelper::createAdminUser();
    }

    public function testCanRecommendQuiz()
    {
        $quiz = Quiz::factory()->create([
            'recommended' => false
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/quizzes/' . $quiz->id  . '/recommended/toggle'
        );
        $response->assertStatus(204);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/quizzes/' . $quiz['id']);
        $response->assertStatus(200);
        $response->assertJson([
            'recommended' => true
        ]);
    }

    public function testCanRemoveQuizRecommendation()
    {
        $quiz = Quiz::factory()->create([
            'recommended' => true
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/quizzes/' . $quiz->id  . '/recommended/toggle'
        );
        $response->assertStatus(204);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/quizzes/' . $quiz['id']);
        $response->assertStatus(200);
        $response->assertJson([
            'recommended' => false
        ]);
    }

    public function testCanGetRecommendQuizzes()
    {
        $recommendedQuizzes = Quiz::factory()->count(4)->create([
            'recommended' => true
        ]);

        $nonRecommendedQuizzes = Quiz::factory()->count(5)->create([
            'recommended' => false
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/quizzes/recommended');
        $response->assertStatus(200);
        $response->assertJson([
            'total' => 4
        ]);
    }
}
