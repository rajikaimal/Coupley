<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Like;
use App\activitylike;

class LikeController extends Controller
{
    /**
     * add a like to Activity, handles POST request.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function like(Request $request)
    {
        try {
            $like = new activitylike;
            $like->post_id = $request->postId;
            $like->UserId = $request->userId;
            $like->email = $request->email;
            $like->firstname = $request->firstName;
            if ($like->save()) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    /**
     * delete a like(unlike) to Activity, handles POST request.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function unlike(Request $request)
    {
        $postId = $request->postId;
        $email = $request->email;
        try {
            $posts = \DB::table('activitylikes')->where('post_id', '=', $postId)
                        ->where('email', '=', $email);
            if ($posts->delete()) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    public function getLikeCount(Request $request)
    {
        $postId = $request->postId;
        try {
            $counts = \DB::select('select post_id,count(UserId) as count
                                 from activitylikes 
                                 where post_id='.$postId);

            return response()->json(['posts' => $counts, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    public function getLikedUsers(Request $request)
    {
        $postId = $request->postId;
        try {
            $posts = \DB::select('select firstname
                                 from activitylikes 
                                 where post_id='.$postId.'
                                 order by created_at desc');

            return response()->json(['posts' => $posts, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }
}
