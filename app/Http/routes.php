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

    // Route::post('status', 'ActivityFeedController@addstatus');
    // Route::get('getstatus', 'ActivityFeedController@getstatus');
    //Return previos chats
    Route::get('getpreviousmsg', 'ThreadController@getPreviousMessage');
    //Delete Messages
    Route::post('deletemessage', 'ThreadController@deletemessage');
    //Retrive likedusers
    Route::get('getlikedusers', 'ThreadController@getLikedUserList');
    //Serch Results of Previous messages
    Route::get('getsearchconv', 'ThreadController@getSearchConv');
    //Serch Results of Previous messages

    Route::get('getonlineusers', 'ThreadController@getOnlineUsers');
    Route::get('getMessage', 'ThreadController@getMessage');
    // Route::get('getpostId', 'ActivityFeedController@getpostId');
    // Route::post('likes', 'LikeController@addlikes');
    // Route::post('likepost', 'LikeController@like');
    // Route::post('unlikepost', 'LikeController@unlike');
    // Route::get('getlikestatus', 'LikeController@getlikestatus');
    // Route::post('comment', 'CommentController@addcomment');
    // Route::get('getcomment', 'CommentController@getcomments');
    // Route::post('share', 'ActivityFeedController@addshare');
    // Route::post('deleteStatus', 'ActivityFeedController@deleteStatus');
    // Route::post('edit_status', 'ActivityFeedController@editStatus');

    //Add a status
       Route::post('status', 'ActivityFeedController@addStatus');
       //Return status
       Route::get('getstatus', 'ActivityFeedController@getStatus');
       //Return logged uder Id
       Route::get('getUserId', 'ActivityFeedController@getUserId');
       //Add a like to the status
       Route::post('likepost', 'LikeController@like');
       //Unlike the status
       Route::post('unlikepost', 'LikeController@unlike');
       //Return liked Users
       Route::get('getLikedUsers', 'LikeController@getLikedUsers');
       //Add a share
       Route::post('sharedStatus', 'ActivityFeedController@sharedStatus');
       //Unshare the status
       Route::post('unsharepost', 'ShareController@unshare');
       //Return share status
       Route::get('getsharestatus', 'ShareController@getsharestatus');
       //Add a comment to the status
       Route::post('addcomment', 'CommentController@addcomment');
       //Return comments data
       Route::get('getcomment', 'CommentController@getcomments');
       //Delete a status
       Route::post('deleteStatus', 'ActivityFeedController@deleteStatus');
       //Edit a status
       Route::post('edit_status', 'ActivityFeedController@editStatus');

   //Retrive Trendslist
    Route::get('gettrendslist', 'TrendsController@gettrends');
    Route::get('gettrendssearchlist', 'TrendsController@getsearchtrends');
    Route::get('gettrendsinitialsearchpost', 'TrendsController@getInitPosttrends');
    Route::get('gettrendssearchpost', 'TrendsController@getPosttrends');
    //

    //Add visitor info
     Route::post('visitorcount', 'VisitorCountController@incrementVisitorCount');
     Route::get('myvisits', 'VisitorCountController@myVisits');
     Route::get('smyvisits', 'VisitorCountController@searchMyVisits');
     Route::get('othervisits', 'VisitorCountController@othersVisits');
     Route::get('sothervisits', 'VisitorCountController@searchOthersVisits');
    /////////

    Route::get('getonlineusers', 'ThreadController@getOnlineUsers');
    // Route::get('getpostId', 'ActivityFeedController@getpostId');
    // Route::post('likes', 'LikeController@addlikes');
    // Route::post('likepost', 'LikeController@like');
    // Route::post('unlikepost', 'LikeController@unlike');
    // Route::get('getlikestatus', 'LikeController@getlikestatus');
    // Route::post('comment', 'CommentController@addcomment');
    // Route::get('getcomment', 'CommentController@getcomments');
    // Route::post('share', 'ActivityFeedController@addshare');
    // Route::post('deleteStatus', 'ActivityFeedController@deleteStatus');
    // Route::post('edit_status', 'ActivityFeedController@editStatus');

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

    //upload multiple photos

    Route::post('profile/uploadmultiple', 'ProfileController@uploadmultiple');
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

    //retrives liked list of persons who have liked a certain user
    Route::get('profile/likedlistme', 'LikeListController@getLikedListMe');

    //retrives likedback list of persons
    Route::get('profile/likedbacklist', 'LikeListController@getLikedBackList');

    //updates main sections info of profile
    Route::post('profile/updatemain', 'ProfileController@updateMain');

    //updates password of user profile
    Route::put('profile/updatepassword', 'ProfileController@updatePassword');
    //reports a user
    Route::post('profile/report', 'ProfileController@reportUser');

    //returns list of suggestions
    Route::get('suggestions', 'SuggestionController@getSuggestions');

    Route::put('profile/lookingfor', 'LookingForController@update');

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
    //block certain user
    Route::post('blockuser', 'UsersController@block');
    //unblock certain user
    Route::post('unblockuser', 'UsersController@Unblock');

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
    //Return Admin profile data
    Route::get('adminprofile', 'UsersController@Adminprofile');
    //Return details of all administrators
    Route::get('adminInfo', 'AdminDetailsController@admins');
    //deactivate administrator
    Route::post('deactivateAdmin', 'AdminDeactivateController@deactivate');

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

    //retrives no of notifications
    Route::get('notifications', 'AdminNotificationController@getNotificationNumber');
    //retrives all unread notifications
    Route::get('notificationlist', 'AdminNotificationController@getNotificationList');
    //sets notifications to read notifications
    Route::get('readNotifications', 'AdminNotificationController@setOne');

});

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
