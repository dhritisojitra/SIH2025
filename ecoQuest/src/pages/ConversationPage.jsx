import React, { useState, useEffect } from 'react';

// Story Data with Advanced Environmental Topics
const storyData = {
  mycorrhizal: {
    title: "The Hidden Network",
    subtitle: "Underground Internet of Nature",
    icon: "🍄",
    description: "Discover the mysterious mycorrhizal network - nature's own internet connecting forests worldwide.",
    messages: [
      { id: 1, speaker: 'Narrator', text: "Deep beneath the Amazon rainforest, Dr. Elena Rodriguez discovers something extraordinary through her soil samples." },
      { id: 2, speaker: 'Elena', text: "These fungal threads... they're not just decomposing matter. They're creating a communication network between trees!" },
      { id: 3, speaker: 'Narrator', text: "Elena had stumbled upon the mycorrhizal network - tiny fungi that connect tree roots across entire forests, sharing nutrients, water, and even information about threats." },
      { id: 4, speaker: 'Forest Guide', text: "My grandmother always said the forest talks to itself. When one tree is attacked by insects, others nearby start producing defensive chemicals." },
      { id: 5, speaker: 'Elena', text: "Exactly! These fungal networks can span hundreds of acres. Mother trees can even send more resources to their struggling offspring through these connections." },
      { id: 6, speaker: 'Narrator', text: "This 'Wood Wide Web' revolutionizes our understanding of forests - they're not just collections of individual trees, but interconnected superorganisms." }
    ],
    questions: [
      { 
        id: 'q1', 
        text: "What makes mycorrhizal networks so important for forest ecosystems?", 
        options: [
          { id: 'a', text: "They allow trees to share nutrients and communicate about threats", isCorrect: true },
          { id: 'b', text: "They only help with soil decomposition", isCorrect: false }
        ]
      },
      { 
        id: 'q2', 
        text: "How might this discovery change forest conservation strategies?", 
        options: [
          { id: 'a', text: "We should protect individual valuable trees only", isCorrect: false },
          { id: 'b', text: "We need to preserve entire forest networks including soil fungi", isCorrect: true }
        ]
      }
    ]
  },
  biochar: {
    title: "Carbon Time Capsules",
    subtitle: "Ancient Solution to Modern Climate Change",
    icon: "⚫",
    description: "Learn how biochar - charcoal made from organic waste - can fight climate change while improving soil.",
    messages: [
      { id: 1, speaker: 'Narrator', text: "In the laboratories of Cambridge University, Dr. James Chen holds a handful of what looks like ordinary charcoal - but this could help save our climate." },
      { id: 2, speaker: 'James', text: "This is biochar - created by heating organic waste without oxygen. It's essentially trapping carbon that would otherwise become CO2 in the atmosphere." },
      { id: 3, speaker: 'Narrator', text: "The process, called pyrolysis, creates a stable form of carbon that can remain in soil for hundreds of years." },
      { id: 4, speaker: 'Farmer Maria', text: "Since adding biochar to my fields, my crop yields increased by 30%, and I need less fertilizer. The soil holds water better too." },
      { id: 5, speaker: 'James', text: "Ancient Amazonian civilizations used this technique to create 'terra preta' - super-fertile black soils that are still incredibly productive today, 2000 years later!" },
      { id: 6, speaker: 'Narrator', text: "If scaled globally, biochar could remove billions of tons of CO2 from the atmosphere while improving food security - a true climate solution hiding in plain sight." }
    ],
    questions: [
      { 
        id: 'q1', 
        text: "What makes biochar effective for climate change mitigation?", 
        options: [
          { id: 'a', text: "It immediately breaks down and releases nutrients", isCorrect: false },
          { id: 'b', text: "It locks carbon in soil for hundreds of years while improving fertility", isCorrect: true }
        ]
      },
      { 
        id: 'q2', 
        text: "What's the best source material for making biochar?", 
        options: [
          { id: 'a', text: "Agricultural waste and organic materials that would otherwise decay", isCorrect: true },
          { id: 'b', text: "Cutting down healthy forests specifically for biochar", isCorrect: false }
        ]
      }
    ]
  },
  algae: {
    title: "The Green Gold Rush",
    subtitle: "Microalgae as Biofuel Revolution",
    icon: "🦠",
    description: "Explore how microscopic algae could replace fossil fuels and revolutionize sustainable energy production.",
    messages: [
      { id: 1, speaker: 'Narrator', text: "In glass tubes bubbling with green liquid at MIT's lab, billions of microscopic organisms are working to solve our energy crisis." },
      { id: 2, speaker: 'Dr. Sarah Kim', text: "These microalgae can produce 30 times more oil per acre than soybeans, and they don't compete with food crops for land." },
      { id: 3, speaker: 'Narrator', text: "Unlike terrestrial plants that convert only 3-6% of solar energy, some algae species can achieve 10-15% efficiency in controlled conditions." },
      { id: 4, speaker: 'Lab Assistant', text: "The amazing part is that algae consume CO2 as they grow. For every gallon of algae fuel produced, we actually remove CO2 from the atmosphere!" },
      { id: 5, speaker: 'Dr. Sarah Kim', text: "Some species like Botryococcus braunii can be up to 75% oil by weight. We're essentially farming microscopic oil wells that multiply exponentially." },
      { id: 6, speaker: 'Narrator', text: "While challenges remain in scaling production, algae biofuels represent a carbon-negative energy source that could power everything from jets to cargo ships." }
    ],
    questions: [
      { 
        id: 'q1', 
        text: "What makes algae superior to traditional biofuel crops?", 
        options: [
          { id: 'a', text: "Higher oil yield per acre and doesn't compete with food production", isCorrect: true },
          { id: 'b', text: "It only grows in expensive laboratory conditions", isCorrect: false }
        ]
      },
      { 
        id: 'q2', 
        text: "How do algae biofuels help with climate change?", 
        options: [
          { id: 'a', text: "They release the same amount of CO2 as fossil fuels", isCorrect: false },
          { id: 'b', text: "They consume CO2 during growth, making them carbon-negative", isCorrect: true }
        ]
      }
    ]
  },
  permafrost: {
    title: "The Sleeping Giant",
    subtitle: "Permafrost Thaw and Climate Feedback Loops",
    icon: "🧊",
    description: "Understand the critical threat of permafrost melting and its massive impact on global climate systems.",
    messages: [
      { id: 1, speaker: 'Narrator', text: "In the remote tundra of Siberia, climate scientist Dr. Anna Petrov watches in alarm as the ground that has been frozen for 50,000 years begins to bubble and release gas." },
      { id: 2, speaker: 'Anna', text: "This permafrost contains twice as much carbon as our entire atmosphere. As it thaws, it releases methane and CO2 that have been locked away since the last ice age." },
      { id: 3, speaker: 'Narrator', text: "Permafrost covers 24% of the Northern Hemisphere's land surface and stores approximately 1,700 billion tons of carbon - mostly in organic matter from ancient plants and animals." },
      { id: 4, speaker: 'Local Resident', text: "Our traditional ice cellars are melting. Roads are buckling. Even our ancestors' graves are surfacing as the ground shifts." },
      { id: 5, speaker: 'Anna', text: "The terrifying part is the feedback loop: as permafrost melts, it releases greenhouse gases, which warm the planet more, which melts more permafrost. We call this a 'carbon bomb.'" },
      { id: 6, speaker: 'Narrator', text: "Scientists estimate that permafrost thaw could add 0.2-0.4°C to global warming by 2100 - potentially doubling the rate of climate change from human emissions alone." }
    ],
    questions: [
      { 
        id: 'q1', 
        text: "Why is permafrost thaw considered a 'climate bomb'?", 
        options: [
          { id: 'a', text: "It creates a feedback loop releasing more greenhouse gases as temperatures rise", isCorrect: true },
          { id: 'b', text: "It only affects local communities in the Arctic", isCorrect: false }
        ]
      },
      { 
        id: 'q2', 
        text: "What makes permafrost carbon different from other carbon sources?", 
        options: [
          { id: 'a', text: "It's renewable and easily replaceable", isCorrect: false },
          { id: 'b', text: "It's ancient carbon stored for thousands of years, now rapidly entering the atmosphere", isCorrect: true }
        ]
      }
    ]
  }
};

// Confetti component
const Confetti = ({ show }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show) {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 6)],
          size: Math.random() * 8 + 4,
          delay: Math.random() * 2,
        });
      }
      setParticles(newParticles);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            animationDelay: `${particle.delay}s`,
            animationDuration: '1.5s',
          }}
        />
      ))}
    </div>
  );
};

const StorySelectionPage = ({ onSelectStory }) => {
  const primaryGreen = '#2D5016';
  const lightGreen = '#8BC34A';

  return (
    <div className="min-h-screen p-4" style={{ 
      background: '#FFFFF0',
    }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            🌍 Environmental Science Stories
          </h1>
          <p className="text-xl text-white opacity-90">
            Discover fascinating environmental phenomena through interactive stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(storyData).map(([key, story]) => (
            <div
              key={key}
              onClick={() => onSelectStory(key)}
              className="bg-white rounded-2xl p-6 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl group"
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-3 group-hover:animate-bounce">{story.icon}</div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: primaryGreen }}>
                  {story.title}
                </h3>
                <p className="text-lg font-medium text-gray-600 mb-3">
                  {story.subtitle}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {story.description}
                </p>
              </div>
              <div className="flex items-center justify-center mt-6">
                <button 
                  className="px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: lightGreen }}
                >
                  Start Story →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StoryReader = ({ storyKey, onBackToSelection }) => {
  const story = storyData[storyKey];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [storyPhase, setStoryPhase] = useState('story'); // 'story', 'questions', 'complete'
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleNextMessage = () => {
    if (currentMessageIndex < story.messages.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1);
        setIsTyping(false);
      }, 1000);
    } else {
      setStoryPhase('questions');
    }
  };

  const handleAnswerSelect = (optionId) => {
    setSelectedChoice(optionId);
    const currentQuestion = story.questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(opt => opt.id === optionId);
    
    setTimeout(() => {
      if (selectedOption.isCorrect) {
        setFeedbackType('correct');
        setShowConfetti(true);
        setCorrectAnswers(prev => prev + 1);
      } else {
        setFeedbackType('incorrect');
      }
      setShowFeedback(true);
      
      setTimeout(() => {
        setShowFeedback(false);
        setShowConfetti(false);
        setSelectedChoice(null);
        
        if (selectedOption.isCorrect) {
          if (currentQuestionIndex < story.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          } else {
            setStoryPhase('complete');
          }
        }
      }, selectedOption.isCorrect ? 3000 : 2500);
    }, 300);
  };

  const primaryGreen = '#2D5016';
  const lightGreen = '#8BC34A';

  return (
    <div className="min-h-screen p-4" style={{ 
      background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
    }}>
      <Confetti show={showConfetti} />
      
      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-2xl p-8 mx-4 text-center shadow-2xl transform transition-all duration-300 scale-100" style={{ minWidth: '320px' }}>
            {feedbackType === 'correct' ? (
              <>
                <div className="text-8xl mb-4 animate-bounce">😊</div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Excellent!</h2>
                <p className="text-lg text-gray-700">You understand environmental science!</p>
                <div className="mt-4 flex justify-center space-x-2">
                  <span className="text-3xl animate-pulse">🌱</span>
                  <span className="text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>🌿</span>
                  <span className="text-3xl animate-pulse" style={{ animationDelay: '1s' }}>🌳</span>
                </div>
              </>
            ) : (
              <>
                <div className="text-8xl mb-4 animate-bounce">😞</div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Not quite right...</h2>
                <p className="text-lg text-gray-700">Think about what you learned in the story and try again!</p>
                <div className="mt-4 text-2xl">🤔💭</div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <button 
              onClick={onBackToSelection}
              className="absolute left-4 top-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
            >
              ← Back
            </button>
            <div className="text-4xl mr-3">{story.icon}</div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {story.title}
            </h1>
          </div>
          
          {/* Progress */}
{storyPhase === 'story' && (
  <div className="mb-4">
    <div className="bg-yellow bg-opacity-100 rounded-full h-4 shadow-inner">
      <div 
        className="bg-white h-4 rounded-full transition-all duration-700 ease-out shadow-lg"
        style={{ width: `${((currentMessageIndex + 1) / story.messages.length) * 100}%` }}
      />
    </div>
    <p className="text-white mt-2 font-medium text-lg">
      {currentMessageIndex + 1} / {story.messages.length}
    </p>
  </div>
)}
          
          {storyPhase === 'questions' && (
            <div className="mb-4">
              <p className="text-white text-lg font-semibold">
                Question {currentQuestionIndex + 1} of {story.questions.length}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {storyPhase === 'story' && (
            <>
              {/* Story Messages */}
              <div className="flex flex-col gap-4 min-h-[400px]">
                {story.messages.slice(0, currentMessageIndex + 1).map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.speaker === 'Narrator' ? 'justify-center' : 'justify-start'} 
                               transform transition-all duration-500`}
                    style={{
                      opacity: index === currentMessageIndex ? 1 : 0.85,
                      transform: index === currentMessageIndex ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    <div
                      className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-lg transition-all duration-300`}
                      style={{
                        backgroundColor: msg.speaker === 'Narrator' ? '#F0F0F0' : lightGreen,
                        color: msg.speaker === 'Narrator' ? '#333' : 'white',
                        textAlign: msg.speaker === 'Narrator' ? 'center' : 'left',
                        borderLeft: msg.speaker === 'Narrator' ? `4px solid ${primaryGreen}` : 'none',
                      }}
                    >
                      {msg.speaker !== 'Narrator' && (
                        <div className="font-bold mb-1">{msg.speaker}:</div>
                      )}
                      <div className="leading-relaxed">{msg.text}</div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-center">
                    <div className="bg-gray-100 px-5 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {!isTyping && (
                <button
                  onClick={handleNextMessage}
                  className="w-full py-4 mt-6 text-lg font-bold rounded-xl text-white transition-all duration-300 transform hover:scale-105"
                  style={{ backgroundColor: primaryGreen }}
                >
                  {currentMessageIndex < story.messages.length - 1 ? 'Continue Story ✨' : 'Start Quiz 🧠'}
                </button>
              )}
            </>
          )}

          {storyPhase === 'questions' && (
            <div className="text-center">
              <div className="text-3xl mb-4">🤔</div>
              <h3 className="text-xl font-bold mb-6" style={{ color: primaryGreen }}>
                {story.questions[currentQuestionIndex].text}
              </h3>
              
              <div className="flex flex-col gap-4">
                {story.questions[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={selectedChoice !== null}
                    className={`w-full py-4 border-3 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-102
                      ${selectedChoice === option.id ? 'scale-95 opacity-70' : 'hover:shadow-lg'}
                      ${selectedChoice !== null ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                    style={{
                      borderColor: primaryGreen,
                      borderWidth: '3px',
                      backgroundColor: selectedChoice === option.id ? lightGreen : 'transparent',
                      color: selectedChoice === option.id ? 'white' : primaryGreen,
                    }}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {storyPhase === 'complete' && (
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: primaryGreen }}>
                Story Complete!
              </h2>
              <p className="text-xl mb-6">
                You got {correctAnswers} out of {story.questions.length} questions correct!
              </p>
              <div className="flex justify-center space-x-3 mb-6">
                {[...Array(correctAnswers)].map((_, i) => (
                  <span key={i} className="text-3xl animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>⭐</span>
                ))}
              </div>
              <button
                onClick={onBackToSelection}
                className="w-full py-4 text-lg font-bold rounded-xl text-white transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: primaryGreen }}
              >
                Explore More Stories 🌍
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EnvironmentalStoryHub = () => {
  const [currentView, setCurrentView] = useState('selection'); // 'selection' or story key
  const [selectedStory, setSelectedStory] = useState(null);

  const handleSelectStory = (storyKey) => {
    setSelectedStory(storyKey);
    setCurrentView('story');
  };

  const handleBackToSelection = () => {
    setCurrentView('selection');
    setSelectedStory(null);
  };

  if (currentView === 'selection') {
    return <StorySelectionPage onSelectStory={handleSelectStory} />;
  }

  return <StoryReader storyKey={selectedStory} onBackToSelection={handleBackToSelection} />;
};

export default EnvironmentalStoryHub;