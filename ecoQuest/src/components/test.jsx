import React, { useState } from 'react';

const DuolingoRoadmap = () => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const levels = [
    { id: 1, icon: "🌱", title: "Seeds", unlocked: true, completed: completedQuizzes.includes(1) },
    { id: 2, icon: "🍃", title: "Growth", unlocked: true, completed: completedQuizzes.includes(2) },
    { id: 3, icon: "🌳", title: "Trees", unlocked: completedQuizzes.includes(2), completed: completedQuizzes.includes(3) },
    { id: 4, icon: "💧", title: "Water", unlocked: completedQuizzes.includes(3), completed: completedQuizzes.includes(4) },
    { id: 5, icon: "♻️", title: "Recycle", unlocked: completedQuizzes.includes(4), completed: completedQuizzes.includes(5) },
    { id: 6, icon: "⚡", title: "Energy", unlocked: completedQuizzes.includes(5), completed: completedQuizzes.includes(6) },
    { id: 7, icon: "🌍", title: "Planet", unlocked: completedQuizzes.includes(6), completed: completedQuizzes.includes(7) },
  ];

  const quizData = {
    1: {
      title: "Seeds",
      icon: "🌱",
      questions: [
        {
          id: 1,
          difficulty: "easy",
          question: "Which gas do trees absorb from the atmosphere during photosynthesis?",
          options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
          correct: 1,
          explanation: "Trees absorb carbon dioxide (CO2) from the atmosphere and release oxygen during photosynthesis, helping clean our air!"
        },
        {
          id: 2,
          difficulty: "easy",
          question: "Which of these is a renewable energy source?",
          options: ["Coal", "Petroleum", "Wind", "Natural gas"],
          correct: 2,
          explanation: "Wind is a renewable energy source because it naturally replenishes and will never run out, unlike fossil fuels!"
        }
      ]
    },
    2: {
      title: "Growth",
      icon: "🍃",
      questions: [
        {
          id: 1,
          difficulty: "easy",
          question: "If you see a recycling bin with a blue color code, what does it usually mean?",
          options: ["Plastic waste", "Paper waste", "Food waste", "Metal waste"],
          correct: 1,
          explanation: "Blue recycling bins are typically used for paper waste like newspapers, magazines, and cardboard!"
        },
        {
          id: 2,
          difficulty: "medium",
          question: "What does the '3R' principle stand for?",
          options: ["Reduce, Reuse, Recycle", "Recycle, Restore, Remove", "Reduce, Renew, React", "Reuse, Rebuild, Replant"],
          correct: 0,
          explanation: "The 3R principle stands for Reduce, Reuse, and Recycle - the three key steps to minimize waste and protect our environment!"
        }
      ]
    },
    3: {
      title: "Trees",
      icon: "🌳",
      questions: [
        {
          id: 1,
          difficulty: "medium",
          question: "Which of the following contributes most to climate change?",
          options: ["Solar panels", "Burning fossil fuels", "Planting trees", "Riding bicycles"],
          correct: 1,
          explanation: "Burning fossil fuels releases greenhouse gases like CO2 into the atmosphere, which is the main cause of climate change."
        },
        {
          id: 2,
          difficulty: "medium",
          question: "What is the term for the gradual increase in Earth's average temperature?",
          options: ["Ozone depletion", "Greenhouse effect", "Global warming", "Acid rain"],
          correct: 2,
          explanation: "Global warming refers to the long-term increase in Earth's average temperature due to human activities and greenhouse gas emissions."
        }
      ]
    },
    4: {
      title: "Water",
      icon: "💧",
      questions: [
        {
          id: 1,
          difficulty: "medium",
          question: "Imagine your school is a video game map. Which action gives you the highest eco-points?",
          options: ["Switching off lights when leaving the classroom", "Printing notes on single-sided paper", "Using plastic water bottles daily", "Keeping the fan on in an empty room"],
          correct: 0,
          explanation: "Switching off lights saves energy and reduces electricity consumption, earning you the highest eco-points for being environmentally responsible!"
        },
        {
          id: 2,
          difficulty: "hard",
          question: "If each student plants 2 trees, and there are 500 students, how many trees will be planted?",
          options: ["250", "500", "1000", "2000"],
          correct: 2,
          explanation: "500 students × 2 trees each = 1000 trees! That's a fantastic contribution to fighting climate change and improving air quality!"
        }
      ]
    },
    5: {
      title: "Recycle",
      icon: "♻️",
      questions: [
        {
          id: 1,
          difficulty: "hard",
          question: "What percentage of plastic waste is actually recycled globally?",
          options: ["Less than 10%", "About 25%", "Around 50%", "Over 70%"],
          correct: 0,
          explanation: "Sadly, less than 10% of plastic waste is actually recycled globally. This is why reducing plastic use is so important!"
        },
        {
          id: 2,
          difficulty: "hard",
          question: "Which material takes the longest to decompose in a landfill?",
          options: ["Paper", "Glass bottle", "Aluminum can", "Banana peel"],
          correct: 1,
          explanation: "Glass bottles can take up to 1 million years to decompose, making recycling glass extremely important for the environment!"
        }
      ]
    },
    6: {
      title: "Energy",
      icon: "⚡",
      questions: [
        {
          id: 1,
          difficulty: "hard",
          question: "What percentage of global electricity comes from renewable sources?",
          options: ["About 15%", "About 30%", "About 50%", "About 70%"],
          correct: 1,
          explanation: "Approximately 30% of global electricity comes from renewable sources, and this percentage is growing rapidly each year!"
        },
        {
          id: 2,
          difficulty: "hard",
          question: "Which country leads the world in solar energy production?",
          options: ["United States", "Germany", "China", "Japan"],
          correct: 2,
          explanation: "China leads the world in solar energy production, generating more solar power than any other country!"
        }
      ]
    },
    7: {
      title: "Planet",
      icon: "🌍",
      questions: [
        {
          id: 1,
          difficulty: "hard",
          question: "By how much has the global temperature increased since pre-industrial times?",
          options: ["About 0.5°C", "About 1.1°C", "About 2.0°C", "About 3.0°C"],
          correct: 1,
          explanation: "The global temperature has increased by about 1.1°C since pre-industrial times, which is causing significant climate changes worldwide."
        },
        {
          id: 2,
          difficulty: "hard",
          question: "What is the largest source of greenhouse gas emissions?",
          options: ["Transportation", "Energy production", "Agriculture", "Deforestation"],
          correct: 1,
          explanation: "Energy production (electricity, heat, and industry) is the largest source of greenhouse gas emissions, accounting for about 25% of global emissions."
        }
      ]
    }
  };

  const handleLevelClick = (level) => {
    if (level.unlocked) {
      setCurrentLevel(level.id);
      setShowQuiz(true);
    }
  };

  // This function is corrected to handle final score correctly
  const handleQuizComplete = (finalScore, totalQuestions) => {
    const percentage = Math.round((finalScore / totalQuestions) * 100);
    const passed = percentage >= 70;
    
    if (passed && !completedQuizzes.includes(currentLevel)) {
      setCompletedQuizzes([...completedQuizzes, currentLevel]);
    }
    
    setQuizComplete(true);
    // The final score is now correctly set
    setScore(finalScore);
  };

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

  const generatePath = (start, end) => {
    const midY = (start.y + end.y) / 2;
    const controlPoint1X = start.x;
    const controlPoint1Y = midY;
    const controlPoint2X = end.x;
    const controlPoint2Y = midY;
    
    return `M ${start.x} ${start.y} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${end.x} ${end.y}`;
  };

  const currentQuiz = quizData[currentLevel];
  const question = currentQuiz?.questions[currentQuestion];

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
    
    const isCorrect = selectedAnswer === question.correct;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, {
      questionId: question.id,
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
      // Corrected logic: Pass the final score directly to the completion handler
      const finalScore = score + (selectedAnswer === question.correct ? 1 : 0);
      handleQuizComplete(finalScore, currentQuiz.questions.length);
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

  const handleBackToRoadmap = () => {
    setShowQuiz(false);
    setCurrentLevel(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
    setAnsweredQuestions([]);
  };

  // Quiz Results Component
  if (showQuiz && quizComplete) {
    const totalQuestions = currentQuiz.questions.length;
    const finalScore = score; // Use the score from state, which is now correctly updated
    const percentage = Math.round((finalScore / totalQuestions) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen p-4 sm:p-6" style={{ backgroundColor: '#FFFFF0' }}>
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{passed ? '🎉' : '💪'}</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </h1>
            <p className="text-gray-600">
              {passed ? 'You passed the quiz!' : 'Practice makes perfect!'}
            </p>
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">{currentQuiz.icon}</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{currentQuiz.title} Complete!</h2>
              <div className="flex items-center justify-center mb-4">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: passed ? '#6A7049' : '#EF4444' }}
                >
                  {finalScore}/{totalQuestions}
                </div>
                <span className="text-gray-500 ml-2">({percentage}%)</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: passed ? '#6A7049' : '#EF4444'
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                {passed ? 
                  "Great job! You're ready for the next level!" : 
                  "Don't give up! Try again to improve your score."
                }
              </p>
            </div>
            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleRestartQuiz}
                className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#6A7049', color: 'white' }}
              >
                Try Again
              </button>
              <button
                onClick={handleBackToRoadmap}
                className="w-full py-3 px-4 rounded-xl font-medium border-2 transition-all duration-200 hover:scale-105"
                style={{ borderColor: '#6A7049', color: '#6A7049' }}
              >
                Back to Roadmap
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Component
  if (showQuiz && currentQuiz) {
    return (
      <div className="min-h-screen p-4 sm:p-6" style={{ backgroundColor: '#FFFFF0' }}>
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={handleBackToRoadmap}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <div className="text-xl">←</div>
            </button>
            <div className="text-center flex-1">
              <div className="text-2xl mb-1">{currentQuiz.icon}</div>
              <h1 className="text-lg font-bold text-gray-800">{currentQuiz.title} Quiz</h1>
            </div>
            <div className="w-10"></div>
          </div>
          {/* Progress */}
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
                  backgroundColor: '#6A7049'
                }}
              ></div>
            </div>
          </div>
          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 leading-relaxed">
              {question.question}
            </h2>
            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((option, index) => {
                let buttonStyle = "w-full p-4 rounded-xl text-left border-2 transition-all duration-200 font-medium";
                
                if (showExplanation) {
                  if (index === question.correct) {
                    buttonStyle += " border-green-500 bg-green-50 text-green-700";
                  } else if (index === selectedAnswer && selectedAnswer !== question.correct) {
                    buttonStyle += " border-red-500 bg-red-50 text-red-700";
                  } else {
                    buttonStyle += " border-gray-200 bg-gray-50 text-gray-500";
                  }
                } else if (selectedAnswer === index) {
                  buttonStyle += " bg-opacity-20 text-white";
                } else {
                  buttonStyle += " border-gray-200 hover:border-gray-300 hover:bg-gray-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonStyle}
                    style={selectedAnswer === index && !showExplanation ? { 
                      backgroundColor: '#6A7049', 
                      borderColor: '#6A7049',
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
            {/* Explanation */}
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
            {/* Action Button */}
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
                    backgroundColor: selectedAnswer !== null ? '#6A7049' : '#D1D5DB',
                    color: 'white'
                  }}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#6A7049', color: 'white' }}
                >
                  {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              )}
            </div>
          </div>
          {/* Score Display */}
          <div className="text-center">
            <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
              <span className="text-2xl mr-2">🏆</span>
              <span className="text-sm font-medium text-gray-600">
                Score: <span style={{ color: '#6A7049' }} className="font-bold">{score}</span>/{answeredQuestions.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Roadmap Component
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
                    <path
                      d={pathString}
                      stroke="#9FD68C"
                      strokeWidth="12"
                      strokeDasharray="8,4"
                      fill="none"
                      className="opacity-30 animate-pulse"
                      style={{ filter: 'blur(4px)' }}
                    />
                    <path
                      d={pathString}
                      stroke="#8FBC8F"
                      strokeWidth="8"
                      strokeDasharray="8,4"
                      fill="none"
                      className="opacity-60 animate-pulse"
                      style={{ filter: 'blur(2px)' }}
                    />
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
                onClick={() => handleLevelClick(level)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
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
                  {/* Icon */}
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
                {/* Completion Badge - Only shows when quiz is completed */}
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
        {/* Eco Mascot */}
        <div 
          className="flex justify-center mt-16 mb-8"
          style={{ marginTop: `${levels.length * 120 + 60}px` }}
        >
          <div className="text-center">
            <div 
              className="text-6xl animate-bounce"
              style={{ animationDuration: '2s', color: '#6A7049' }}
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