<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserFollowsController extends Controller
{
    public function index(Request $request, User $user)
    {
        $request->user()->toggleFollow($user);
        return response()->noContent();
    }

    public function following(User $user)
    {
        return response()->json($user->follows);
    }
}
