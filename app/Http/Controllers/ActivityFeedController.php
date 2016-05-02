<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;
use App\activitypost;
use App\activitylikes;
use App\activityblock;

class ActivityFeedController extends Controller
{
    /**
     * add an activity to Activity feed, handles POST request.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function addStatus(Request $request)
    {
        try {
            $post = new activitypost;
            $post->email = $request->email;
            $post->userId = $request->userId;
            $post->firstname = $request->firstName;
            $post->username = $request->userName;
            $post->post_text = $request->status;
            if ($posts = $post->save()) {
                return response()->json(['posts' => $posts, 'status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    public function addImageStatus(Request $request)
    {
        $destination = 'img/activityFeedPics';
        try {
            $token = $request->input('token');
            $file = $request->file('file')->move($destination, $token);
            $ext = $request->file('file')->getClientOriginalExtension();
            $post = new activitypost;
            $post->email = $request->input('email');
            $post->userId = $request->input('userId');
            $post->firstname = $request->input('firstName');
            $post->post_text = $request->input('status');
            $post->attachment = $token;
            if ($posts = $post->save()) {
                return response()->json(['posts' => $posts, 'status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    public function sharedStatus(Request $request)
    {
        try {
            $post = new activitypost;
            $post->email = $request->email;
            $post->userId = $request->userId;
            $post->firstname = $request->firstName;
            $post->username = $request->userName;
            $post->type = 'shared';
            $post->post_id = $request->postId;
            $post->post_text = $request->status;
            if ($posts = $post->save()) {
                return response()->json(['posts' => $posts, 'status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    /**
     * get activity feed of a user.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getStatus(Request $request)
    {
        $uId = $request->userId;
        $pagination = $request->postLimitNo;
        try {
            $posts = \DB::select('SELECT p.id,
                                       p.firstname,
                                       p.type,
                                       p.attachment,
                                       p.post_text,
                                       p.post_id,
                                       p.created_at,
                                       p.pid,
                                       p.likesCount,
                                       q.sid,
                                       q.sfirstname,
                                       q.sattachment,
                                       q.spost_text,
                                       q.screated_at,
                                       p.username,
                                       q.susername
                                FROM(SELECT x.id as id,x.firstname as firstname,x.type as type,x.attachment as attachment,
                                            x.post_text as post_text,x.post_id as post_id,x.created_at as created_at,x.pid as pid,y.likesCount as likesCount,x.username as username
                                     FROM (select a.id as id,a.firstname as firstname,a.type as type,
                                                    a.attachment as attachment,a.post_text as post_text,a.post_id as post_id,a.created_at as created_at,l.post_id as pid,a.username as username
                                           from (select id,firstname,type,attachment,post_text,post_id,created_at,username  
                                                 from (select p.id,p.firstname,p.type,p.attachment,p.post_text,p.post_id,
                                                                p.created_at,p.username
                                                       from activityposts p, liked a
                                                       where a.gotliked='.$uId.' and a.likeback=1 and p.userId=a.likeduser 
                                         
                                                        union
                                                                           
                                                        select p.id,p.firstname,p.type,p.attachment,p.post_text,p.post_id,p.created_at,p.username
                                                        from activityposts p
                                                        where p.userId='.$uId.' ) as t1
                                                 where id NOT IN (select post_id 
                                                                  from activityblocks
                                                                  where userId='.$uId.' ) ) a
                
                                           Left JOIN (SELECT post_id FROM activitylikes WHERE UserId='.$uId.') l
                                           ON a.id=l.post_id) x
             
                                     Left JOIN (SELECT post_id,count(UserId) as likesCount FROM activitylikes) y
                                     ON x.id = y.post_id) p
    
                                Left Join (select id as sid,firstname as sfirstname,attachment as sattachment,
                                                post_text as spost_text,created_at as screated_at,username as susername from activityposts) q
                                On p.post_id=q.sid
                                order by p.created_at desc
                                limit '.$pagination);

            return response()->json(['posts' => $posts, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    /**
     * get activity feed of a user.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getStatusVisitor(Request $request)
    {
        $username = $request->username;
        $uId = User::where('username', $username)->get()[0]->id;
        $pagination = $request->postLimitNo;
        try {
            $posts = \DB::select('SELECT p.id,
                                       p.firstname,
                                       p.type,
                                       p.attachment,
                                       p.post_text,
                                       p.post_id,
                                       p.created_at,
                                       p.pid,
                                       p.likesCount,
                                       q.sid,
                                       q.sfirstname,
                                       q.sattachment,
                                       q.spost_text,
                                       q.screated_at
                                FROM(SELECT x.id as id,x.firstname as firstname,x.type as type,x.attachment as attachment,
                                            x.post_text as post_text,x.post_id as post_id,x.created_at as created_at,x.pid as pid,y.likesCount as likesCount
                                     FROM (select a.id as id,a.firstname as firstname,a.type as type,
                                                    a.attachment as attachment,a.post_text as post_text,a.post_id as post_id,a.created_at as created_at,l.post_id as pid
                                           from (select id,firstname,type,attachment,post_text,post_id,created_at  
                                                 from (select p.id,p.firstname,p.type,p.attachment,p.post_text,p.post_id,
                                                                p.created_at
                                                       from activityposts p, liked a
                                                       where a.gotliked='.$uId.' and a.likeback=1 and p.userId=a.likeduser 
                                         
                                                        union
                                                                           
                                                        select p.id,p.firstname,p.type,p.attachment,p.post_text,p.post_id,p.created_at
                                                        from activityposts p
                                                        where p.userId='.$uId.' ) as t1
                                                 where id NOT IN (select post_id 
                                                                  from activityblocks
                                                                  where userId='.$uId.' ) ) a
                
                                           Left JOIN (SELECT post_id FROM activitylikes WHERE UserId='.$uId.') l
                                           ON a.id=l.post_id) x
             
                                     Left JOIN (SELECT post_id,count(UserId) as likesCount FROM activitylikes) y
                                     ON x.id = y.post_id) p
    
                                Left Join (select id as sid,firstname as sfirstname,attachment as sattachment,
                                                post_text as spost_text,created_at as screated_at from activityposts) q
                                On p.post_id=q.sid
                                order by p.created_at desc
                                limit '.$pagination);

            return response()->json(['posts' => $posts, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    /**
     * delete activity of a user.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function deleteStatus(Request $request)
    {
        $postId = $request->postId;
        try {
            $posts = \DB::table('activityposts')->where('id', '=', $postId);
            if ($posts->delete()) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    /**
     * edit activity of a user.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function editStatus(Request $request)
    {
        $postId = $request->postId;
        $status = $request->status;
        try {
            $posts = \DB::table('activityposts')->where('id', $postId)->update(['post_text' => $status]);
            if ($posts) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    public function block_status(Request $request)
    {
        try {
            $blockPost = new activityblock;
            $blockPost->email = $request->email;
            $blockPost->userId = $request->userId;
            $blockPost->post_id = $request->postId;
            if ($posts = $blockPost->save()) {
                return response()->json(['posts' => $posts, 'status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    public function getSharedUsers(Request $request)
    {
        $postId = $request->postId;
        try {
            $posts = \DB::select('select firstname,post_id,username
                                 from activityposts 
                                 where post_id='.$postId.'
                                 order by created_at desc');

            return response()->json(['posts' => $posts, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

}
