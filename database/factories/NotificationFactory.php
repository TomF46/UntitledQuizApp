<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\User;
use App\Enums\NotificationType;
use Illuminate\Database\Eloquent\Factories\Factory;

class NotificationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Notification::class;

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
            'type' => $this->faker->randomElement([
                NotificationType::ChallengeRecieved, 
                NotificationType::ChallengeWon,
                NotificationType::ChallengeLost,
                NotificationType::FriendRequestRecieved,
                NotificationType::FriendRequestAccepted,
                NotificationType::QuizBanned,
                NotificationType::QuizUnbanned,
            ]),
            'text' => $this->faker->text(40),
            'read' => false
        ];
    }
}