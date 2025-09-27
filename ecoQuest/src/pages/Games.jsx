import React from 'react'
import { Link } from 'react-router-dom'

export default function SymbiosisHome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5DC] px-4">
      <h1 className="text-5xl font-extrabold text-green-700 mb-6 text-center">
        Symbiosis Puzzle
      </h1>
      <p className="text-lg text-green-800 text-center max-w-xl mb-8">
        Identify independent species and those deeply linked together. Remove wisely!
      </p>
      <div className="flex gap-4">
        <Link
          to="/SymbiosisLevels"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-500 transition"
        >
          Play
        </Link>
        <button
          onClick={() => alert('Remove species carefully!')}
          className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-100 transition"
        >
          How to Play
        </button>
      </div>
    </div>
  )
}
