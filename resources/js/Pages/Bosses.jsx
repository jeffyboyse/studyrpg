import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Bosses({ bosses }) {
    const [minutes, setMinutes] = useState(10);

    const attack = (bossId) => {
        router.post(`/bosses/${bossId}/damage`, { minutes });
    };

    return (
        <>
            <Head title="Boss Battles" />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl font-bold text-center mb-10">Boss Battles</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {bosses.map(boss => (
                            <div key={boss.id} className="bg-white rounded-2xl shadow p-8">
                                <h2 className="text-2xl font-bold text-center mb-2">{boss.name}</h2>
                                <p className="text-center text-gray-500 mb-6">{boss.subject}</p>

                                <div className="mb-8">
                                    <div className="text-sm text-gray-500 mb-1">HP</div>
                                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-4 bg-red-500 transition-all"
                                            style={{ width: `${(boss.current_hp / boss.hp) * 100}%` }}
                                        />
                                    </div>
                                    <div className="text-xs text-right mt-1">
                                        {boss.current_hp} / {boss.hp}
                                    </div>
                                </div>

                                {boss.defeated ? (
                                    <p className="text-green-600 font-bold text-center">✅ Besegrad!</p>
                                ) : (
                                    <div>
                                        <input 
                                            type="number"
                                            value={minutes}
                                            onChange={e => setMinutes(Number(e.target.value))}
                                            className="w-full border rounded px-4 py-3 mb-4 text-center"
                                        />
                                        <button 
                                            onClick={() => attack(boss.id)}
                                            className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700"
                                        >
                                            Attackera med {minutes} minuter
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}