<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Like;

class LikeController extends Controller
{
    /**
     * get likes status of a user.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getlikestatus(Request $request)
    {
        $postId = $request->postId;
        $email = $request->email;
        
        try{
            $result = Like::where('post_id', $postId)->where('email', $email)->get();

            if ($result->isEmpty()) {
                return 'false';
            } else {
                return 'true';
            }
        } catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 505], 505);
        }
    }

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
        try{
            $like = new Like;
            $like->post_id = $request->postId;
            $like->email = $request->email;
            $like->firstname = $request->firstName;
            $like->status = '1';

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
        $postId = $request->PostId;
        $email = $request->Email;

        try{
            $posts = \DB::table('likes')->where('post_id', '=', $postId)
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
}
