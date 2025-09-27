import React, { useState, useEffect } from 'react';
// NEW: Imported Leaf and Edit icons for new features
import { Camera, Upload, Trophy, Award, Star, Flame, CheckCircle, Circle, Leaf, Edit } from 'lucide-react';

// NEW: Added a list of sample avatars for users to choose from
const avatars = [
  'https://api.dicebear.com/8.x/lorelei/svg?seed=Alex',
  'https://api.dicebear.com/8.x/lorelei/svg?seed=Samantha',
  'https://api.dicebear.com/8.x/lorelei/svg?seed=Leo',
  'https://api.dicebear.com/8.x/lorelei/svg?seed=Mia',
  'https://api.dicebear.com/8.x/lorelei/svg?seed=Chris',
  'https://api.dicebear.com/8.x/lorelei/svg?seed=Zoe',
];

const Dashboard = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [streak, setStreak] = useState(12);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [totalPoints, setTotalPoints] = useState(12450);
  const [level, setLevel] = useState(34);
  const [gamesPlayed, setGamesPlayed] = useState(248);
  const [wins, setWins] = useState(156);
  
  // --- MODIFIED: Weekly Progress State ---
  // Initialized to an array of 7 false values, representing an empty week.
  // This will now be updated based on daily task completion.
  const [weeklyProgress, setWeeklyProgress] = useState([true, true, true, false, false, false, false]);

  // --- NEW: State for Avatar Selection ---
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const dailyTasks = [
    { id: 1, name: 'Complete Level Challenge', points: 50, icon: Trophy, category: 'level' },
    { id: 2, name: 'Win 3 Matches', points: 75, icon: Star, category: 'pvp' },
    { id: 3, name: 'Play with Friends', points: 30, icon: Award, category: 'social' },
    { id: 4, name: 'Achieve New High Score', points: 100, icon: Flame, category: 'score' }
  ];

  const [badges, setBadges] = useState([
    { id: 1, name: 'First Victory', color: 'bg-yellow-400', earned: true },
    { id: 2, name: 'Speed Master', color: 'bg-blue-400', earned: true },
    { id: 3, name: 'Team Player', color: 'bg-green-400', earned: true },
    { id: 4, name: 'High Scorer', color: 'bg-purple-400', earned: false },
    { id: 5, name: 'Consistent', color: 'bg-red-400', earned: true },
    { id: 6, name: 'Champion', color: 'bg-indigo-400', earned: false }
  ]);

  const achievements = [
    { name: 'Games Played', value: gamesPlayed, icon: Trophy },
    { name: 'Wins', value: wins, icon: Star },
    { name: 'Current Level', value: level, icon: Award },
    { name: 'Total Points', value: totalPoints, icon: Flame }
  ];

  // REMOVED: The useEffect that previously calculated weekly progress based on streak is no longer needed.

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTaskSubmit = () => {
    if (selectedFile && currentTask) {
      const newCompletedTasks = [...completedTasks, currentTask.id];
      setCompletedTasks(newCompletedTasks);
      
      const pointsEarned = currentTask.points;
      setTotalPoints(prev => prev + pointsEarned);
      
      if (currentTask.category === 'level') setLevel(prev => prev + 1);
      else if (currentTask.category === 'pvp') {
        setWins(prev => prev + 3);
        setGamesPlayed(prev => prev + 3);
      } else if (currentTask.category === 'social') {
        setGamesPlayed(prev => prev + 1);
      }
      
      setBadges(prevBadges => 
        prevBadges.map(badge => {
          if (!badge.earned && shouldUnlockBadge(badge, newCompletedTasks, pointsEarned)) {
            return { ...badge, earned: true };
          }
          return badge;
        })
      );
      
      setSelectedFile(null);
      setShowUploadModal(false);
      setCurrentTask(null);
      
      // --- MODIFIED: Logic to update streak and weekly progress ---
      if (newCompletedTasks.length >= dailyTasks.length) {
        setStreak(prev => prev + 1);

        // NEW: When all daily tasks are done, update this week's progress
        const todayIndex = new Date().getDay(); // Sunday = 0, Monday = 1, etc.
        const newWeeklyProgress = [...weeklyProgress];
        newWeeklyProgress[todayIndex] = true;
        setWeeklyProgress(newWeeklyProgress);
      }
    }
  };

  const shouldUnlockBadge = (badge, completedTasks, pointsEarned) => {
    switch (badge.name) {
      case 'High Scorer': return pointsEarned >= 100;
      case 'Champion': return completedTasks.length >= dailyTasks.length;
      default: return false;
    }
  };

  const openUploadModal = (task) => {
    setCurrentTask(task);
    setShowUploadModal(true);
  };
  
  // MODIFIED: Days of the week to match the S, M, T format from your image
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="min-h-screen bg-[#F5F5DC] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* --- Left Column: MODIFIED Profile Card --- */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  {/* MODIFIED: The img tag now uses the selectedAvatar state */}
                  <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={selectedAvatar} 
                      alt="Profile Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* NEW: Button to open the avatar selection modal */}
                  <button 
                    onClick={() => setShowAvatarModal(true)}
                    className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 hover:bg-green-600 transition-colors"
                    aria-label="Change Avatar"
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mt-4">Alex Johnson</h2>
                <p className="text-green-800 font-medium">Level {level} Player</p>
                <div className="flex items-center mt-2 text-orange-600">
                  <Flame className="w-4 h-4 mr-1" />
                  <span className="font-bold">{streak} Day Streak</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center p-3 bg-green-50 rounded-lg">
                    <achievement.icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-700">{achievement.value}</div>
                    <div className="text-sm text-gray-600">{achievement.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- Middle Column: MODIFIED Weekly Progress --- */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-green-700 mb-4">Weekly Eco-Goal</h3>
              <div className="flex justify-around items-center">
                {/* MODIFIED: This now dynamically renders based on the weeklyProgress state */}
                {weekDays.map((day, index) => {
                  const isCompleted = weeklyProgress[index];
                  return (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-colors ${
                        isCompleted ? 'bg-green-700' : 'bg-gray-300'
                      }`}>
                        {isCompleted ? <Leaf size={24} /> : day}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-center">
                {/* MODIFIED: Text now dynamically counts completed days */}
                <span className="text-md font-medium text-gray-700">
                  {weeklyProgress.filter(Boolean).length} / 7 Days Completed
                </span>
              </div>
            </div>

            {/* Daily Tasks */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-green-700 mb-4">Daily Tasks</h3>
              <div className="space-y-3">
                {dailyTasks.map((task) => {
                  const isCompleted = completedTasks.includes(task.id);
                  const TaskIcon = task.icon;
                  
                  return (
                    <div key={task.id} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      isCompleted ? 'bg-green-100' : 'bg-gray-50 hover:bg-gray-100'
                    }`}>
                      <div className="flex items-center">
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 mr-3" />
                        )}
                        <div>
                          <div className={`font-medium ${isCompleted ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                            {task.name}
                          </div>
                          <div className="text-sm text-green-600">+{task.points} points</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <TaskIcon className="w-4 h-4 text-green-700 mr-2" />
                        {!isCompleted && (
                          <button
                            onClick={() => openUploadModal(task)}
                            className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center"
                          >
                            <Camera className="w-4 h-4 mr-1 " />
                            Submit
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Right Column - Badges and Stats (Unchanged) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Badges Collection
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="text-center">
                    <div className={`w-16 h-16 rounded-full ${badge.earned ? badge.color : 'bg-gray-300'} 
                      flex items-center justify-center mx-auto mb-2 ${badge.earned ? 'shadow-lg' : 'opacity-50'}`}>
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className={`text-xs font-medium ${badge.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">
                  {badges.filter(b => b.earned).length} / {badges.length} Badges Earned
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-green-700 mb-4">Today's Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-bold text-green-700">{completedTasks.length}/{dailyTasks.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedTasks.length / dailyTasks.length) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Points Today</span>
                  <span className="font-bold text-green-700">
                    +{completedTasks.reduce((sum, taskId) => {
                      const task = dailyTasks.find(t => t.id === taskId);
                      return sum + (task ? task.points : 0);
                    }, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- NEW: Avatar Selection Modal --- */}
        {showAvatarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">
              <button 
                onClick={() => setShowAvatarModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Your Avatar</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {avatars.map((avatarUrl, index) => (
                  <button 
                    key={index}
                    onClick={() => {
                      setSelectedAvatar(avatarUrl);
                      setShowAvatarModal(false);
                    }}
                    className={`rounded-full p-1 border-2 transition-all ${
                      selectedAvatar === avatarUrl ? 'border-green-500' : 'border-transparent hover:border-green-300'
                    }`}
                  >
                    <img 
                      src={avatarUrl} 
                      alt={`Avatar ${index + 1}`} 
                      className="w-24 h-24 rounded-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal (Unchanged) */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Submit Task Photo</h3>
              <p className="text-gray-600 mb-4">Upload a photo to complete: {currentTask?.name}</p>
              
              <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center mb-4">
                <Camera className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <span className="text-green-600 font-medium hover:text-green-700">
                    Click to upload photo
                  </span>
                </label>
                {selectedFile && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedFile(null);
                    setCurrentTask(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTaskSubmit}
                  disabled={!selectedFile}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;