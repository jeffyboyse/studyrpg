import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ currentXP, level }) {
  const xpToNextLevel = level * 100; // enkel formel
  const progress = Math.min((currentXP % 100) / 100 * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>Level {level}</span>
        <span>{currentXP} XP</span>
      </div>
      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1 text-center">
        {100 - Math.floor(progress)} XP till nästa level
      </p>
    </div>
  );
}