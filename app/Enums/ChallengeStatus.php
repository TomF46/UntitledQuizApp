<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class ChallengeStatus extends Enum
{
    const NotStarted =   0;
    const Success =   1;
    const Failed = 2;
}
