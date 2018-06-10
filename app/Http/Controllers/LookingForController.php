<?php

namespace App\Http\Controllers;

use App\User;
use App\LookingFor;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class LookingForController extends Controller
{
    /**
     * updates lookingfor section in profile.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function update(Request $request)
    {
        $username = $request->username;
        try {
            $userID = User::where('username', $username)->get()[0]->id;
        } catch (QueryException $e) {
            return response()->json(['status' => 200, 'done' => false], 200);
        }

        $minAge = $request->minage;
        $maxAge = $request->maxage;
        $relStatus = $request->relstatus;
        $shortTerm = $request->shortterm;
        $longTerm = $request->longterm;
        $casualSex = $request->casualsex;
        $location = $request->location;

        if ($location == 'true') {
            $location = 1;
        } else {
            $location = 0;
        }

        if ($relStatus == 'true') {
            $relStatus = 1;
        } else {
            $relStatus = 0;
        }

        if ($shortTerm == 'true') {
            $shortTerm = 1;
        } else {
            $shortTerm = 0;
        }

        if ($longTerm == 'true') {
            $longTerm = 1;
        } else {
            $longTerm = 0;
        }

        if ($casualSex == 'true') {
            $casualSex = 1;
        } else {
            $casualSex = 0;
        }
        try {
            LookingFor::where('user_id', $userID)
            ->update(['location' => $location, 'minage' => $minAge, 'maxage' => $maxAge,
                'status' => $relStatus,
                'shortterm' => $shortTerm,
                'longtterm' => $longTerm,
                'casualsex' => $casualSex,
            ]);

            return response()->json(['status' => 200, 'done' => true], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200, 'done' => false], 200);
        }
    }

    /**
     * returns lookingfor data for a particular user profile.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getLookingFor(Request $request)
    {
        $username = $request->username;

        try {
            $userID = User::where('username', $username)->get()[0]->id;
            $lookingForData = LookingFor::where('user_id', $userID)->get();

            return response()->json(['status' => 200, 'data' => $lookingForData], 200);
        } catch (QueryException $e) {
            return response()->json(['status' => 200, 'done' => false], 200);
        }
    }
}
