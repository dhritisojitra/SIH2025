import React, { useState } from 'react';
import './StreakTracker.css';
import './WeeklyEcoGoalCard.css';
import checkmarkLeaf from '../assets/checkmark_leaf.jpeg';
import profileImg from '../assets/profile.jpeg';

const WeeklyEcoGoalCard = () => {
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
    <div className="weekly-eco-goal-wrapper">
      <div className="profile-card-wrapper">
        <div className="dashboard-card profile-card">
          <img src={profileImg} alt="Profile" className="profile-image" />
          <div className="profile-username-section">
            <label className="profile-username-label">USERNAME:</label>
            <input type="text" className="profile-username-input" placeholder="Enter username" />
            <label className="profile-bio-label">BIO:</label>
            <input type="text" className="profile-bio-input" placeholder="Enter bio" />
            <label className="profile-points-label">POINTS:</label>
            <input type="text" className="profile-points-input" placeholder="Enter points" />
            <label className="profile-badges-label">BADGES:</label>
            <input type="text" className="profile-badges-input" placeholder="Enter badges" />
          </div>
        </div>
      </div>
      <div className="eco-goal-upload-column">
        <div className="dashboard-card weekly-goal-card">
          <h2 className="card-title">Weekly Eco-Goal</h2>
          <div className="weekly-leaves">
            {weeklyGoal.map((item, index) => (
              <div key={index} className="leaf-icon" onClick={() => toggleWeeklyGoal(index)}>
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
        <div className="dashboard-card daily-actions-card">
          <h2 className="card-title">Daily Actions</h2>
          <ul className="daily-actions-list">
            {dailyActions.map((action, idx) => (
              <li key={idx} className="daily-action-item">
                <span
                  className={`action-check ${action.completed ? 'checked' : 'unchecked'}`}
                  onClick={() => handleActionClick(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  {action.completed
                    ? <img src={checkmarkLeaf} alt="leaf" className="checkmark-icon" />
                    : <span className="circle-icon" />}
                </span>
                <span className="action-name">{action.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showModal && (
        <div className="upload-modal-overlay" onClick={handleCloseModal}>
          <div className="upload-modal-card" onClick={e => e.stopPropagation()}>
            <div className="upload-modal-content">
              <span className="upload-plus-circle">+</span>
              <span className="upload-text">Upload Files</span>
              <input type="file" className="upload-modal-file" onChange={handleFileUpload} />
            </div>
            <button className="upload-modal-close" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyEcoGoalCard;
