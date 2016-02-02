<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class LikedMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('liked', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('likeduser')->unsigned();
            $table->integer('gotliked')->unsigned();
            $table->foreign('likeduser')->references('id')->on('users');
            $table->foreign('gotliked')->references('id')->on('users');
            $table->string('user1');
            $table->string('user2');
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
        Schema::drop('liked');
    }
}
