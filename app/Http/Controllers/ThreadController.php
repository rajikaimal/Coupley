<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Thread;
use App\Likes;

class ThreadController extends Controller
{
  /**
  * get previous conversation list of.
  *
  * @param object        $request
  *
  *
  * @return json
  */
    public function getPreviousMessage(Request $request)
    {
      $user1 = $request->user1;
      if ($pmessage= \DB::select(\DB::raw("SELECT user2,message,created_at
                                        FROM chats WHERE user2
                                        IN (SELECT DISTINCT user2 FROM chats WHERE user2 !='".$user1."')
                                        GROUP BY user2"))) {
       return response()->json(['pmessage' => $pmessage, 'status' => 200], 200);
   } else {
       return response()->json(['status' => 505], 505);
   }
    }
    /**
    * delete messag (conversation).
    *
    * @param object        $request
    *
    *
    * @return json         status
    */
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
    /**
    * get previous conversation list of.
    *
    * @param object        $request
    *
    *
    * @return json         $llist
    */
    public function getLikedUserList(Request $request)
    {
       $user1 = $request->user1;
      if ($llist= Likes::where('user1',$user1)->orWhere('user2',$user1)->where('likeback','1')->get()) {
       return response()->json(['llist' => $llist, 'status' => 200], 200);
   } else {
       return response()->json(['status' => 505], 505);
   }
    }


    /**
    * Search for particular conversation.
    *
    * @param object        $request
    *
    *
    * @return json         $llist
    */
    public function getSearchConv(Request $request){

      $user1 = $request->user1;
      $user2 = $request->user2;
     if ($Slist= \DB::select(\DB::raw("SELECT user2,message,created_at FROM
                                      (SELECT user2,message,created_at FROM chats WHERE user2 IN (SELECT DISTINCT user2 FROM chats WHERE user2 !='".$user1."')
                                      GROUP BY user2)tb WHERE user2='".$user2."' ")))
        {
      return response()->json(['Slist' => $Slist, 'status' => 200], 200);
  } else {
      return response()->json(['status' => 505], 505);
  }

    }


}
