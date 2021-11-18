<?php

namespace Tests\Unit;

use App\Models\Quiz;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class RecommendableTest extends TestCase
{
    use RefreshDatabase;

    public function testQuizCanBeRecommended()
    {
        $quiz = Quiz::factory()->create([
            'recommended' => false
        ]);

        $quiz->toggleRecommended();

        $this->assertTrue($quiz->recommended);
    }

    public function testQuizRecommendationCanBeRemoved()
    {
        $quiz = Quiz::factory()->create([
            'recommended' => true
        ]);

        $quiz->toggleRecommended();

        $this->assertFalse($quiz->recommended);
    }
}
