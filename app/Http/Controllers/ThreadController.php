<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
        try {
            if ($pmessage = \DB::select(\DB::raw("
          SELECT m.message,m.sender_un,u.firstname,u.lastname,m.created_at,m.thread_id
          FROM messages m,users u WHERE m.thread_id IN
          (SELECT trd_id FROM threads WHERE user1_un='".$user1."' OR user2_un='".$user1."')  AND m.sender_un !='".$user1."' AND u.username=m.sender_un
           GROUP BY m.thread_id
           "))) {
                return response()->json(['pmessage' => $pmessage, 'status' => 200], 200);
            } else {
                return response()->json(['status' => 505], 505);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
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
        try {
            if ($posts->delete()) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
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
        try {
            if ($llist = \DB::select(\DB::raw(
            "SELECT username,firstname,lastname FROM users WHERE username IN (SELECT user2 FROM liked WHERE user1='".$user1."' UNION SELECT user1 FROM liked WHERE user2='".$user1."')
                "))
               ) {
                return response()->json(['llist' => $llist, 'status' => 200], 200);
            } else {
                return response()->json(['status' => 505], 505);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
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
    public function getSearchConv(Request $request)
    {
        $user1 = $request->user1;
        $user2 = $request->user2;
        try {
            if ($Slist = \DB::select(\DB::raw("

            SELECT firstname,lastname,message,thread_id,created_at
            FROM
            (SELECT m.message,m.sender_un,u.firstname,u.lastname,m.created_at,m.thread_id
            FROM messages m,users u WHERE m.thread_id IN
            (SELECT trd_id FROM threads WHERE user1_un='".$user1."' OR user2_un='".$user1."')  AND m.sender_un !='".$user1."' AND u.username=m.sender_un
            GROUP BY m.thread_id) tb1 WHERE firstname='".$user2."'

            "))) {
                return response()->json(['Slist' => $Slist, 'status' => 200], 200);
            } else {
                return response()->json(['status' => 505], 505);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * List of online people.
     *
     * @param object        $request
     *
     *
     * @return json         $llist
     */
    public function getOnlineUsers(Request $request)
    {
        $user1 = $request->user1;
        try {
            if ($onlinelist = \DB::select(\DB::raw("
          SELECT username,firstname,lastname FROM users WHERE username IN (SELECT user2 FROM liked WHERE user1='".$user1."' UNION SELECT user1 FROM liked WHERE user2='".$user1."') AND chatstatus='online'
           "))) {
                return response()->json(['onlinelist' => $onlinelist, 'status' => 200], 200);
            } else {
                return response()->json(['status' => 505], 505);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }


    public function getMessage(Request $request)
    {
      $threadId = $request->threadId;
      try {
            if($message = \DB::select(\DB::raw("
            SELECT m.message,m.created_at,u.firstname,m.thread_id
              FROM messages m,users u WHERE m.thread_id='".$threadId."' AND u.username=m.sender_un
            "))) {
                return response()->json(['message' => $message, 'status' => 200], 200);
        } else {
          return response()->json(['status' => 505], 505);
        }

      } catch (Illuminate\Database\QueryException $e) {
          return response()->json(['status' => 200], 200);
      }

    }



}
