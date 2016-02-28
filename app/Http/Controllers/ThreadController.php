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
      if ($pmessage = \DB::select("select user2,message,created_at
   from (select user2,message,created_at from chats where user1 ='Tiffany'
   union select user1,message,created_at from chats where user2 ='Tiffany'
   in ( select distinct user2 from chats where user1 ='Tiffany'
   union select distinct user1 from chats where user2 ='Tiffany' ))
   where user2 != 'Tiffany'
   group by user2")) {
       return response()->json(['pmessage' => $pmessage, 'status' => 200], 200);
   } else {
       return response()->json(['status' => 505], 505);
   }
    }

    // public function getPreviousMessage()
    // {
    //   if ($pmessage=\DB::select('select * from chats where user1=?',['Tiffany'])){
    //       return response()->json(['pmessage' => $pmessage, 'status' => 200], 200);
    //   } else {
    //       return response()->json(['status' => 505], 505);
    //   }
    // }


    // public function getPreviousMessage(Request $request)
    //   {
    //       $user1=$request->User1;
    //       $user2=$request->User2;
    //       $Mu2=\DB::table('chats')->select('user2,message,created_at')->where('user1','=',$user1)->get();
    //       $Mu = DB::table('chats')->select('user1,message,created_at')->where('user2','=',$user2)->union($Mu2);
    //     if ($Mu->get()){
    //         return response()->json(['pmessage' => $pmessage, 'status' => 200], 200);
    //     } else {
    //         return response()->json(['status' => 505], 505);
    //     }
    //   }


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
