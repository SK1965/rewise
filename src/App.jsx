import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHomePage from './HomePage';
import Os from './OS/components/OS.jsx';
import BackButton from './components/BackButton';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Homepage Route */}
          <Route path="/" element={<MainHomePage />} />
          
          {/* Subject Routes */}
          <Route path="/subject/operating-systems" element={
            <div className="relative">
             {/*  <BackButton /> */}
              <Os />
            </div>
          } />
          
          {/* Future Subject Routes */}
          <Route path="/subject/data-structures" element={
            <div className="relative">
              <BackButton />
              <div className="p-8 text-center">
                <h1 className="text-4xl font-bold">Data Structures Coming Soon! 🌳</h1>
              </div>
            </div>
          } />
          
          <Route path="/subject/algorithms" element={
            <div className="relative">
              <BackButton />
              <div className="p-8 text-center">
                <h1 className="text-4xl font-bold">Algorithms Coming Soon! ⚡</h1>
              </div>
            </div>
          } />
          
          <Route path="/subject/machine-learning" element={
            <div className="relative">
              <BackButton />
              <div className="p-8 text-center">
                <h1 className="text-4xl font-bold">Machine Learning Coming Soon! 🤖</h1>
              </div>
            </div>
          } />
          
          <Route path="/subject/web-development" element={
            <div className="relative">
              <BackButton />
              <div className="p-8 text-center">
                <h1 className="text-4xl font-bold">Web Development Coming Soon! 🌐</h1>
              </div>
            </div>
          } />
          
          <Route path="/subject/cybersecurity" element={
            <div className="relative">
              <BackButton />
              <div className="p-8 text-center">
                <h1 className="text-4xl font-bold">Cybersecurity Coming Soon! 🛡️</h1>
              </div>
            </div>
          } />
          
          <Route path="/subject/blockchain" element={
            <div className="relative">
              <BackButton />
              <div className="p-8 text-center">
                <h1 className="text-4xl font-bold">Blockchain Coming Soon! ⛓️</h1>
              </div>
            </div>
          } />
          
          <Route path="/subject/mobile-development" element={
            <div className="relative">
              <BackButton />
              <div className="p-8 text-center">
                <h1 className="text-4xl font-bold">Mobile Development Coming Soon! 📱</h1>
              </div>
            </div>
          } />
          
          {/* 404 Page */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 to-blue-600">
              <div className="text-center text-white">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-2xl mb-8">Oops! Page not found</p>
                <a href="/" className="bg-white text-violet-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Go Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
