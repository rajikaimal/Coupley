<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    public function addcomment(Request $request)
    {
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
    }

    public function getcomments(Request $request)
    {
        /*  $id=$request->key;**/
     if ($comments = \DB::select('select id,firstname,comment_txt from comments')) {
         return response()->json(['comments' => $comments, 'status' => 200], 200);
     } else {
         return response()->json(['status' => 505], 505);
     }
    }
}
