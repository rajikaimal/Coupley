<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\About;

class RegisterController extends Controller
{
    //checks whether user is already registered
    public function check(Request $request)
    {
        $email = $request->email;
        try {
            $user = User::where('email', $email)->first();
            if ($user == null) {
                $user = new User;
                $user->firstname = $request->firstname;
                $user->lastname = $request->lastname;
                $user->username = $request->username;
                $user->email = $request->email;
                $user->gender = $request->gender;
                $user->country = $request->country;
                $user->password = \Hash::make($request->password);
                $user->orientation = $request->orientation;
                $user->role = 'user';
                if($request->gender == "male") {
                    $user->profilepic = "defaultmale";    
                } else {
                    $user->profilepic = "defaultfemale";
                }
                

                if ($user->save()) {
                    $about = new About;
                    $about->user_id = User::where('email', $email)->get(['id'])[0]->id;
                    if ($about->save()) {
                        return response()->json(['status' => 201], 201);
                    }
                } else {
                    return response()->json(['status' => 404], 404);
                }
            } else {
                return response()->json(['status' => 200, 'exists' => true], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    /*
        Returns @json
        Checks username exists or not
    **/
    public function checkusername(Request $request)
    {
        $username = $request->username;
        try {
            $user = User::where('username', $username)->first();
            if ($user != null) {
                return response()->json(['status' => 201, 'exists' => true], 201);
            } else {
                return response()->json(['status' => 201, 'exists' => false], 201);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    /*
        Returns @json
        Checks email exists or not
    **/
    public function checkemail(Request $request)
    {
        $email = $request->email;
        try {
            $user = User::where('email', $email)->first();
            if ($user != null) {
                return response()->json(['status' => 201, 'exists' => true], 201);
            } else {
                return response()->json(['status' => 201, 'exists' => false], 201);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }
}
