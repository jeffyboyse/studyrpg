<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;
        // Relationer till våra nya tabeller
    public function studySessions() { return $this->hasMany(StudySession::class); }
    public function bosses() { return $this->hasMany(Boss::class); }
    public function quests() { return $this->hasMany(Quest::class); }

    // Automatisk level-up (RPG-känsla)
    public function getLevelAttribute()
    {
        return max(1, floor(sqrt($this->xp / 25)) + 1);
    }

    // Titel baserat på level
    public function getTitleAttribute()
    {
        $titles = ['Student', 'Scholar', 'Mastermind', 'Legend'];
        return $titles[min(floor($this->level / 10), 3)];
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
        public function bosses()
    {
        return $this->hasMany(Boss::class);
    }
}
