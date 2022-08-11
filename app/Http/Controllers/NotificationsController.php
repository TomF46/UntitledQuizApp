<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    public function index(Request $request)
    {
        $currentUser = $request->User();
        $paginator = $currentUser->notifications()->latest()->paginate(20);
        $paginator->getCollection()->transform(function ($notification){
            return $notification->map();
        });

        return response()->json($paginator);
    }

    public function read(Request $request, Notification $notification)
    {
        $currentUser = $request->User();
        if($notification->recipient_id != $currentUser->id) return response()->json(['error' => 'unauthorized.'], 401);
        $notification->setRead();
        return response()->noContent();
    }
}
