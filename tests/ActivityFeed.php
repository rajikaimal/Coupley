<?php

use GuzzleHttp\Client;

class ExampleTest extends TestCase
{
    /**
     * Test getlikestatus@LikeController.
     *
     * @return void
     */
    public function testgetlikestatus()
    {
        $client = new Client(['base_uri' => 'http://localhost:3000/api/']);
        $response = $client->request('GET', 'getlikestatus', [
            'query' => [
                'PostId' => '9',
                'Email' => 'tiffany@gmail.com',
            ],
        ]);

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody());
        $this->assertEquals(false, $data);
    }


}
