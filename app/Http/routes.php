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

Route::get('/api/login', function () {
    return 'Done';
});

Route::group(['prefix' => 'api'], function () {
    //authenticate users with AuthenticateController
    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    //Register new users with RegisterConroller@register
    Route::post('register', 'RegisterController@check');
    //Return profile data
    Route::get('profile', 'ProfileController@profile');
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
    Route::get('profile/feed', 'ProfileController@getposts');
    //Returns about data
    Route::get('profile/about', 'ProfileController@getabout');
    //Edit About section
    Route::put('profile/edit/summary', 'ProfileController@editsummary');
     
    Route::put('profile/edit/life', 'ProfileController@editlife');
    Route::put('profile/edit/goodat', 'ProfileController@editgoodat');
    Route::put('profile/edit/thinkingof ', 'ProfileController@editthinkingof');
    Route::put('profile/edit/favs ', 'ProfileController@editfavs');
});

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
    Route::get('blocked', 'UsersController@blocked');
    //Register new admins with RegisterConroller@register
    Route::post('registerAdmin', 'AdminRegisterController@checks');
    //Update admins
    Route::post('updateAdmin', 'AdminRegisterController@update');
    //update admin passwords
    Route::post('reset', 'AdminPwdController@reset');
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
