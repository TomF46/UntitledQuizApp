<?php

namespace App\Models;

use App\Enums\EventStatus;
use App\Helpers\NotificationsHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'universal',
        'status',
        'score_group_1',
        'score_group_2',
        'score_group_3',
        'score_group_4',
        'score_max',
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

    protected function mapIncludedTagsForSelect()
    {
        return $this->includedTags->map(function ($tag) {
            return $tag->mapForSelect();
        })->values();
    }

    public function scores()
    {
        return $this->hasMany(EventScore::class);
    }

    protected function getCurrentUsersEventScore(User $user)
    {
        $result = $this->scores()->where('user_id', $user->id)->first();
        return $result ? $result->score : 0;
    }

    public function map(User $user)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'isUniversal' => $this->universal,
            'includedTags' => $this->mapIncludedTags(),
            'status' => $this->status,
            'statusText' => $this->getStatusText($this->status),
            'scoreGroup1' => $this->score_group_1,
            'scoreGroup2' => $this->score_group_2,
            'scoreGroup3' => $this->score_group_3,
            'scoreGroup4' => $this->score_group_4,
            'scoreMax' => $this->score_max,
            'yourTotalPoints' => $this->getCurrentUsersEventScore($user)
        ];
    }

    public function mapForEdit()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'universal' => $this->universal,
            'tags' => $this->mapIncludedTagsForSelect(),
            'published' => $this->status != EventStatus::NotPublished,
            'score_group_1' => $this->score_group_1,
            'score_group_2' => $this->score_group_2,
            'score_group_3' => $this->score_group_3,
            'score_group_4' => $this->score_group_4,
            'score_max' => $this->score_max
        ];
    }

    protected function getStatusText($status)
    {
        switch ($status) {
            case EventStatus::NotPublished:
                return "Not Published";
                break;
            case EventStatus::Active:
                return "Active";
                break;
            case EventStatus::Completed:
                return "Completed";
                break;
        }
    }


    public function publish($user){
        $this->status = EventStatus::Active;
        $this->save();
        NotificationsHelper::sendEventPublishedNotification($user, $this);
    }

    public function endEvent($user){
        $this->status = EventStatus::Completed;
        $this->save();
        NotificationsHelper::sendEventClosedNotification($user, $this);
    }
}
