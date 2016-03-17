<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;
use App\Likes;

class ActivityFeedController extends Controller
{
    /**
     * add an activity to Activity feed, handles POST request.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function addStatus(Request $request)
    {
        try{
            $post = new Post;
            $post->email = $request->email;
            $post->firstname = $request->firstName;
            $post->post_text = $request->status;
            $post->attachment = 'txt';

            if ($posts = $post->save()) {
                return response()->json(['posts' => $posts, 'status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    /**
     * get activity feed of a user.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getStatus(Request $request)
    {
        try {
             $posts= \DB::select('select id,firstname,post_text,created_at from posts order by created_at desc');

            return response()->json(['posts' => $posts, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    /**
     * delete activity of a user.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function deleteStatus(Request $request)
    {
        $postId = $request->postId;

        try{
            $posts = \DB::table('posts')->where('id', '=', $postId);

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
     * edit activity of a user.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function editStatus(Request $request)
    {
        $postId = $request->postId;
        $status = $request->status;

        try{
            $posts = \DB::table('posts')->where('id', $postId)->update(['post_text' => $status]);

            if ($posts) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }
}
