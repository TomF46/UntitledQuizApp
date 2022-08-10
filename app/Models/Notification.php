<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications';

    protected $fillable = [
        'text',
        'sender_id',
        'recipient_id',
        'type',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class);
    }

    public function recipient()
    {
        return $this->belongsTo(User::class);
    }

    public function setRead()
    {
        $this->read = true;
        $this->save();
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'recipient' => $this->recipient->id,
            'text' => $this->text,
            'recieved' => $this->created_at,
        ];
    }


}
