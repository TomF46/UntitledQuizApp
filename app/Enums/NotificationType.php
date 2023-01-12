<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class NotificationType extends Enum
{
    const ChallengeRecieved =   0;
    const ChallengeWon =   1;
    const ChallengeLost = 2;
    const FriendRequestRecieved = 3;
    const FriendRequestAccepted = 4;
    const QuizBanned = 5;
    const QuizUnbanned = 6;
    const EventPublished = 7;
    const EventClosed = 8;
    const TrophyWon = 9;
}
