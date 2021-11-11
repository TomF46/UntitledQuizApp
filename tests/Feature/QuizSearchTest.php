<?php

namespace Tests\Feature;

use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use Tests\Helpers\TestHelper;


class QuizSearchTest extends TestCase
{
    use RefreshDatabase;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = TestHelper::createAdminUser();
    }

    public function testCanSearchBySearchTerm()
    {
        Quiz::factory()->create([
            'title' => 'Test Quiz',
            "description" => "A Test quiz",
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/quizzes/search',
            [
                "searchTerm" => "Test",
                "user" =>  "",
                "tag" => null
            ]
        );
        $response->assertStatus(200);
    }
}
