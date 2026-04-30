<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boss extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'subject',
        'hp',
        'current_hp',
        'defeated',
    ];

    // Relation till användaren
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}