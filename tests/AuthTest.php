<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AuthTest extends TestCase
{
    public function testAuth()
    {
    	/*
			Initial authentication success
    	**/
        $this->post('/api/authenticate', ['email' => 'tiffany@gmail.com', 'password' => 'secret'])
             ->seeJsonStructure([
                 'token'
             ]);
        /*
			Initial authentication failure
    	**/
	    $this->post('/api/authenticate', ['email' => 'tiffany@gmail.com', 'password' => 'credentials'])
             ->seeJsonStructure([
                 'error'
             ]);

    }
}
