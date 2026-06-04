import { useState, useImperativeHandle, forwardRef } from 'react';
import { useStudySessions } from '@/hooks/useStudySessions';
 
const SUBJECTS = ['Alla', 'Engelska', 'Matte', 'Historia'];
 
/**
 * Visar studiesessionshistorik hämtad från GET /api/sessions.
 * Exponerar refresh() via ref så att StudyTimer kan trigga en uppdatering.
 */
const SessionHistory = forwardRef(function SessionHistory(props, ref) {
    const [activeSubject, setActiveSubject] = useState(null);
 
    const { sessions, pagination, loading, error, fetchPage } =
        useStudySessions({ subject: activeSubject });
 
    // Gör refresh() tillgänglig utifrån via ref
    useImperativeHandle(ref, () => ({
        refresh: () => fetchPage(1),
    }));
 
    const handleSubject = (subject) => {
        setActiveSubject(subject === 'Alla' ? null : subject);
    };
 
    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Sessionshistorik</h2>
 
            {/* Ämnesfilter */}
            <div className="flex gap-2 flex-wrap mb-5">
                {SUBJECTS.map((s) => (
                    <button
                        key={s}
                        onClick={() => handleSubject(s)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                            (activeSubject ?? 'Alla') === s
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {s}
                    </button>
                ))}
            </div>
 
            {/* Innehåll */}
            {loading && (
                <p className="text-center text-gray-400 py-8">Laddar...</p>
            )}
 
            {error && (
                <p className="text-center text-red-400 py-8">Fel: {error}</p>
            )}
 
            {!loading && !error && sessions.length === 0 && (
                <p className="text-center text-gray-400 py-8">Inga sessioner ännu.</p>
            )}
 
            {!loading && sessions.map((session) => (
                <div
                    key={session.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                    <div>
                        <span className="font-semibold text-gray-700">{session.subject}</span>
                        <p className="text-sm text-gray-400">
                            {new Date(session.created_at).toLocaleDateString('sv-SE')}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-indigo-600 font-bold">+{session.xp_earned} XP</span>
                        <p className="text-sm text-gray-400">{session.minutes} min</p>
                    </div>
                </div>
            ))}
 
            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
                <div className="flex justify-between items-center mt-5 text-sm text-gray-500">
                    <button
                        onClick={() => fetchPage(pagination.current_page - 1)}
                        disabled={pagination.current_page === 1}
                        className="px-3 py-1 rounded-lg bg-gray-100 disabled:opacity-40"
                    >
                        ← Föregående
                    </button>
                    <span>
                        Sida {pagination.current_page} / {pagination.last_page}
                    </span>
                    <button
                        onClick={() => fetchPage(pagination.current_page + 1)}
                        disabled={pagination.current_page === pagination.last_page}
                        className="px-3 py-1 rounded-lg bg-gray-100 disabled:opacity-40"
                    >
                        Nästa →
                    </button>
                </div>
            )}
        </div>
    );
});
 
export default SessionHistory;