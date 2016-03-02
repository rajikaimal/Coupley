<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Thread;
use App\Likes;

class ThreadController extends Controller
{
    public function sendMessage(Request $request)
    {
        $chat = new Thread;
        $chat->user1 = $request;
        $chat->user2 = $request;
        $chat->message = $request;
        $chat->save();
    }

    public function getPreviousMessage()
    {
      if ($pmessage = \DB::select("select user2,message,id from chats" )) {
       return response()->json(['pmessage' => $pmessage, 'status' => 200], 200);
   } else {
       return response()->json(['status' => 505], 505);
   }
    }


    public function deletemessage(Request $request)
    {
      $user2 = $request->user2;
      $posts = \DB::table('chats')->where('user2', '=', $user2);

      if ($posts->delete()) {
          return response()->json(['status' => 201], 201);
      } else {
          return response()->json(['status' => 404], 404);
      }
    }

    public function getLikedUserList(Request $request)
    {
       $user1 = $request->user1;
      if ($llist= Likes::where('user1',$user1)->orWhere('user2',$user1)->where('likeback','1')->get()) {
       return response()->json(['llist' => $llist, 'status' => 200], 200);
   } else {
       return response()->json(['status' => 505], 505);
   }
    }


}
