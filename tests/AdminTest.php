<?php

use GuzzleHttp\Client;

class AdminTest extends TestCase
{
    /*
     * Test AdminAuthenticateController@authenticate.
     *
     * @return void
     */
    // public function testExample()
    // {
    //     /*
    //     Initial authentication success
    //     **/
    //     $this->post('/admin-api/authenticates', ['email' => 'isuru.dilhan@yahoo.com', 'password' => 'Secret123/'])
    //         ->seeJsonStructure(
    //             [
    //                 'token',
    //             ]
    //         );
    //     /*
    //         Initial authentication failure
    // 	**/
    //     $this->post('/admin-api/authenticates', ['email' => 'isuru.dilhan@yahoo.com', 'password' => 'Not the password'])
    //         ->seeJsonStructure(
    //             [
    //                 'error',
    //             ]
    //         );
    // }

    // /**
    //  * Test UsersController@Adminprofile.
    //  *
    //  * @return void
    //  */
    // public function testAdminProfile()
    // {
    //     $client = new Client(['base_uri' => 'http://localhost:3000/admin-api/']);
    //     $response = $client->request(
    //         'GET',
    //         'adminprofile',
    //         [
    //             'query' => [
    //                 'email' => 'isuru.dilhan@yahoo.com',
    //             ],
    //         ]
    //     );

    //     $this->assertEquals(200, $response->getStatusCode());
    //     $data = (array) json_decode($response->getBody());
    //     $this->assertArrayHasKey('admin', $data);
    //     $this->assertArrayHasKey('status', $data);
    // }

    // /**
    //  * Test UsersController@friends.
    //  *
    //  * @return void
    //  */
    // public function testReportedUsers()
    // {
    //     $client = new Client(['base_uri' => 'http://localhost:3000/admin-api/']);
    //     $response = $client->request('GET', 'search');
    //     $this->assertEquals(200, $response->getStatusCode());
    //     $data = (array) json_decode($response->getBody());
    //     $this->assertArrayHasKey('users', $data);
    //     $this->assertArrayHasKey('status', $data);
    // }

    // /**
    //  * Test UsersController@blocked.
    //  *
    //  * @return void
    //  */
    // public function testBlockedUsers()
    // {
    //     $client = new Client(['base_uri' => 'http://localhost:3000/admin-api/']);
    //     $response = $client->request('GET', 'blocked');
    //     $this->assertEquals(200, $response->getStatusCode());
    //     $data = (array) json_decode($response->getBody());
    //     $this->assertArrayHasKey('users', $data);
    //     $this->assertArrayHasKey('status', $data);
    // }

    // /**
    //  * Test FeedbackController@timeline.
    //  *
    //  * @return void
    //  */
    // public function testTimelineFeed()
    // {
    //     $client = new Client(['base_uri' => 'http://localhost:3000/admin-api/']);
    //     $response = $client->request('GET', 'timeline');
    //     $this->assertEquals(200, $response->getStatusCode());
    //     $data = (array) json_decode($response->getBody());
    //     $this->assertArrayHasKey('feeds', $data);
    //     $this->assertArrayHasKey('status', $data);
    // }
}
