import React, { useState } from 'react';
import checkmarkLeaf from '../assets/checkmark_leaf.jpeg';
import profileImg from '../assets/profile.jpeg';

const WeeklyEcoGoalCard = () => {
  const [weeklyGoal, setWeeklyGoal] = useState([
    { day: 'S', completed: true },
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: false },
    { day: 'T', completed: false },
    { day: 'F', completed: false },
    { day: 'S', completed: false }
  ]);

  const toggleWeeklyGoal = (index) => {
    setWeeklyGoal(goal =>
      goal.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Daily actions state and modal logic
  const [dailyActions, setDailyActions] = useState([
    { name: 'Recycle Plastics', completed: false },
    { name: 'Use Reusable Bottle', completed: false },
    { name: 'Shorten Shower', completed: false }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modalActionIdx, setModalActionIdx] = useState(null);

  const handleActionClick = idx => {
    setModalActionIdx(idx);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalActionIdx(null);
  };

  const handleFileUpload = e => {
    // You can handle file upload logic here
    // For now, just mark as completed
    setDailyActions(actions =>
      actions.map((action, i) =>
        i === modalActionIdx ? { ...action, completed: true } : action
      )
    );
    handleCloseModal();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0efdd' }}>
      {/* Dashboard Title */}
      <div className="pt-8 pb-8">
        <h1 className="text-center text-4xl font-bold text-green-700">Dashboard</h1>
      </div>
      
      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex gap-8 justify-center">
          {/* Left Column - Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8 w-96 h-80">
            <p className="text-gray-700 text-lg">This is your profile card.</p>
          </div>

          {/* Right Column - Weekly Goal and Daily Actions */}
          <div className="flex flex-col gap-6 w-96">
            {/* Weekly Goal Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6 text-green-700">Weekly Eco-Goal</h2>
              <div className="flex gap-2 mb-4 justify-center">
                {weeklyGoal.map((item, index) => (
                  <div 
                    key={index} 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
                    style={{ backgroundColor: item.completed ? '#8fbc8f' : '#90EE90' }}
                    onClick={() => toggleWeeklyGoal(index)}
                  >
                    {item.completed ? (
                      item.day
                    ) : (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                        <img src={checkmarkLeaf} alt="leaf" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center text-gray-600 text-sm">
                {weeklyGoal.filter(g => g.completed).length} / 7 Days Completed
              </div>
            </div>

            {/* Daily Actions Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6 text-green-700">Daily Actions</h2>
              <div className="space-y-4">
                {dailyActions.map((action, idx) => (
                  <div key={idx} className="flex items-center">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-300 mr-4 cursor-pointer flex items-center justify-center"
                      onClick={() => handleActionClick(idx)}
                    >
                      {action.completed && (
                        <img src={checkmarkLeaf} alt="completed" className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-gray-700 text-lg">{action.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-lg p-6 w-80"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-bold">
                +
              </div>
              <span className="text-gray-700 font-medium">Upload Files</span>
              <input 
                type="file" 
                className="text-sm text-gray-600" 
                onChange={handleFileUpload} 
              />
            </div>
            <div className="flex justify-end">
              <button 
                className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm hover:bg-green-200 transition-colors"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyEcoGoalCard;