<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'ordinal'
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($question) { // before delete() method call this
            $question->answers()->delete();
            // do the rest of the cleanup...
        });
    }
}
