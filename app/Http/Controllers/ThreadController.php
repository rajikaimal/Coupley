<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Thread;

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
      if ($pmessage = \DB::select('select id,user2,	message,created_at from chats')) {
          return response()->json(['pmessage' => $pmessage, 'status' => 200], 200);
      } else {
          return response()->json(['status' => 505], 505);
      }
    }

    public function deletemessage(Request $request )
    {
      $user2 = $request->user2;
      $posts = \DB::table('chats')->where('user2', '=', $user2);

      if ($posts->delete()) {
          return response()->json(['status' => 201], 201);
      } else {
          return response()->json(['status' => 404], 404);
      }
    }


}
