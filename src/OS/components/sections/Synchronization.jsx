import React, { useState, useEffect } from 'react';
import AnimatedCard from '../animations/AnimatedCard';

const Synchronization = () => {
    const [lockAnimation, setLockAnimation] = useState('unlocked');
    const [semaphoreCount, setSemaphoreCount] = useState(3);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setLockAnimation(prev => prev === 'unlocked' ? 'locked' : 'unlocked');
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Synchronization Mastery
            </h1>
            <p className="text-xl text-slate-600 mb-8">Master the art of coordinating concurrent processes and avoiding race conditions.</p>

            <AnimatedCard delay={100}>
                <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                    <h2 className="text-3xl font-semibold mb-6 text-center">⚡ The Race Condition Problem</h2>
                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg border-2 border-red-200 mb-6">
                        <h3 className="text-xl font-bold mb-4 text-red-700">🏃‍♂️ Bank Account Race Condition</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h4 className="font-bold text-blue-600">Thread A (Withdrawal $50):</h4>
                                <div className="font-mono text-sm space-y-1 bg-blue-50 p-3 rounded">
                                    <div>1. balance = read_account() // $100</div>
                                    <div>2. new_balance = balance - 50 // $50</div>
                                    <div className="text-red-600">⏱️ Context switch happens here!</div>
                                    <div>3. write_account(new_balance) // $50</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-green-600">Thread B (Withdrawal $30):</h4>
                                <div className="font-mono text-sm space-y-1 bg-green-50 p-3 rounded">
                                    <div>1. balance = read_account() // $100</div>
                                    <div>2. new_balance = balance - 30 // $70</div>
                                    <div>3. write_account(new_balance) // $70</div>
                                    <div className="text-red-600">💥 Lost $50 withdrawal!</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <div className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-bold">
                                Expected Balance: $20 | Actual Balance: $70 | Lost: $50 💸
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedCard>

            <AnimatedCard delay={200}>
                <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                    <h2 className="text-3xl font-semibold mb-6">🔐 Synchronization Primitives</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                            <div className="text-center mb-4">
                                <div className={`inline-block w-16 h-16 rounded-full border-4 transition-all duration-500 ${
                                    lockAnimation === 'locked' 
                                        ? 'border-red-500 bg-red-100' 
                                        : 'border-green-500 bg-green-100'
                                }`}>
                                    <div className="w-full h-full flex items-center justify-center text-2xl">
                                        {lockAnimation === 'locked' ? '🔒' : '🔓'}
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">Mutex (Lock)</h3>
                            <div className="space-y-3 text-sm">
                                <p><strong>Purpose:</strong> Binary lock for mutual exclusion</p>
                                <p><strong>Rule:</strong> Only the thread that locks can unlock</p>
                                <p><strong>Use case:</strong> Protecting critical sections</p>
                                <div className="bg-white p-3 rounded font-mono text-xs">
                                    <div className="text-green-600">pthread_mutex_lock(&mutex);</div>
                                    <div className="text-blue-600">// Critical section</div>
                                    <div className="text-red-600">pthread_mutex_unlock(&mutex);</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
                            <div className="text-center mb-4">
                                <div className="flex justify-center space-x-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div 
                                            key={i}
                                            className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                                                i < semaphoreCount 
                                                    ? 'border-green-500 bg-green-200' 
                                                    : 'border-red-500 bg-red-200'
                                            }`}
                                        >
                                            <div className="w-full h-full flex items-center justify-center text-sm">
                                                {i < semaphoreCount ? '✅' : '❌'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2">
                                    <button 
                                        onClick={() => setSemaphoreCount(Math.max(0, semaphoreCount - 1))}
                                        className="bg-red-500 text-white px-2 py-1 rounded mr-2 text-xs"
                                    >
                                        Wait()
                                    </button>
                                    <button 
                                        onClick={() => setSemaphoreCount(Math.min(5, semaphoreCount + 1))}
                                        className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        Signal()
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">Semaphore</h3>
                            <div className="space-y-3 text-sm">
                                <p><strong>Purpose:</strong> Counter for resource management</p>
                                <p><strong>Rule:</strong> Any thread can signal/wait</p>
                                <p><strong>Use case:</strong> Limited resource pool (e.g., connection pool)</p>
                                <p><strong>Count:</strong> {semaphoreCount}/5 resources available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedCard>

            <AnimatedCard delay={300}>
                <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                    <h2 className="text-3xl font-semibold mb-6">🧠 Producer-Consumer Problem</h2>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <h3 className="font-bold text-purple-600 mb-2">🏭 Producer</h3>
                                <div className="bg-white p-4 rounded shadow">
                                    <div className="font-mono text-xs space-y-1">
                                        <div>while (true) &#123;</div>
                                        <div>&nbsp;&nbsp;item = produce();</div>
                                        <div>&nbsp;&nbsp;wait(empty);</div>
                                        <div>&nbsp;&nbsp;wait(mutex);</div>
                                        <div>&nbsp;&nbsp;buffer[in] = item;</div>
                                        <div>&nbsp;&nbsp;signal(mutex);</div>
                                        <div>&nbsp;&nbsp;signal(full);</div>
                                        <div>&#125;</div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-blue-600 mb-2">📦 Buffer</h3>
                                <div className="bg-white p-4 rounded shadow">
                                    <div className="grid grid-cols-4 gap-1 mb-2">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className={`w-6 h-6 border-2 rounded ${
                                                i < 3 ? 'bg-blue-200 border-blue-400' : 'bg-gray-100 border-gray-300'
                                            }`}></div>
                                        ))}
                                    </div>
                                    <p className="text-xs">Size: 8, Used: 3</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-green-600 mb-2">🛒 Consumer</h3>
                                <div className="bg-white p-4 rounded shadow">
                                    <div className="font-mono text-xs space-y-1">
                                        <div>while (true) &#123;</div>
                                        <div>&nbsp;&nbsp;wait(full);</div>
                                        <div>&nbsp;&nbsp;wait(mutex);</div>
                                        <div>&nbsp;&nbsp;item = buffer[out];</div>
                                        <div>&nbsp;&nbsp;signal(mutex);</div>
                                        <div>&nbsp;&nbsp;signal(empty);</div>
                                        <div>&nbsp;&nbsp;consume(item);</div>
                                        <div>&#125;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedCard>
        </>
    );
};

export default Synchronization;
