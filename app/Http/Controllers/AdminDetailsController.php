<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminDetailsController extends Controller
{
    /**
     * uses to retrive details of admins
     *
     *
     * @return json
     */
    public function admins()
    {
        try {
            if ($admins = \DB::select('select CONCAT(firstname," ",lastname) AS name, job, profilepic, status from users where role="admin"')) {
                return response()->json(['admins' => $admins, 'status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }

}