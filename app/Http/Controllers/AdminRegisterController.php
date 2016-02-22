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
            return response()->json(['status' => 200], 200);
        }
    }

    public function update(Request $request)
    {
        $email = $request->email;
        $id = $request->id;
        $job = $request->job;
        $firstname = $request->firstname;
        $lastname = $request->lastname;
        //checks whether new email is already in the database //old and new email can be similler for the selected admin only
        $admin = \DB::select('SELECT email FROM users WHERE email = "'.$email.'" not in (select email from users where id!='.$id.')');
        if ($admin == null) {
            //update
            \DB::table('users')
                ->where('id', $id)
                ->update(['firstname' => $firstname, 'lastname' => $lastname, 'job' => $job, 'email' => $email]);

            return response()->json(['you can use this email' => $admin, 'status' => 200], 200);
        } else {
            return response()->json(['email' => 'email already exists', 'status' => 201], 201);
        }
    }
}
