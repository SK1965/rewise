import React, { useState, useEffect } from 'react';

const ProcessAnimation = () => {
    const [animationState, setAnimationState] = useState('idle');
    
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationState(prev => {
                const states = ['idle', 'ready', 'running', 'waiting', 'terminated'];
                const currentIndex = states.indexOf(prev);
                return states[(currentIndex + 1) % states.length];
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const stateColors = {
        idle: 'bg-gray-400',
        ready: 'bg-blue-400',
        running: 'bg-green-400',
        waiting: 'bg-yellow-400',
        terminated: 'bg-red-400'
    };

    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Process State Diagram</h3>
            <div className="relative w-80 h-80">
                <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full ${stateColors.idle} flex items-center justify-center text-white font-bold transition-all duration-500 ${animationState === 'idle' ? 'scale-125 shadow-lg' : ''}`}>
                    New
                </div>
                <div className={`absolute top-20 right-4 w-16 h-16 rounded-full ${stateColors.ready} flex items-center justify-center text-white font-bold transition-all duration-500 ${animationState === 'ready' ? 'scale-125 shadow-lg' : ''}`}>
                    Ready
                </div>
                <div className={`absolute bottom-20 right-4 w-16 h-16 rounded-full ${stateColors.running} flex items-center justify-center text-white font-bold transition-all duration-500 ${animationState === 'running' ? 'scale-125 shadow-lg' : ''}`}>
                    Run
                </div>
                <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full ${stateColors.waiting} flex items-center justify-center text-white font-bold transition-all duration-500 ${animationState === 'waiting' ? 'scale-125 shadow-lg' : ''}`}>
                    Wait
                </div>
                <div className={`absolute bottom-20 left-4 w-16 h-16 rounded-full ${stateColors.terminated} flex items-center justify-center text-white font-bold transition-all duration-500 ${animationState === 'terminated' ? 'scale-125 shadow-lg' : ''}`}>
                    End
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-dashed border-gray-400 rounded-full animate-spin-slow"></div>
                </div>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600">
                Current State: <span className="font-bold capitalize">{animationState}</span>
            </p>
        </div>
    );
};

export default ProcessAnimation;
