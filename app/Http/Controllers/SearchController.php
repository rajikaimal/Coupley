<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use App\User;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $firstname = $request->key;
        $username = $request->username;
        //return $username;
        try {
            $data = User::where('username', $username)->get(['orientation', 'gender']);
            $orientation = $data[0]->orientation;
            $gender = $data[0]->gender;
            if ($orientation == 'straight' && $gender == 'female') {
                $gender = 'male';
                if ($users = \DB::table('users')
                    ->where('firstname', 'like', $firstname.'%')
                    ->where('orientation', $orientation)
                    ->where('gender', $gender)
                    ->where('username', '<>', $username)
                    ->get()) {
                    return response()->json(['users' => $users, 'status' => 201], 201);
                } else {
                    return response()->json(['status' => 200], 200);
                }
            } elseif ($orientation == 'straight' && $gender == 'male') {
                $gender = 'male';
                if ($users = \DB::table('users')
                    ->where('firstname', 'like', $firstname.'%')
                    ->where('orientation', $orientation)
                    ->where('gender', $gender)
                    ->where('username', '<>', $username)
                    ->get()) {
                    return response()->json(['users' => $users, 'status' => 201], 201);
                } else {
                    return response()->json(['status' => 200], 200);
                }
            } elseif ($orientation == 'lesbian' && $gender == 'female') {
                if ($users = \DB::table('users')
                    ->where('firstname', 'like', $firstname.'%')
                    ->where('orientation', $orientation)
                    ->where('username', '<>', $username)
                    ->where('gender', $gender)
                    ->get()) {
                    return response()->json(['users' => $users, 'status' => 201], 201);
                } else {
                    return response()->json(['status' => 200], 200);
                }
            } elseif ($orientation == 'gay' && $gender == 'male') {
                if ($users = \DB::table('users')
                    ->where('firstname', 'like', $firstname.'%')
                    ->where('orientation', $orientation)
                    ->where('username', '<>', $username)
                    ->where('gender', $gender)
                    ->get()) {
                    return response()->json(['users' => $users, 'status' => 201], 201);
                } else {
                    return response()->json(['status' => 200], 200);
                }
            } elseif ($orientation == 'bisexual') {
                if ($users = \DB::table('users')
                    ->where('firstname', 'like', $firstname.'%')
                    ->where('username', '<>', $username)
                    ->get()) {
                    return response()->json(['users' => $users, 'status' => 201], 201);
                } else {
                    return response()->json(['status' => 200], 200);
                }
            }
        } catch (QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }
}
