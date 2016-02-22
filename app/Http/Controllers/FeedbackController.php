<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Feedback;
use PHPMailer;

class FeedbackController extends Controller
{
    public function timeline()
    {
        if ($feeds = \DB::select('select * from feedback where category="timeline"')) {
            return response()->json(['feeds' => $feeds, 'status' => 200], 200);
        } else {
            return response()->json(['status' => 505], 505);
        }
    }

    public function activityFeed()
    {
        if ($feeds = \DB::select('select * from feedback where category="activity"')) {
            return response()->json(['feeds' => $feeds, 'status' => 200], 200);
        } else {
            return response()->json(['status' => 505], 505);
        }
    }

    public function privacy()
    {
        if ($feeds = \DB::select('select * from feedback where category="privacy"')) {
            return response()->json(['feeds' => $feeds, 'status' => 200], 200);
        } else {
            return response()->json(['status' => 505], 505);
        }
    }

    public function chat()
    {
        if ($feeds = \DB::select('select * from feedback where category="chat"')) {
            return response()->json(['feeds' => $feeds, 'status' => 200], 200);
        } else {
            return response()->json(['status' => 505], 505);
        }
    }

    public function other()
    {
        if ($feeds = \DB::select('select * from feedback where category="other"')) {
            return response()->json(['feeds' => $feeds, 'status' => 200], 200);
        } else {
            return response()->json(['status' => 505], 505);
        }
    }

    public function markfeed(Request $request)
    {
        $id = $request->id;
        if ($feeds = \DB::table('feedback')->where('id', $id)->delete()) {
            return response()->json(['status' => 201], 201);
        } else {
            return response()->json(['status' => 404], 404);
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
        $mail->Subject = 'COUPLEY password recovery';
        $mail->Body = 'Dear '.$user.', your new password is '.$pwd;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        if (! $mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: '.$mail->ErrorInfo;
        } else {
            echo 'Message has been sent';
        }
    }
}
