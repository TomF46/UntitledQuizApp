<?php

namespace Database\Factories;

use App\Models\Challenge;
use App\Models\Score;
use App\Models\User;
use App\Enums\ChallengeStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChallengeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Challenge::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'score_id' => Score::factory(),
            'challenger_id' => User::factory(),
            'recipient_id' => User::factory(),
            'status' => $this->faker->randomElement([ChallengeStatus::NotStarted, ChallengeStatus::Success, ChallengeStatus::Failed])
        ];
    }
}
