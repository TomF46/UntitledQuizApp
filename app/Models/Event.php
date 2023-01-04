<?php

namespace App\Models;

use App\Enums\EventStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'universal',
        'status'
    ];

    public function includedTags()
    {
        return $this->belongsToMany(Tag::class, 'events_tags');
    }

    protected function mapIncludedTags()
    {
        return $this->includedTags->map(function ($tag) {
            return $tag->map();
        })->values();
    }

    public function scores()
    {
        return $this->hasMany(EventScore::class);
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'isUniversal' => $this->universal,
            'includedTags' => $this->mapIncludedTags(),
            'status' => $this->status
        ];
    }

    public function publish(){
        $this->status = EventStatus::Active;
        $this->save();
    }

    public function endEvent(){
        $this->status = EventStatus::Completed;
        $this->save();
    }
}
