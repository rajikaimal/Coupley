<?php

namespace App\Http\Controllers;

use App\AdminNotification;
use Illuminate\Database\QueryException;

class AdminNotificationController extends Controller
{
    /**
     * Update value to zero when
     * notification is read.
     *
     * @return json
     */
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

    /**
     * Update value to zero when
     * notification is read.
     *
     * @return json
     */
    public function setOne()
    {
        try {
            $notifications = AdminNotification::where('readNotification', 0)
                ->update(['readNotification' => 1]);

            return response()->json(['status' => 200, 'done' => true, 'count' => 0], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * Retrieve the count of
     * unread notifications of the admin.
     *
     * @return json
     */
    public function getNotificationNumber()
    {
        try {
            $notifications = AdminNotification::where('readNotification', 0)->count();

            return response()->json(['status' => 200, 'count' => $notifications], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * Retrieve the last 5
     * notifications of the admin.
     *
     * @return json
     */
    public function getNotificationList()
    {
        try {
            $notifications = \DB::select('SELECT * FROM AdminNotification order by id desc limit 5');

            return response()->json(['status' => 200, 'list' => $notifications], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }
}
