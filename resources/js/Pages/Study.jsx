// resources/js/Pages/Study.jsx

//Importerar Inertia-hjälp och vår timer-komponent
import { Head } from '@inertiajs/react';
import StudyTimer from '@/Components/StudyTimer';

//Skapar Study-sidan
export default function Study() {
    return (
        <>
            {/*Sätter sidans titel i webbläsaren */}
            <Head title="Study Timer - Plugga som ett RPG" />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-2xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-8">🎮 Study Mode</h1>
                    <p className="text-center text-gray-600 mb-10">
                        1 minut = 10 XP • Plugga och levla upp!
                    </p>

                    {/*Här visas timern */}
                    <StudyTimer />
                </div>
            </div>
        </>
    );
}