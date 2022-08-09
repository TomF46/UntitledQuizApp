<?php

namespace Tests\Feature;

use App\Models\Quiz;
use App\Models\Comment;
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

    public function testAdminUserCanDeleteComment()
    {
        $comment = Comment::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->delete(
            '/api/comments/' . $comment['id']);
            
        $response->assertNoContent();
    }

    public function testUserCanDeleteOwnComment()
    {
        $user1 = TestHelper::createUser();

        $comment = Comment::factory()->create([
            'user_id' => $user1->id,
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($user1)
        ])->delete(
            '/api/comments/' . $comment['id']);
            
        $response->assertNoContent();
    }

    public function testUserCantDeleteAnotherUsersComment()
    {
        $user1 = TestHelper::createUser();
        $user2 = TestHelper::createUser();

        $comment = Comment::factory()->create([
            'user_id' => $user2->id,
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($user1)
        ])->delete(
            '/api/comments/' . $comment['id']);
            
        $response->assertStatus(401);
    }
}
