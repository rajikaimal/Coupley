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
                    ['firstname' => 'Ryan', 'lastname' => ' Reynolds', 'email' => 'ryan@gmail.com', 'gender' => 'male', 'username' => 'ryan', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('rR12356')],
                    ['firstname' => 'Roam', 'lastname' => ' Guptil', 'email' => 'roam@gmail.com', 'gender' => 'male', 'username' => 'roam', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('rR12356')],
                    ['firstname' => 'Relative', 'lastname' => ' Zuckerberg', 'email' => 'batman@gmail.com', 'gender' => 'male', 'username' => 'batman', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('rR12356')],
                    ['firstname' => 'Ryan', 'lastname' => ' Higa', 'email' => 'higa@gmail.com', 'gender' => 'male', 'username' => 'higa', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('rR12356')],
                    ['firstname' => 'Rnp', 'lastname' => ' Harrison', 'email' => 'rnp@gmail.com', 'gender' => 'male', 'username' => 'rnp', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('rR12356')],
                    ['firstname' => 'Resmond', 'lastname' => ' Lost', 'email' => 'resmond@gmail.com', 'gender' => 'male', 'username' => 'resmond', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('rR12356')],
                    ['firstname' => 'Renal', 'lastname' => ' Queen', 'email' => 'widow@gmail.com', 'gender' => 'male', 'username' => 'widow', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('rR12356')],
                    ['firstname' => 'Reymond', 'lastname' => ' Stone', 'email' => 'stone@gmail.com', 'gender' => 'male', 'username' => 'stone', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('rR12356')],
                    ['firstname' => 'Chris', 'lastname' => 'james', 'email' => 'chris@gmail.com', 'gender' => 'male', 'username' => 'chris', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('cC123456')],
                    ['firstname' => 'Han', 'lastname' => 'Solo', 'email' => 'alo@gmail.com', 'gender' => 'male', 'username' => 'alo', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('rR12356')],
                    ['firstname' => 'Tiffany', 'lastname' => 'Hwang', 'email' => 'tiffany@gmail.com', 'gender' => 'female', 'username' => 'tiffany', 'orientation' => 'straight', 'birthday' => '1994-08-01', 'country' => 'Sri Lanka', 'role' => 'user', 'password' => Hash::make('tT123456')],
                    ['firstname' => 'Isuru', 'lastname' => ' Dilhan', 'email' => 'isuru.dilhan@yahoo.com', 'job' => 'Web developer','superAdmin'=>'yes', 'role' => 'admin', 'password' => Hash::make('Secret123/')],
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
