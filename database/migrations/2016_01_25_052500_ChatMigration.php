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
      Schema::create('conversation', function (Blueprint $table) {
          $table->increments('chat_id');
          $table->integer('user_id_1')->unsigned();
          $table->integer('user_id_2')->unsigned();
          $table->timestamps();
          $table->integer('status');
          $table->foreign('user_id_1')->references('id')->on('users');
          $table->foreign('user_id_2')->references('id')->on('users');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('conversation');
    }
}
