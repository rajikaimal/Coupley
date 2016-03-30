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

        //return LookingFor::where('user_id', 11)->get();

        LookingFor::where('user_id', 11)
            ->update(['location' => 0, 'minage' => 18, 'maxage' => 20,
                'status' => 0,
                'shortterm' => 0,
                'longttterm' => 0,
                'casualsex' => 0,
            ]);

        return 'done';
    }
}
