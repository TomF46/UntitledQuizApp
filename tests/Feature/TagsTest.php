<?php

namespace Tests\Feature;

use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use Tests\Helpers\TestHelper;


class TagsTest extends TestCase
{
    use RefreshDatabase;

    public $admin;
    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->admin = TestHelper::createAdminUser();
        $this->user = TestHelper::createUser();
    }

    public function testAdminCanAddTag()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->admin)
        ])->postJson('/api/tags', [
            "name" => "Sports"
        ]);

        $response->assertStatus(201);
    }

    public function testNonAdminsCantAddTag()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
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
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->admin)
        ])->delete('/api/tags/' . $tag->id);

        $response->assertStatus(204);
    }

    public function testNonAdminCantDeleteTag()
    {
        $tag = Tag::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' .TestHelper::getBearerTokenForUser($this->user)
        ])->delete('/api/tags/' . $tag->id);

        $response->assertStatus(401);
    }

    public function testAdminCanUpdateTag()
    {
        $tag = Tag::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->admin)
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
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->putJson('/api/tags/' . $tag->id, [
            'name' => 'NewName'
        ]);
        $response->assertStatus(401);
    }
}
