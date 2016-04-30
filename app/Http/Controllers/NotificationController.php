<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notification;
use App\User;
use Illuminate\Database\QueryException;

class NotificationController extends Controller
{
    public function setZero(Request $request)
    {
        $username = $request->username;
        try {
            $id = User::where('username', $username)->get()[0]->id;
            $notifications = Notification::where('user_id2', $id)
                    ->update('readnotification', 0);

            return response()->json(['status' => 200, 'done' => true], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    public function getNotificationNumber(Request $request)
    {
        $username = $request->username;
        try {
            $id = User::where('username', $username)->get()[0]->id;
            $notifications = Notification::where('user_id2', $id)
                    ->where('readnotification', 0)->count();

            return response()->json(['status' => 200, 'count' => $notifications], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    public function getNotificationList(Request $request)
    {
        $username = $request->username;
        try {
            $id = User::where('username', $username)->get()[0]->id;
            $notifications = Notification::where('user_id2', $id)
                    ->where('readnotification', 0)->limit(5)->get();

            $notificationsList = array();

            foreach ($notifications as $notification) {
                $user2 = $notification->user_id1;
                $query = $user2ProfilePic = User::where('id', $user2)->get()[0];
                $user2Name = $query->firstname;
                $user2Username = $query->username;
                $user2ProfilePic = $query->profilepic;
                $user2Content = $query->content;
                $user2Data['id'] = $user2;
                $user2Data['name'] = $user2Name;
                $user2Data['username'] = $user2Username;
                $user2Data['content'] = $notification->content;
                $user2Data['profilepic'] = $user2ProfilePic;
                array_push($notificationsList, $user2Data);        
            }

            return response()->json(['status' => 200, 'list' => $notificationsList], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }
    public function getNotificationListMore(Request $request)
    {
        $username = $request->username;
        $pagination = $request->pagination;

        try {
            $id = User::where('username', $username)->get()[0]->id;
            $notifications = Notification::where('user_id2', $id)
                    ->where('readnotification', 0)->limit($pagination)->get();

            $notificationsList = array();

            foreach ($notifications as $notification) {
                $user2 = $notification->user_id1;
                $query = $user2ProfilePic = User::where('id', $user2)->get()[0];
                $user2Name = $query->firstname;
                $user2Username = $query->username;
                $user2ProfilePic = $query->profilepic;
                $user2Content = $query->content;
                $user2Data['id'] = $user2;
                $user2Data['name'] = $user2Name;
                $user2Data['username'] = $user2Username;
                $user2Data['content'] = $notification->content;
                $user2Data['profilepic'] = $user2ProfilePic;
                array_push($notificationsList, $user2Data);        
            }

            return response()->json(['status' => 200, 'list' => $notificationsList], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }
}
