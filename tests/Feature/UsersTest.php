<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use Tests\Helpers\TestHelper;


class UsersTest extends TestCase
{
    use RefreshDatabase;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = TestHelper::createAdminUser();
    }

    public function testCanGetUsers()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
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
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
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
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
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
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/users/' . $this->user->id);
        $response->assertStatus(200);
        $response->assertJson([
            'username' => 'Updated user'
        ]);
    }

    public function testCanFindIfUserIsAdmin()
    {
        $user = TestHelper::createAdminUser();
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($user)
        ])->get('/api/me/isAdmin');
        $response->assertJson([
            'isAdmin' => true
        ]);
    }

    public function testCanFindIfUserIsNotAdmin()
    {
        $user = TestHelper::createUser();
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($user)
        ])->get('/api/me/isAdmin');
        $response->assertJson([
            'isAdmin' => false
        ]);
    }
}
