<?php

namespace App\Http\Controllers;

use LRedis;
use Illuminate\Http\Request;

class SocketController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function sendMessage(Request $request)
    {
        $redis = LRedis::connection();
        $redis->publish('message', $request->message);
    }
}
