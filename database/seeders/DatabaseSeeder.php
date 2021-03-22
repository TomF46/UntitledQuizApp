<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Database\Eloquent\Factories\Sequence;



class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()
        ->count(5)
        ->has(
            Quiz::factory()
            ->count(1)
            ->has(
                Question::factory()
                ->count(4)
                ->state(new Sequence(
                    ['ordinal' => 0],
                    ['ordinal' => 1],
                    ['ordinal' => 2],
                    ['ordinal' => 3]
                ))
                ->has(
                    Answer::factory()
                    ->count(4)
                    ->state(new Sequence(
                        ['is_correct' => false],
                        ['is_correct' => true],
                        ['is_correct' => false],
                        ['is_correct' => false]
                    ))
                )
            )
        )
        ->create();
    }
}
