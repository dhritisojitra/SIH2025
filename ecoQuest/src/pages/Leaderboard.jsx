import React from "react";

export default function Leaderboard() {
  const data = [
    { id: 1, name: "Dhriti", points: 120 },
    { id: 2, name: "Nevil", points: 100 },
    { id: 3, name: "Rachi", points: 95 },
    { id: 4, name: "Rudra", points: 80 },
    { id: 5, name: "Manan", points: 70 },
    { id: 5, name: "Paraj", points: 60 }
  ];

  // Medal colors for top 3
  const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // Gold, Silver, Bronze

  return (
    <div className="min-h-screen bg-[#F5F5DC] px-6 py-12 font-sans">
      <h1 className="text-4xl font-bold text-[#4A6741] mb-10 text-center">
        🌍 Leaderboard
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden divide-y divide-[#EAE7D6]">
        {data.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 hover:bg-[#D2B48C]/20 transition"
          >
            {/* Left side: Rank + Avatar + Name */}
            <div className="flex items-center space-x-4">
              {/* Rank Circle */}
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold shadow-md"
                style={{
                  backgroundColor: index < 3 ? medalColors[index] : "#8A9A5B",
                }}
              >
                {index + 1}
              </div>

              {/* Avatar */}
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=6A7049&color=FFFFF0&rounded=true`}
                alt={`${user.name} (Rank ${index + 1})`}
                className="w-12 h-12 rounded-full shadow-sm"
              />

              {/* Name */}
              <span className="text-lg font-medium text-[#4A6741]">
                {user.name}
              </span>
            </div>

            {/* Right side: Points */}
            <span className="text-lg font-bold text-[#6A7049]">
              {user.points} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
