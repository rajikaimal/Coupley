<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class NotificationMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id1')->unsigned()->unique();
            $table->foreign('user_id1')->references('id')->on('users');
            $table->integer('user_id2')->unsigned()->unique();
            $table->foreign('user_id2')->references('id')->on('users');
            $table->string('content')->unique();
            $table->boolean('readnotification');
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
