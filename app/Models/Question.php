<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'ordinal',
        'answer_id',
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}
