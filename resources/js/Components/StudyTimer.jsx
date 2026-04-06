import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

const subjects = ['Engelska', 'Matte', 'Historia', 'Svenska', 'Teknik', 'Fysik', 'Kemi'];

export default function StudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60);

  const saveSession = () => {
    if (minutes > 0 && selectedSubject) {
      Inertia.post('/study', { 
        minutes: minutes, 
        subject: selectedSubject 
      });
      setSeconds(0);
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">⏳ Study Timer</h2>

      {/* Ämnesväljare */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {subjects.map(subject => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`px-5 py-2 rounded-2xl text-sm font-medium transition-all ${
              selectedSubject === subject 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      <div className="text-7xl font-mono mb-8">
        {String(minutes).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all ${
            isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isRunning ? '⏸ Pausa' : '▶ Starta'}
        </button>

        <button
          onClick={saveSession}
          disabled={minutes === 0 || !selectedSubject}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl transition-all disabled:opacity-50"
        >
          ✅ Spara ({minutes} min = {minutes * 10} XP)
        </button>
      </div>

      {!selectedSubject && <p className="text-red-500 text-sm mt-4">Välj ett ämne först!</p>}
    </div>
  );
}