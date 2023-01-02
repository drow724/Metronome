import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { isDesktop } from "react-device-detect";
import Webtronome from "./routes/Webtronome";
import Apptronome from "./routes/Apptronome";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={isDesktop ? <Webtronome /> : <Apptronome />} />
      </Routes>
    </Router>
  );
}

export default App;
