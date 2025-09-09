import React from 'react';

const DuolingoRoadmap = () => {
  // Level data with progress tracking (using emojis instead of react-icons)
  const levels = [
    { id: 1, icon: "🌱", title: "Seeds", unlocked: true, completed: true },
    { id: 2, icon: "🍃", title: "Growth", unlocked: true, completed: true },
    { id: 3, icon: "🌳", title: "Trees", unlocked: true, completed: false },
    { id: 4, icon: "💧", title: "Water", unlocked: false, completed: false },
    { id: 5, icon: "♻️", title: "Recycle", unlocked: false, completed: false },
    { id: 6, icon: "⚡", title: "Energy", unlocked: false, completed: false },
    { id: 7, icon: "🌍", title: "Planet", unlocked: false, completed: false },
  ];

  // Calculate position for each level (zig-zag pattern)
  const getNodePosition = (index) => {
    const isLeft = index % 2 === 0;
    const verticalSpacing = 120;
    const horizontalOffset = 100;
    
    return {
      x: isLeft ? horizontalOffset : 300 - horizontalOffset,
      y: 80 + (index * verticalSpacing),
      isLeft
    };
  };

  // Generate SVG path between two points with curve
  const generatePath = (start, end) => {
    const midY = (start.y + end.y) / 2;
    const controlPoint1X = start.x;
    const controlPoint1Y = midY;
    const controlPoint2X = end.x;
    const controlPoint2Y = midY;
    
    return `M ${start.x} ${start.y} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${end.x} ${end.y}`;
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#FFFFF0' }}>
      <div className="max-w-md mx-auto relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Eco Journey</h1>
          <p className="text-gray-600">Learn to save our planet!</p>
        </div>

        {/* SVG Container for Paths */}
        <svg 
          className="absolute top-0 left-0 w-full pointer-events-none" 
          style={{ height: `${80 + (levels.length * 120)}px` }}
        >
          {levels.slice(0, -1).map((level, index) => {
            const currentPos = getNodePosition(index);
            const nextPos = getNodePosition(index + 1);
            const pathString = generatePath(currentPos, nextPos);
            const isCompleted = level.completed;
            
            return (
              <g key={`path-${level.id}`}>
                {/* Base dotted path */}
                <path
                  d={pathString}
                  stroke={isCompleted ? "#6A7049" : "#D1D5DB"}
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  fill="none"
                  className="opacity-60"
                />
                
                {/* Animated glow effect for completed paths */}
                {isCompleted && (
                  <>
                    {/* Outer glow layer */}
                    <path
                      d={pathString}
                      stroke="#9FD68C"
                      strokeWidth="12"
                      strokeDasharray="8,4"
                      fill="none"
                      className="opacity-30 animate-pulse"
                      style={{
                        filter: 'blur(4px)',
                      }}
                    />
                    {/* Middle glow layer */}
                    <path
                      d={pathString}
                      stroke="#8FBC8F"
                      strokeWidth="8"
                      strokeDasharray="8,4"
                      fill="none"
                      className="opacity-60 animate-pulse"
                      style={{
                        filter: 'blur(2px)',
                      }}
                    />
                    {/* Sharp inner layer */}
                    <path
                      d={pathString}
                      stroke="#7BA05B"
                      strokeWidth="4"
                      strokeDasharray="8,4"
                      fill="none"
                      className="opacity-90 animate-pulse"
                    />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Level Nodes */}
        <div className="relative z-10">
          {levels.map((level, index) => {
            const position = getNodePosition(index);
            
            return (
              <div
                key={level.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: `${position.x}px`, 
                  top: `${position.y}px` 
                }}
              >
                {/* Node Circle */}
                <div
                  className={`
                    w-20 h-20 rounded-full flex flex-col items-center justify-center
                    shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer
                    ${level.unlocked 
                      ? 'text-white shadow-lg' 
                      : 'bg-gray-300 text-gray-500'
                    }
                  `}
                  style={{
                    backgroundColor: level.unlocked ? '#6A7049' : undefined,
                    boxShadow: level.unlocked ? '0 4px 15px rgba(106, 112, 73, 0.3)' : undefined
                  }}
                >
                  {/* Icon - centered with flexbox */}
                  <div className="text-2xl flex items-center justify-center">
                    {level.unlocked ? level.icon : "🔒"}
                  </div>
                </div>
                
                {/* Level Title */}
                <div className="text-center mt-2">
                  <span className={`text-sm font-medium ${level.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                    {level.title}
                  </span>
                </div>
                
                {/* Completion Badge */}
                {level.completed && (
                  <div 
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: '#6A7049' }}
                  >
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Eco Mascot at Bottom with bounce animation */}
        <div 
          className="flex justify-center mt-16 mb-8"
          style={{ marginTop: `${levels.length * 120 + 60}px` }}
        >
          <div className="text-center">
            <div 
              className="text-6xl animate-bounce"
              style={{ 
                animationDuration: '2s',
                color: '#6A7049'
              }}
            >
              🐾
            </div>
            <p className="text-sm text-gray-600 mt-2 font-medium">
              Keep going, eco-warrior! 🌱
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuolingoRoadmap;