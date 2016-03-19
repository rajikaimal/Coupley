<?php
/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('/', function () {
    return view('init');
});
/*
    Login route
    Handles initial login of a user of Coupley
    @author rajikaimal
*/
// Route::get('/api/login', function () {
//     ret;
// });
Route::group(['prefix' => 'api'], function () {
    //authenticate users with AuthenticateController
    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    //Register new users with RegisterConroller@register
    Route::post('register', 'RegisterController@check');
    Route::get('register/checkusername', 'RegisterController@checkusername');
    Route::get('register/checkemail', 'RegisterController@checkemail');
    //update user passwords
    Route::post('recoverpwd', 'AuthenticateController@reset');

    Route::post('status', 'ActivityFeedController@addstatus');
    Route::get('getstatus', 'ActivityFeedController@getstatus');
    Route::get('getpostId', 'ActivityFeedController@getpostId');
    Route::post('likes', 'LikeController@addlikes');
    Route::post('likepost', 'LikeController@like');
    Route::post('unlikepost', 'LikeController@unlike');
    Route::get('getlikestatus', 'LikeController@getlikestatus');
    Route::post('comment', 'CommentController@addcomment');
    Route::get('getcomment', 'CommentController@getcomments');
    Route::post('share', 'ActivityFeedController@addshare');
    Route::post('deleteStatus', 'ActivityFeedController@deleteStatus');
    Route::post('edit_status', 'ActivityFeedController@editStatus');
    //Return profile data
    Route::get('profile', 'ProfileController@profile');
    //Return profile picture
    Route::get('getProfilePic', 'ProfileController@getProfilePic');
    //Return userslist for search
    Route::get('search', 'SearchController@search');
    //Return visitor profile data
    Route::get('visitorprofile', 'ProfileController@visitor');
    //Returns like status of two profiles
    Route::get('likestatus', 'ProfileController@getlikestatus');
    //Like a user
    Route::post('like', 'ProfileController@like');
    //Unlike a user
    Route::post('unlike', 'ProfileController@unlike');
    //Return likedback status
    Route::post('likedbackstatus', 'ProfileController@likedbackstatus');
    //Blocks a certain user
    Route::post('blockuser', 'ProfileController@block');
    //Unblocks a certain user
    Route::post('unblockuser', 'ProfileController@unblock');
    //Returns block status
    Route::post('blockstatus', 'ProfileController@blockstatus');
    //Returns permission for viewing a profile
    Route::post('profilepermission', 'ProfileController@profilepermission');
    //Returns acitivity feed for specific user
    //Route::get('profile/feed', 'ProfileController@getposts');
    //Upload profile pic
    Route::post('profile/profilepic', 'ProfileController@uploadpic');
    //Returns about data
    Route::get('profile/about', 'ProfileController@getabout');

    //Returns posts by a user
    Route::get('profile/getposts', 'ProfileController@getpostsX');

    Route::get('profile/laodmoreposts', 'ProfileController@loadMorePosts');

    Route::post('profile/edit/updatebasics', 'ProfileController@editbasics');

    //Edit About section
    Route::put('profile/edit/summary', 'ProfileController@editsummary');
    Route::put('profile/edit/life', 'ProfileController@editlife');
    Route::put('profile/edit/goodat', 'ProfileController@editgoodat');
    Route::put('profile/edit/thinkingof ', 'ProfileController@editthinkingof');
    Route::put('profile/edit/favs ', 'ProfileController@editfavs');
    Route::put('profile/edit/activity ', 'ProfileController@editactivity');
    //End of edit routes

    Route::post('profile/edit/deleteprofile', 'ProfileController@deleteProfile');
    Route::post('profile/edit/deactivateprofile', 'ProfileController@deactivateProfile');

    //posts feeback from user profile
    Route::post('feedback', 'UsersController@postFeedback');
    Route::get('instagram/init', 'InstagramController@init');
    Route::get('profile/blocklist', 'ProfileController@blocklist');

    //retrives no of notifications
    Route::get('profile/notifications', 'NotificationController@getNotificationNumber');
    //retrives all unread notifications
    Route::get('profile/notificationlist', 'NotificationController@getNotificationList');
    //retrives liked list of a certain user
    Route::get('profile/likedlist', 'LikeListController@getLikedList');

    //updates main sections info of profile
    Route::post('profile/updatemain', 'ProfileController@updateMain');

    //reports a user
    Route::post('profile/report', 'ProfileController@reportUser');

});

Route::get('instagram/authenticate', 'InstagramController@auth');
Route::get('instagram/init', 'InstagramController@init');

Route::get('socket', 'SocketController@index');
Route::post('sendmessage', 'SocketController@sendMessage');
Route::get('writemessage', 'SocketController@writemessage');
/*
    Dashboard route
    Handles Admin panel of Coupley
    @author isurudilhan
*/
Route::get('/cp-admin', function () {
    return view('init_admin');
});
Route::group(['prefix' => 'admin-api'], function () {
    Route::resource('authenticates', 'AdminAuthenticateController', ['only' => ['index']]);
    Route::post('authenticates', 'AdminAuthenticateController@authenticate');
    //Return userslist
    Route::get('search', 'UsersController@friends');
    //Return userslist for search
    Route::get('searches', 'AdminSearchController@search');
    //return blocked users
    Route::get('blocked', 'UsersController@blocked');
    //Register new admins with RegisterConroller@register
    Route::post('registerAdmin', 'AdminRegisterController@checks');
    //Update admins
    Route::post('updateAdmin', 'AdminRegisterController@update');
    //update admin passwords
    Route::post('reset', 'AdminPwdController@reset');
    //upload profile picture
    Route::post('profilepic', 'AdminRegisterController@uploadpic');
    //recover password
    Route::post('recoverpwd', 'UsersController@recover');
    //block certain user
    Route::post('blockuser', 'UsersController@block');
    //unblock certain user
    Route::post('unblockuser', 'UsersController@Unblock');
    //Return Admin profile data
    Route::get('adminprofile', 'UsersController@Adminprofile');

    //feedbacks
    Route::get('timeline', 'FeedbackController@timeline');
    Route::get('activity', 'FeedbackController@activityFeed');
    Route::get('privacy', 'FeedbackController@privacy');
    Route::get('chat', 'FeedbackController@chat');
    Route::get('others', 'FeedbackController@other');
    //mark feedbacks
    Route::post('markfeed', 'FeedbackController@markfeed');
    //pie graph data
    Route::get('userStatus', 'GraphController@userStatus');
    //line chart dat
    Route::get('userRegistrations', 'GraphController@userRegistrations');

    //cards data
    Route::get('userStats', 'GraphController@userStats');

});

Route::get('twitter/login', ['as' => 'twitter.login', function () {
    // your SIGN IN WITH TWITTER  button should point to this route
    $sign_in_twitter = true;
    $force_login = false;

    // Make sure we make this request w/o tokens, overwrite the default values in case of login.
    Twitter::reconfig(['token' => '', 'secret' => '']);
    $token = Twitter::getRequestToken(route('twitter.callback'));

    if (isset($token['oauth_token_secret'])) {
        $url = Twitter::getAuthorizeURL($token, $sign_in_twitter, $force_login);

        Session::put('oauth_state', 'start');
        Session::put('oauth_request_token', $token['oauth_token']);
        Session::put('oauth_request_token_secret', $token['oauth_token_secret']);

        return Redirect::to($url);
    }

    return Redirect::route('twitter.error');
}]);

Route::get('twitter/callback', ['as' => 'twitter.callback', function (Request $request) {
    // You should set this route on your Twitter Application settings as the callback
    // https://apps.twitter.com/app/YOUR-APP-ID/settings
    $accessToken = $request->oauth_token;
    var_dump($accessToken);
    if (Session::has('oauth_request_token')) {
        $request_token = [
            'token'  => Session::get('oauth_request_token'),
            'secret' => Session::get('oauth_request_token_secret'),
        ];

        Twitter::reconfig($request_token);

        $oauth_verifier = false;

        if (Input::has('oauth_verifier')) {
            $oauth_verifier = Input::get('oauth_verifier');
        }

        // getAccessToken() will reset the token for you
        $token = Twitter::getAccessToken($oauth_verifier);

        if (! isset($token['oauth_token_secret'])) {
            return Redirect::route('twitter.login')->with('flash_error', 'We could not log you in on Twitter.');
        }

        $credentials = Twitter::getCredentials();

        if (is_object($credentials) && ! isset($credentials->error)) {
            // $credentials contains the Twitter user object with all the info about the user.
            // Add here your own user logic, store profiles, create new users on your tables...you name it!
            // Typically you'll want to store at least, user id, name and access tokens
            // if you want to be able to call the API on behalf of your users.

            // This is also the moment to log in your users if you're using Laravel's Auth class
            // Auth::login($user) should do the trick.

            Session::put('access_token', $token);

            return Redirect::to('/')->with('flash_notice', 'Congrats! You\'ve successfully signed in!');
        }

        return Redirect::route('twitter.error')->with('flash_error', 'Crab! Something went wrong while signing you up!');
    }
}]);

Route::get('twitter/error', ['as' => 'twitter.error', function () {
    // Something went wrong, add your own error handling here
}]);

Route::get('twitter/logout', ['as' => 'twitter.logout', function () {
    Session::forget('access_token');

    return Redirect::to('/')->with('flash_notice', 'You\'ve successfully logged out!');
}]);

Route::get('/feeds', function () {
    return Twitter::getUserTimeline(['screen_name' => 'rajikaimal', 'count' => 2, 'format' => 'json']);
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/
Route::group(['middleware' => ['web']], function () {
    //
});
Route::group(['middleware' => 'web'], function () {
    Route::auth();
    Route::get('/home', 'HomeController@index');
});
