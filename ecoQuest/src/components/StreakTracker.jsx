import React, { useState } from 'react';
import './StreakTracker.css';

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

  const renderStreakCard = () => (
    <div className="dashboard-card streak-card">
      <div className="streak-info">
        <div className="streak-number">{currentStreak}</div>
        <div className="streak-text">Streak Days</div>
      </div>
      <img src={plantLarge} alt="Growing plant" className="plant-icon-large" />
    </div>
  );

  const renderWeeklyGoalCard = () => (
    <div className="dashboard-card weekly-goal-card">
      <h2 className="card-title">Weekly Eco-Goal</h2>
      <div className="weekly-leaves">
        {weeklyGoal.map((item, index) => (
          <div key={index} className={`leaf-icon`} onClick={() => toggleWeeklyGoal(index)} style={{ cursor: 'pointer' }}>
            {item.completed
              ? <span>{item.day}</span>
              : (
                <div className="circle-image-container">
                  <img src={checkmarkLeaf} alt="checkmark" className="circle-image" />
                </div>
              )}
          </div>
        ))}
      </div>
      <div className="goal-progress-text">{weeklyGoal.filter(g => g.completed).length} / 7 Days Completed</div>
    </div>
  );

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

  const renderDailyActionsCard = () => (
    <div className="dashboard-card daily-actions-card">
      <h2 className="card-title">Daily Actions</h2>
      <ul className="daily-actions-list">
        {dailyActions.map((action, index) => (
          <li key={index} className="daily-action-item">
            <span
              className={`action-check ${action.completed ? "checked" : "unchecked"}`}
              onClick={() => toggleAction(index)}
              style={{ cursor: 'pointer' }}
            >
              {action.completed
                ? <img src={checkmarkLeaf} alt="checkmark" className="checkmark-icon" />
                : <span className="circle-icon" />}
            </span>
            <span className="action-name">{action.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderRewardsCard = () => (
    <div className="dashboard-card rewards-card">
      <h2 className="card-title">Unlock Rewards!</h2>
      <div className="rewards-info">
        <img src={lockIcon} alt="lock" className="lock-icon" />
        <span className="reward-text">Next Reward @ {nextRewardDays} Days!</span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${nextRewardProgress}%` }}></div>
      </div>
    </div>
  );

  const renderCalendarCard = () => (
    <div className="dashboard-card calendar-card">
      <h2 className="card-title">SEPT 2025</h2>
      <div className="calendar-grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((dayInitial, index) => (
          <div key={`header-${index}`} className="calendar-day-header">{dayInitial}</div>
        ))}
        {calendarDays.map((day, index) => (
          <div key={index} className={`calendar-day-item ${day.isCurrentDay ? "current-day" : ""} ${day.isCompleted ? "completed-day" : ""} ${day.isMissed ? "missed-day" : ""}`}>
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="streak-tracker-layout" style={{ display: 'flex', alignItems: 'flex-start', width: '100%', flexDirection: 'column' }}>
      <h1 className="main-title">Eco-Quest Streak Log</h1>
      <div style={{ display: 'flex', width: '100%' }}>
        <div className="streak-tracker-container">
          <div className="dashboard-grid">
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