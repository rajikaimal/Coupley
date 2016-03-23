<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ThreadMessage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
        $table->increments('mid');
        $table->text('message');
        $table->string('sender_un');
        $table->integer('thread_id')->unsigned();
        $table->foreign('sender_un')->references('username')->on('users')->onDelete('cascade');
        $table->foreign('thread_id')->references('trd_id')->on('threads')->onDelete('cascade');
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
        //
    }
}
