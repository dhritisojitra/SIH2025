
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcoQuizPage from "./pages/Quiz";  
import "./App.css";
import Cards from "./components/Cards";
import EcoQuestRoadmap from "./pages/test";
import EcoNavbar from "./components/NavBar";
import HeroSection from "./pages/HeroPage";
import EnvironmentalStoryHub from "./pages/ConversationPage";
import ResourcesPage from "./pages/Resources";
import LeaderboardPage from "./pages/Leaderboard";

function App() {
  return (<>
      <EcoNavbar/>
      <Routes>
        {/* Roadmap page */}
        <Route path="/" element={<HeroSection/>} />
        <Route path="/roadmap" element={<EcoQuestRoadmap/>} />


        {/* Quiz page */}
        <Route path="/quiz" element={<EcoQuizPage />} />
        <Route path="/story" element={<EnvironmentalStoryHub/>} />

        {/* Resources page */}
        <Route path="/resources" element={<ResourcesPage />} />

        {/* Leaderboard page */}
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
  

   </>
  );
}

export default App;
