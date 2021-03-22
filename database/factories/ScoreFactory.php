<?php

namespace Database\Factories;

use App\Models\Score;
use App\Models\User;
use App\Models\Quiz;

use Illuminate\Database\Eloquent\Factories\Factory;

class ScoreFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Score::class;

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
            'score' => $this->faker->numberBetween(0,10),
            'score_percent' => $this->faker->randomFloat(2,0,100)
        ];
    }
}
