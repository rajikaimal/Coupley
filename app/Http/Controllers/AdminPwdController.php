<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use PHPMailer;

class AdminPwdController extends Controller
{
    public function reset(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $newpassword = $request->newpassword;
        $mail = $request->email;
        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors update the new password
        {   $this->SendMail($mail, 'Administrator', $newpassword);
            $hashed = \Hash::make($newpassword);
            \DB::table('users')
                ->where('email', $mail)
                ->update(['password' => $hashed]);
            //return response()->json(['password' => 'uptodate'], 201);
        }
    }

    public function SendMail($email, $user, $pwd)
    {
        $mail = new PHPMailer;
        $mail->SMTPDebug = 1;                               // Enable verbose debug output
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
//$mail->addAddress('ellen@example.com');               // Name is optional
        $mail->addReplyTo('coupleyteam@gmail', 'COUPLEY');
//$mail->addCC('cc@example.com');
        $mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'COUPLEY password update';
        $mail->Body = 'Dear '.$user.', your updated password is '.$pwd;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        if (! $mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: '.$mail->ErrorInfo;
        } else {
            echo 'Message has been sent';
        }
    }
}