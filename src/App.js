import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Tabs from './components/Tabs';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Tabs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
