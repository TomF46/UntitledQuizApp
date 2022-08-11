<?php

namespace App\Helpers;

use App\Models\User;
use App\Models\Quiz;
use App\Models\Notification;
use App\Enums\NotificationType;


class NotificationsHelper
{
    public static function sendChallengeRecievedNotification(User $to, User $from, Quiz $quiz)
    {
        $notification = Notification::create([
            'recipient_id' => $to->id,
            'sender_id' => $from->id,
            'type' => NotificationType::ChallengeRecieved,
            'text' => $from->username . ' has sent you a challenge on the ' . $quiz->title . ' quiz.'
        ]);
    }

    public static function sendChallengeWonNotification(User $to, User $from, Quiz $quiz)
    {
        $notification = Notification::create([
            'recipient_id' => $to->id,
            'sender_id' => $from->id,
            'type' => NotificationType::ChallengeWon,
            'text' => 'Congratulations you have won your challenge against ' . $from->username . ' on the ' .$quiz->title . ' quiz.'
        ]);
    }

    public static function sendChallengeLostNotification(User $to, User $from, Quiz $quiz)
    {
        $notification = Notification::create([
            'recipient_id' => $to->id,
            'sender_id' => $from->id,
            'type' => NotificationType::ChallengeLost,
            'text' => 'You have lost your challenge against ' . $from->username . ' on the ' .$quiz->title . ' quiz.'
        ]);
    }

    public static function sendFriendRequestRecievedNotification(User $to, User $from)
    {
        $notification = Notification::create([
            'recipient_id' => $to->id,
            'sender_id' => $from->id,
            'type' => NotificationType::FriendRequestRecieved,
            'text' => 'You have recieved a friend request from ' . $from->username . '.'
        ]);
    }

    public static function sendFriendRequestAcceptedNotification(User $to, User $from)
    {
        $notification = Notification::create([
            'recipient_id' => $to->id,
            'sender_id' => $from->id,
            'type' => NotificationType::FriendRequestAccepted,
            'text' => $from->username . ' has accepted your friend request.'
        ]);
    }

    public static function sendQuizBannedNotification(User $to, User $from, Quiz $quiz)
    {
        $notification = Notification::create([
            'recipient_id' => $to->id,
            'sender_id' => $from->id,
            'type' => NotificationType::QuizBanned,
            'text' => 'Your quiz ' . $quiz->title . ' has been banned, see quiz detail page for details.'
        ]);
    }

    public static function sendQuizUnbannedNotification(User $to, User $from, Quiz $quiz)
    {
        $notification = Notification::create([
            'recipient_id' => $to->id,
            'sender_id' => $from->id,
            'type' => NotificationType::QuizUnbanned,
            'text' => 'Your quiz ' . $quiz->title . ' has been unbanned.'
        ]);
    }
}