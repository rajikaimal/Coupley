<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\LookingFor;

class LookingForController extends Controller
{
    public function update(Request $request)
    {
        $username = $request->username;

        $userID = User::where('username', $username)->get()[0]->id;

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

        LookingFor::where('user_id', $userID)
            ->update(['location' => $location, 'minage' => $minAge, 'maxage' => $maxAge,
                'status' => $relStatus,
                'shortterm' => $shortTerm,
                'longtterm' => $longTerm,
                'casualsex' => $casualSex,
            ]);

        return 'done';
    }
}
