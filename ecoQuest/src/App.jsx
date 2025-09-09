import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ForestLoader from './components/Loader'
import StreakTracker from './components/StreakTracker.jsx';
import WeeklyEcoGoalCard from './components/WeeklyEcoGoalCard.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', marginTop: '32px', marginBottom: '32px', fontSize: '2rem', fontWeight: 'bold', color: '#234b1a' }}>
        Dashboard
      </h1>
      <div className="dashboard-flex-container">
        <WeeklyEcoGoalCard />
      </div>
    </div>
  )
}

export default App
