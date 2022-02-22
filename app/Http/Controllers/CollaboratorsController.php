<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class CollaboratorsController extends Controller
{
    public function index(Request $request)
    {
        $currentUser = $request->User();

        $list = $request->user()->friendsList();
        $list->transform(function ($friendship) use ($currentUser){
            return $friendship->mapForCollaboratorList($currentUser);
        });
        return response()->json($list);
    }
}
