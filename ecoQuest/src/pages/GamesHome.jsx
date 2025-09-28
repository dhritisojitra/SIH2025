import React from "react";
import { Link } from "react-router-dom";

export default function GamesHome() {
  const games = [
    {
      name: "Symbiosis Puzzle",
      description:
        "Identify independent species and those deeply linked together. Remove wisely!",
      link: "/symbiosis-levels", 
      color: "green",
    },
    {
      name: "FoodPrint Detective",
      description:
        "Track the environmental footprint of different foods and make smart choices!",
      link: "/foodprint-detective",
      color: "yellow",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5DC] px-4">
      <h1 className="text-5xl font-extrabold text-green-700 mb-10 text-center">
        Play Games
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {games.map((game) => (
          <div
            key={game.name}
            className="flex flex-col items-center p-6 rounded-2xl shadow-lg bg-white border border-black-200"
          >
            <h2 className={`text-2xl font-bold text-${game.color}-700 mb-4`}>
              {game.name}
            </h2>
            <p className={`text-${game.color}-800 text-center mb-6`}>
              {game.description}
            </p>
            <div className="flex gap-4">
              <Link
                to={game.link}
                className={`px-6 py-3 bg-${game.color}-600 text-black font-semibold rounded-lg shadow hover:bg-${game.color}-500 transition`}
              >
                Play
              </Link>
              <button
                onClick={() => alert(`How to play: ${game.name}`)}
                className={`px-6 py-3 border border-${game.color}-600 text-${game.color}-600 rounded-lg hover:bg-${game.color}-100 transition`}
              >
                How to Play
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
