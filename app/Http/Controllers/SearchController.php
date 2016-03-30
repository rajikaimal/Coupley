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
            $data = User::where('username', $username)->get(['id', 'orientation', 'gender']);
            $userID = $data[0]->id;
            $orientation = $data[0]->orientation;
            $gender = $data[0]->gender;
            if ($orientation == 'straight' && $gender == 'female') {
                $gender = 'male';
                if (//$users = \DB::table('users')
                //     ->where('username', '<>', $username)
                //     ->where('firstname', 'like', $firstname.'%')
                //     ->where('gender', $gender)
                //     ->where('orientation', $orientation)
                //     //->orWhere('lastname', 'like', $firstname.'%')
                //     ->whereNotIn('id', function($query) {
                //         $query->select('blocked_user_id')
                //              ->from('blocked')
                //              ->where('user_id', $userID);
                //     })
                //     ->get()
                    $users = \DB::select(\DB::raw("
                        SELECT *
                            FROM  `users`
                            Where lastname LIKE '".$firstname."'

                            and id NOT
                            IN (
                                SELECT blocked_user_id
                                FROM  `blocked` 
                                WHERE user_id =".$userID.'
                            )
                        '))

                    ) {
                    return response()->json(['users' => $users, 'status' => 201], 201);
                } else {
                    return response()->json(['status' => 200], 200);
                }
            } elseif ($orientation == 'straight' && $gender == 'male') {
                $gender = 'female';
                if ($users = \DB::table('users')
                    ->where('firstname', 'like', $firstname.'%')
                    ->where('orientation', $orientation)
                    ->where('gender', $gender)
                    ->where('username', '<>', $username)
                    ->whereNotIn('id', function ($q) {
                           $q->select('blocked_user_id')
                             ->from('blocked')
                             ->where('user_id', $userID);
                    })
//                    ->orWhere('lastname', 'like', $firstname.'%')
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
            return response()->json(['status' => 201], 201);
        }
    }
}
