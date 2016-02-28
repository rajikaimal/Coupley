<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\share;

class ShareController extends Controller
{
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

