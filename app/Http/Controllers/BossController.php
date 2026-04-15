<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BossController extends Controller
{
    // Visar alla bosses för användaren
    public function index()
    {
        $user = Auth::user();
        $bosses = $user->bosses()->get();

        // Om användaren inte har några bosses än → skapa de tre ämnesbossarna automatiskt
        if ($bosses->isEmpty()) {
            $this->createDefaultBosses($user);
            $bosses = $user->bosses()->get();
        }

        return Inertia::render('Bosses', [
            'bosses' => $bosses,
            'user' => $user,
        ]);
    }

    // Skapar de tre standard-bossarna för Engelska, Matte och Historia
    private function createDefaultBosses($user)
    {
        $bosses = [
            ['name' => 'Grammar Dragon', 'subject' => 'Engelska', 'hp' => 500],
            ['name' => 'Algebra Titan',  'subject' => 'Matte',     'hp' => 600],
            ['name' => 'History Overlord', 'subject' => 'Historia', 'hp' => 550],
        ];

        foreach ($bosses as $b) {
            Boss::create([
                'user_id'     => $user->id,
                'name'        => $b['name'],
                'subject'     => $b['subject'],
                'hp'          => $b['hp'],
                'current_hp'  => $b['hp'],
                'defeated'    => false,
            ]);
        }
    }

    // När användaren pluggar → minska bossens HP
    public function damage(Request $request, Boss $boss)
    {
        $request->validate(['minutes' => 'required|integer|min:1']);

        $damage = $request->minutes * 10;   // 10 damage per minut (samma som XP)

        $boss->current_hp = max(0, $boss->current_hp - $damage);
        $boss->save();

        // Om HP nått 0 → boss besegrad
        if ($boss->current_hp <= 0) {
            $boss->defeated = true;
            $boss->save();

            // Ge bonus XP till användaren
            $user = Auth::user();
            $bonusXp = $boss->hp * 2;   // Dubbel bonus för att besegra boss
            $user->xp += $bonusXp;
            $user->save();

            return redirect()->back()->with('success', "Du besegrade {$boss->name}! +{$bonusXp} bonus XP!");
        }

        return redirect()->back()->with('success', "Du gjorde {$damage} damage på {$boss->name}!");
    }
}

