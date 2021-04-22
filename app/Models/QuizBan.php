<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizBan extends Model
{
    // use HasFactory;
    public $timestamps = true;
    protected $fillable = [
        'reason',
        'admin_id'
    ];
}
