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

Route::get('/api/login', function() {
	return "Done";
});

Route::group(['prefix' => 'api'], function()
{
    //authenticate users with AuthenticateController
    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    //Register new users with RegisterConroller@register
    Route::post('register', 'RegisterController@check');
    //Return profile data
    Route::get('profile', 'ProfileController@profile');
    //Return userslist for search
    Route::get('search', 'SearchController@search');
    
});

/*
	Dashboard route
	Handles Admin panel of Coupley
    @author isurudilhan
*/

Route::get('/cp-admin', function() {
    return view('init_admin');
});

Route::group(['prefix' => 'admin-api'], function()
{
    Route::resource('authenticate', 'AdminAuthenticateController', ['only' => ['indexs']]);
    Route::post('authenticate', 'AdminAuthenticateController@authenticate');
    //Return userslist
    Route::get('search', 'UsersController@friends');
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
