<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use LRedis;

class SocketController extends Controller
{
    public function __construct()
	{
		$this->middleware('guest');
	}
	public function sendMessage(Request $request){
		$redis = LRedis::connection();
		$redis->publish('message', $request->message);
    
	}
}
