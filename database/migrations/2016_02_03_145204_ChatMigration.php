<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChatMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('threads', function (Blueprint $table) {
      //   $table->increments('trd_id');
      //   $table->string('user1_un')->index();
      //   $table->string('user2_un')->index();
      //   $table->timestamps();
      // });
      //
      // Schema::create('messages', function (Blueprint $table) {
      //   $table->increments('mid');
      //   $table->text('message');
      //   $table->string('sender_un')->index();
      //   $table->string('thread_id')->unsigned();
      //   $table->timestamps();
      // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::drop('threads');
          // Schema::drop('messages');
    }
}
