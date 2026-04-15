import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Välkomstheader med RPG-känsla */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-gray-800 mb-2">
                        Välkommen tillbaka, {user.name}!
                    </h1>
                    <p className="text-xl text-gray-600">
                        Du är på nivå <span className="font-bold text-indigo-600">{user.level}</span>
                    </p>
                </div>

                {/* ProgressBar */}
                <ProgressBar 
                    xp={user.xp} 
                    level={user.level} 
                    nextLevelXp={nextLevelXp} 
                />

                {/* Navigationsknappar (Game Menu) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <Link
                        href={route('study')}
                        className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-all group"
                    >
                        <div className="text-6xl mb-4">⏱️</div>
                        <h2 className="text-2xl font-semibold mb-2">Study Timer</h2>
                        <p className="text-gray-600">Plugga och samla XP • 10 XP per minut</p>
                    </Link>

                    <Link
                        href="/bosses"
                        className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-all group"
                    >
                        <div className="text-6xl mb-4">🐉</div>
                        <h2 className="text-2xl font-semibold mb-2">Boss Battles</h2>
                        <p className="text-gray-600">Utmana dig själv med prov</p>
                    </Link>

                    <Link
                        href="/quests"
                        className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-all group"
                    >
                        <div className="text-6xl mb-4">📜</div>
                        <h2 className="text-2xl font-semibold mb-2">Daily Quests</h2>
                        <p className="text-gray-600">Få bonus XP varje dag</p>
                    </Link>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
