// resources/js/Components/ProgressBar.jsx
import { motion } from 'framer-motion';

export default function ProgressBar({ xp, level, nextLevelXp }) {
    const progress = nextLevelXp > 0 ? (xp / nextLevelXp) * 100 : 0;

    return (
        <div className="w-full max-w-md mx-auto mt-6">
            {/* Level header */}
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                    <div className="text-2xl">⭐</div>
                    <div>
                        <p className="text-sm text-gray-500">Level</p>
                        <p className="text-3xl font-bold text-indigo-600">{level}</p>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-sm text-gray-500">XP</p>
                    <p className="font-mono font-semibold">
                        {xp} / {nextLevelXp}
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>

            {/* Titel */}
            <div className="text-center mt-3">
                <p className="text-lg font-medium text-gray-700">
                    {level < 10 ? "Student" : level < 25 ? "Scholar" : level < 50 ? "Mastermind" : "Legend"}
                </p>
            </div>
        </div>
    );
}