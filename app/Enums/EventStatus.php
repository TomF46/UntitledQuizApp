<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class EventStatus extends Enum
{
    const NotPublished =   0;
    const Active =   1;
    const Completed = 2;
}
