<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Like;

class LikeController extends Controller
{
    /*
        returns likes status for GET request
        @return json
    **/
    public function getlikestatus(Request $request)
    {
        $id = $request->PostId;
        $email = $request->Email;

        $result = Like::where('post_id', $id)
            ->where('email', $email)->get();

        if ($result->isEmpty()) {
            return 'false';
        } else {
            return 'true';
        }
    }

    /*
        handles POST request from client
        add a like to status
        @return json ... status of action
    **/
    public function like(Request $request)
    {
        $like = new Like;
        $like->post_id = $request->PostId;
        $like->email = $request->Email;
        $like->firstname = $request->Fname;
        $like->status = '1';

        if ($like->save()) {
            return response()->json(['status' => 201], 201);
        } else {
            return response()->json(['status' => 404], 404);
        }
    }

    /*
        handles POST request from client
        delete a like status to activityfeed
        @return json ... status of action
    **/
    public function unlike(Request $request)
    {
        $id = $request->PostId;
        $email = $request->Email;
        $posts = \DB::table('likes')->where('post_id', '=', $id)
            ->where('email', '=', $email);

        if ($posts->delete()) {
            return response()->json(['status' => 201], 201);
        } else {
            return response()->json(['status' => 404], 404);
        }
    }
}
