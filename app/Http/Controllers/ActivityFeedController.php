<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Post;
use App\Like;
use App\Comment;
use App\Share;

class ActivityFeedController extends Controller
{
    public function addstatus(Request $request) {
      $post = new Post;
      $post->email = $request->Email;
      $post->firstname = $request->Fname;
      $post->post_text = $request->Status;
      $post->attachment = "txt";
     
      if($post->save()) {
	    return response()->json(["status" => 201], 201);
	  }
	  else {
	    return response()->json(["status" => 404], 404);	
	  }
    }

    public function getstatus(Request $request){
    /*	$id=$request->key;**/
     if($posts=\DB::select('select post_text from posts')) {
        return response()->json(['posts' => $posts, 'status' => 200],200);
      }
      else {
        return response()->json(['status' => 505],505);
      }
    }

    public function addlikes(Request $request) {
      $like = new Like;
      $like->post_id = '1';
      $like->email = $request->Email;
      $like->firstname = $request->Fname;
      $like->status = '1';
     
      if($like->save()) {
      return response()->json(["status" => 201], 201);
    }
    else {
      return response()->json(["status" => 404], 404);  
    }
    }
    
    public function addcomment(Request $request) {
      $comment = new Comment;
      $comment->post_id = '1';
      $comment->email = $request->Email;
      $comment->firstname = $request->Fname;
      $comment->comment_txt = $request->Status;
     
      if($comment->save()) {
      return response()->json(["status" => 201], 201);
    }
    else {
      return response()->json(["status" => 404], 404);  
    }
    }

    public function addshare(Request $request) {
      $share = new Share;
      $share->post_id = '1';
      $share->email = $request->Email;
      $share->firstname = $request->Fname;
     
      if($share->save()) {
      return response()->json(["status" => 201], 201);
    }
    else {
      return response()->json(["status" => 404], 404);  
    }
    }
}
