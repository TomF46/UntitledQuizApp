<?php

namespace App\Providers;

use App\Enums\Roles;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        Passport::tokensCan([
            Roles::ADMINISTRATOR => 'Administer Content',
            Roles::USER => 'Basic Usage',
            Roles::BANNED => 'Forbidden'
        ]);

        Passport::setDefaultScope([
            Roles::USER
        ]);
    }
}
