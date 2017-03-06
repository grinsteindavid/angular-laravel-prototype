<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('roles')->insert(['role' => 'general']);
      DB::table('roles')->insert(['role' => 'client']);
      DB::table('roles')->insert(['role' => 'admin']);

      DB::table('people')->insert([
        'first_name' => 'david',
        'last_name' => 'miranda',
        'gender' => 'Hombre',
        'date_of_birth' => Carbon::now(),
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
      ]);

      DB::table('users')->insert([
        'email' => 'admin@email.com',
        'password' => bcrypt('123123'),
        'role_id' => 3,
        'person_id' => 1,
        'status' => true,
        'image' => 'profiles_pictures/default.jpg',
        'token_lifetime' => Carbon::now()->addWeeks(1),
        'api_token' => bcrypt(str_random(60)),
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
      ]);
    }
}
