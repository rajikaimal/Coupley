<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('username');
            $table->string('job');
            $table->string('orientation');
            $table->string('email')->unique();
            $table->string('gender');
            $table->date('birthday');
            $table->string('country');
            $table->string('role');
            $table->string('status')->default('active');
            $table->string('chatstatus')->default('online');
            $table->string('password', 60);
            $table->string('profilepic')->default('user.png');
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
        Schema::drop('users');
    }
}
