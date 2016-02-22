<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Thread;

class ThreadController extends Controller
{
  public function sendMessage(Request $request){
    $chat=new Thread;
    $chat->user1=$request;
    $chat->user2=$request;
    $chat->message=$request;
    $chat->save();
  }

  public function getMessage(){

  }

  public function delMessage(){

  }
}
