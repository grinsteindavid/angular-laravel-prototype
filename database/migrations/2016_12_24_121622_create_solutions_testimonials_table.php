<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSolutionsTestimonialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solutions_testimonials', function (Blueprint $table) {
            $table->integer('solution_id')->unsigned();
            $table->integer('testimonial_id')->unsigned();
            $table->foreign('solution_id')->references('id')->on('solutions');
            $table->foreign('testimonial_id')->references('id')->on('testimonials');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('solutions_testimonials');
    }
}
