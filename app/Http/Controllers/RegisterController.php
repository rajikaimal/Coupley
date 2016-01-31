<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;

class RegisterController extends Controller
{
	//checks whether user is already registered
	public function check(Request $request)
	{
		$email = $request->email;
		$user = User::where('email', $email)->first();
		if($user == null) {
			$user = new User;
	    	$user->firstname = $request->firstname;
	    	$user->lastname = $request->lastname;
	    	$user->username = $request->username;
	    	$user->email = $request->email;
	    	$user->gender = $request->gender;
	    	$user->password = \Hash::make($request->password);
	    	$user->orientation = $request->orientation;

	    	if($user->save()) {
	    		return response()->json(["status" => 201], 201);
	    	}
	    	else {
	    		return response()->json(["status" => 505], 505);
	    	}
		}
		else {
			return response()->json(["status", 200], 200);
		}
	}
    public function register(Request $request)
    {
    	
    }
}
