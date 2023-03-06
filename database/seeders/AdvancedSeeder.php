<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Enums\Roles;

class AdvancedSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $file = database_path('dumps/advancedSetupDB.dump');
        $sql = \File::get($file);
        \DB::connection()->getPdo()->exec($sql);

        // Change all prepopulated users to have the TESTING_PASSWORD set in the .env file.
        $this->changeDumpUserPasswordsToConfigPasswords();

        // Create an admin user with the password set as ADMIN_PASSWORD in the .env file.
        $user = User::factory()->create([
            'username' => 'Admin',
            'email' => env('ADMIN_EMAIL'),
            'password' => bcrypt(env('ADMIN_PASSWORD')),
        ]);
        $role = new Role([
            'role' => Roles::ADMINISTRATOR
        ]);
        $user->role()->save($role);
    }

    protected function changeDumpUserPasswordsToConfigPasswords()
    {
        foreach(User::all() as $user){
            $user->password = bcrypt(env('TESTING_PASSWORD'));
            $user->save();
        }
    }
}
