<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Post;

class ActivityFeedController extends Controller
{
    public function addstatus(Request $request) {
      $post = new Post;
      $post->email = $request->Email;
      $post->post_text = $request->Status;
      $post->attachment = "txt";
      $post->save();
    }
}
