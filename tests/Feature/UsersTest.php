<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use App\Enums\Roles;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class UsersTest extends TestCase
{
    use RefreshDatabase;

    public $user;
    public $token;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = User::factory()->create();
        $role = new Role([
            'role' => Roles::ADMINISTRATOR
        ]);
        $this->user->role()->save($role);
        $pat = $this->user->createToken('Personal Access Token');
        $this->token = $pat->accessToken;
    }

    public function testCanGetUsers()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/users');
        $response->assertStatus(200);
    }

    public function testCantGetUsersWhenNotAuthorized()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json'
        ])->get('/api/users');
        $response->assertStatus(401);
    }

    public function testCanGetSpecificUser()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/users/' . $this->user->id);
        $response->assertStatus(200);
        $response->assertJson([
            'id' => $this->user->id,
            'username' => $this->user->username
        ]);
    }

    public function testCanUpdateUser()
    {
        $editResponse = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->putJson(
            '/api/users/' . $this->user->id,
            [
                'username' => 'Updated user',
                'bio' => null,
                'profile_image' => null
            ]
        );
        $editResponse->assertStatus(200);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/users/' . $this->user->id);
        $response->assertStatus(200);
        $response->assertJson([
            'username' => 'Updated user'
        ]);
    }

    public function testCanFindIfUserIsAdmin()
    {
        $user = User::factory()->create();
        $role = new Role([
            'role' => Roles::ADMINISTRATOR
        ]);
        $user->role()->save($role);
        $pat = $user->createToken('Personal Access Token');
        $bearerToken = $pat->accessToken;
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $bearerToken
        ])->get('/api/me/isAdmin');
        $response->assertJson([
            'isAdmin' => true
        ]);
    }

    public function testCanFindIfUserIsNotAdmin()
    {
        $user = User::factory()->create();
        $role = new Role([
            'role' => Roles::USER
        ]);
        $user->role()->save($role);
        $pat = $user->createToken('Personal Access Token');
        $bearerToken = $pat->accessToken;
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $bearerToken
        ])->get('/api/me/isAdmin');
        $response->assertJson([
            'isAdmin' => false
        ]);
    }
}
