import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { Home } from '../../pages/home/home';
import { AITrain } from '../../pages/ai_train/ai-train';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aii" element={<AITrain />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
