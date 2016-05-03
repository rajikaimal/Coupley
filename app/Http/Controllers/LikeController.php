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
            $like->username = $request->userName;
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

    /**
     * get liked users count.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getCount(Request $request)
    {
        $postId = $request->postId;
        try {
            $counts = \DB::select('SELECT p.post_id,p.shareCount,l.likedCount
                                  FROM(SELECT post_id,COUNT(userId) as shareCount
                                       FROM activityposts
                                       WHERE post_id='.$postId.') p
                                  LEFT OUTER JOIN (SELECT post_id, count(userId) as likedCount
                                                   FROM activitylikes
                                                   WHERE post_id='.$postId.') l
                                  ON p.post_id=l.post_id');

            return response()->json(['posts' => $counts, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }


    /**
     * get liked users.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getLikedUsers(Request $request)
    {
        $postId = $request->postId;
        try {
            $posts = \DB::select('select firstname,post_id,username
                                 from activitylikes 
                                 where post_id='.$postId.'
                                 order by created_at desc');

            return response()->json(['posts' => $posts, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }
}
