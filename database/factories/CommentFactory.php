<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\User;
use App\Models\Quiz;

use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'quiz_id' => Quiz::factory(),
            'text' => $this->faker->text(40),
        ];
    }
}
