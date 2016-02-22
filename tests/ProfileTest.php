<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use GuzzleHttp\Client;

class ProfileTest extends TestCase
{
    /**
     * Test profile@ProfileController
     *
     * @return void
     */
    public function testProfile()
    {
        $client = new Client(['base_uri' => 'http://localhost:3000/api/']);
        $response = $client->request('GET', 'profile', [
            'query' => [
                'email' => 'tifany@gmail.com'
            ]
        ]);

        $this->assertEquals(200, $response->getStatusCode());

        $data = (array)json_decode($response->getBody());

        $this->assertArrayHasKey('user', $data);
        $this->assertArrayHasKey('status', $data);
    }

    /**
     * Test getlikestatus@ProfileController
     *
     * @return void
     */
    public function testLikeStatus()
    {
        $client = new Client(['base_uri' => 'http://localhost:3000/api/']);
        $response = $client->request('GET', 'likestatus', [
            'query' => [
                'visitorusername' => 'ryan',
                'username' => 'tiffany'
            ]
        ]);

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody());
        $this->assertEquals(false, $data);
    }

    /**
     * Test visitor@ProfileController
     *
     * @return void
     */
    public function testVisitor()
    {
        $client = new Client(['base_uri' => 'http://localhost:3000/api/']);
        $response = $client->request('GET', 'likestatus', [
            'query' => [
                'visitorusername' => 'ryan',
                'username' => 'tiffany'
            ]
        ]);

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody());
        $this->assertEquals(false, $data);
    }
}
