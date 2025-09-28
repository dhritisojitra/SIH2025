import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcoQuizPage from "./pages/Quiz";  
import "./App.css";
import Cards from "./components/Cards";
import EcoQuestRoadmap from "./pages/test";
import EcoNavbar from "./components/NavBar";
import HeroSection from "./pages/HeroPage";
import EnvironmentalStoryHub from "./pages/ConversationPage";
import ResourcesPage from "./pages/Resources";
import Footer from "./components/Footer";
import Dashboard from "./pages/WeeklyEcoGoalCard";

// Games
import GamesHome from "./pages/GamesHome";   // <-- new hub page
import SymbiosisLevels from "./pages/SymbiosisLevels";
import SymbiosisGame from "./pages/SymbiosisGame";
import FoodprintDetective from "./pages/FoodprintDetective";

function App() {
  return (
    <>
      <EcoNavbar />
      <Routes>
        {/* Roadmap page */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/roadmap" element={<EcoQuestRoadmap />} />

        {/* Quiz page */}
        <Route path="/quiz" element={<EcoQuizPage />} />
        <Route path="/story" element={<EnvironmentalStoryHub />} />

        {/* Resources page */}
        <Route path="/resources" element={<ResourcesPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Games hub + individual games */}
        <Route path="/games" element={<GamesHome />} />
        <Route path="/symbiosis-levels" element={<SymbiosisLevels />} />
        <Route path="/symbiosis-game/:levelId" element={<SymbiosisGame />} />
        <Route path="/foodprint-detective" element={<FoodprintDetective />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
