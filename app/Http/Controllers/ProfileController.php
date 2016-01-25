<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;

class ProfileController extends Controller
{
	public function __construct()
    {
        //$this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }
    /*
		returns profile data for GET request
		@return json
    **/
    public function profile(Request $request)
    {
    	$email = $request->email;
    	$userdetails = User::where('email', $email)->get();
    	return response()->json(['user' => $userdetails]);
    }
}
