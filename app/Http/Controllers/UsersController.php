<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;

class UsersController extends Controller
{
    public function friends()
    {
        if ($users = \DB::select('select * from users where status="active" and role="user"')) {

            return response()->json(['users' => $users, 'status' => 200], 200);
        } else {
            return response()->json(['status' => 505], 505);
        }
    }

    public function blocked()
    {

        if ($users = \DB::select('select * from users where status="deactive" and role="user"')) {

            return response()->json(['users' => $users, 'status' => 200], 200);
        } else {
            return response()->json(['status' => 505], 505);
        }
    }

    public function block(Request $request)
    {
        $id = $request->id;
        if ($users = \DB::table('users')->where('id',$id)->update(['status' => 'deactive'])) {
            return response()->json(['status' => 201], 201);
        } else {
            return response()->json(['status' => 404], 404);
        }
    }
    public function Unblock(Request $request)
    {
        $id = $request->id;
        if ($users = \DB::table('users')->where('id',$id)->update(['status' => 'active'])) {
            return response()->json(['status' => 201], 201);
        } else {
            return response()->json(['status' => 404], 404);
        }
    }
}



