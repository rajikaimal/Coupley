<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class RegisterController extends Controller
{
<<<<<<< HEAD
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
	    		return response()->json(["status" => 404], 404);
	    	}
		}
		else {
			return response("exists", 200);
		}
	}
    public function register(Request $request)
    {

=======
    //checks whether user is already registered
    public function check(Request $request)
    {
        $email = $request->email;
        $user = User::where('email', $email)->first();
        if ($user == null) {
            $user = new User;
            $user->firstname = $request->firstname;
            $user->lastname = $request->lastname;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->gender = $request->gender;
            $user->password = \Hash::make($request->password);
            $user->orientation = $request->orientation;

            if ($user->save()) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } else {
            return response('exists', 200);
        }
>>>>>>> b0504640741c074b5d955e7021387a3d1600042e
    }
}
