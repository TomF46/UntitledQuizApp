<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function show(Request $request, User $user)
    {
        return response()->json($user->map($request->User()));
    }

    public function quizzes(User $user)
    {
        $paginator = $user->quizzes()->with('tags')->latest()->paginate(10);
        $paginator->getCollection()->transform(function ($quiz) {
            return $quiz->mapOverview();
        });

        return response()->json($paginator);
    }

    public function edit(Request $request, User $user)
    {
        if ($user->id != $request->user()->id) return response()->json(['error' => 'Unauthorized.'], 401);

        return response()->json($user->mapForEditing());
    }

    public function update(Request $request, User $user)
    {
        if ($user->id != $request->user()->id) return response()->json(['error' => 'Unauthorized.'], 401);



        $attributes = $this->validateUser($request, $user);
        $user->profile_image_url = $attributes['profile_image'];
        $user->update($attributes);
        $user = $user->fresh();
        return response()->json($user);
    }

    public function isAdmin(Request $request)
    {
        return response()->json(
            [
                'isAdmin' => $request->user()->isAdmin()
            ]
        );
    }

    protected function validateUser(Request $request, User $user)
    {
        return $request->validate([
            'username' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($user)],
            'bio' => 'string|nullable',
            'profile_image' => 'string|nullable',

        ]);
    }
}
