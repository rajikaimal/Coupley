<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Admin;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('admins')->delete();

        $admins = [
            ['firstname' => 'tiffany', 'lastname' => 'khan', 'email' => 'tiffany@gmail.com', 'job' => 'web developer', 'password' => Hash::make('secret')],
            ['firstname' => 'Chris', 'lastname' => 'morris', 'email' => 'chris@gmail.com', 'job' => 'ceo', 'password' => Hash::make('secret')],
            ['firstname' => 'Saint', 'lastname' => 'Cena', 'email' => 'saint@gmail.com', 'job' => 'manager', 'password' => Hash::make('secret')],
            ['firstname' => 'Chris', 'lastname' => 'jerico', 'email' => 'jerico@gmail.com', 'job' => 'engineer', 'password' => Hash::make('secret')],
        ];

        // Loop through each user above and create the record for them in the database
        foreach ($admins as $admin) {
            Admin::create($admin);
        }

        Model::reguard();
    }
}
