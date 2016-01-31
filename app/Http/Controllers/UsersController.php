<?php

namespace App\Http\Controllers;



class UsersController extends Controller
{
    public function friends()
    {
        if ($users = \DB::select('select * from users where status="Active"')) {
            return response()->json(['users' => $users, 'status' => 200], 200);
        } else {
            return response()->json(['status' => 505], 505);
        }
    }

    public function blocked()
    {
        if ($users = \DB::select('select * from users where status="Deactive"')) {
            return response()->json(['users' => $users, 'status' => 200], 200);
        } else {
            return response()->json(['status' => 505], 505);
        }
    }
}
