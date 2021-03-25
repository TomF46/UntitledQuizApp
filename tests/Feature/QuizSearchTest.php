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

class QuizSearchTest extends TestCase
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

    public function testCanSearchBySearchTerm()
    {
        $path = '/api/quizzes/search';
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            $path,
            [
                "searchTerm" => "Test",
                "user" =>  "",
                "tag" => null
            ]
        );
        $response->assertStatus(200);
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
            )->create([
                'title' => 'Test Quiz',
                "description" => "A Test quiz",
            ]);
    }
}
