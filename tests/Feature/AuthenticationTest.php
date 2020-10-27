<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testCanRegister()
    {
        $response = $this->postJson(
            '/api/auth/register',
            [
                'username' => 'TestUser1',
                'email' => 'test@email.com',
                'password' => 'Password1',
                'password_confirmation' => 'Password1',
            ]
        );

        $response->assertStatus(201);
    }
}
