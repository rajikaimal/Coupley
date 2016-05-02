<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StatusFeed extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activityposts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email');
            $table->integer('userId');
            $table->string('firstname');
            $table->string('username');
            $table->string('type')->default('posted');
            $table->integer('post_id')->default('0');
            $table->string('post_text');
            $table->string('attachment')->default('None');
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
        Schema::drop('activityposts');
    }
}
