<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\EventScore;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventScoreFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = EventScore::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'event_id' => Event::factory(),
            'score' => $this->faker->numberBetween(0,10),
            'submissions' => $this->faker->numberBetween(0,10)
        ];
    }
}
