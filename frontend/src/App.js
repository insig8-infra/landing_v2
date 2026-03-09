import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BuiltFromResearch from './components/BuiltFromResearch';
import Problem from './components/Problem';
import Reframe from './components/Reframe';
import HowItWorks from './components/HowItWorks';
import Outcomes from './components/Outcomes';
import Stats from './components/Stats';
import FounderNote from './components/FounderNote';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const LandingPage = () => (
  <>
    <Navigation />
    <main>
      <Hero />
      <BuiltFromResearch />
      <Problem />
      <Reframe />
      <HowItWorks />
      <Outcomes />
      <Stats />
      <FounderNote />
      <FinalCTA />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
