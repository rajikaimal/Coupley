<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AdminSearchController extends Controller
{
    /**
     * search uses to retrieve registered user data
     * @param object    $request
     *
     * @return json
     */
    public function search(Request $request)
    {
        $key=$request->key;
        try {
            if ($users = \DB::select('select * from users WHERE role="user" and firstname like "'.$key.'%"
            union select * from users WHERE role="user" and lastname like "'.$key.'%"')) {
                return response()->json(['users' => $users, 'status' => 201], 201);
            }
        }catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

}
