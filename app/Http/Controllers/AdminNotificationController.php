<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AdminNotification;
use App\User;
use Illuminate\Database\QueryException;

class AdminNotificationController extends Controller
{
    public function setZero()
    {
        try {
            $notifications = AdminNotification::where('readNotification', 1)
                    ->update('readnotification', 0);

            return response()->json(['status' => 200, 'done' => true], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    public function setOne()
    {
        try {
            $notifications = AdminNotification::where('readNotification', 0)
                ->update(['readNotification' => 1]);
            return response()->json(['status' => 200, 'done' => true,'count' => 0], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    public function getNotificationNumber()
    {

        try {
            $notifications = AdminNotification::where('readNotification', 0)->count();

            return response()->json(['status' => 200, 'count' => $notifications], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    public function getNotificationList()
    {

        try {
            $notifications = AdminNotification::where('readNotification', 0)->limit(5)->get();

            return response()->json(['status' => 200, 'list' => $notifications], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }
}
