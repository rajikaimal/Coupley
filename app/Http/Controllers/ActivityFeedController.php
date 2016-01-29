<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Post;

class ActivityFeedController extends Controller
{
    public function addstatus(Request $request) {
      $post = new Post;
      $post->message = $request->Status;
      $post->save();

//      try{
//        $post = new Post;
      	// $post->message = $request->message;
       //  $post->message = "aaaa";

       //  // $post->user_id = $request->user_id;
      	// // $post->post_type = $request->post_type;
      	// // $post->post_text = $request->post_text;
      	// // $post->attachment = $request->attachment;
      	// // $post->stated_at = $request->stated_at;
      	// // $post->post_date = $request->post_date;
       //  $post->save();

//       }
//       catch(Exception $e){
          // do task when error
//          echo $e->getstatus();   // insert query
//       }
      // if($chat->save()) {
      //   return response()->json(['status' => 200], 200);
      // }
      // else {
      //   return response()->json(['status' => 505], 505);
      // }
    }
}
