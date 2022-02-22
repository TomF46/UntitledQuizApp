<?php

namespace App\Models;

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
