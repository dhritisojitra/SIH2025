import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcoQuizPage from "./pages/Quiz";  
import "./App.css";
import Cards from "./components/Cards";
import EcoQuestRoadmap from "./pages/test";
import EcoNavbar from "./components/NavBar";
import HeroSection from "./pages/HeroPage";
import EnvironmentalStoryHub from "./pages/ConversationPage";

function App() {
  return (<>
    
      <Routes>
        {/* Roadmap page */}
        <Route path="/" element={<HeroSection/>} />
        <Route path="/roadmap" element={<EcoQuestRoadmap/>} />

        {/* Quiz page */}
        <Route path="/quiz" element={<EcoQuizPage />} />
        <Route path="/story" element={<EnvironmentalStoryHub/>} />
      </Routes>
  

   </>
  );
}

export default App;
