import React, { useState } from 'react';

const messages = [
  { id: 1, speaker: 'Narrator', text: "The wise old oak tree rustled its leaves, sharing ancient secrets with young Elara." },
  { id: 2, speaker: 'Elara', text: "Oh, Great Oak, how can we protect our forest from the creeping shadows of pollution?" },
  { id: 3, speaker: 'Great Oak', text: "Little one, even the smallest seed holds the power of a mighty forest. Your actions, though small, can grow into great change." },
  { id: 4, speaker: 'Narrator', text: "Elara thought for a moment, then a sparkle lit her eyes." },
  { id: 5, speaker: 'Elara', text: "So, if I start by recycling my bottles, and my friends join in, that's a start, right?" },
  { id: 6, speaker: 'Great Oak', text: "Precisely! And what if you taught others about the magic of composting? Or planted a flower for every birthday?" },
];

const choices = [
  { id: 'a', text: "Yes, even small actions make a big difference!" },
  { id: 'b', text: "No, individual efforts don't matter much." },
];

const ConversationPage = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleNextMessage = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else if (!quizComplete) {
      // If all story messages are shown, show choices
      // This state ensures choices appear only after story and before completion
    }
  };

  const handleChoiceSelect = (choiceId) => {
    setSelectedChoice(choiceId);
    // For this example, let's assume 'a' is the correct answer.
    // In a real app, you'd have more complex logic.
    if (choiceId === 'a') {
      setTimeout(() => {
        alert("Excellent! That's the spirit of environmental stewardship!");
        setQuizComplete(true);
      }, 500);
    } else {
      setTimeout(() => {
        alert("Think again! Every action, no matter how small, contributes.");
        setSelectedChoice(null); // Allow re-selection
      }, 500);
    }
  };

  const currentMessage = messages[currentMessageIndex];

  // Colors from the second image (approximate)
  const primaryGreen = '#6B8E23'; // Darker green for buttons/accents
  const lightGreen = '#8BC34A';   // Lighter green for progress/highlights
  const paleBackground = '#F5F5DC'; // Pale background for overall page
  const textDark = '#333333';     // Dark text
  const textLight = '#FFFFFF';    // Light text on dark backgrounds
  const cardBackground = '#FFFFFF'; // White for conversation cards

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: paleBackground, backgroundImage: `url('https://source.unsplash.com/random/1920x1080/?forest,nature,green')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay to darken background image and make text readable */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 flex flex-col gap-4" style={{ backgroundColor: cardBackground }}>
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4" style={{ color: primaryGreen }}>
          The Whispering Woods
        </h1>

        {/* Conversation Bubbles */}
        <div className="flex flex-col gap-3">
          {messages.slice(0, currentMessageIndex + 1).map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.speaker === 'Elara' ? 'justify-end' : msg.speaker === 'Narrator' ? 'justify-center' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg shadow-md ${
                  msg.speaker === 'Elara'
                    ? 'bg-blue-200 self-end' // Example: Blue for user's speech
                    : msg.speaker === 'Great Oak'
                    ? 'bg-green-100 self-start' // Example: Light green for other character
                    : 'bg-gray-100 text-gray-700 text-sm italic' // Narrator messages
                }`}
                style={{
                    backgroundColor: msg.speaker === 'Elara' ? lightGreen : msg.speaker === 'Great Oak' ? primaryGreen : '#E0E0E0',
                    color: msg.speaker === 'Great Oak' ? textLight : textDark,
                    textAlign: msg.speaker === 'Narrator' ? 'center' : 'left'
                }}
              >
                {msg.speaker !== 'Narrator' && <span className="font-semibold mr-1">{msg.speaker}:</span>}
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation/Interaction */}
        {!quizComplete && (
          <>
            {currentMessageIndex < messages.length - 1 ? (
              <button
                onClick={handleNextMessage}
                className="w-full py-3 mt-6 text-lg font-semibold rounded-lg text-white transition duration-300 ease-in-out hover:opacity-90"
                style={{ backgroundColor: primaryGreen }}
              >
                Continue
              </button>
            ) : (
              // Show choices once all story messages are displayed
              <div className="mt-6 flex flex-col gap-3">
                <p className="text-center font-semibold mb-2" style={{ color: textDark }}>What do you think?</p>
                {choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice.id)}
                    className={`w-full py-3 border-2 rounded-lg text-lg transition duration-300 ease-in-out
                      ${selectedChoice === choice.id ? 'opacity-70' : 'hover:opacity-90'}
                    `}
                    style={{
                        borderColor: primaryGreen,
                        backgroundColor: selectedChoice === choice.id ? lightGreen : 'transparent',
                        color: selectedChoice === choice.id ? textLight : primaryGreen
                    }}
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {quizComplete && (
          <div className="text-center mt-8">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold" style={{ color: primaryGreen }}>Congratulations!</h2>
            <p className="text-xl mt-2" style={{ color: textDark }}>You've completed this chapter!</p>
            <button
              className="w-full py-3 mt-6 text-lg font-semibold rounded-lg text-white transition duration-300 ease-in-out hover:opacity-90"
              style={{ backgroundColor: primaryGreen }}
              onClick={() => alert('Moving to next level!')} // Placeholder for actual navigation
            >
              Next Adventure
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationPage;