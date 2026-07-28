import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WelcomeScreen from './components/WelcomeScreen';
import AllProjects from './components/AllProjects';

// Main Layout Component
const MainLayout = () => {
  const location = useLocation();
  const isProjectsPage = location.pathname === '/projects';

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/projects" element={
          <>
            <AllProjects />
            <Footer />
          </>
        } />
      </Routes>
    </>
  );
};

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // ✅ WelcomeScreen se navigate signal suno
    const handleWelcomeComplete = () => {
      setShowWelcome(false);
    };

    window.addEventListener('welcomeComplete', handleWelcomeComplete);

    return () => {
      window.removeEventListener('welcomeComplete', handleWelcomeComplete);
    };
  }, []);

  return (
    <div className="bg-[#0a0e1a] min-h-screen">
      {showWelcome ? (
        <WelcomeScreen />
      ) : (
        <Router>
          <MainLayout />
        </Router>
      )}
    </div>
  );
};

export default App;