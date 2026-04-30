<?php

namespace App\Http\Controllers;

use App\Models\Boss;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BossController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $bosses = $user->bosses()->get();

        // Skapa standardbossar första gången
        if ($bosses->isEmpty()) {
            $this->createDefaultBosses($user);
            $bosses = $user->bosses()->get();
        }

        return Inertia::render('Bosses', [
            'bosses' => $bosses,
        ]);
    }

    private function createDefaultBosses($user)
    {
        $bossesData = [
            ['name' => 'Grammar Dragon', 'subject' => 'Engelska', 'hp' => 500],
            ['name' => 'Algebra Titan',  'subject' => 'Matte',     'hp' => 600],
            ['name' => 'History Overlord', 'subject' => 'Historia', 'hp' => 550],
        ];

        foreach ($bossesData as $data) {
            Boss::create([
                'user_id'    => $user->id,
                'name'       => $data['name'],
                'subject'    => $data['subject'],
                'hp'         => $data['hp'],
                'current_hp' => $data['hp'],
                'defeated'   => false,
            ]);
        }
    }

    public function damage(Request $request, Boss $boss)
    {
        $request->validate([
            'minutes' => 'required|integer|min:1',
        ]);

        $damage = $request->minutes * 10;

        $boss->current_hp = max(0, $boss->current_hp - $damage);
        $boss->save();

        if ($boss->current_hp <= 0) {
            $boss->defeated = true;
            $boss->save();

            $user = Auth::user();
            $bonusXp = $boss->hp; 
            $user->xp += $bonusXp;
            $user->save();

            return redirect()->back()->with('success', "🎉 Du besegrade {$boss->name}! +{$bonusXp} XP!");
        }

        return redirect()->back()->with('success', "Du gjorde {$damage} damage på {$boss->name}!");
    }
}