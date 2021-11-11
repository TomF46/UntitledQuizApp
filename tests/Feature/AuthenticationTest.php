<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
    }

    public function testCanRegister()
    {
        $response = $this->postJson(
            '/api/auth/register',
            [
                'username' => 'TestUser2',
                'email' => 'test2@email.com',
                'password' => 'Password2',
                'password_confirmation' => 'Password2',
            ]
        );

        $response->assertStatus(201);
    }

    public function testCantRegisterWithInvalidDetails()
    {
        $response = $this->postJson(
            '/api/auth/register',
            [
                'username' => 'TestUser2',
                'email' => 'test2@email.com',
                'password' => 'Password2',
                'password_confirmation' => 'Password4',
            ]
        );

        $response->assertStatus(422);
    }

    public function testCanLogin()
    {
        $this->postJson(
            '/api/auth/register',
            [
                'username' => 'TestUser1',
                'email' => 'test@email.com',
                'password' => 'Password1',
                'password_confirmation' => 'Password1',
            ]
        );

        $response = $this->postJson(
            '/api/auth/login',
            [
                'email' => 'test@email.com',
                'password' => 'Password1',
                'remember_me' => true
            ]
        );

        $response->assertStatus(200);
    }

    public function testCantLoginWithNonExistantUse()
    {
        $response = $this->postJson(
            '/api/auth/login',
            [
                'email' => 'fakeUser@email.com',
                'password' => 'Password1',
                'remember_me' => true
            ]
        );

        $response->assertStatus(401);
    }

    public function testCantLoginWithWrongPassword()
    {
        $this->postJson(
            '/api/auth/register',
            [
                'username' => 'TestUser1',
                'email' => 'test@email.com',
                'password' => 'Password1',
                'password_confirmation' => 'Password1',
            ]
        );
        
        $response = $this->postJson(
            '/api/auth/login',
            [
                'email' => 'test@email.com',
                'password' => 'wrongPass',
                'remember_me' => true
            ]
        );

        $response->assertStatus(401);
    }
}
