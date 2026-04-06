import React from 'react';

export default function ProgressBar({ currentXP, level }) {
  const progress = Math.min((currentXP % 100) / 100 * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1 font-medium">
        <span>Level {level}</span>
        <span>{currentXP} XP</span>
      </div>
      
      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-xs text-gray-500 mt-1 text-center">
        {100 - Math.floor(progress)} XP till nästa level
      </p>
    </div>
  );
}