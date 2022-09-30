<?php

namespace Tests\Unit;

use App\Models\Quiz;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class QuizTest extends TestCase
{
    use RefreshDatabase;

    public function testCanPublishQuiz()
    {

        $quiz = Quiz::factory()->create([
            'published' => false,
        ]);

        $quiz->publish();

        $this->assertTrue($quiz->published);
    }

}
