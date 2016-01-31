<?php

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

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

        $users = [
                    ['firstname' => 'Ryan', 'lastname' => ' Chenkie', 'email' => 'ryanchenkie@gmail.com', 'gender' => 'male', 'username' => 'ryan', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('secret')],
                    ['firstname' => 'Chris', 'lastname' => ' Chenkie', 'email' => 'chris@gmail.com', 'gender' => 'male', 'username' => 'chris', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('secret')],
                    ['firstname' => 'Alo', 'lastname' => ' Chenkie', 'email' => 'alo@gmail.com', 'gender' => 'male', 'username' => 'alo', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('secret')],
                    ['firstname' => 'Tiffany', 'lastname' => ' Chenkie', 'email' => 'tiffany@gmail.com', 'gender' => 'male', 'username' => 'tiffany', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('secret')],
            ];

            // Loop through each user above and create the record for them in the database
            foreach ($users as $user) {
                User::create($user);
            }

        Model::reguard();
    }
}
