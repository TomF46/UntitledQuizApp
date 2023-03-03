<?php

namespace App\Http\Controllers;

use App\Filters\UserSearch;
use App\Models\User;
use App\Models\Role;
use App\Enums\Roles;
use App\Helpers\CSVHelper;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $users = User::paginate(20);
        $users->getCollection()->transform(function ($user) use ($request) {
            return $user->map($request->User());
        });
        return response()->json($users);
    }

    public function filter(Request $request)
    {
        $paginator = UserSearch::apply($request)->paginate(20);
        $paginator->getCollection()->transform(function ($user) use ($request) {
            return $user->map($request->User());
        });

        return response()->json($paginator);
    }

    public function show(Request $request, User $user)
    {
        return response()->json($user->map($request->User()));
    }

    public function quizzes(User $user)
    {
        $paginator = $user->quizzes()->where('published', true)->doesntHave('ban')->with('tags')->latest()->paginate(10);
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

    public function ban(User $user)
    {
        $user->role()->delete();
        $role = new Role([
            'role' => Roles::BANNED
        ]);
        $user->role()->save($role);
        response()->json(['success' => 'success'], 200);
    }

    public function unban(User $user)
    {
        $user->role()->delete();
        $role = new Role([
            'role' => Roles::USER
        ]);
        $user->role()->save($role);
        response()->json(['success' => 'success'], 200);
    }

    public function downloadUsersCSV()
    {
        $users = User::all();
        $fileName = 'Users.csv';
        $headers = array(
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );
        
        return response()->stream(CSVHelper::mapUsersCSV($users), 200, $headers);
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
