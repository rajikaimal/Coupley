<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Chat;

class ChatController extends Controller
{
    public function addmessage(Request $request) {

        $chat = new Chat;
  	    $chat->message= $request->Message;
        $chat->save();

    }
}
