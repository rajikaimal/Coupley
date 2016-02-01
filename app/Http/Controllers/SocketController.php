<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use LRedis;

class SocketController extends Controller
{
    public function __construct()
<<<<<<< HEAD
	{
		$this->middleware('guest');
	}
	public function sendMessage(Request $request){
		$redis = LRedis::connection();
		$redis->publish('message', $request->message);
    
	}
=======
    {
        $this->middleware('guest');
    }

    public function sendMessage(Request $request)
    {
        $redis = LRedis::connection();
        $redis->publish('message', $request->message);
    }
>>>>>>> b0504640741c074b5d955e7021387a3d1600042e
}
