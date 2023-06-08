import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-300">
      <h1 className="text-2xl md:text-4xl font-bold mb-9 text-white">Welcome To Our Survey</h1>
      <Link to="/survey" className="bg-blue-800 text-white py-2 px-4 rounded text-xl">
        Start
      </Link>
    </div>
  );
};

export default WelcomeScreen;
