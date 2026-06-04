import { useRef } from 'react';
import { Head } from '@inertiajs/react';
import StudyTimer from '@/Components/StudyTimer';
import SessionHistory from '@/Components/SessionHistory';
 
export default function Study() {
    // Ref som låter oss anropa refresh() på SessionHistory utifrån
    const historyRef = useRef(null);
 
    return (
        <>
            <Head title="Study Timer - Plugga som ett RPG" />
 
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-2xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-8">🎮 Study Mode</h1>
                    <p className="text-center text-gray-600 mb-10">
                        1 minut = 10 XP • Plugga och levla upp!
                    </p>
 
                    {/* onSaved triggas av StudyTimer efter sparad session */}
                    <StudyTimer onSaved={() => historyRef.current?.refresh()} />
 
                    {/* ref gör att vi kan anropa refresh() utifrån */}
                    <SessionHistory ref={historyRef} />
                </div>
            </div>
        </>
    );
}
 