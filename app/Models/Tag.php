<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function quizzes()
    {
        return $this->belongsToMany(Quiz::class);
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'name' => $this->name
        ];
    }

    public function mapForSelect()
    {
        return [
            'value' => $this->id,
            'text' => $this->name
        ];
    }
}
