<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use App\Enums\Roles;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class TagsTest extends TestCase
{
    use RefreshDatabase;

    public $adminUserToken;
    public $standardUserToken;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->adminUserToken = $this->createAdminUserToken();
        $this->standardUserToken = $this->createStandardUserToken();
    }

    public function testAdminCanAddTag()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->adminUserToken
        ])->postJson('/api/tags', [
            "name" => "Sports"
        ]);

        $response->assertStatus(201);
    }

    public function testNonAdminsCantAddTag()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->standardUserToken
        ])->postJson('/api/tags', [
            "name" => "Sports"
        ]);

        $response->assertStatus(401);
    }

    public function testAdminCanDeleteTag()
    {
        $tag = Tag::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->adminUserToken
        ])->delete('/api/tags/' . $tag->id);

        $response->assertStatus(204);
    }

    public function testNonAdminCantDeleteTag()
    {
        $tag = Tag::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->standardUserToken
        ])->delete('/api/tags/' . $tag->id);

        $response->assertStatus(401);
    }

    public function testAdminCanUpdateTag()
    {
        $tag = Tag::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->adminUserToken
        ])->putJson('/api/tags/' . $tag->id, [
            'name' => 'NewName'
        ]);
        $response->assertStatus(200);
    }

    public function testNonAdminCantUpdateTag()
    {
        $tag = Tag::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->standardUserToken
        ])->putJson('/api/tags/' . $tag->id, [
            'name' => 'NewName'
        ]);
        $response->assertStatus(401);
    }

    protected function createAdminUserToken()
    {
        $user = User::factory()->create();
        $role = new Role([
            'role' => Roles::ADMINISTRATOR
        ]);
        $user->role()->save($role);
        $pat = $user->createToken('Personal Access Token');
        return $pat->accessToken;
    }

    protected function createStandardUserToken()
    {
        $user = User::factory()->create();
        $role = new Role([
            'role' => Roles::USER
        ]);
        $user->role()->save($role);
        $pat = $user->createToken('Personal Access Token');
        return $pat->accessToken;
    }
}
