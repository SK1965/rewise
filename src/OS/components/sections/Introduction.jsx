import React from 'react';
import AnimatedCard from '../animations/AnimatedCard';

const Introduction = () => (
    
    <>
        <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                What is an Operating System?
            </h1>
            <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                An Operating System is like the conductor of an orchestra - it coordinates all the different parts of your computer to work together harmoniously. Let's explore the fascinating world of OS concepts!
            </p>
        </div>

        <AnimatedCard delay={100}>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 text-amber-800 p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-3xl font-semibold mb-4 flex items-center">
                    <span className="mr-3">🎯</span>
                    The Core Functions of an OS
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                        <h3 className="font-bold text-lg mb-2 flex items-center">
                            <span className="mr-2">👨‍💼</span>
                            Resource Manager
                        </h3>
                        <p className="text-sm">Manages CPU time, memory allocation, disk space, and I/O devices efficiently among competing processes.</p>
                        <div className="mt-3 flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                        <h3 className="font-bold text-lg mb-2 flex items-center">
                            <span className="mr-2">🎭</span>
                            Abstraction Layer
                        </h3>
                        <p className="text-sm">Provides simple interfaces for complex hardware operations, hiding implementation details from applications.</p>
                        <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                        <h3 className="font-bold text-lg mb-2 flex items-center">
                            <span className="mr-2">🛡️</span>
                            Security Guardian
                        </h3>
                        <p className="text-sm">Enforces access controls, manages user permissions, and protects system integrity from malicious activities.</p>
                        <div className="mt-3 flex justify-center">
                            <div className="w-8 h-8 border-2 border-green-500 rounded-full flex items-center justify-center">
                                <span className="text-green-500 text-xs">✓</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={200}>
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-3xl font-semibold mb-6 text-center">OS Architecture Layers</h2>
                <div className="space-y-4">
                    {[
                        { name: 'User Applications', color: 'bg-purple-500', desc: 'Your programs (browsers, games, etc.)' },
                        { name: 'System Calls Interface', color: 'bg-blue-500', desc: 'Bridge between user and kernel space' },
                        { name: 'Operating System Kernel', color: 'bg-green-500', desc: 'Core OS functionality' },
                        { name: 'Device Drivers', color: 'bg-yellow-500', desc: 'Hardware-specific code' },
                        { name: 'Hardware Layer', color: 'bg-gray-500', desc: 'Physical components (CPU, RAM, etc.)' }
                    ].map((layer, index) => (
                        <div key={index} className={`${layer.color} text-white p-4 rounded-lg transform hover:scale-102 transition-all duration-300 animate-slide-in`} style={{animationDelay: `${index * 0.1}s`}}>
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">{layer.name}</h3>
                                <span className="text-sm opacity-75">{layer.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={300}>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-4 text-center">🚀 Why Study Operating Systems?</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-3 text-green-700">For Developers 👨‍💻</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><span className="mr-2">✅</span>Understand system performance bottlenecks</li>
                            <li className="flex items-center"><span className="mr-2">✅</span>Write efficient multi-threaded applications</li>
                            <li className="flex items-center"><span className="mr-2">✅</span>Debug system-level issues</li>
                            <li className="flex items-center"><span className="mr-2">✅</span>Optimize resource usage</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3 text-blue-700">For Interviews 🎯</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><span className="mr-2">🔥</span>Process vs Thread differences</li>
                            <li className="flex items-center"><span className="mr-2">🔥</span>Deadlock prevention strategies</li>
                            <li className="flex items-center"><span className="mr-2">🔥</span>Memory management techniques</li>
                            <li className="flex items-center"><span className="mr-2">🔥</span>Scheduling algorithms trade-offs</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AnimatedCard>
    </>
);

export default Introduction;
