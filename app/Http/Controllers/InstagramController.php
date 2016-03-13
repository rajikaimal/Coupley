<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;

class InstagramController extends Controller
{
    public function getPhotos(Request $request)
    {
    	$instagram_url = "https://api.instagram.com/oauth/authorize/?client_id=ce95bac6c6e840eea2bb5a67b072d5b2&redirect_uri=localhost:3000&response_type=token";
    }
    public function init(Request $request)
    {
    	//$instagram_url = "https://api.instagram.com/oauth/authorize/?client_id=ce95bac6c6e840eea2bb5a67b072d5b2&redirect_uri=localhost:3000&response_type=code";
    }
    public function auth(Request $request)
    {
    	$code = $request->code;
    	$insta_url = 'https://api.instagram.com/oauth/access_token';
    	

  //   	$url = 'http://server.com/path';
		// $data = array('client_id' => 'ce95bac6c6e840eea2bb5a67b072d5b2', 'client_secret' => 'a52e6cafd2374377942e9bd6fdcb96d7', 'grant_type' => 'authorization_code' , 'redirect_uri' => 'http://localhost:3000/instagram/init', 'code' => $code);

		// // use key 'http' even if you send the request to https://...
		// $options = array(
		//     'http' => array(
		//         'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
		//         'method'  => 'POST',
		//         'content' => http_build_query($data),
		//     ),
		// );
		// $context  = stream_context_create($options);
		// $result = file_get_contents($insta_url, false, $context);
		// if ($result === FALSE) { /* Handle error */ }

		// var_dump($result);
    	//$client = new Client(['base_uri' => 'https://api.instagram.com/oauth/access_token']);

    	$client = new Client();
    	$response = $client->request('POST', 'https://api.instagram.com/oauth/access_token', [
            'form_params' => [
                'client_id' => 'ce95bac6c6e840eea2bb5a67b072d5b2',
	            'client_secret' => 'a52e6cafd2374377942e9bd6fdcb96d7',
	            'grant_type' => 'authorization_code',
	            'redirect_uri' => 'http://localhost:3000/instagram/authenticate',
	            'code' => $code
            ],
        ]);

    	var_dump($response);

        // $response = $client->post('https://api.instagram.com/oauth/access_token', array('body' => array(
        //     'client_id' => 'ce95bac6c6e840eea2bb5a67b072d5b2',
        //     'client_secret' => 'a52e6cafd2374377942e9bd6fdcb96d7',
        //     'grant_type' => 'authorization_code',
        //     'redirect_uri' => 'http://localhost:3000/instagram/init',
        //     'code' => $code
        // )));

	// 	$url = "https://api.instagram.com/oauth/access_token";
	//     $access_token_parameters = array(
	//         'client_id'                =>     'ce95bac6c6e840eea2bb5a67b072d5b2',
	//         'client_secret'            =>     'a52e6cafd2374377942e9bd6fdcb96d7',
	//         'grant_type'               =>     'authorization_code',
	//         'redirect_uri'             =>     'http://localhost:3000/instagram/init',
	//         'code'                     =>     $code
	//     );

	// $curl = curl_init($url);    // we init curl by passing the url
	//     curl_setopt($curl,CURLOPT_POST,true);   // to send a POST request
	//     curl_setopt($curl,CURLOPT_POSTFIELDS,$access_token_parameters);   // indicate the data to send
	//     curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);   // to return the transfer as a string of the return value of curl_exec() instead of outputting it out directly.
	//     curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);   // to stop cURL from verifying the peer's certificate.
	//     $result = curl_exec($curl);   // to perform the curl session
	//     curl_close($curl);   // to close the curl session

	//     $arr = json_decode($result,true);
    
    }
}
