<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StatusFeedComments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activitycomments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('post_id');
            $table->integer('UserId');
            $table->string('email');
            $table->string('firstname');
            $table->string('comment_txt');
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
        Schema::drop('activitycomments');
    }
}
