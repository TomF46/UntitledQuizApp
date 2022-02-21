<?php

namespace Database\Factories;

use App\Models\Friendship;
use App\Models\User;
use App\Enums\FriendshipStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class FriendshipFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Friendship::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'sender_id' => User::factory(),
            'recipient_id' => User::factory(),
            'status' => $this->faker->randomElement([FriendshipStatus::Requested, FriendshipStatus::Accepted])
        ];
    }
}
