<?php

namespace App\Http\Controllers;

use App\Models\StudySession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class StudyController extends Controller
{
    // Visar study-sidan med användarens data och 5 senaste sessioner
    public function index()
    {
        $user = Auth::user();
        return Inertia::render('Study', [
            'user'     => $user,
            'sessions' => $user->studySessions()->latest()->take(5)->get(),
        ]);
    }

    public function store(Request $request)
    {
        // Kontrollerar att minutes skickades med, är ett heltal och minst 1
        $request->validate([
            'minutes' => 'required|integer|min:1',
        ]);

        // 10 XP per minut
        $xp = $request->minutes * 10;

        // Sparar sessionen i databasen
        StudySession::create([
            'user_id'   => Auth::id(),
            'minutes'   => $request->minutes,
            'xp_earned' => $xp,
        ]);

        // Lägger till XP på användaren och sparar
        $user = Auth::user();
        $user->xp += $xp;
        $user->save();

        // Skickar tillbaka till study-sidan med ett bekräftelsemeddelande
        return redirect()->back()->with('success', "Du fick {$xp} XP! Ny level: {$user->level}");
    }
}