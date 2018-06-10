<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;

class AdminPwdController extends Controller
{
    /**
     * reset uses to check,
     * whether user is registered,
     *  if it is, then update new password.
     *
     * @return string
     */
    public function reset(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $newpassword = $request->newpassword;
        $mail = $request->email;
        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials', 'status' => 201], 201);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token', 'status' => 500], 500);
        }
        // if no errors update the new password
        {
            if ($this->CheckInternet()) {
                $adminName = \DB::select('SELECT firstname FROM users WHERE email = "'.$mail.'"');
                $sendMail = new EmailController();
                $content = 'Dear Administrator, your updated password is '.$newpassword;
                $subject = 'COUPLEY Password Update';
                $sendMail->SendMail($mail, $adminName[0]->firstname, $subject, $content);
                $hashed = \Hash::make($newpassword);
                \DB::table('users')
                    ->where('email', $mail)
                    ->update(['password' => $hashed]);

                return response()->json(['password' => 'uptodate', 'status' => 200], 200);
            } else {
                return response()->json(['error' => 'No_network', 'status' => 203], 203);
            }
        }
    }

    /**
     * CheckInternet uses to check,
     * whether internet is connected.
     *
     *
     * @return bool
     */
    public function CheckInternet()
    {
        if (! $sock = @fsockopen('www.google.com', 80)) {
            //echo 'offline';
            return false;
        } else {
            //echo 'OK';
            return true;
        }
    }
}
