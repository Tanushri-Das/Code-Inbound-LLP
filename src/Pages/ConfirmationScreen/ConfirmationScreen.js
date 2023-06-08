
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-300">
      <h2 className="text-3xl font-bold mb-4 text-white">
        Thank you for your time!
      </h2>
    </div>
  );
};

export default ConfirmationScreen;
