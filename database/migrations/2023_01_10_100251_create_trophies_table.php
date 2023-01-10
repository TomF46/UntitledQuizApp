<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrophiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trophies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id');
            $table->string('name')->unique();
            $table->text('description');
            $table->tinyInteger('tier')->unsigned();
            $table->timestamps();
        });

        Schema::create('user_trophies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('trophy_id')->references('id')->on('trophies')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['user_id', 'trophy_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_trophies');
        Schema::dropIfExists('trophies');
    }
}
