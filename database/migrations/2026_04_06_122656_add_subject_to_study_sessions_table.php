<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('study_sessions', function (Blueprint $table) {
            $table->string('subject')->nullable()->after('xp_earned');
        });
        Schema::create('bosses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('subject');
            $table->integer('hp');
            $table->integer('current_hp');
            $table->integer('required_xp');
            $table->boolean('defeated')->default(false);
            $table->timestamps();
        });

            
       
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('study_sessions', function (Blueprint $table) {
            $table->dropColumn('subject');
        });
        Schema::dropIfExists('bosses');
    }
};
