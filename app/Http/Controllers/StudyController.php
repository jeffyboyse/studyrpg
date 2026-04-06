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
            'subject' => 'required|string',
        ]);

        $xp = $request->minutes * 10;

        StudySession::create([
            'user_id'   => Auth::id(),
            'minutes'   => $request->minutes,
            'xp_earned' => $xp,
            'subject'   => $request->subject,
        ]);

        $user = Auth::user();
        $user->xp += $xp;
        $user->save();

        // === mobs ===
        $quizzes = [
            'Engelska' => [
                ['q' => 'What is the past tense of "go"?', 'a' => 'went', 'options' => ['goed', 'went', 'gone', 'go']],
                ['q' => 'How do you say "Hej" in English?', 'a' => 'Hello', 'options' => ['Goodbye', 'Hello', 'Thanks', 'Sorry']],
                ['q' => 'What does "however" mean?', 'a' => 'Men', 'options' => ['Och', 'Men', 'Eller', 'Fast']],
            ],
            'Matte' => [
                ['q' => 'Vad är 12 × 8?', 'a' => '96', 'options' => ['86', '96', '104', '112']],
                ['q' => 'Vad är roten ur 64?', 'a' => '8', 'options' => ['6', '7', '8', '9']],
                ['q' => 'Vad är 25% av 200?', 'a' => '50', 'options' => ['40', '50', '60', '75']],
            ],
            'Historia' => [
                ['q' => 'När startade andra världskriget?', 'a' => '1939', 'options' => ['1914', '1939', '1945', '1918']],
                ['q' => 'Vem var Sveriges första kvinnliga statsminister?', 'a' => 'Magdalena Andersson', 'options' => ['Anna Lindh', 'Magdalena Andersson', 'Annie Lööf', 'Ulla Löfven']],
            ],
            // Kan lägga till fler ämnen senare, eller använda en databas eller API istället för att hårdkoda frågorna
        ];

        $questions = $quizzes[$request->subject] ?? $quizzes['Engelska'];

        return redirect()->back()->with([
            'success'    => "Session sparad! Du fick {$xp} XP.",
            'subject'    => $request->subject,
            'questions'  => $questions,
            'bonusXP'    => 30   // om man klarar quizzen :cheeky, man kommer inte klara det:>
        ]);
    }
}