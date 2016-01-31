<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AdminRegisterController extends Controller
{
    //checks whether user is already registered
    public function checks(Request $request)
    {
        $email = $request->email;
        $admin = User::where('email', $email)->first();
        if ($admin == null) {
            $admin = new User;
            $admin->firstname = $request->firstname;
            $admin->lastname = $request->lastname;
            $admin->job = $request->job;
            $admin->email = $request->email;
            $admin->role = 'admin';
            $admin->password = \Hash::make($request->password);
            if ($admin->save()) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } else {
            return response('exists', 200);
        }
    }

    public function register(Request $request)
    {
    }
}
