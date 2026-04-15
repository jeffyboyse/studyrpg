<?php

namespace App\Http\Controllers;

use App\Models\StudySession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class StudyController extends Controller
{
    //  Visar study-sidan med användarens data
    public function index()
    {
        $user = Auth::user();
        return Inertia::render('Study', [
            'user' => $user,
            'sessions' => $user->studySessions()->latest()->take(5)->get(),
        ]);
    }

    // Sparar en study session när timern skickar data
    public function store(Request $request)
    {
        //  Validerar att "minutes" skickas med och är ett heltal >= 1
        $request->validate([
            'minutes' => 'required|integer|min:1',
        ]);

        //  Beräknar XP (10 XP per minut)
        $xp = $request->minutes * 10;

        //  Skapar en ny rad i study_sessions-tabellen
        StudySession::create([
            'user_id'   => Auth::id(),
            'minutes'   => $request->minutes,
            'xp_earned' => $xp,
            
        ]);

        //  Lägger till XP till användaren och sparar
        $user = Auth::user();
        $user->xp += $xp;
        $user->save();

        //  Skickar tillbaka användaren till study-sidan med ett meddelande
        return redirect()->back()->with('success', "Du fick {$xp} XP! Ny level: {$user->level}");
    }
}