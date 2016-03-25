<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class TrendsController extends Controller
{
  
  /**
  * get previous conversation list of.
  *
  * @param object        $request
  *
  *
  * @return json
  */
    public function gettrends()
    {
      
      try {
           if ($tlist= \DB::select(\DB::raw("
         SELECT SUBSTRING(post_text,LOCATE('#',post_text),15) AS trend,id FROM activityposts WHERE post_text like '%#%'
           "))) {
                 return response()->json(['tlist' => $tlist, 'status' => 200], 200);
      } else {
               return response()->json(['status' => 505], 505);
         }
      }catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 200], 200);
      }
    }

}
