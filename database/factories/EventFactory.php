<?php

namespace Database\Factories;

use App\Models\Event;
use App\Enums\EventStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->text(20),
            'description' => $this->faker->text,
            'universal' => true,
            'status' => EventStatus::Active,
            'score_group_1' => 0,
            'score_group_2' => 1,
            'score_group_3' => 2,
            'score_group_4' => 3,
            'score_max' => 4,
        ];
    }
}
