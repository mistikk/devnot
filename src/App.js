import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details" element={<DetailsPage />} />
          </Routes>
        </header>
      </div>
    );
  }
}

export default App;
