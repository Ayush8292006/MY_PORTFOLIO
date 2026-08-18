import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WelcomeScreen from './components/WelcomeScreen';
import AllProjects from './components/AllProjects';
import DSA from './components/DSA';
import Education from './components/Education';

// Main Layout Component
const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Skills />
            <DSA />
            <Education />
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
    const handleWelcomeComplete = () => {
      console.log('Welcome complete, showing main app');
      setShowWelcome(false);
    };

    window.addEventListener('welcomeComplete', handleWelcomeComplete);

    return () => {
      window.removeEventListener('welcomeComplete', handleWelcomeComplete);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
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