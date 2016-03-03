<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    /*
        handles POST request from client
        adds a comment to activityfeed
        @return json ... status of action
    **/
    public function addcomment(Request $request)
    {
        try{
            $comment = new Comment;
            $comment->post_id = $request->PId;
            $comment->email = $request->Email;
            $comment->firstname = $request->Fname;
            $comment->comment_txt = $request->Comment;

            if ($comment->save()) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 505], 505);
        }
    }

    /*
        returns comment data for GET request
        @return json
    **/
    public function getcomments(Request $request)
    {
        try{
            $comments = \DB::select('select id,firstname,comment_txt from comments');
                return response()->json(['comments' => $comments, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 505], 505);
        }
    }
}
