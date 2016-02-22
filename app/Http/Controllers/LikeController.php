<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Like;

class LikeController extends Controller
{
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
