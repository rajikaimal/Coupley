<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use GuzzleHttp\Client;

class AdminTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        /*
      Initial authentication success
  **/
        $this->post('/api/authenticate', ['email' => 'isuru.dilhan@yahoo.com', 'password' => 'Secret123/'])
            ->seeJsonStructure([
                'token',
            ]);
        /*
            Initial authentication failure
    	**/
        $this->post('/api/authenticate', ['email' => 'isuru.dilhan@yahoo.com', 'password' => 'Not the password'])
            ->seeJsonStructure([
                'error',
            ]);
    }
}
