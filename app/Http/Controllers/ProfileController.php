<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Likes;
use App\Blocks;

class ProfileController extends Controller
{
    public function __construct()
    {
        //$this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }

    /*
        returns profile data for GET request
        @return json
    **/
    public function profile(Request $request)
    {
        $email = $request->email;
        $userdetails = User::where('email', $email)->get();

        return response()->json(['user' => $userdetails]);
    }

    public function getlikestatus(Request $request)
    {
        $visitorusername = $request->visitorusername;
        $username = $request->username;

        $result = Likes::where('user1', $visitorusername)
                    ->where('user2', $username)->get();
        //return "false";
        if($result->isEmpty())
        {
            return "false";
        } else {
            return "true";
        }
    }

    /*
        returns visitor profile data for GET request
        @return json
    **/
    public function visitor(Request $request)
    {
        $username = $request->username;
        if ($userdetails = User::where('firstname', $username)->get()) {
            return response()->json(['user' => $userdetails, 'status' => 200], 200);
        } else {
            return response()->json(['user' => $userdetails, 'status' => 505], 505);
        }
    }
    /*
        handles POST request from client
        adds a like to profile
        @return json ... status of action
    **/
    public function like(Request $request)
    {
        $likedUsername = $request->likedUsername;
        $gotLikedUsername = $request->gotLikedUsername;

        $result1 = Likes::where('user1', $likedUsername)
                    ->where('user2', $gotLikedUsername)->get();
        $result2 = Likes::where('user1', $gotLikedUsername)
                    ->where('user2', $likedUsername)->get();

        if($result1->isEmpty() && $result2->isEmpty())
        {
            $user1ID = User::where('username', $likedUsername)->get(['id']);
            $user2ID = User::where('username', $gotLikedUsername)->get(['id']);
            $like = new Likes;
            $like->likeduser = $user1ID[0]->id;
            $like->gotliked = $user2ID[0]->id;
            $like->user1 = $likedUsername;
            $like->user2 = $gotLikedUsername;
            //$like->save();
            if($like->save()) {
                return response()->json(['status' => 200], 200);
            }
            else {
                return response()->json(['status' => 505], 505);
            }
        } else {
            return response()->json(['status' => 505], 505);
        }
    }
    public function unlike(Request $request)
    {
        $unlikedUsername = $request->unlikedUsername;
        $gotunLikedUsername = $request->gotunLikedUsername;

        $result1 = Likes::where('user1', $unlikedUsername)
                    ->where('user2', $gotunLikedUsername)->get();
        $result2 = Likes::where('user1', $gotunLikedUsername)
                    ->where('user2', $unlikedUsername)->get();

        if($result1 !== null && $result2 !== null)
        {
            Likes::where('user1', $unlikedUsername)
                    ->where('user2', $gotunLikedUsername)
                    ->delete();
            return response()->json(['status' => 200], 200);
        } else {
            return response()->json(['status' => 505], 505);
        }
    }
    /* 
        Returns liked back status
    **/
    public function likedbackstatus(Request $request)
    {   
        $username = $request->username;
        $visitorusername = $request->visitorusername;

        $result = Likes::where('user1', $visitorusername)
                    ->where('user2', $username)->get();

        if($result !== null)
        {
            return response()->json(['liked' => true], 200);
        } else {
            return response()->json(['liked' => false], 200);
        }
    }
    /* 
        Returns @json block status
    **/
    public function blockstatus(Request $request)
    {
        $visitorusername = $request->visitorusername;
        $username = $request->username;

        $user1ID = User::where('username', $username)->get(['id']);
        $user2ID = User::where('username', $visitorusername)->get(['id']);

        $result = Blocks::where('user_id', $user1ID[0]->id)
                ->where('blocked_user_id', $user2ID[0]->id)
                ->get();

        if($result->isEmpty())
        {
            return response()->json(['blockstatus' => false], 200); 
        } else {
            return response()->json(['blockstatus' => true], 200); 
        }

    }
    /* 
        Returns @int status after blocking
    **/
    public function block(Request $request)
    {
        $visitorusername = $request->visitorusername;
        $username = $request->username;

        $user1ID = User::where('username', $username)->get(['id']);
        $user2ID = User::where('username', $visitorusername)->get(['id']);

        $result1 = Blocks::where('user_id', $user1ID[0]->id)
                ->where('blocked_user_id', $user2ID[0]->id)
                ->get();
        
        if($result1->isEmpty())
        {
            if($result1->isEmpty())
            {
                $block = new Blocks;
                $block->user_id = $user1ID[0]->id;
                $block->blocked_user_id = $user2ID[0]->id;
                if($block->save())
                {
                    return response()->json(['status' => 200], 200);
                } else {
                    return response()->json(['status' => 505], 505);
                }
            }
        } else {
            return response()->json(['status' => 500], 500);
        }
    }
    /* 
        Returns @int status after blocking
    **/
    public function unblock(Request $request)
    {
        $visitorusername = $request->visitorusername;
        $username = $request->username;


        $user1ID = User::where('username', $username)->get(['id']);
        $user2ID = User::where('username', $visitorusername)->get(['id']);

        if(Blocks::where('user_id', $user1ID[0]->id)
                    ->where('blocked_user_id', $user2ID[0]->id)
                    ->delete()) {
            return response()->json(['status' => 200], 200);
        } else {
            return response()->json(['status' => 505], 505);
        }
    }
    /*
        Returns @json profilepermission
    **/
    public function profilepermission(Request $request)
    {
        $visitorusername = $request->visitorusername;
        $username = $request->username;

        $user1ID = User::where('username', $username)->get(['id']);
        $user2ID = User::where('username', $visitorusername)->get(['id']);
        
        $result = Blocks::where('user_id', $user2ID[0]->id)
                ->where('blocked_user_id', $user1ID[0]->id)
                ->get();

        if(!$result->isEmpty())
        {   
            return response()->json(['permission' => false, 'status' => 200], 200);
        } else if($result->isEmpty()) {
            return response()->json(['permission' => true, 'status' => 200], 200);
        } else {
            return response()->json(['status' => 200], 200);
        }
    }
}
