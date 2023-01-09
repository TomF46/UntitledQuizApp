<?php

use App\Enums\EventStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->text('description');
            $table->boolean('universal');
            $table->tinyInteger('status')->unsigned()->default(EventStatus::NotPublished);
            $table->integer('score_group_1');
            $table->integer('score_group_2');
            $table->integer('score_group_3');
            $table->integer('score_group_4');
            $table->integer('score_max');
            $table->timestamps();
        });

        Schema::create('events_tags', function (Blueprint $table) {
            $table->primary(['event_id', 'tag_id']);
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->foreignId('tag_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('events_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->integer('score');
            $table->integer('submissions')->default(0);;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events_tags');
        Schema::dropIfExists('events_scores');
        Schema::dropIfExists('events');
    }
}
