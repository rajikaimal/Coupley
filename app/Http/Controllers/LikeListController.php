<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class LikeListController extends Controller
{
    public function getLikedList(Request $request)
    {
        $username = $request->username;
        $pagination = $request->pagination;
        try {
            $userID = User::where('username', $username)
                ->get()[0]->id;

            $likedList = \DB::select(\DB::raw("
               SELECT id,firstname,lastname,username,gender,profilepic from(
                            SELECT id,firstname, lastname,username,orientation,gender,profilepic,role FROM `users` WHERE
                                                    status = 'active'         
                                                    ) as t where  
                                                    role='user' and id IN (
                                                        Select gotliked
                                                        from `liked`
                                                        where likeduser=".$userID.'
                                                    ) limit '.$pagination.'
            '));

            return response()->json(['status' => 200, 'list' => $likedList], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    public function getLikedListMe(Request $request)
    {
        $username = $request->username;
        $pagination = $request->pagination;
        try {
            $userID = User::where('username', $username)
                ->get()[0]->id;

            $likedList = \DB::select(\DB::raw("
               SELECT id,firstname,lastname,username,gender,profilepic from(
                            SELECT id,firstname, lastname,username,orientation,gender,profilepic,role FROM `users` WHERE
                                                    status = 'active'         
                                                    ) as t where  
                                                    role='user' and id IN (
                                                        Select likeduser
                                                        from `liked`
                                                        where gotliked=".$userID.'
                                                    ) limit '.$pagination.'
            '));

            return response()->json(['status' => 200, 'list' => $likedList], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    public function getLikedBackList(Request $request)
    {
        $username = $request->username;
        $pagination = $request->pagination;
        try {
            $userID = User::where('username', $username)
                ->get()[0]->id;

            $likedList = \DB::select(\DB::raw("
               SELECT id,firstname,lastname,username,gender,profilepic from(
                            SELECT id,firstname, lastname,username,orientation,gender,profilepic,role FROM `users` WHERE
                                                    status = 'active'         
                                                    ) as t where  
                                                    role='user' and id IN (
                                                        Select gotliked
                                                        from `liked`
                                                        where likeduser=".$userID.'
                                                    ) and id  IN (
                                                        Select likeduser
                                                        from `liked`
                                                        where gotliked='.$userID.'
                                                    ) limit '.$pagination.'
            '));

            return response()->json(['status' => 200, 'list' => $likedList], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }
}
