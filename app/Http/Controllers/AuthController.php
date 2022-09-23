<?php

namespace App\Http\Controllers;

use App\Enums\Roles;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $attributes = $this->validateRegistration($request);
        $user = new User([
            'username' => $attributes['username'],
            'email' => $attributes['email'],
            'password' => bcrypt($attributes['password'])
        ]);
        $user->save();
        $role = new Role([
            'role' => Roles::USER
        ]);
        $user->role()->save($role);
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    public function login(Request $request)
    {
        $attributes = $this->validateLogin($request);
        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);

        $user = $request->user();
        $userRole = $user->role()->first();

        if ($userRole) {
            $this->scope = $userRole->role;
        }

        $tokenResult = $user->createToken('Personal Access Token', [$this->scope]);
        $token = $tokenResult->token;

        if ($request->remember_me) $token->expires_at = Carbon::now()->addWeeks(1);

        $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'user_id' => $user->id,
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function validateRegistration(Request $request)
    {
        return $request->validate([
            'username' => 'required|string|unique:users|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed|min:6|max:255'
        ]);
    }

    public function validateLogin(Request $request)
    {
        return $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
    }
}
