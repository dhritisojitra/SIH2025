import React, { useState } from 'react';
import plantLarge from '../assets/plant_large.png';
import leafSmall from '../assets/leaf_small.jpeg';
import checkmarkLeaf from '../assets/checkmark_leaf.jpeg';
import lockIcon from '../assets/lock_icon.png';

const StreakTracker = () => {
  const currentStreak = 25;
  const [weeklyGoal, setWeeklyGoal] = useState([
    { day: 'S', completed: true },
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: true },
    { day: 'T', completed: true },
    { day: 'F', completed: true },
    { day: 'S', completed: false }
  ]);

  const toggleWeeklyGoal = (index) => {
    setWeeklyGoal(goal =>
      goal.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const nextRewardDays = 30;
  const nextRewardProgress = (currentStreak / nextRewardDays) * 100;

  const calendarDays = [
    { day: 1, isCompleted: true },
    { day: 2, isCompleted: true },
    { day: 3, isCompleted: true },
    { day: 4, isCompleted: true },
    { day: 5, isCompleted: true },
    { day: 6, isCompleted: true },
    { day: 7, isCompleted: true },
    { day: 8, isCompleted: true },
    { day: 9, isCompleted: true },
    { day: 10, isCompleted: true },
    { day: 11, isCompleted: true, isCurrentDay: true },
    { day: 12, isCompleted: false },
    { day: 13, isCompleted: false },
    { day: 14, isCompleted: false },
    { day: 15, isCompleted: false },
    { day: 16, isCompleted: false },
    { day: 17, isCompleted: false },
    { day: 18, isCompleted: false },
    { day: 19, isCompleted: false },
    { day: 20, isCompleted: false, isMissed: true },
    { day: 21, isCompleted: false },
    { day: 22, isCompleted: false },
    { day: 23, isCompleted: false },
    { day: 24, isCompleted: false },
    { day: 25, isCompleted: false },
    { day: 26, isCompleted: false },
    { day: 27, isCompleted: false },
    { day: 28, isCompleted: true },
    { day: 29, isCompleted: true },
    { day: 30, isCompleted: true },
  ];

  const [dailyActions, setDailyActions] = useState([
    { name: 'Recycle Plastics', completed: true },
    { name: 'Use Reusable Bottle', completed: true },
    { name: 'Shorten Shower', completed: false },
  ]);

  const toggleAction = (index) => {
    setDailyActions(actions =>
      actions.map((action, i) =>
        i === index ? { ...action, completed: !action.completed } : action
      )
    );
  };

  const renderStreakCard = () => (
    <div className="bg-green-100 rounded-2xl shadow-sm p-6 pr-12 flex items-center">
      <div className="flex flex-col items-start whitespace-nowrap gap-0.5">
        <div className="text-8xl font-bold text-green-800">{currentStreak}</div>
        <div className="text-3xl font-bold text-green-800">Streak Days</div>
      </div>
      <img 
        src={plantLarge} 
        alt="Growing plant" 
        className="w-75 h-auto bg-transparent -ml-20 mr-38" 
      />
    </div>
  );

  const renderWeeklyGoalCard = () => (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-start">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Weekly Eco-Goal</h2>
      <div className="flex gap-2 mb-2">
        {weeklyGoal.map((item, index) => (
          <div 
            key={index} 
            className="w-9 h-9 rounded-full bg-green-200 flex items-center justify-center text-gray-800 font-bold cursor-pointer relative overflow-hidden"
            onClick={() => toggleWeeklyGoal(index)}
          >
            {item.completed ? (
              <span className="relative z-10">{item.day}</span>
            ) : (
              <div className="w-7 h-7 rounded-full overflow-hidden bg-green-100 flex items-center justify-center">
                <img src={checkmarkLeaf} alt="checkmark" className="w-full h-full object-cover block" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-green-700">{weeklyGoal.filter(g => g.completed).length} / 7 Days Completed</div>
    </div>
  );

  const renderDailyActionsCard = () => (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-start">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Daily Actions</h2>
      <ul className="list-none p-0 m-0 w-full">
        {dailyActions.map((action, index) => (
          <li key={index} className="flex items-center mb-3 text-lg">
            <span
              className="flex items-center justify-center w-7 h-7 mr-2.5 cursor-pointer"
              onClick={() => toggleAction(index)}
            >
              {action.completed ? (
                <img src={checkmarkLeaf} alt="checkmark" className="w-5.5 h-5.5" />
              ) : (
                <span className="inline-block w-4.5 h-4.5 rounded-full border-2 border-gray-300 bg-white" />
              )}
            </span>
            <span className="flex-1 text-green-800">{action.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderRewardsCard = () => (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-start">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Unlock Rewards!</h2>
      <div className="flex items-center mb-2">
        <img src={lockIcon} alt="lock" className="w-20 h-8 mr-3" />
        <span className="text-lg text-green-800 font-bold">Next Reward @ {nextRewardDays} Days!</span>
      </div>
      <div className="w-full h-2 bg-green-100 rounded-lg mt-2 relative">
        <div 
          className="h-full bg-green-500 rounded-lg transition-all duration-300" 
          style={{ width: `${nextRewardProgress}%` }}
        ></div>
      </div>
    </div>
  );

  const renderCalendarCard = () => (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-96 h-96 static ml-auto mr-30 mt-12 z-10">
      <h2 className="text-3xl font-bold text-green-800 mt-4.5 mb-4">SEPT 2025</h2>
      <div className="grid grid-cols-7 gap-2.5 text-center mt-18">
        {["S", "M", "T", "W", "T", "F", "S"].map((dayInitial, index) => (
          <div key={`header-${index}`} className="font-bold text-green-700 pt-5 pb-1.25 mb-0">
            {dayInitial}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div 
            key={index} 
            className={`w-10 h-10 flex items-center justify-center rounded-full text-lg ${
              day.isCurrentDay 
                ? "border-2 border-green-700 bg-green-200 text-gray-800" 
                : day.isCompleted 
                ? "bg-green-700 text-white" 
                : day.isMissed 
                ? "bg-gray-100 border border-dashed border-gray-300 text-gray-300"
                : ""
            }`}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex items-start w-full flex-col bg-yellow-50 min-h-screen">
      <h1 className="text-center text-5xl font-bold text-green-700 ml-96 mt-7.5 relative z-10">
        Eco-Quest Streak Log
      </h1>
      <div className="flex w-full">
        <div className="max-w-2xl mx-12 my-12 ml-25 flex flex-col items-center bg-transparent">
          <div className="grid grid-cols-2 gap-8 mb-8 justify-start">
            {renderStreakCard()}
            {renderWeeklyGoalCard()}
            {renderDailyActionsCard()}
            {renderRewardsCard()}
          </div>
        </div>
        {renderCalendarCard()}
      </div>
    </div>
  );
};

export default StreakTracker;