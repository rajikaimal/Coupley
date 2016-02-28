<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\share;

class ShareController extends Controller
{
    /*
        returns share status for GET request
        @return json
    **/
    public function getsharestatus(Request $request)
    {
        $id = $request->PostId;
        $email = $request->Email;

        $result = Share::where('post_id', $id)
            ->where('email', $email)->get();

        if ($result->isEmpty()) {
            return 'false';
        } else {
            return 'true';
        }
    }

    /*
        handles POST request from client
        adds a share status to activityfeed
        @return json ... status of action
    **/
    public function share(Request $request)
    {
        $share = new Share;
        $share->post_id = $request->PostId;
        $share->email = $request->Email;
        $share->firstname = $request->Fname;

        if ($share->save()) {
            return response()->json(['status' => 201], 201);
        } else {
            return response()->json(['status' => 404], 404);
        }
    }

    /*
        handles POST request from client
        deletes a share status 
        @return json ... status of action
    **/
    public function unshare(Request $request)
    {
        $id = $request->PostId;
        $email = $request->Email;
        $shares = \DB::table('shares')->where('post_id', '=', $id)
                                      ->where('email', '=', $email);

        if ($shares->delete()) {
            return response()->json(['status' => 201], 201);
        } else {
            return response()->json(['status' => 404], 404);
        }
    }
}

