<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class GraphController extends Controller
{
    /**
     *uses to retrive number of
     *active and deactivated users.
     *
     *
     * @return json
     */
    public function userStatus()
    {
        try {
            if ($users = \DB::select('SELECT deactive,active from(
                              (SELECT count(*) as deactive FROM users  where status="deactive"
                              and role="user") as t
                              join
                              (SELECT count(*) as active FROM users  where status="active"
                              and role="user") as t2)')) {
                return response()->json(['users' => $users, 'status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }
    /**
     *uses to retrive number of
     *registrations of users respective to
     *registered date.
     *
     * @return json
     */
    public function userRegistrations()
    {
        try {
            if($users = \DB::select('select created_at,@sum := @sum + counts as sum
                                  from(select count(id) as counts,created_at
                                    from users,(select @sum:=0) as t where role="user"
                                      group by created_at)
                                        as created_at '))
            {
                return response()->json(['users' => $users, 'status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }
    /**
     *uses to retrive number of
     *likebacks/flirts among users
     *
     *
     * @return json
     */
    public function userStats()
    {
        try {
            if ($users = \DB::select('SELECT count,users,admins from(
                            (SELECT count(*) as count FROM liked WHERE likeback=1)as t1
                              join
                            (SELECT count(*) as users from users where role="user") as t2
                              join
                            (SELECT count(*) as admins from users where role="admin") as t3)'))
            {
                return response()->json(['users' => $users, 'status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }

}
