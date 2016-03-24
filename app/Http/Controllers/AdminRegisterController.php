<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Controllers\EmailController;

class AdminRegisterController extends Controller
{
    /**
     * checks whether same email is available
     *  or not, then register new admin.
     *
     * @param string        $someString
     *
     *
     * @return json
     */
    public function checks(Request $request)
    {
        $email = $request->email;
        $admin = User::where('email', $email)->first();
        if ($admin == null) {
            $admin = new User;
            $admin->firstname = $request->firstname;
            $admin->lastname = $request->lastname;
            $admin->username = $request->firstname.$request->lastname;
            $admin->job = $request->job;
            $admin->email = $request->email;
            $admin->role = 'admin';
            $admin->password = \Hash::make($request->password);
            if ($this->CheckInternet()) {
                if ($admin->save()) {
                    $sendMail = new EmailController();
                    $content = 'Dear '.$admin->firstname.', You are assigned as an Administrator of COUPLEY Team.
                    Your Email is '.$admin->email.' & Password is '.$request->password.'  Please visit
                    WWW.COUPLEY.COM/cp-admin#/AdminLogin';
                    $subject = 'COUPLEY Administrator Registration';
                    $sendMail->SendMail($admin->email, $admin->firstname, $subject, $content);

                    return response()->json(['status' => 201], 201);
                } else {
                    return response()->json(['status' => 404], 404);
                }
            } else {
                return response()->json(['status' => 203], 203);
            }
        } else {
            return response()->json(['status' => 200], 200);
        }
    }

    /**
     * checks whether new email is already in the database
     * old and new email can be similler for the selected admin only.
     *
     * @param string        $someString
     *
     * @return string
     */
    public function update(Request $request)
    {
        $email = $request->email;
        $id = $request->id;
        $job = $request->job;
        $firstname = $request->firstname;
        $lastname = $request->lastname;
        $admin = \DB::select('SELECT email FROM users WHERE email = "'.$email.'" not in
                                            (select email from users where id!='.$id.')');
        if ($this->CheckInternet()) {
            if ($admin == null) {
                //update
                \DB::table('users')
                    ->where('id', $id)
                    ->update(['firstname' => $firstname, 'lastname' => $lastname, 'job' => $job, 'email' => $email]);

                $sendMail = new EmailController();
                $content = 'Dear '.$firstname.', Your profile been Updated.
                    Your Email is '.$email.' Please visit
                    WWW.COUPLEY.COM/cp-admin#/AdminLogin';
                $subject = 'COUPLEY Administrator Update';
                $sendMail->SendMail($email, $firstname, $subject, $content);

                return response()->json(['you can use this email' => $admin, 'status' => 200], 200);
            } else {
                return response()->json(['email' => 'email already exists', 'status' => 201], 201);
            }
        } else {
            return response()->json(['status' => 203], 203);
        }
    }

    /**
     * uploads the profile picture
     *  to the server.
     * @param string        $someString
     *
     * @return jason
     */
    public function uploadpic(Request $request)
    {
        $destination = 'img/profilepics';
        try {
            $apitoken = $request->input('apitoken');
            $id = $request->input('id');
            $ext = $request->file('file')->getClientOriginalExtension();
            $file = $request->file('file')->move($destination, $id.'i'.'.'.$ext);
            User::where('id', $id)
                ->update(['profilepic' => $id.'i'.'.'.$ext]);

            return response()->json(['status' => 200, 'done' => true], 200);
        } catch (Exception $e) {
            return response()->json(['status' => 201, 'done' => false], 200);
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
