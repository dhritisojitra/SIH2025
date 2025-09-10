import React, { useState } from 'react';

const EcoQuizPage = ({ levelId = 1, onQuizComplete }) => {
  // Sample quiz data for different levels and difficulties
  const quizData = {
    1: { // Seeds level
      title: "Seeds",
      icon: "🌱",
      questions: [
        {
          id: 1,
          difficulty: "easy",
          question: "What do plants need to grow?",
          options: ["Water and sunlight", "Only darkness", "Only soil", "Only air"],
          correct: 0,
          explanation: "Plants need water, sunlight, and nutrients from soil to grow healthy!"
        },
        {
          id: 2,
          difficulty: "medium",
          question: "How long does it take for most seeds to sprout?",
          options: ["1-2 weeks", "1 day", "6 months", "1 year"],
          correct: 0,
          explanation: "Most seeds sprout within 1-2 weeks under proper conditions."
        },
        {
          id: 3,
          difficulty: "hard",
          question: "Which process do plants use to make their own food?",
          options: ["Respiration", "Photosynthesis", "Digestion", "Absorption"],
          correct: 1,
          explanation: "Photosynthesis is how plants convert sunlight, water, and CO2 into food!"
        }
      ]
    },
    2: { // Growth level
      title: "Growth",
      icon: "🍃",
      questions: [
        {
          id: 1,
          difficulty: "easy",
          question: "What gas do plants release that we breathe?",
          options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
          correct: 1,
          explanation: "Plants release oxygen during photosynthesis, which we need to breathe!"
        },
        {
          id: 2,
          difficulty: "medium",
          question: "What part of the plant absorbs water from the soil?",
          options: ["Leaves", "Stem", "Roots", "Flowers"],
          correct: 2,
          explanation: "Roots absorb water and nutrients from the soil to feed the plant."
        },
        {
          id: 3,
          difficulty: "hard",
          question: "How much oxygen does one large tree produce per day?",
          options: ["Enough for 1 person", "Enough for 2 people", "Enough for 4 people", "No oxygen"],
          correct: 1,
          explanation: "One large tree can produce enough oxygen for 2 people per day!"
        }
      ]
    }
  };

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const currentQuiz = quizData[levelId];
  const question = currentQuiz?.questions[currentQuestion];

  // Difficulty colors
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
      setQuizComplete(true);

      // Calculate pass/fail
      const percentage = Math.round(((score + (selectedAnswer === question.correct ? 1 : 0)) / currentQuiz.questions.length) * 100);
      const passed = percentage >= 70;

      // Notify parent (roadmap) that quiz is complete
      if (onQuizComplete) {
        onQuizComplete(levelId, passed);
      }
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

  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFFFF0' }}>
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Level Locked</h2>
          <p className="text-gray-600">Complete previous levels to unlock this quiz!</p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
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
                  {score}/{currentQuiz.questions.length}
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
                onClick={() => window.history.back()}
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

  return (
    <div className="min-h-screen p-4 sm:p-6" style={{ backgroundColor: '#FFFFF0' }}>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => window.history.back()}
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
                buttonStyle = buttonStyle.replace("border-2", "border-2");
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
};

export default EcoQuizPage;
