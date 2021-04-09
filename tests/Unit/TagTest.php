<?php

namespace Tests\Unit;

use App\Models\Tag;
use App\Models\Quiz;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class TagTest extends TestCase
{
    use RefreshDatabase;

    public function testCanGetQuizzesWithTag()
    {
        $tag = Tag::factory()->create();

        $quiz = Quiz::factory()->hasTags($tag)->create();

        $this->assertEquals(1, count($quiz->tags));
    }
}
