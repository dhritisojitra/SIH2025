import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DuolingoRoadmap from "./test";
import EcoQuizPage from "./pages/Quiz";  // 👈 make sure this path is correct
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Roadmap page */}
        <Route path="/" element={<DuolingoRoadmap />} />

        {/* Quiz page */}
        <Route path="/quiz" element={<EcoQuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
