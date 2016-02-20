<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Post;
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
      if($posts=\DB::select('select id,firstname,post_text,created_at from posts')) {
        return response()->json(['posts' => $posts, 'status' => 200],200);
      }
      else {
        return response()->json(['status' => 505],505);
      }
    }

    public function getpostId(Request $request){
      if($posts=\DB::select('select id from posts')) {
        return response()->json(['posts' => $posts, 'status' => 200],200);
      }
      else {
        return response()->json(['status' => 505],505);
      }
    }

    public function addshare(Request $request) {
      $share = new Share;
      $share->post_id = $request->PostId;
      $share->email = $request->Email;
      $share->firstname = $request->Fname;
     
      if($share->save()) {
      return response()->json(["status" => 201], 201);
    }
    else {
      return response()->json(["status" => 404], 404);  
    }
    }

    public function deleteStatus(Request $request) {
      $id=$request->PostId;
      $posts=\DB::table('posts')->where('id', '=', $id);

      if($posts->delete()) {
      return response()->json(["status" => 201], 201);
      }
      else {
      return response()->json(["status" => 404], 404);  
      }
    }

    public function editStatus(Request $request) {
       $id=$request->PostId;
       $status=$request->Status;
       
       $posts=\DB::table('posts') ->where('id', $id) ->update(array('post_text' => $status)); 

      if($posts) {
      return response()->json(["status" => 201], 201);
      }
      else {
      return response()->json(["status" => 404], 404);  
      }
    }
}
