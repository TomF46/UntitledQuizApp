<?php

namespace Tests\Feature;

use App\Models\Quiz;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use Tests\Helpers\TestHelper;


class CommentsTest extends TestCase
{
    use RefreshDatabase;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = TestHelper::createAdminUser();
    }

    public function testCanAddComment()
    {
        $quiz = Quiz::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/quizzes/' . $quiz['id']  . '/comments',
            [
                "text" => "This is a test comment"
            ]
        );
        $response->assertStatus(201);
    }
}
