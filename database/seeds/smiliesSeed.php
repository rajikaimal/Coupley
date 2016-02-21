<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Thread;
class smiliesSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('smilies')->insert([
              ['symbol' => ':S','image_name'=>'worried55231.gif']
              ['symbol' => '(wasntme)','image_name'=>'itwasntme55198.gif']
              ['symbol' => 'x(','image_name'=>'angry55174.gif']
              ['symbol' => '(doh)','image_name'=>'doh55146.gif']
              ['symbol' => '|-()','image_name'=>'yawn55117.gif']
              ['symbol' => '3:)','image_name'=>'evilgrin55088.gif']
              ['symbol' => '|(','image_name'=>'dull55062.gif']
              ['symbol' => '(blush)','image_name'=>'blush54981.gif']
              ['symbol' => ':P','image_name'=>'tongueout54953.gif']
              ['symbol' => '(:|','image_name'=>'sweat54888.gif']
              ['symbol' => ';(','image_name'=>'crying54854.gif']
              ['symbol' => ':)','image_name'=>'smile54593.gif']
              ['symbol' => ':D','image_name'=>'bigsmile54781.gif']
              ['symbol' => '8)','image_name'=>'cool54801.gif']
              ['symbol' => ';)','image_name'=>'wink54827.gif']
              ['symbol' => '(mm)','image_name'=>'mmm55255.gif']
              ['symbol' => ':x','image_name'=>'lipssealed55304.gif']

        ]);


    }
}
