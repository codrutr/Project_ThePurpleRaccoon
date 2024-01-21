import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ProjectsPage from './components/ProjectsPage';
import Navbar from './components/Navbar';
import SummaryPage from './components/SummaryPage';
import NotFoundPage from './components/NotFoundPage';


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/:role" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
