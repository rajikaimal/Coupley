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
                    ->where('readnotification', 0)->get();

            return response()->json(['status' => 200, 'list' => $notifications], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }
}
