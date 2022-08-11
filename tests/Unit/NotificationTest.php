<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Notification;
use App\Models\Quiz;
use App\Helpers\NotificationsHelper;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class NotificationTest extends TestCase
{
    use RefreshDatabase;

    public function testUserStoresOwnNotificationsRecieved()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $notification = Notification::factory()->create([
            'recipient_id' => $user->id,
            'sender_id' => $user2->id
        ]);

        $this->assertEquals(1, $user->notifications->count());
    }

    public function testUserNotificationsDontShowSent()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $notification = Notification::factory()->create([
            'recipient_id' => $user->id,
            'sender_id' => $user2->id
        ]);

        $this->assertEquals(0, $user2->notifications->count());
    }

    public function testNotificationCanBeSetToRead()
    {

        $notification = Notification::factory()->create();
        $this->assertFalse($notification->read);
        $notification->setRead();
        $this->assertTrue($notification->read);
    }

    public function testNotificationSentWhenUsingService()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $quiz = Quiz::factory()->create();

        NotificationsHelper::sendChallengeRecievedNotification($user, $user2, $quiz);

        $this->assertEquals(1, $user->notifications->count());
        $notification = $user->notifications->first();

        $expectedText = $user2->username . ' has sent you a challenge on the ' . $quiz->title . ' quiz.';
        $this->assertEquals($expectedText, $notification->text);
    }
}
