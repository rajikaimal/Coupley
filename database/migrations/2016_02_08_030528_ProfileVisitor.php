<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProfileVisitor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ProfileVisitor', function (Blueprint $table) {
      $table->increments('pvid');
      $table->string('prousername');
      $table->string('visusername');
      $table->foreign('prousername')->references('username')->on('users')->onDelete('cascade');
      $table->foreign('visusername')->references('username')->on('users')->onDelete('cascade');
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
