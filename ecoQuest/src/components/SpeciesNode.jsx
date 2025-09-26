// SpeciesNode.jsx
import React from "react";

const emojiMap = {
  grass: "🌱",
  cow: "🐄",
  oak: "🌳",
  rabbit: "🐇",
  lion: "🦁",
  wheat: "🌾",
  fish: "🐟",
  eagle: "🦅",
  bee: "🐝",
  bees: "🐝",          // added plural
  flower: "🌸",
  flowers: "🌸",       // added plural
  butterfly: "🦋",
  butterflies: "🦋",   // added plural
  clownfish: "🐠",
  anemone: "🪸",
  default: "❓",
};

export default function SpeciesNode({
  id,
  x,
  y,
  label,
  alive = true,
  onClick,
}) {
  // use id (or fallback to label) for lookup
  const key = (id || label || "").toLowerCase();
  const emoji = emojiMap[key] || emojiMap.default;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      style={{ cursor: alive ? "pointer" : "not-allowed" }}
    >
      {/* Background circle */}
      <circle
        r={35}
        fill={alive ? "#ECFDF5" : "#F3F4F6"}
        stroke={alive ? "#065F46" : "#9CA3AF"}
        strokeWidth={3}
      />

      {/* Emoji inside */}
      <foreignObject x={-25} y={-25} width={50} height={50}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            fontSize: "28px",
            textAlign: "center",
            lineHeight: "50px",
            width: "50px",
            height: "50px",
            pointerEvents: "none",
            opacity: alive ? 1 : 0.4,
          }}
        >
          {emoji}
        </div>
      </foreignObject>

      {/* Label underneath */}
      <text
        y={50}
        textAnchor="middle"
        style={{
          fontSize: 12,
          fill: alive ? "#065F46" : "#9CA3AF",
          fontWeight: 600,
          pointerEvents: "none",
        }}
      >
        {label}
      </text>
    </g>
  );
}
  