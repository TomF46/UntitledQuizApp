<?php

namespace App\Models;

use App\Likeable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory, Likeable;

    protected $fillable = [
        'user_id',
        'title',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($quiz) { // before delete() method call this
            $quiz->questions()->delete();
            // do the rest of the cleanup...
        });
    }
}
