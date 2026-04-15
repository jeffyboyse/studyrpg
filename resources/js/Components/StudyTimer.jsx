// resources/js/Components/StudyTimer.jsx

// Importerar Reacts inbyggda funktioner 
import { useState, useEffect } from 'react';

// Importerar router från Inertia för att kunna skicka data till backend
import { router } from '@inertiajs/react';

// Skapar och exporterar komponenten så den kan användas på andra sidor
export default function StudyTimer() {

    //Skapar tre state-variabler
    const [seconds, setSeconds] = useState(0);        // Räknar sekunder som gått
    const [isRunning, setIsRunning] = useState(false); // Är timern igång?
    const [totalMinutes, setTotalMinutes] = useState(0); // Hur många hela minuter vi har sparat

    // useEffect som startar/stannar timer-intervall varje sekund
    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(s => s + 1);   // Ökar sekunder med 1 varje sekund
            }, 1000);
        }
        return () => clearInterval(interval); // Städar upp när komponenten tas bort
    }, [isRunning]);  // Kör om när isRunning ändras

    // useEffect som sparar XP varje gång en hel minut har gått
    useEffect(() => {
        if (seconds > 0 && seconds % 60 === 0) {        // Varje gång vi nått en hel minut
            const minutes = Math.floor(seconds / 60);   // Omvandlar sekunder till minuter
            setTotalMinutes(minutes);

            // Skickar POST till /study så StudyController sparar XP i databasen
            router.post('/study', { minutes: minutes });
        }
    }, [seconds]);  // Kör om varje gång seconds ändras

    //Funktion som startar/pausar timern
    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    //Funktion som nollställer timern
    const resetTimer = () => {
        setSeconds(0);
        setIsRunning(false);
        setTotalMinutes(0);
    };

    // Beräknar vad som ska visas (minuter och sekunder med nollor)
    const displayMinutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;

    // Returnerar JSX som är det som syns på skärmen
    return (
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md mx-auto">
            <div className="text-center">
                {/* Rubrik */}
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Study Timer</h2>

                {/* Stor timer-visning */}
                <div className="text-8xl font-mono font-bold text-indigo-600 mb-10">
                    {displayMinutes.toString().padStart(2, '0')}:
                    {displaySeconds.toString().padStart(2, '0')}
                </div>

                {/* Knappar */}
                <div className="flex gap-4 justify-center">
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

                {/*Visar info efter varje sparad minut */}
                {totalMinutes > 0 && (
                    <p className="mt-6 text-sm text-gray-500">
                        Denna session: {totalMinutes} minuter → {totalMinutes * 10} XP
                    </p>
                )}
            </div>
        </div>
    );
}