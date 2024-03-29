<?php

namespace App\Models;

use App\Helpers\NotificationsHelper;
use App\Enums\FriendshipStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    use HasFactory;

    protected $table = 'friendships';

    protected $fillable = [
        'sender_id',
        'recipient_id',
        'status',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class);
    }

    public function recipient()
    {
        return $this->belongsTo(User::class);
    }

    protected static function booted()
    {
        static::created(function ($friendship) {
            NotificationsHelper::sendFriendRequestRecievedNotification($friendship->recipient, $friendship->sender);
        });

        self::updated(function($friendship){
            if($friendship->status == FriendshipStatus::Accepted) NotificationsHelper::sendFriendRequestAcceptedNotification($friendship->sender, $friendship->recipient);
        });
    }

    public function userIsRecipient(User $user)
    {
        return $this->recipient->id == $user->id;
    }

    public function userIsSender(User $user)
    {
        return $this->sender->id == $user->id;
    }

    public function userCanManage(User $user)
    {
        return $this->userIsRecipient($user) || $this->userIsSender($user);
    }


    public function map()
    {
        return [
            'id' => $this->id,
            'sender' => $this->sender->id,
            'recipient' => $this->recipient->id,
            'status' => $this->status,
            'statusText' => 'tbc'
        ];
    }

    public function mapForFriendList(User $user)
    {
        $friend = $user->id == $this->sender->id ? $this->recipient : $this->sender;
        return [
            'id' => $this->id,
            'userId' => $friend->id,
            'username' => $friend->username,
            'date' => $this->updated_at
        ];
    }

    public function mapForCollaboratorList(User $user)
    {
        $friend = $user->id == $this->sender->id ? $this->recipient : $this->sender;
        return [
            'id' => $friend->id,
            'username' => $friend->username
        ];
    }

    public function mapForFriendRequestsList(User $user)
    {
        $canAnswer = $user->id != $this->sender->id;
        return [
            'id' => $this->id,
            'sender' => [
                'id' => $this->sender->id,
                'username' => $this->sender->username
            ],
            'recipient' => [
                'id' => $this->recipient->id,
                'username' => $this->recipient->username
            ],
            'date' => $this->updated_at,
            'canAnswer' => $canAnswer
        ];
    }
}
