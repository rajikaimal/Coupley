<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Feedback;

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
            ['firstname' => 'Isuru', 'lastname' => ' Dilhan', 'email' => 'isuru.dilhan@yahoo.com', 'job' => 'Web developer', 'role' => 'admin', 'password' => Hash::make('Secret123/')],
            ];

            // Loop through each user above and create the record for them in the database
            foreach ($users as $user) {
                User::create($user);
            }
        $feedbacks = [
            ['user' => 'Ryan', 'category' => 'timeline', 'description' => 'Awsome'],
            ['user' => 'Chris', 'category' => 'activity', 'description' => 'Superb'],
            ['user' => 'Alo', 'category' => 'chat', 'description' => 'nice emojies'],
            ['user' => 'Tiffany', 'category' => 'privacy', 'description' => 'She is annoying'],
            ['user' => 'Isuru', 'category' => 'other', 'description' => 'Nice quiz'],
        ];

        foreach ($feedbacks as $feedback) {
            Feedback::create($feedback);
        }

        Model::reguard();
    }
}
