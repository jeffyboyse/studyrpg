import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Study() {
  const { auth, sessions, flash } = usePage().props;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">📚 Study Mode</h1>
      <p className="text-xl text-gray-600 mb-8">
        Välkommen {auth.user.name}! Du är level <span className="font-bold">{auth.user.level}</span>
      </p>

      {/* Enkel XP-info */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total XP</p>
            <p className="text-5xl font-bold text-blue-600">{auth.user.xp}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Nuvarande titel</p>
            <p className="text-2xl font-semibold">{auth.user.title}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Senaste pluggsessioner</h2>
      <p className="text-gray-500">Inga sessioner ännu (vi lägger till timern nästa steg)</p>

      {flash?.success && (
        <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {flash.success}
        </div>
      )}
    </div>
  );
}