import React from "react"

export default function LinkSvg({ x1, y1, x2, y2, active = true, highlight = false }) {
  const baseOpacity = active ? 0.7 : 0.18
  const strokeWidth = highlight ? 4 : 3
  const strokeOpacity = highlight ? 0.95 : baseOpacity
  const stroke = active ? "#166534" : "#9CA3AF" // green or gray

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeOpacity={strokeOpacity}
      className="transition-all duration-200"
      strokeLinecap="round"
    />
  )
}
