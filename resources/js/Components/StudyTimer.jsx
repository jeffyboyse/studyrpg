import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function StudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60);

  const saveSession = () => {
    if (minutes > 0) {
      router.post('/study', { minutes: minutes });
      setSeconds(0);
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-6">⏳ Study Timer</h2>
      
      <div className="text-7xl font-mono mb-8">
        {String(minutes).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all ${
            isRunning 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isRunning ? '⏸ Pausa' : '▶ Starta'}
        </button>

        <button
          onClick={saveSession}
          disabled={minutes === 0}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl transition-all disabled:opacity-50"
        >
          ✅ Spara session ({minutes} min = {minutes * 10} XP)
        </button>
      </div>
      
      <p className="text-sm text-gray-500 mt-6">
        1 minut = 10 XP
      </p>
    </div>
  );
}