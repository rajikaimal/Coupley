<?php
/**
 * Created by IntelliJ IDEA.
 * User: isuru
 * Date: 3/19/16
 * Time: 8:10 AM.
 */
namespace App\Http\Controllers;

use PHPMailer;

class EmailController extends Controller
{
    /**
     * SendMail uses to send a mail
     * to the users.
     * @param receiverEmail $email
     * @param receiverName  $userName
     * @param Subject       $subject
     * @param content       $content
     *
     * @return bool
     */
    public function SendMail($email, $userName, $subject, $content)
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
            $mail->addAddress($email, $userName);                 // Add a recipient
            $mail->addReplyTo('coupleyteam@gmail', 'COUPLEY');
            $mail->addBCC('bcc@example.com');
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = $subject;
            $mail->Body = $content;
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
            $mail->send();

            return true;
        } catch (phpmailerException $e) {
            //echo 'Please Check Your internet connection';
            return false;
        } catch (Exception $e) {
            return false;
        }
    }
}
