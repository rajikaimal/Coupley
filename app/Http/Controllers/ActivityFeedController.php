<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;
use App\Likes;

class ActivityFeedController extends Controller
{
    /*
        handles POST request from client
        adds a status to activityfeed
        @return json ... status of action
    **/
    public function addstatus(Request $request)
    {
        try{
            $post = new Post;
            $post->email = $request->Email;
            $post->firstname = $request->Fname;
            $post->post_text = $request->Status;
            $post->attachment = 'txt';

            if ($posts = $post->save()) {
                return response()->json(['posts' => $posts, 'status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 505], 505);
        }
    }

    public function getUID(Request $request)
    {
        $email = $request->Email;

        try{
            $uid =  User::where('email', $email)->get(['id']);

            $posts = \DB::select('select p.id,p.firstname,p.post_text,p.created_at from liked l ,users u, posts p where l.gotliked=2 and l.likeback=1 and u.id=l.likeduser and u.email=p.email order by p.created_at desc');

            return response()->json(['posts' => $posts, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    /*
        returns status data for GET request
        @return json
    **/
    public function getstatus(Request $request)
    {
        try {
            $posts = \DB::select('select id,firstname,post_text,created_at from posts');
             return response()->json(['posts' => $posts, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 505], 505);
        }
    }

    public function checkpost(Request $request)
    {
        $id = $request->PostId;
        $email = $request->Email;

        try{
            $result = Post::where('id', $id)
                    ->where('email', $email)->get();

            if ($result->isEmpty()) {
                return 'false';
            } else {
                return 'true';
            }
        } catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 505], 505);
        }

    }

    public function deleteStatus(Request $request)
    {
        $id = $request->PostId;

        try{
            $posts = \DB::table('posts')->where('id', '=', $id);

            if ($posts->delete()) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 505], 505);
        }
    }

    public function editStatus(Request $request)
    {
        $id = $request->PostId;
        $status = $request->Status;

        try{
            $posts = \DB::table('posts')->where('id', $id)->update(['post_text' => $status]);

            if ($posts) {
                return response()->json(['status' => 201], 201);
            } else {
                return response()->json(['status' => 404], 404);
            }
        } catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 505], 505);
        }
    }
}
