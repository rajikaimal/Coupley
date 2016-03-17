<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\share;

class ShareController extends Controller
{
    /**
     * get shares status of a user.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getsharestatus(Request $request)
    {
        $postId = $request->PostId;
        $email = $request->Email;

        try{
            $result = Share::where('post_id', $postId)
                    ->where('email', $email)->get();

            if ($result->isEmpty()) {
                return 'false';
            } else {
                return 'true';
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    /**
     * add a share to Activity, handles POST request.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function share(Request $request)
    {
        try{
            $share = new Share;
            $share->post_id = $request->postId;
            $share->email = $request->email;
            $share->firstname = $request->firstName;

            if ($share->save()) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    /**
     * delete a share to Activity, handles POST request.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function unshare(Request $request)
    {
        $postId = $request->PostId;
        $email = $request->Email;

        try{
            $shares = \DB::table('shares')->where('post_id', '=', $postId)
                                      ->where('email', '=', $email);

            if ($shares->delete()) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }
}

