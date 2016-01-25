<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Chat1Migration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('conversation_rep', function (Blueprint $table) {
          $table->increments('cr_id');
          $table->text('reply');
          $table->integer('cuser_id')->unsigned();
          $table->timestamps();
          $table->integer('status');
          $table->integer('con_id');
          $table->foreign('cuser_id')->references('id')->on('users');
          $table->foreign('con_id')->references('chat_id')->on('conversation');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::drop('conversation_rep');
    }
}
