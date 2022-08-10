<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class NotificationType extends Enum
{
    const ChallengeRecieved =   0;
    const ChallengeWon =   1;
    const ChallengeLost = 2;
    const FriendRequestRecieved = 3;
    const FriendRequestAccepted = 3;
    const QuizBanned = 4;
    const QuizUnbanned = 5;
}
