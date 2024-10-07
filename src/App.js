import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Intro from "./components/Intro";
import CustomPage from "./components/CustomPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/custom-page" element={<CustomPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
