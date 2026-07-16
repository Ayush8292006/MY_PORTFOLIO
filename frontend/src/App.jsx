import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WelcomeScreen from './components/WelcomeScreen';

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
        <>
          <Navbar />
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;