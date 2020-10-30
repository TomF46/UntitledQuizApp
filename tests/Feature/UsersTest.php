<?php

namespace Tests\Feature;

use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
}
