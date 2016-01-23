<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
            Model::unguard();

	        DB::table('users')->delete();

	        $users = array(
	                ['firstname' => 'Ryan', 'lastname' => ' Chenkie','email' => 'ryanchenkie@gmail.com', 'username' => 'ryan', 'orientation' => 'straight' ,'password' => Hash::make('secret')],
	                ['firstname' => 'Chris', 'lastname' => ' Chenkie','email' => 'chris@gmail.com', 'username' => 'chris', 'orientation' => 'straight' ,'password' => Hash::make('secret')],
	                ['firstname' => 'Alo', 'lastname' => ' Chenkie','email' => 'alo@gmail.com', 'username' => 'alo', 'orientation' => 'straight' ,'password' => Hash::make('secret')],
	                ['firstname' => 'Tiffany', 'lastname' => ' Chenkie','email' => 'tiffany@gmail.com', 'username' => 'tiffany', 'orientation' => 'straight' ,'password' => Hash::make('secret')],
	        );
	            
	        // Loop through each user above and create the record for them in the database
	        foreach ($users as $user)
	        {
	            User::create($user);
	        }

	        Model::reguard();
	    
    }
}
