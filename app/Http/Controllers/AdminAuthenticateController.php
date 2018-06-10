<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use App\Admin;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;

class AdminAuthenticateController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }

    public function index(Request $request)
    {
        $admins = User::find($request)->where('role', 'admin');

        return $admins;
    }

    /**
     * authenticates whether user is a administrator or not,
     *  if user is a administrator, then jwt { jason web token } will be created.
     * @param string        $someString
     *
     *
     * @return string
     */
    public function authenticate(Request $request)
    {
        $email = $request->email;
        $credentials = $request->only('email', 'password');
        $admin = \DB::select('select * from users where role="admin" and email = "'.$email.'"');
        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // if no errors are encountered we can return a JWT
        // update admin status to active
        if ($admin) {
            \DB::table('users')->where('email', $email)->update(['status' => 'active']);

            return response()->json(compact('token'));
        } else {
            return response()->json(['status' => 203], 203);
        }
    }
}
