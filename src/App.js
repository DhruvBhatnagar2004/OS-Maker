import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import CustomPage from "./components/CustomPage";
import Navbar from "./components/Navbar";

function App() {
  const appStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://512pixels.net/downloads/macos-wallpapers-thumbs/10-14-Night-Thumb.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <Router>
      <div style={appStyle}>
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
