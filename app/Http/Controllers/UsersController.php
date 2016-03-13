<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Feedback;
use PHPMailer;

class UsersController extends Controller
{
    /**
     * friends uses to retrieve reported user data.
     *
     *
     * @return json
     */
    public function friends()
    {
        try {
            if ($users = \DB::select('SELECT r.id as rowId, CONCAT(u1.firstname,"",u1.lastname) AS user,
                          CONCAT(u2.firstname,"",u2.lastname) AS reported, u2.profilepic,r.description,
                          r.reported_user_id FROM reported r JOIN users AS u1 ON r.user_id = u1.id JOIN
                          users AS u2 ON r.reported_user_id= u2.id where r.status="pending"')) {
                return response()->json(['users' => $users, 'status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }

    /**
     * blocked uses to retrieve blocked user data.
     *
     *
     * @return json
     */
    public function blocked()
    {
        try {
            if ($users = \DB::select('select * from users where status="deactive" and role="user"')) {
                return response()->json(['users' => $users, 'status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }

    /**
     * block uses to block reported users.
     *
     * @param id        $request
     *
     *
     * @return json
     */
    public function block(Request $request)
    {
        $id = $request->id;
        $rowId = $request->rowId;
        try {
            if ($users = \DB::table('users')->where('id', $id)->update(['status' => 'deactive'])) {
                \DB::table('reported')->where('id', $rowId)->update(['status' => 'reviewed']);

                return response()->json(['status' => 201], 201);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }

    /**
     * Unblock uses to unblock blocked users.
     *
     * @param id        $request
     *
     * @return json
     */
    public function Unblock(Request $request)
    {
        $id = $request->id;
        try {
            if ($users = \DB::table('users')->where('id', $id)->update(['status' => 'active'])) {
                return response()->json(['status' => 201], 201);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }

    /**
     * recover uses to recover password,
     * when user forgot the password.
     * @param email        $request
     *
     * @return json
     */
    public function recover(Request $request)
    {
        $email = $request->email;
        try {
            if ($this->CheckInternet()) {
                $admin = User::where('email', $email)->where('role', 'admin')->first();
                if ($admin) {
                    $newpwd = $this->randomStr();
                    $pwdHashed = \Hash::make($newpwd);
                    \DB::table('users')->where('email', $email)->update(['password' => $pwdHashed]);
                    if ($this->SendMail($email, $admin->firstname, $newpwd)) {
                        return response()->json(['status' => 207], 207);
                    } else {
                        return response()->json(['status' => 204], 204);
                    }
                } else {
                    return response()->json(['status' => 202], 202);
                }
            } else {
                return response()->json(['status' => 203], 203);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }

    /**
     * randomStr uses to generate new password,
     * when user forgot the password.
     *
     *
     * @return string
     */
    public function randomStr()
    {
        $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $newpwd = '';
        for ($i = 0; $i <= 10; $i++) {
            $newpwd .= $characters[rand(0, strlen($characters) - 1)];
        }
        $characters = '0123456789';
        $randNum = 0;
        for ($i = 0; $i <= 5; $i++) {
            $randNum .= $characters[rand(0, strlen($characters) - 1)];
        }
        $newpwd = $newpwd.$randNum;

        return $newpwd;
    }

    /**
     * SendMail uses to send a mail
     * to the users.
     * @return bool
     */
    public function SendMail($email, $user, $pwd)
    {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'ssl://smtp.gmail.com';                 // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = 'coupleyteam@gmail.com';            // SMTP username
            $mail->Password = 'COUPLEY123';                       // SMTP password
            $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 465;                                    // TCP port to connect to
            $mail->From = 'coupleyteam@gmail.com';
            $mail->FromName = 'COUPLEY';
            $mail->addAddress($email, $user);                     // Add a recipient
            $mail->addReplyTo('coupleyteam@gmail', 'COUPLEY');
            $mail->addBCC('bcc@example.com');
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'COUPLEY password recovery';
            $mail->Body = 'Dear '.$user.', your new password is '.$pwd;
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
            $mail->send();

            return true;
        } catch (phpmailerException $e) {
            //echo 'Please Check Your internet connection';       //Pretty error messages from PHPMailer
            return false;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    /**
     * Adminprofile uses to retrieve,
     * logged in administrator's data.
     *
     *
     * @return string
     */
    public function Adminprofile(Request $request)
    {
        $email = $request->email;
        try {
            $admindetails = User::where('email', $email)->get();

            return response()->json(['admin' => $admindetails, 'status' => 200]);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
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

    /**
     * posts feedback from users.
     *
     * @param id        $request
     *
     * @return json
     */
    public function postFeedback(Request $request)
    {
        $username = $request->username;
        $description = $request->comment;
        $category = $request->type;

        $feedback = new Feedback;
        $feedback->user = $username;
        $feedback->description = $description;
        $feedback->category = $category;

        if ($feedback->save()) {
            return response()->json(['status' => 200, 'done' => true], 200);
        } else {
            return response()->json(['status' => 200, 'done' => false], 200);
        }
    }
}
