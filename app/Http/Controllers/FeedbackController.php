<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Feedback;
use PHPMailer;

class FeedbackController extends Controller
{
    /**
     * uses to retrive feedbacks regarding
     *the timeline
     *
     *
     * @return string
     */
    public function timeline()
    {
        try {
        if ($feeds = \DB::select('select * from feedback where category="timeline"')) {
            return response()->json(['feeds' => $feeds, 'status' => 200], 200);
        }
        }catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }
    /**
     * uses to retrive feedbacks regarding
     *the activityfeed
     *
     *
     * @return string
     */
    public function activityFeed()
    {
        try {
        if ($feeds = \DB::select('select * from feedback where category="activity"')) {
            return response()->json(['feeds' => $feeds, 'status' => 200], 200);
        }
        }catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }
    /**
     * uses to retrive feedbacks regarding
     *the privacy
     *
     *
     * @return string
     */
    public function privacy()
    {
        try {
        if ($feeds = \DB::select('select * from feedback where category="privacy"')) {
            return response()->json(['feeds' => $feeds, 'status' => 200], 200);
        }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }
    /**
     * uses to retrive feedbacks regarding
     *the chat
     *
     *
     * @return string
     */
    public function chat()
    {
        try {
        if ($feeds = \DB::select('select * from feedback where category="chat"')) {
            return response()->json(['feeds' => $feeds, 'status' => 200], 200);
        }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }
    /**
     * uses to retrive feedbacks regarding
     *the other options
     *
     *
     * @return string
     */
    public function other()
    {
        try {
            if ($feeds = \DB::select('select * from feedback where category="other"')) {
                return response()->json(['feeds' => $feeds, 'status' => 200], 200);
            }
        }catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }
    /**
     * uses to mark whether feedback is done
     *
     *@param object    $request
     *
     * @return json
     */
    public function markfeed(Request $request)
    {
        $id = $request->id;
        try {
            if ($feeds = \DB::table('feedback')->where('id', $id)->delete()) {
                return response()->json(['status' => 201], 201);
            }
        }catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }
}
