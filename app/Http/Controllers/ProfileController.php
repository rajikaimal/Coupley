<?php
/*
|--------------------------------------------------------------------------
| ProfileController File
|--------------------------------------------------------------------------
|
| Here is where all API requests related to profile are redirected
| by routes files in order to handle the request and @return json responses
| @author Rajika Imal
|
*/

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Likes;
use App\Blocks;
use App\ActivityFeed;
use App\About;
use App\Post;
use App\Reported;
use App\activitypost;
use App\Notification;
use App\ThreadChats;

class ProfileController extends Controller
{
    /**
     * Constructor uses JWT middleware to check whether request contains api-token.
     *
     *
     *
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * get profile data for profile of each user profile.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function profile(Request $request)
    {
        $email = $request->email;
        try {
            //$userDetails = User::where('email', $email)->get();
            $userDetails = \DB::select(\DB::raw("
                SELECT id,firstname,lastname,orientation,email,country,gender,username,profilepic,birthday,TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS age from users where email='".$email."'
            "));
            //$userDetails = array_merge($userDetails->toArray(), $age->toArray());
            //$age = 0;
            return response()->json(['user' => $userDetails, 'status' => 200]);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * get profile pics for the user profiles.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getProfilePic(Request $request)
    {
        $username = $request->username;
        try {
            $profilepic = User::where('username', $username)->get(['profilepic']);

            return response()->json(['status' => 200, 'image' => '/img/profilepics/'.$profilepic[0]->profilepic]);
        } catch (Illuminate\Database\QueryException $e) {
        }
    }

    /**
     * get like status of a visitor's profile.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getlikestatus(Request $request)
    {
        $visitorUsername = $request->visitorusername;
        $username = $request->username;
        try {
            $result = Likes::where('user1', $visitorUsername)
                    ->where('user2', $username)->get();
        //return "false";
            if ($result->isEmpty()) {
                return 'false';
            } else {
                return 'true';
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * get visitor profile data.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function visitor(Request $request)
    {
        $username = $request->username;
        try {
            $userDetails = \DB::select(\DB::raw("
                SELECT id,firstname,lastname,orientation,email,country,gender,username,profilepic,birthday,TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS age from users where username='".$username."'
            "));
            return response()->json(['user' => $userDetails, 'status' => 200], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * add like to visitor's profile, handles POST request.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function like(Request $request)
    {
        $likedUsername = $request->likedUsername;
        $gotLikedUsername = $request->gotLikedUsername;
        try {
            $result1 = Likes::where('user1', $likedUsername)
                    ->where('user2', $gotLikedUsername)->get();
            $result2 = Likes::where('user1', $gotLikedUsername)
                ->where('user2', $likedUsername)->get();
            if ($result1->isEmpty() || $result2->isEmpty()) {
                $user1ID = User::where('username', $likedUsername)->get(['id']);
                $user2ID = User::where('username', $gotLikedUsername)->get(['id']);
                $like = new Likes;
                $like->likeduser = $user1ID[0]->id;
                $like->gotliked = $user2ID[0]->id;
                $like->user1 = $likedUsername;
                $like->user2 = $gotLikedUsername;
                //$like->save();
                if ($like->save()) {
                    $result = Likes::where('user1', $likedUsername)
                            ->where('user2', $gotLikedUsername)->get();
                    if (! $result->isEmpty()) {
                        $thread = new ThreadChats;
                        $thread->user1_un = $likedUsername;
                        $thread->user2_un = $gotLikedUsername;
                        $thread->save();
                    } 
                    return response()->json(['status' => 200], 200);
                } else {
                    return response()->json(['status' => 200], 200);
                }
            } else {
                return response()->json(['status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * unlike a visitor's profile handles POST request.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function unlike(Request $request)
    {
        $unlikedUsername = $request->unlikedUsername;
        $gotunLikedUsername = $request->gotunLikedUsername;
        try {
            $result1 = Likes::where('user1', $unlikedUsername)
                    ->where('user2', $gotunLikedUsername)->get();
            $result2 = Likes::where('user1', $gotunLikedUsername)
                ->where('user2', $unlikedUsername)->get();
            if ($result1 !== null && $result2 !== null) {
                Likes::where('user1', $unlikedUsername)
                    ->where('user2', $gotunLikedUsername)
                    ->delete();
                $user_id1 = User::where('username', $unlikedUsername)->get()[0]->id;
                $user_id2 = User::where('username', $gotunLikedUsername)->get()[0]->id;

                Notification::where('user_id1', $user_id1)
                        ->where('user_id2', $user_id2)
                        ->where('content', 'like')
                        ->delete();

                return response()->json(['status' => 200], 200);
            } else {
                return response()->json(['status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * get liked back status to determine whether user and visitor have liked
     * each other.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function likedbackstatus(Request $request)
    {
        $username = $request->username;
        $visitorUsername = $request->visitorusername;
        try {
            $result = Likes::where('user1', $visitorUsername)
                    ->where('user2', $username)->get();
            if (! $result->isEmpty()) {
                return response()->json(['liked' => true], 200);
            } else {
                return response()->json(['liked' => false], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * get block status of visitor.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function blockstatus(Request $request)
    {
        $visitorUsername = $request->visitorusername;
        $username = $request->username;
        try {
            $user1ID = User::where('username', $username)->get(['id']);
            $user2ID = User::where('username', $visitorUsername)->get(['id']);
            $result = Blocks::where('user_id', $user1ID[0]->id)
                ->where('blocked_user_id', $user2ID[0]->id)
                ->get();
            if ($result->isEmpty()) {
                return response()->json(['blockstatus' => false], 200);
            } else {
                return response()->json(['blockstatus' => true], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /*
        Returns @int status after blocking
    **/
    public function block(Request $request)
    {
        $visitorUsername = $request->visitorusername;
        $username = $request->username;
        try {
            $user1ID = User::where('username', $username)->get(['id']);
            $user2ID = User::where('username', $visitorUsername)->get(['id']);
            $result1 = Blocks::where('user_id', $user1ID[0]->id)
                ->where('blocked_user_id', $user2ID[0]->id)
                ->get();
            if ($result1->isEmpty()) {
                if ($result1->isEmpty()) {
                    $block = new Blocks;
                    $block->user_id = $user1ID[0]->id;
                    $block->blocked_user_id = $user2ID[0]->id;
                    if ($block->save()) {
                        return response()->json(['status' => 200], 200);
                    } else {
                        return response()->json(['status' => 200], 200);
                    }
                }
            } else {
                return response()->json(['status' => 500], 500);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * get like status of a visitor's profile.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function unblock(Request $request)
    {
        $visitorUsername = $request->visitorusername;
        $username = $request->username;
        try {
            $user1ID = User::where('username', $username)->get(['id']);
            $user2ID = User::where('username', $visitorUsername)->get(['id']);
            if (Blocks::where('user_id', $user1ID[0]->id)
                ->where('blocked_user_id', $user2ID[0]->id)
                ->delete()
            ) {
                return response()->json(['status' => 200], 200);
            } else {
                return response()->json(['status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * get profile permission.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function profilepermission(Request $request)
    {
        $visitorUsername = $request->visitorusername;
        $username = $request->username;
        try {
            $user1ID = User::where('username', $username)->get(['id']);
            $user2ID = User::where('username', $visitorUsername)->get(['id']);
            $result = Blocks::where('user_id', $user2ID[0]->id)
                ->where('blocked_user_id', $user1ID[0]->id)
                ->get();
            if (! $result->isEmpty()) {
                return response()->json(['permission' => false, 'status' => 200], 200);
            } elseif ($result->isEmpty()) {
                return response()->json(['permission' => true, 'status' => 200], 200);
            } else {
                return response()->json(['status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
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
    public function getposts(Request $request)
    {
        $username = $request->username;
        $userID = User::where('username', $username)->get(['id']);
        try {
            $results = ActivityFeed::where('user_id', $userID[0]->id)->get();
            if (! $results->isEmpty()) {
                return response()->json(['status' => 200, 'data' => $results], 200);
            } else {
                return response()->json(['status' => 200, 'data' => null], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * upload profile pic of a user.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function uploadpic(Request $request)
    {
        $destination = 'img/profilepics';
        try {
            //$apitoken = $request->input('apitoken');
            $email = $request->input('email');
            $username = $request->input('user');
            $file = $request->file('file')->move($destination, $username);
            $ext = $request->file('file')->getClientOriginalExtension();
            User::where('username', $username)
                ->update(['profilepic' => $username]);

            return response()->json(['status' => 200, 'done' => true], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200, 'done' => false], 200);
        }
    }

    /**
     * upload profile pic of a user.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function uploadmultiple(Request $request)
    {
        $username = $request->input('user');
        $destination = 'img/albums';
        try {
            $email = $request->input('email');
//            $files = $request->file('files');
            $file = $request->file('files')->move($destination, $username);
            // for($val = 0; $val <= sizeof($files); $val++) {
            //     //$request->file('file'[$val])->move($destination, $username);
            // }
            // foreach($files as $val) {
            //     var_dump($files);
            //     $file = $request->file('file')->move($destination, $username);
            // }
            return response()->json(['status' => 200, 'done' => true], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200, 'done' => false], 200);
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
    public function editactivity(Request $request)
    {
        $email = $request->email;
        $editActvity = $request->editActvity;
        try {
            $userID = User::where('email', $email)->get(['id']);
            if (About::where('user_id', $userID[0]->id)
                ->update(['post' => $editActvity])
            ) {
                $results = ActivityFeed::where('user_id', $userID[0]->id)->get();
                if (! $results->isEmpty()) {
                    return response()->json(['status' => 200, 'data' => $results], 200);
                } else {
                    return response()->json(['status' => 200, 'data' => null], 200);
                }
            } else {
                return response()->json(['status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * get about section data.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getabout(Request $request)
    {
        if ($email = $request->email) {
            try {
                $userID = User::where('email', $email)->get(['id']);
                $results = About::where('user_id', $userID[0]->id)->get();

                return response()->json(['status' => 200, 'data' => $results], 200);
            } catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 200], 200);
            }
        } elseif ($visitorUsername = $request->visitorusername) {
            try {
                $userID = User::where('username', $visitorUsername)->get(['id']);
                $results = About::where('user_id', $userID[0]->id)->get();

                return response()->json(['status' => 200, 'data' => $results], 200);
            } catch (Illuminate\Database\QueryException $e) {
                return response()->json(['status' => 200], 200);
            }
        }
    }

    /**
     * get posts done by a user.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function getpostsX(Request $request)
    {
        $username = $request->username;
        try {
            $email = User::where('username', $username)->get(['email']);
            $results = Post::where('email', $email[0]->email)->orderBy('created_at', 'desc')->get();
            if (! $results->isEmpty()) {
                return response()->json(['status' => 200, 'posts' => $results], 200);
            } else {
                return response()->json(['status' => 200, 'posts' => null], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * load more posts for pagination.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function loadMorePosts(Request $request)
    {
        $username = $request->username;
        try {
            $email = User::where('username', $username)->get(['email']);
            $results = Post::where('email', $email[0]->email)->limit(2)->get();
            if (! $results->isEmpty()) {
                return response()->json(['status' => 200, 'posts' => $results], 200);
            } else {
                return response()->json(['status' => 200, 'posts' => null], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * edit basic information.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function editBasics(Request $request)
    {
        $firstname = $request->firstname;
        $lastname = $request->lastname;
        $country = $request->country;
        $currentUsername = $request->currentusername;
        try {
            if (User::where('username', $currentUsername)
                ->update(['firstname' => $firstname, 'lastname' => $lastname, 'country' => $country])) {
                return response()->json(['status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * edit summary data.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function editsummary(Request $request)
    {
        $email = $request->email;
        $summary = $request->summary;
        try {
            $userID = User::where('email', $email)->get(['id']);
            if (About::where('user_id', $userID[0]->id)
                ->update(['selfsummary' => $summary])
            ) {
                return response()->json(['status' => 200], 200);
            } else {
                return response()->json(['status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * edit life data.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function editlife(Request $request)
    {
        $email = $request->email;
        $life = $request->life;
        try {
            $userID = User::where('email', $email)->get(['id']);
            if (About::where('user_id', $userID[0]->id)
                ->update(['life' => $life])
            ) {
                return response()->json(['status' => 200], 200);
            } else {
                return response()->json(['status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * edit good at data.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function editgoodat(Request $request)
    {
        $email = $request->email;
        $goodat = $request->goodat;
        try {
            $userID = User::where('email', $email)->get(['id']);
            if (About::where('user_id', $userID[0]->id)
                ->update(['goodat' => $goodat])
            ) {
                return response()->json(['status' => 200], 200);
            } else {
                return response()->json(['status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * edit thinking of data.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function editthinkingof(Request $request)
    {
        $email = $request->email;
        $thinkingOf = $request->thinkingof;
        try {
            $userID = User::where('email', $email)->get(['id']);
            if (About::where('user_id', $userID[0]->id)
                ->update(['thinkingof' => $thinkingOf])
            ) {
                return response()->json(['status' => 200], 200);
            } else {
                return response()->json(['status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * edit favs data.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function editfavs(Request $request)
    {
        $email = $request->email;
        $favs = $request->favs;
        try {
            $userID = User::where('email', $email)->get(['id']);
            if (About::where('user_id', $userID[0]->id)
                ->update(['favourites' => $favs])
            ) {
                return response()->json(['status' => 200], 200);
            } else {
                return response()->json(['status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * permenantly deletes a user profile POST request.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function deleteProfile(Request $request)
    {
        $username = $request->username;
        // \DB::raw("delete FROM users WHERE username = '$username'");
        // return $username;
        try {
            if ($username) {
                var_dump($username);
                $q = 'DELETE FROM users where id = ?';
                $status = \DB::delete($q, [17]);

                return response()->json(['status' => 200, 'done' => true], 200);
            } else {
                return response()->json(['status' => 200, 'done' => false], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * Deactivates a user profile POST request.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function deactivateProfile(Request $request)
    {
        $username = $request->username;
        try {
            if (User::where('username', $username)
                ->update(['status' => 'inactive'])) {
                $emailController = new EmailController();
                $user = User::where('username', $username)->get()[0];
                $email = $user->email;
                $name = $user->firstname;
                $subject = 'Account deactivation !';
                $content = 'Your account has been deactivated !';
                $emailController->SendMail($email, $name, $subject, $content);

                return response()->json(['status' => 200, 'done' => true], 200);
            } else {
                return response()->json(['status' => 200, 'done' => false], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * Retreives block list of a certain user GET /.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function blocklist(Request $request)
    {
        $username = $request->username;
        try {
            $userID = User::where('username', $username)->get(['id'])[0]->id;
            $users = \DB::select(\DB::raw("
               SELECT id,firstname,lastname,username,gender,profilepic from(
                            SELECT id,firstname, lastname,username,orientation,gender,profilepic,role FROM `users` WHERE
                                                    status = 'active'         
                                                    ) as t where  
                                                    role='user' and id IN (
                                                        Select blocked_user_id
                                                        from `blocked`
                                                        where user_id=".$userID.'
                                                    ) 
            '));
            // foreach ($blockedUsers as $value) {
            //     $users[$value->blocked_user_id] = $value;
            //     $users[$value->blocked_user_id] = User::where('id', $value->blocked_user_id)->get(['id', 'firstname', 'lastname', 'username', 'profilepic'])[0];
            // }
            return response()->json(['status' => 200, 'users' => $users], 200);
            if ($userID) {
                return response()->json(['status' => 200, 'done' => true], 200);
            } else {
                return response()->json(['status' => 200, 'done' => false], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * Updates a user profile main info POST request.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function updateMain(Request $request)
    {
        $username = $request->username;
        $email = $request->email;
        $gender = $request->gender;
        $birthday = $request->birthday;
        $orientation = $request->orientation;
        try {
            User::where('username', $username)
                ->update(['email' => $email, 'username' => $username, 'gender' => $gender, 'orientation' => $orientation, 'birthday' => $birthday]);

            return response()->json(['status' => 200, 'done' => true], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * Reports user profile.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function reportUser(Request $request)
    {
        $visitorUsername = $request->visitorusername;
        $username = $request->username;
        $description = $request->comment;
        $type = $request->type;
        try {
            $user1ID = User::where('username', $username)->get(['id'])[0]->id;
            $user2ID = User::where('username', $visitorUsername)->get(['id'])[0]->id;
            $report = new Reported;
            $report->user_id = $user1ID;
            $report->reported_user_id = $user2ID;
            $report->description = $description;
            $report->status = $type;
            $report->save();

            return response()->json(['status' => 200, 'done' => true], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * Updates password of user profile.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function updatePassword(Request $request)
    {
        $username = $request->username;
        $newPassword = \Hash::make($request->password);
        try {
            $user = User::where('username', $username)->get()[0];
            $email = $user->email;
            $name = $user->firstname;
            $subject = 'Password change';
            $content = "You password was changed ! <br/>
                If you didnt make this change please follow this link to reset your password <br/>
                <a href='http://localhost:3000/#/forgotpwd'> Reset </a> 
            ";
            User::where('username', $username)
                ->update(['password' => $newPassword]);
            $emailController = new EmailController();
            $emailController->SendMail($email, $name, $subject, $content);

            return response()->json(['status' => 200, 'done' => true], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * Fetch images of a user profile.
     *
     * @param object        $request
     *
     *
     * @return json
     */
    public function photos(Request $request)
    {
        $username = $request->username;
        try {
            $userId = User::where('username', $username)->get()[0]->id;

            $userPosts = activitypost::where('userid', $userId)->get();

            $photos = [];
            foreach ($userPosts as $post) {
                if ($post->attachment != 'None') {
                    array_push($photos, $post->attachment);
                }
            }

            return response()->json(['status' => 200, 'photos' => $photos], 200);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }
}
