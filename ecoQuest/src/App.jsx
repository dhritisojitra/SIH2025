import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DuolingoRoadmap from "./test";
import EcoQuizPage from "./pages/Quiz";  
import "./App.css";
import Cards from "./components/Cards";
import EcoQuestRoadmap from "./test";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     {/* Roadmap page */}
    //     <Route path="/" element={<DuolingoRoadmap />} />

    //     {/* Quiz page */}
    //     <Route path="/quiz" element={<EcoQuizPage />} />
    //   </Routes>
    // </Router>
  
   <EcoQuestRoadmap/>
  );
}

export default App;
