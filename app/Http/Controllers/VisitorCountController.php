<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VisitorCountController extends Controller
{
    public function incrementVisitorCount(Request $request)
    {
        $username = $request->username;
        $visitorUsername = $request->visitorusername;
        //return $username;
        try {
            if ($result = \DB::insert(\DB::raw("INSERT INTO  ProfileVisitor(prousername,visusername)
              VALUES ('".$username."','".$visitorUsername."') "))) {
                return response()->json(['status' => 200], 200);
            } else {
                return response()->json(['status' => 505], 505);
            }
        } catch (Illuminate\Database\QueryException $e) {
        }
    }

    public function myVisits(Request $request)
    {
        $username = $request->myusername;

        try {
            if ($myVlist = \DB::select(\DB::raw("
          SELECT p.pvid,u.id,u.firstname,u.lastname,u.username,u.chatstatus,p.created_at
          FROM ProfileVisitor p, users u
          WHERE visusername='".$username."' AND u.username=p.prousername
         "))) {
                return response()->json(['myVlist' => $myVlist, 'status' => 200], 200);
            } else {
                return response()->json(['status' => 505], 505);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    public function searchMyVisits(Request $request)
    {
        $username = $request->myusername;
        $visitorUsername = $request->username;

        try {
            if ($smyVlist = \DB::select(\DB::raw("

            SELECT pvid,id,firstname,lastname,username,chatstatus,created_at
            FROM
            (SELECT p.pvid,u.id,u.firstname,u.lastname,u.chatstatus,u.username,p.created_at
            FROM profilevisitor p, users u
            WHERE prousername='".$username."' AND u.username=p.visusername) t
            WHERE firstname='".$visitorUsername."'
            OR lastname='".$visitorUsername."'
            OR username='".$visitorUsername."'
         "))) {
                return response()->json(['smyVlist' => $smyVlist, 'status' => 200], 200);
            } else {
                return response()->json(['status' => 505], 505);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    public function othersVisits(Request $request)
    {
        $username = $request->myusername;

        try {
            if ($oVlist = \DB::select(\DB::raw("
          SELECT p.pvid,u.id,u.firstname,u.lastname,u.username,u.chatstatus,p.created_at
          FROM ProfileVisitor p, users u
          WHERE visusername='".$username."' AND u.username=p.prousername
         "))) {
                return response()->json(['oVlist' => $oVlist, 'status' => 200], 200);
            } else {
                return response()->json(['status' => 505], 505);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    public function searchOthersVisits(Request $request)
    {
        $username = $request->myusername;
        $visitorUsername = $request->username;

        try {
            if ($soVlist = \DB::select(\DB::raw("
          SELECT pvid,id,firstname,lastname,username,chatstatus,created_at
          FROM
          (SELECT p.pvid,u.id,u.firstname,u.lastname,u.username,u.chatstatus,p.created_at
          FROM profilevisitor p, users u
          WHERE visusername='".$username."' AND u.username=p.prousername) t
          WHERE firstname='".$visitorUsername."'
          OR lastname='".$visitorUsername."'
          OR username='".$visitorUsername."'
         "))) {
                return response()->json(['soVlist' => $soVlist, 'status' => 200], 200);
            } else {
                return response()->json(['status' => 505], 505);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    public function unFollowVisitor(Request $request)
    {
        $vusername = $request->visitorusername;
        $username = $request->username;

        $posts = \DB::table('ProfileVisitor')->where('visusername', '=', $vusername)->where('prousername', '=', $username);
        try {
            if ($posts->delete()) {
                return response()->json(['username' => $username, 'status' => 200], 200);
            } else {
                return response()->json(['status' => 505], 505);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    public function deleteOtherVisitor(Request $request)
    {
        $vusername = $request->visitorusername;
        $username = $request->username;

        $posts = \DB::table('ProfileVisitor')->where('visusername', '=', $vusername)->where('prousername', '=', $username);
        try {
            if ($posts->delete()) {
                return response()->json(['username' => $username, 'status' => 200], 200);
            } else {
                return response()->json(['status' => 505], 505);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }
}
