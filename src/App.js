import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing.jsx";
import Main from "./components/Main.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
