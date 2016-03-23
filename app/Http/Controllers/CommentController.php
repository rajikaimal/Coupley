<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\activitycomment;

class CommentController extends Controller
{
    /**
     * add a comment to Activity feed, handles POST request.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function addcomment(Request $request)
    {
        try{
            $comment = new activitycomment;
            $comment->post_id = $request->postId;
            $comment->UserId = $request->userId;
            $comment->email = $request->email;
            $comment->firstname = $request->firstName;
            $comment->comment_txt = $request->comment;

            if ($comment->save()) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 505], 505);
        }
    }

    /**
     * get comment data.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getcomments(Request $request)
    {
        $postId = $request->postId;
        try{
            $comments = \DB::select('select id,firstname,comment_txt,post_id 
                                     from activitycomments 
                                     where post_id='.$postId);
                return response()->json(['comments' => $comments, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 505], 505);
        }
    }
}
