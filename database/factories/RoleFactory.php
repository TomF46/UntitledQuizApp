<?php

namespace Database\Factories;

use App\Models\Role;
use App\Enums\Roles;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Role::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'role' => $this->faker->randomElement([Roles::ADMINISTRATOR, Roles::USER])
        ];
    }
}
