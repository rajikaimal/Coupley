<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

    /*
        returns visitor profile data for GET request
        @return json
    **/
    public function visitor(Request $request)
    {
        $username = $request->username;
        if ($userdetails = User::where('firstname', $username)->get()) {
            return response()->json(['user' => $userdetails, 'status' => 200], 200);
        } else {
            return response()->json(['user' => $userdetails, 'status' => 505], 505);
        }
    }
}
