<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Like;

class LikeController extends Controller
{
    public function addlikes(Request $request) {
      $like = new Like;
      $like->post_id = $request->PostId;
      $like->email = $request->Email;
      $like->firstname = $request->Fname;
      $like->status = '1';
     
      if($like->save()) {
      return response()->json(["status" => 201], 201);
    }
    else {
      return response()->json(["status" => 404], 404);  
    }
    }

}
