
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcoQuizPage from "./pages/Quiz";  
import "./App.css";
import Cards from "./components/Cards";
import EcoQuestRoadmap from "./pages/test";
import EcoNavbar from "./components/NavBar";
import HeroSection from "./pages/HeroPage";
import EnvironmentalStoryHub from "./pages/ConversationPage";
import ResourcesPage from "./pages/Resources";

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
      </Routes>
  

   </>
  );
}

export default App;
