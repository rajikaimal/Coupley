<?php
/*
|--------------------------------------------------------------------------
| SearchController File
|--------------------------------------------------------------------------
|
| Here is where all API requests related to search are redirected
| by routes files in order to handle the requests and @return json responses
| @author Rajika Imal
|
*/

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class SearchController extends Controller
{
    /**
     * checks key value from request object and returns results according to.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function search(Request $request)
    {
        $key = $request->key;
        $username = $request->username;
        //return $username;
        try {
            $data = User::where('username', $username)->get(['id', 'orientation', 'gender']);
            $userID = $data[0]->id;
            $orientation = $data[0]->orientation;
            $gender = $data[0]->gender;
            if ($orientation == 'straight' && $gender == 'female') {
                if ($users = \DB::select(\DB::raw("
                        SELECT id,firstname,lastname,username,gender,profilepic from(
                            SELECT id,firstname, lastname,username,orientation,gender,profilepic,role FROM `users` WHERE
                                                    status = 'active' and
                                                    firstname like '".$key."%' or 
                                                    lastname like '".$key."%') as t where orientation='straight' and gender='male' 
                                                    and role='user' and id NOT IN (
                                                        Select blocked_user_id
                                                        from `blocked`
                                                        where user_id=".$userID.'
                                                    ) 
                    '))) {
                    return response()->json(['users' => $users, 'status' => 201], 201);
                } elseif ($users == null) {
                    return response()->json(['users' => null, 'status' => 200], 200);
                }
            } elseif ($orientation == 'straight' && $gender == 'male') {
                $gender = 'female';
                if ($users = \DB::select(\DB::raw("
                    SELECT id,firstname,lastname,username,gender,profilepic from(
                        SELECT id,firstname, lastname,username,orientation,gender,profilepic,role FROM `users` WHERE        
                                                status = 'active' and
                                                firstname like '".$key."%' or 
                                                lastname like '".$key."%') as t where orientation='straight' and gender='female' 
                                                and role='user' and id NOT IN (
                                                    Select blocked_user_id
                                                    from `blocked`
                                                    where user_id=".$userID.'
                                ) 
                    '))) {
                    return response()->json(['users' => $users, 'status' => 201], 201);
                } else {
                    return response()->json(['users' => null, 'status' => 200], 200);
                }
            } elseif ($orientation == 'lesbian' && $gender == 'female') {
                if ($users = \DB::select(\DB::raw("
                    SELECT id,firstname,lastname,username,gender,profilepic from(
                        SELECT id,firstname, lastname,username,orientation,gender,profilepic,role FROM `users` WHERE        
                                                status = 'active' and
                                                firstname like '".$key."%' or 
                                                lastname like '".$key."%') as t where orientation='lesbian' and gender='female' 
                                                and role='user' and id NOT IN (
                                                    Select blocked_user_id
                                                    from `blocked`
                                                    where user_id=".$userID.'
                                                ) 
                    '))) {
                    return response()->json(['users' => $users, 'status' => 201], 201);
                } else {
                    return response()->json(['users' => null, 'status' => 200], 200);
                }
            } elseif ($orientation == 'gay' && $gender == 'male') {
                if ($users = \DB::select(\DB::raw("
                    SELECT id,firstname,lastname,gender,profilepic from(
                        SELECT id,firstname, lastname,username,orientation,gender,profilepic,role FROM `users` WHERE        
                                                status = 'active' and
                                                firstname like '".$key."%' or 
                                                lastname like '".$key."%') as t where orientation='gay' and gender='male' 
                                                and role='user' and id NOT IN (
                                                    Select blocked_user_id
                                                    from `blocked`
                                                    where user_id=".$userID.'
                                                ) 
                    '))) {
                    return response()->json(['users' => $users, 'status' => 201], 201);
                } else {
                    return response()->json(['users' => null, 'status' => 200], 200);
                }
            } elseif ($orientation == 'bisexual') {
                if ($users = \DB::select(\DB::raw("
                    SELECT id,firstname,username,lastname,gender,profilepic from(
                        SELECT id,firstname, lastname,username,orientation,gender,profilepic,role FROM `users` WHERE        
                                                status = 'active' and
                                                firstname like '".$key."%' or 
                                                lastname like '".$key."%') as t where orientation='bisexual' and (gender='male' or gender='female')  
                                                and role='user' and id NOT IN (
                                                    Select blocked_user_id
                                                    from `blocked`
                                                    where user_id=".$userID.'
                                                ) 
                    '))) {
                    return response()->json(['users' => $users, 'status' => 201], 201);
                } else {
                    return response()->json(['users' => null, 'status' => 200], 200);
                }
            }
        } catch (QueryException $e) {
            return response()->json(['status' => 200, 'error' => true], 200);
        }
    }
}
