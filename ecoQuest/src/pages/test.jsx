import React, { useState } from 'react';
import EcoNavbar from '../components/NavBar';

// Main App Component that contains all logic and UI
const EcoQuestRoadmap = () => {
  // State to track which quizzes have been successfully completed.
  // This array holds the 'id' of completed levels (e.g., "water-1").
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);

  // Data for all roadmaps
  const roadmapData = [
    {
      topic: "Water Management",
      themeColor: "blue",
      backgroundGif: "https://i.pinimg.com/originals/0d/af/0e/0daf0e70017ba838ea59ba27dfa22d3b.gif",
      mascot: "💧",
      mascotMessage: "Every drop counts! 🌊",
      levels: [
        { id: "water-1", icon: "🚰", title: "Water Basics" },
        { id: "water-2", icon: "🚿", title: "Home Conservation" },
        { id: "water-3", icon: "🌧️", title: "Rainwater" },
        { id: "water-4", icon: "🏞️", title: "Watersheds" },
      ]
    },
    {
      topic: "Waste Management",
      themeColor: "green",
      backgroundGif: "https://i.pinimg.com/originals/94/d5/92/94d59218684724a2d85600127e997a55.gif",
      mascot: "♻️",
      mascotMessage: "Zero waste hero! 🌱",
      levels: [
        { id: "waste-1", icon: "🗑️", title: "Waste Basics" },
        { id: "waste-2", icon: "📦", title: "Packaging" },
        { id: "waste-3", icon: "🥫", title: "Recycling" },
        { id: "waste-4", icon: "🍌", title: "Composting" },
      ]
    },
    {
      topic: "Carbon Footprint",
      themeColor: "brown",
      backgroundGif: "https://i.pinimg.com/originals/e7/8a/24/e78a2455e94f8e5f8f5e7f0b9f5a0459.gif",
      mascot: "👣",
      mascotMessage: "Carbon neutral champion! 🍃",
      levels: [
        { id: "carbon-1", icon: "👣", title: "Footprint 101" },
        { id: "carbon-2", icon: "🚗", title: "Transport" },
        { id: "carbon-3", icon: "🏠", title: "Home Energy" },
        { id: "carbon-4", icon: "🥩", title: "Diet Impact" },
      ]
    },
    {
      topic: "Renewable Energy",
      themeColor: "orange",
      backgroundGif: "https://i.pinimg.com/originals/44/1a/10/441a10050e8a719c2356c9a3a7b4587c.gif",
      mascot: "⚡",
      mascotMessage: "Power the future! ⚡",
      levels: [
        { id: "energy-1", icon: "⚡", title: "Energy Basics" },
        { id: "energy-2", icon: "☀️", title: "Solar Power" },
        { id: "energy-3", icon: "💨", title: "Wind Energy" },
        { id: "energy-4", icon: "💧", title: "Hydro Power" },
      ]
    },
    {
      topic: "Biodiversity",
      themeColor: "purple",
      backgroundGif: "https://i.pinimg.com/originals/e5/7c/e1/e57ce195528ef472074b16552d0440e8.gif",
      mascot: "🦋",
      mascotMessage: "Guardian of nature! 🌺",
      levels: [
        { id: "bio-1", icon: "🌱", title: "Life Basics" },
        { id: "bio-2", icon: "🐝", title: "Pollinators" },
        { id: "bio-3", icon: "🌳", title: "Forests" },
        { id: "bio-4", icon: "🐟", title: "Marine Life" },
      ]
    }
  ];

  const quizData = {
    "water-1": {
      title: "Water Basics", icon: "🚰", questions: [
        { id: 1, difficulty: "easy", question: "How much of Earth's water is freshwater?", options: ["~10%", "~2.5%", "~50%"], correct: 1, explanation: "About 2.5% of Earth's water is freshwater, and most of that is locked in glaciers and ice caps." },
        { id: 2, difficulty: "easy", question: "What is the largest consumer of household water?", options: ["Toilets", "Washing machine", "Showers"], correct: 0, explanation: "Toilets are the largest users of water in an average home, accounting for nearly 30% of indoor water use." }
      ]
    },
    "water-2": {
      title: "Home Conservation", icon: "🚿", questions: [
        { id: 1, difficulty: "medium", question: "What is a simple way to save water while brushing your teeth?", options: ["Use a cup of water", "Leave the faucet running", "Brush with a hose"], correct: 0, explanation: "Using a cup of water instead of letting the faucet run can save several gallons of water a day." },
        { id: 2, difficulty: "medium", question: "How can you tell if your toilet has a leak?", options: ["It makes a hissing sound", "It flushes on its own", "Put a few drops of food coloring in the tank and check the bowl after 15 minutes."], correct: 2, explanation: "If the food coloring appears in the bowl without flushing, you have a leak!" }
      ]
    },
    "water-3": {
      title: "Rainwater", icon: "🌧️", questions: [
        { id: 1, difficulty: "hard", question: "What is a rain barrel used for?", options: ["To wash your car", "To collect rainwater for later use", "To store garbage"], correct: 1, explanation: "A rain barrel collects rainwater from a downspout, which can then be used for watering plants or other non-potable uses." }
      ]
    },
    "waste-1": {
      title: "Waste Basics", icon: "🗑️", questions: [
        { id: 1, difficulty: "easy", question: "Which of the following is an example of 'reducing' waste?", options: ["Reusing a glass jar", "Buying products with less packaging", "Recycling a plastic bottle"], correct: 1, explanation: "Reducing means creating less waste in the first place, like buying items with minimal packaging." },
      ]
    },
    "waste-2": {
      title: "Packaging", icon: "📦", questions: [
        { id: 1, difficulty: "medium", question: "What is 'downcycling'?", options: ["Recycling a material into a lower quality product", "Recycling a material into a higher quality product", "Burning waste for energy"], correct: 0, explanation: "Downcycling is when a recycled material is used to create a product of lesser quality, such as recycling plastic bottles into a park bench." },
      ]
    },
    "waste-3": {
      title: "Recycling", icon: "🥫", questions: [
        { id: 1, difficulty: "hard", question: "What is the universal symbol for recycling?", options: ["A green circle", "Three chasing arrows", "A single arrow"], correct: 1, explanation: "The Mobius loop, or three chasing arrows, is the international symbol for recycling." },
      ]
    },
    "carbon-1": {
      title: "Footprint 101", icon: "👣", questions: [
        { id: 1, difficulty: "easy", question: "What is a 'carbon footprint'?", options: ["The size of your shoe print", "The total amount of greenhouse gases you produce", "How far you walk in a day"], correct: 1, explanation: "A carbon footprint measures the total amount of greenhouse gases emitted by a person, organization, event, or product." },
      ]
    },
    "carbon-2": {
      title: "Transport", icon: "🚗", questions: [
        { id: 1, difficulty: "medium", question: "Which mode of transport has the smallest carbon footprint per passenger-mile?", options: ["Airplane", "Car", "Train"], correct: 2, explanation: "Trains are generally more energy-efficient and produce fewer emissions per passenger than cars or airplanes." },
      ]
    },
    "carbon-3": {
      title: "Home Energy", icon: "🏠", questions: [
        { id: 1, difficulty: "hard", question: "What is 'vampire power'?", options: ["Energy used by appliances when turned off but still plugged in", "Energy used by a vacuum cleaner", "Power for a horror movie"], correct: 0, explanation: "Vampire power, or phantom load, is the energy consumed by electronic devices while they are in standby mode." },
      ]
    },
    "energy-1": {
      title: "Energy Basics", icon: "⚡", questions: [
        { id: 1, difficulty: "easy", question: "Which of these is a fossil fuel?", options: ["Solar", "Coal", "Wind"], correct: 1, explanation: "Coal is a fossil fuel formed from the remains of plants and animals, while solar and wind are renewable energy sources." },
      ]
    },
    "energy-2": {
      title: "Solar Power", icon: "☀️", questions: [
        { id: 1, difficulty: "medium", question: "What is the main component of a solar panel?", options: ["Plastic", "Glass", "Silicon"], correct: 2, explanation: "Solar panels are made of photovoltaic cells, which are composed of silicon to convert sunlight into electricity." },
      ]
    },
    "energy-3": {
      title: "Wind Energy", icon: "💨", questions: [
        { id: 1, difficulty: "hard", question: "How do wind turbines generate electricity?", options: ["By using a motor", "By turning a generator with a turbine's rotation", "By heating water"], correct: 1, explanation: "The wind's force turns the turbine blades, which spins a rotor connected to a generator to produce electricity." },
      ]
    },
    "bio-1": {
      title: "Life Basics", icon: "🌱", questions: [
        { id: 1, difficulty: "easy", question: "What is biodiversity?", options: ["The variety of life in a particular habitat or ecosystem", "A type of plant", "A disease affecting animals"], correct: 0, explanation: "Biodiversity refers to the incredible variety of life on Earth, from tiny bacteria to giant whales." },
      ]
    },
    "bio-2": {
      title: "Pollinators", icon: "🐝", questions: [
        { id: 1, difficulty: "medium", question: "Why are bees important to ecosystems?", options: ["They produce honey", "They pollinate plants, helping them reproduce", "They are a food source for birds"], correct: 1, explanation: "Bees are crucial pollinators, essential for the reproduction of many plants, including most of our crops." },
      ]
    },
    "bio-3": {
      title: "Forests", icon: "🌳", questions: [
        { id: 1, difficulty: "hard", question: "What percentage of the world's land is covered by forests?", options: ["~10%", "~25%", "~30%"], correct: 2, explanation: "Forests cover about 30% of the world's land area, playing a vital role in climate regulation and biodiversity." },
      ]
    },
  };

  // Function to get color schemes based on a theme color string
  const getColorVariants = (color) => {
    const colors = {
      blue: {
        primary: '#1E40AF', secondary: '#60A5FA', tertiary: '#3B82F6', quaternary: '#1D4ED8'
      },
      green: {
        primary: '#6A7049', secondary: '#9FD68C', tertiary: '#8FBC8F', quaternary: '#7BA05B'
      },
      brown: {
        primary: '#8B4513', secondary: '#D2691E', tertiary: '#CD853F', quaternary: '#A0522D'
      },
      orange: {
        primary: '#EA580C', secondary: '#FB923C', tertiary: '#F97316', quaternary: '#C2410C'
      },
      purple: {
        primary: '#7C3AED', secondary: '#A78BFA', tertiary: '#8B5CF6', quaternary: '#6D28D9'
      }
    };
    return colors[color] || colors.green;
  };

  // Reusable Roadmap Component to display a single topic's progress
  const Roadmap = ({
    title, levels, themeColor, backgroundGif, mascot, mascotMessage, onLevelClick
  }) => {
    const getNodePosition = (index) => {
      const isLeft = index % 2 === 0;
      const verticalSpacing = 120;
      const horizontalOffset = 100;

      return {
        x: isLeft ? horizontalOffset : 300 - horizontalOffset,
        y: 150 + (index * verticalSpacing),
        isLeft,
      };
    };

    const generatePath = (start, end) => {
      const midY = (start.y + end.y) / 2;
      return `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;
    };

    const colorScheme = getColorVariants(themeColor);

    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Section Background GIF */}
        {backgroundGif && (
          <img
            src={backgroundGif}
            alt={`${title} background`}
            className="absolute inset-0 w-full h-full object-cover z-0"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/CCCCCC/000000?text=Background+Unavailable'; }}
          />
        )}

        {/* Overlay to dim GIF and provide consistent background for content */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        <div className="max-w-md mx-auto relative p-6 z-20">
          {/* Section Title Card */}
          <div
            className="relative top-0 left-0 right-0 py-4 px-6 rounded-xl shadow-xl mb-12 text-center"
            style={{ backgroundColor: colorScheme.primary, color: '#FFFFF0' }}
          >
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>

          {/* SVG Container for Paths */}
          {/* This is where the path highlighting logic is implemented */}
          <svg
            className="absolute top-0 left-0 w-full pointer-events-none z-10"
            style={{ height: `${150 + levels.length * 120}px` }}
          >
            {levels.slice(0, -1).map((level, index) => {
              const currentPos = getNodePosition(index);
              const nextPos = getNodePosition(index + 1);
              const pathString = generatePath(currentPos, nextPos);
              // Check if the current level is completed to highlight the path leading away from it
              const isCompleted = completedQuizzes.includes(level.id);

              return (
                <g key={`path-${level.id}`}>
                  {/* Default path (dotted) for all connections */}
                  <path
                    d={pathString}
                    stroke={"#D1D5DB"}
                    strokeWidth="3"
                    strokeDasharray="8,4"
                    fill="none"
                    className="opacity-60"
                  />
                  {/* Highlighted path for completed levels */}
                  {isCompleted && (
                    <>
                      <path
                        d={pathString}
                        stroke={colorScheme.secondary}
                        strokeWidth="12"
                        strokeDasharray="8,4"
                        fill="none"
                        className="opacity-30 animate-pulse"
                        style={{ filter: 'blur(4px)' }}
                      />
                      <path
                        d={pathString}
                        stroke={colorScheme.tertiary}
                        strokeWidth="8"
                        strokeDasharray="8,4"
                        fill="none"
                        className="opacity-60 animate-pulse"
                        style={{ filter: 'blur(2px)' }}
                      />
                      <path
                        d={pathString}
                        stroke={colorScheme.quaternary}
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
          {/* This is where the tick mark and node styling logic is implemented */}
          <div className="relative z-20">
            {levels.map((level, index) => {
              const position = getNodePosition(index);
              const isCompleted = completedQuizzes.includes(level.id); // Check for tick mark
              const isUnlocked = index === 0 || completedQuizzes.includes(levels[index - 1].id);

              return (
                <div
                  key={level.id}
                  onClick={() => onLevelClick(level, isUnlocked)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${position.x}px`, top: `${position.y}px` }}
                >
                  <div
                    className={`
                      relative w-20 h-20 rounded-full flex flex-col items-center justify-center
                      shadow-lg transition-all duration-300 hover:scale-110
                      ${isUnlocked
                        ? 'text-white shadow-lg cursor-pointer'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      }
                    `}
                    style={{
                      backgroundColor: isUnlocked ? colorScheme.primary : undefined,
                      boxShadow: isUnlocked ? `0 4px 15px ${colorScheme.primary}50` : undefined
                    }}
                  >
                    <div className="text-2xl flex items-center justify-center">
                      {isUnlocked ? level.icon : "🔒"}
                    </div>
                    {/* Tick mark for completed quizzes */}
                    {isCompleted && (
                      <div
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
                        style={{ backgroundColor: colorScheme.primary }}
                      >
                        ✓
                      </div>
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <span className={`text-sm font-medium ${isUnlocked ? 'text-white' : 'text-gray-200'}`}>
                      {level.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mascot at Bottom */}
          <div
            className="flex justify-center mt-16 mb-8 relative z-20"
            style={{ marginTop: `${levels.length * 120 + 100}px` }}
          >
            <div className="text-center">
              <div
                className="text-6xl animate-bounce"
                style={{
                  animationDuration: '2s',
                  color: colorScheme.primary
                }}
              >
                {mascot}
              </div>
              <p className="text-sm text-white mt-2 font-medium">
                {mascotMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Quiz = ({ onBackToRoadmap, onQuizComplete, currentQuiz, themeColor }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    const colorScheme = getColorVariants(themeColor);

    const getDifficultyColor = (difficulty) => {
      switch (difficulty) {
        case 'easy': return 'bg-green-100 text-green-700 border-green-200';
        case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'hard': return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    };

    const handleAnswerSelect = (answerIndex) => {
      if (showExplanation) return;
      setSelectedAnswer(answerIndex);
    };

    const handleSubmitAnswer = () => {
      if (selectedAnswer === null) return;

      const isCorrect = selectedAnswer === currentQuiz.questions[currentQuestion].correct;
      if (isCorrect) {
        setScore(score + 1);
      }

      setAnsweredQuestions([...answeredQuestions, {
        questionId: currentQuiz.questions[currentQuestion].id,
        selectedAnswer,
        correct: isCorrect
      }]);

      setShowExplanation(true);
    };

    const handleNextQuestion = () => {
      if (currentQuestion < currentQuiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        const finalScore = score + (selectedAnswer === currentQuiz.questions[currentQuestion].correct ? 1 : 0);
        setQuizComplete(true);
        onQuizComplete(finalScore, currentQuiz.questions.length);
      }
    };

    const handleRestartQuiz = () => {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setScore(0);
      setQuizComplete(false);
      setAnsweredQuestions([]);
    };

    const totalQuestions = currentQuiz.questions.length;
    const finalScore = score;
    const percentage = totalQuestions > 0 ? Math.round((finalScore / totalQuestions) * 100) : 0;
    const passed = percentage >= 70;

    // Quiz Results Component
    if (quizComplete) {
      return (
        <div className="min-h-screen p-4 sm:p-6 font-sans antialiased" style={{ backgroundColor: '#f3f4f6' }}>
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{passed ? '🎉' : '💪'}</div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {passed ? 'Congratulations!' : 'Keep Learning!'}
              </h1>
              <p className="text-gray-600">
                {passed ? 'You passed the quiz!' : 'Practice makes perfect!'}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-6">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{currentQuiz.icon}</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{currentQuiz.title} Complete!</h2>
                <div className="flex items-center justify-center mb-4">
                  <div
                    className="text-3xl font-bold"
                    style={{ color: passed ? colorScheme.primary : '#EF4444' }}
                  >
                    {finalScore}/{totalQuestions}
                  </div>
                  <span className="text-gray-500 ml-2">({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: passed ? colorScheme.primary : '#EF4444'
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  {passed ?
                    "Great job! You've unlocked the next level." :
                    "Don't give up! Try again to improve your score."
                  }
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleRestartQuiz}
                  className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: colorScheme.primary, color: 'white' }}
                >
                  Try Again
                </button>
                <button
                  onClick={onBackToRoadmap}
                  className="w-full py-3 px-4 rounded-xl font-medium border-2 transition-all duration-200 hover:scale-105"
                  style={{ borderColor: colorScheme.primary, color: colorScheme.primary }}
                >
                  Back to Roadmaps
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Quiz Questions Component
    if (currentQuiz) {
      const question = currentQuiz.questions[currentQuestion];
      return (
        <div className="min-h-screen p-4 sm:p-6 font-sans antialiased" style={{ backgroundColor: '#f3f4f6' }}>
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={onBackToRoadmap}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <div className="text-xl text-gray-600">←</div>
              </button>
              <div className="text-center flex-1">
                <div className="text-2xl mb-1">{currentQuiz.icon}</div>
                <h1 className="text-lg font-bold text-gray-800">{currentQuiz.title} Quiz</h1>
              </div>
              <div className="w-10"></div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {currentQuiz.questions.length}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}
                >
                  {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%`,
                    backgroundColor: colorScheme.primary
                  }}
                ></div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                {question.question}
              </h2>
              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => {
                  let buttonStyle = "w-full p-4 rounded-xl text-left border-2 transition-all duration-200 font-medium";
                  const isCorrect = index === question.correct;
                  const isSelected = selectedAnswer === index;

                  if (showExplanation) {
                    if (isCorrect) {
                      buttonStyle += " border-green-500 bg-green-50 text-green-700";
                    } else if (isSelected) {
                      buttonStyle += " border-red-500 bg-red-50 text-red-700";
                    } else {
                      buttonStyle += " border-gray-200 bg-gray-50 text-gray-500";
                    }
                  } else if (isSelected) {
                    buttonStyle += " bg-opacity-20 text-white";
                  } else {
                    buttonStyle += " border-gray-200 hover:border-gray-300 hover:bg-gray-50";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={buttonStyle}
                      style={isSelected && !showExplanation ? {
                        backgroundColor: colorScheme.primary,
                        borderColor: colorScheme.primary,
                        color: 'white'
                      } : {}}
                      disabled={showExplanation}
                    >
                      <span className="flex items-center">
                        <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
              {showExplanation && (
                <div className="mb-6 p-4 rounded-xl bg-blue-50 border-2 border-blue-200">
                  <div className="flex items-start">
                    <div className="text-blue-500 mr-2 mt-1">💡</div>
                    <div>
                      <p className="text-blue-800 font-medium mb-1">Explanation:</p>
                      <p className="text-blue-700 text-sm">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
              <div>
                {!showExplanation ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                      selectedAnswer !== null
                        ? 'hover:scale-105'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    style={{
                      backgroundColor: selectedAnswer !== null ? colorScheme.primary : '#D1D5DB',
                      color: 'white'
                    }}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: colorScheme.primary, color: 'white' }}
                  >
                    {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
                <span className="text-2xl mr-2">🏆</span>
                <span className="text-sm font-medium text-gray-600">
                  Score: <span style={{ color: colorScheme.primary }} className="font-bold">{score}</span>/{answeredQuestions.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null; // Should not happen in normal flow
  };

  // Handlers for managing the app state
  const handleLevelClick = (level, isUnlocked) => {
    if (isUnlocked) {
      setCurrentLevel(level.id);
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (finalScore, totalQuestions) => {
    const percentage = Math.round((finalScore / totalQuestions) * 100);
    const passed = percentage >= 70;

    // This is the core logic: if the user passes, add the level to the completedQuizzes array
    if (passed && !completedQuizzes.includes(currentLevel)) {
      setCompletedQuizzes([...completedQuizzes, currentLevel]);
    }
  };

  const handleBackToRoadmap = () => {
    setShowQuiz(false);
    setCurrentLevel(null);
  };

  const currentQuiz = quizData[currentLevel];

  // Main render logic
  return (
    <>
    <EcoNavbar/>
    <div className="relative min-h-screen font-sans" style={{ backgroundColor: '#FFFFF0' }}>
      {showQuiz && currentQuiz ? (
        <Quiz
          onBackToRoadmap={handleBackToRoadmap}
          onQuizComplete={handleQuizComplete}
          currentQuiz={currentQuiz}
          themeColor={roadmapData.find(r => r.levels.some(l => l.id === currentLevel))?.themeColor}
        />
      ) : (
        <>
          <div
            className="text-center py-20"
            style={{ backgroundColor: '#FFFFF0', color: '#6A7049' }}
          >
            <h1 className="text-5xl font-bold font-['Georgia',_serif] tracking-wide">
              Sustainability Mastery Journey
            </h1>
          </div>
          {roadmapData.map((roadmap, index) => (
            <div key={index} className="scroll-mt-20">
              <Roadmap
                title={roadmap.topic}
                levels={roadmap.levels}
                themeColor={roadmap.themeColor}
                backgroundGif={roadmap.backgroundGif}
                mascot={roadmap.mascot}
                mascotMessage={roadmap.mascotMessage}
                onLevelClick={handleLevelClick}
                completedQuizzes={completedQuizzes}
              />
            </div>
          ))}
        </>
      )}
    </div>
    </>
  );
};

export default EcoQuestRoadmap;
