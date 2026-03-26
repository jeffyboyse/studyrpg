import React from 'react';
import { usePage } from '@inertiajs/react';
import StudyTimer from '../Components/StudyTimer';
import ProgressBar from '../Components/ProgressBar';

export default function Study() {
  const { auth, flash } = usePage().props;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2">📖 Plugga som ett RPG</h1>
        <p className="text-center text-xl text-gray-600 mb-10">
          Du är <span className="font-bold">{auth.user.title}</span> • Level {auth.user.level}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Timer */}
          <div>
            <StudyTimer />
          </div>

          {/* XP & Level */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <ProgressBar currentXP={auth.user.xp} level={auth.user.level} />
          </div>
        </div>

        {flash?.success && (
          <div className="mt-8 bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-2xl text-center font-medium">
            {flash.success}
          </div>
        )}
      </div>
    </div>
  );
}