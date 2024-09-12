import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Import the Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
