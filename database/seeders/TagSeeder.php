<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            ['id' => 1, 'name' => 'General'],
            ['id' => 2, 'name' => 'Sports'],
            ['id' => 3, 'name' => 'Music'],
            ['id' => 4, 'name' => 'Science'],
            ['id' => 5, 'name' => 'History'],
            ['id' => 6, 'name' => 'Geography'],
            ['id' => 7, 'name' => 'Pop culture'],
            ['id' => 8, 'name' => 'Maths']
        ];

        foreach ($items as $item) {
            Tag::updateOrCreate(['id' => $item['id']], $item);
        }
    }
}
