<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;

class VisitorCountController extends Controller
{
    public function incrementVisitorCount(Request $request)
    {
    	$username = $request->username;
    	$visitorUsername = $request->visitorusername;

    	try {
    		$user1ID = User::where('username', $username)->get()[0]->id;
    		$user2ID = User::where('username', $visitorUsername)->get()[0]->id;

    		//update query using model
    		//no reponse needed since callback is not used in $.post ... 
    	} catch (Illuminate\Database\QueryException $e) {
    		
        }
    }
}
