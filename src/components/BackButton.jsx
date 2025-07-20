// src/components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button 
            onClick={() => navigate('/')}
            className="fixed top-6 right-6 z-50 bg-gradient-to-r from-amber-500 to-orange-500 
                     text-white border-none px-6 py-3 rounded-full cursor-pointer font-semibold 
                     text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform 
                     hover:scale-105 hover:-translate-y-1 backdrop-blur-sm
                     flex items-center gap-2 group"
        >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
                ←
            </span>
            Back to Home
        </button>
    );
};

export default BackButton;
