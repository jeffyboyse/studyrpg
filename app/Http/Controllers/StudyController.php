<?php

namespace App\Http\Controllers;

use App\Models\StudySession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class StudyController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return Inertia::render('Study', [
            'user' => $user,
            'sessions' => $user->studySessions()->latest()->take(5)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'minutes' => 'required|integer|min:1',
        ]);

        $xp = $request->minutes * 10;

        StudySession::create([
            'user_id' => Auth::id(),
            'minutes' => $request->minutes,
            'xp_earned' => $xp,
        ]);

        $user = Auth::user();
        $user->xp += $xp;
        $user->save();

        return redirect()->back()->with('success', "Du fick {$xp} XP! Level: {$user->level}");
    }
}