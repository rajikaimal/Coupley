<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TrendsController extends Controller
{
    /**
     * get previous conversation list of.
     *
     *
     * @return json
     */
    public function gettrends()
    {
        try {
            if ($tlist = \DB::select(\DB::raw("

         SELECT trend,COUNT(*) AS count FROM (SELECT SUBSTRING(post_text,LOCATE('#',post_text),15) AS trend FROM activityposts WHERE post_text like '%#%') t
         GROUP BY trend ORDER BY count DESC
           "))) {
                return response()->json(['tlist' => $tlist, 'status' => 200], 200);
            } else {
                return response()->json(['status' => 505], 505);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

      /**
       * get trend search list.
       *
       * @param object        $request
       *
       *
       * @return json
       */
      public function getsearchtrends(Request $request)
      {
          $trends = $request->trend;
          try {
              if ($stlist = \DB::select(\DB::raw("
                 SELECT trend
                 FROM
                 (SELECT DISTINCT SUBSTRING(post_text,LOCATE('#',post_text),15) AS trend FROM activityposts WHERE post_text like '%#%') t
                 WHERE trend LIKE '%".$trends."%'
             "))) {
                  return response()->json(['stlist' => $stlist, 'status' => 200], 200);
              } else {
                  return response()->json(['status' => 505], 505);
              }
          } catch (Illuminate\Database\QueryException $e) {
              return response()->json(['status' => 200], 200);
          }
      }

        /**
         * get trend search list.
         *
         * @param object        $request
         *
         *
         * @return json
         */
        public function getPosttrends(Request $request)
        {
            $trends = $request->strend;
            try {
                if ($trendposts = \DB::select(\DB::raw("
                  SELECT * FROM activityposts WHERE id IN ( SELECT id FROM (SELECT id,SUBSTRING(post_text,LOCATE('#',post_text),15) AS trend FROM activityposts WHERE post_text like '%#%') t WHERE trend LIKE '%".$trends."%' )"))) {
                    return response()->json(['trendposts' => $trendposts, 'status' => 200], 200);
                } else {
                    return response()->json(['status' => 505], 505);
                }
            } catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 200], 200);
            }
        }

          /**
           * get trend search list.
           *
           * @param object        $request
           *
           *
           * @return json
           */
          public function getInitPosttrends(Request $request)
          {
              $trends = $request->trend;

              try {
                  if ($inittrendposts = \DB::select(\DB::raw("
                     SELECT *
                     FROM activityposts
                     WHERE id IN ( SELECT id
                                   FROM (SELECT id,SUBSTRING(post_text,LOCATE('#',post_text),15) AS trend
                                         FROM activityposts
                                         WHERE post_text like '%#%') t
                                   WHERE trend IN (SELECT SUBSTRING(post_text,LOCATE('#',post_text),15) AS trend FROM activityposts WHERE post_text like '%#%' HAVING MAX(id))

                                    )"))) {
                      return response()->json(['inittrendposts' => $inittrendposts, 'status' => 200], 200);
                  } else {
                      return response()->json(['status' => 505], 505);
                  }
              } catch (Illuminate\Database\QueryException $e) {
                  return response()->json(['status' => 200], 200);
              }
          }
}
