<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\User;
use PHPMailer;


class UsersController extends Controller
{
    public function friends()
    {
        try {
            if ($users = \DB::select('SELECT r.id as rowId, CONCAT(u1.firstname,"",u1.lastname) AS user, CONCAT(u2.firstname,"",u2.lastname) AS reported, u2.profilepic,r.description,r.reported_user_id FROM reported r JOIN users AS u1 ON r.user_id = u1.id JOIN users AS u2 ON r.reported_user_id= u2.id where r.status="pending"')) {
                return response()->json(['users' => $users, 'status' => 200], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }

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

    public function recover(Request $request)
    {
        $email = $request->email;
        try {
            if ($this->CheckInternet()) {
            $admin = User::where('email', $email)->first();
                if ($admin) {
                    $newpwd = $this->random_str(10);
                    $pwdHashed = \Hash::make($newpwd);
                    \DB::table('users')->where('email', $email)->update(['password' => $pwdHashed]);

                        if ($this->SendMail($email, $admin->firstname, $newpwd)) {
                            return response()->json(['status' => 207], 207);
                        } else {
                            return response()->json(['status' => 204], 204);
                        }
                }else{
                return response()->json(['status' => 202], 202);
            }
            }else{
                return response()->json(['status' => 203], 203);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }

    public function random_str($length, $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    {
        $str = '';
        $max = mb_strlen($keyspace, '8bit') - 1;
        for ($i = 0; $i < $length; ++$i) {
            $str .= $keyspace[random_int(0, $max)];
        }

        return $str."a1A";
    }

    public function SendMail($email, $user, $pwd)
    {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'ssl://smtp.gmail.com';  // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = 'coupleyteam@gmail.com';                // SMTP username
            $mail->Password = 'COUPLEY123';                           // SMTP password
            $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 465;                                    // TCP port to connect to
            $mail->From = 'coupleyteam@gmail.com';
            $mail->FromName = 'COUPLEY';
            $mail->addAddress($email, $user);     // Add a recipient
            $mail->addReplyTo('coupleyteam@gmail', 'COUPLEY');
            $mail->addBCC('bcc@example.com');
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'COUPLEY password recovery';
            $mail->Body = 'Dear '.$user.', your new password is '.$pwd;
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
            $mail->send();
            return true;
            //echo 'Message sent!';
        } catch (phpmailerException $e) {
            echo 'Please Check Your internet connection'; //Pretty error messages from PHPMailer
               // return false;
        } catch (Exception $e) {
            echo $e->getMessage(); //Boring error messages from anything else!
        }
    }

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
    public function CheckInternet(){
        if (!$sock = @fsockopen('www.google.com', 80)){
            //echo 'offline';
            return false;
        }
        else {
            //echo 'OK';
            return true;
        }
    }
}
