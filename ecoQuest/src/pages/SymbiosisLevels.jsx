import React from 'react'
import { Link } from 'react-router-dom'
import levels from '../data/levels'

export default function SymbiosisLevels() {
  return (
    <div className="min-h-screen bg-[#F5F5DC] p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Levels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((lvl) => (
          <Link
            key={lvl.id}
            to={`/symbiosis-game/${lvl.id}`}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col gap-2 border-l-4 border-green-600"
          >
            <h3 className="text-xl font-semibold text-green-800">{lvl.title}</h3>
            <p className="text-green-700">Species: {lvl.species.length}</p>
            <p className="text-green-600 text-sm italic">Hint: {lvl.hint}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/"
          className="px-5 py-2 bg-[#4A6741] text-white rounded-lg shadow hover:bg-emerald-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
