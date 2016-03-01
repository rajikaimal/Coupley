<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Feedback;
use PHPMailer;

class FeedbackController extends Controller
{
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
