<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Thread;

class ThreadController extends Controller
{
    public function sendMessage(Request $request)
    {
        $chat = new Thread;
        $chat->user1 = $request;
        $chat->user2 = $request;
        $chat->message = $request;
        $chat->save();
    }

    public function getMessage()
    {
    }

    public function delMessage()
    {
    }
}
