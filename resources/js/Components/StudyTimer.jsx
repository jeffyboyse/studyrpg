import { useState, useEffect } from 'react';
import ProgressBar from '@/Components/ProgressBar';
import { router, usePage } from '@inertiajs/react';
 
export default function StudyTimer({ onSaved }) {
 
    const { auth } = usePage().props;
    const user = auth.user;
 
    const nextLevelXp = Math.pow(user.level, 2) * 25;
 
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [subject, setSubject] = useState('Engelska');
 
    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);
 
    const toggleTimer = () => setIsRunning(!isRunning);
 
    const resetTimer = () => {
        setSeconds(0);
        setIsRunning(false);
    };
 
    const saveSession = () => {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 1) return;
 
        setIsRunning(false);
 
        router.post('/study', { minutes, subject }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Triggar refresh() i SessionHistory efter sparad session
                onSaved?.();
            },
        });
    };
 
    const displayMinutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    const earnedXp = displayMinutes * 10;
 
    return (
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md mx-auto">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Study Timer</h2>
 
                <ProgressBar
                    xp={user.xp}
                    level={user.level}
                    nextLevelXp={nextLevelXp}
                />
 
                <div className="text-8xl font-mono font-bold text-indigo-600 my-10">
                    {displayMinutes.toString().padStart(2, '0')}:
                    {displaySeconds.toString().padStart(2, '0')}
                </div>
 
                <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium"
                >
                    <option>Engelska</option>
                    <option>Matte</option>
                    <option>Historia</option>
                </select>
 
                <div className="flex gap-4 justify-center mb-4">
                    <button
                        onClick={toggleTimer}
                        className={`px-10 py-4 rounded-2xl text-lg font-semibold transition-all ${
                            isRunning
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        }`}
                    >
                        {isRunning ? 'PAUSA' : 'STARTA'}
                    </button>
 
                    <button
                        onClick={resetTimer}
                        className="px-8 py-4 rounded-2xl text-lg font-semibold bg-gray-200 hover:bg-gray-300 transition-all"
                    >
                        ÅTERSTÄLL
                    </button>
                </div>
 
                <button
                    onClick={saveSession}
                    disabled={displayMinutes < 1}
                    className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all ${
                        displayMinutes >= 1
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {displayMinutes >= 1
                        ? `💾 Spara session (+${earnedXp} XP)`
                        : 'Studera minst 1 minut för att spara'}
                </button>
            </div>
        </div>
    );
}