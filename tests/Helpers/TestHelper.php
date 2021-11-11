<?php

namespace Tests\Helpers;

use App\Models\User;
use App\Models\Role;
use App\Enums\Roles;

class TestHelper
{
    public static function getBearerTokenForUser($user)
    {
        $pat = $user->createToken('Personal Access Token');
        return $pat->accessToken;
    }

    public static function createAdminUser()
    {
        $user = User::factory()->create();
        $role = new Role([
            'role' => Roles::ADMINISTRATOR
        ]);
        $user->role()->save($role);
        return $user;
    }

    public static function createUser()
    {
        $user = User::factory()->create();
        $role = new Role([
            'role' => Roles::USER
        ]);
        $user->role()->save($role);
        return $user;
    }
}