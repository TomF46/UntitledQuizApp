<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use App\Models\Quiz;

trait Recommendable
{
    public function toggleRecommended()
    {
        $this->recommended = !$this->recommended;
        $this->save();
    }
}
