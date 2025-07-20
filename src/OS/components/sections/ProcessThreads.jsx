import React from 'react';
import AnimatedCard from '../animations/AnimatedCard';
import ProcessAnimation from '../animations/ProcessAnimation';

const ProcessThreads = () => (
    <>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Processes vs. Threads: The Complete Guide
        </h1>
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Understanding the difference between processes and threads is crucial for system design and interviews. Let's break it down with clear analogies and technical details.
        </p>

        <AnimatedCard delay={100}>
            <ProcessAnimation />
        </AnimatedCard>

        <AnimatedCard delay={200}>
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-3xl font-semibold mb-6 text-center">🏢 The Restaurant Analogy</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center p-6 border-2 border-blue-300 rounded-lg bg-gradient-to-b from-blue-50 to-blue-100 transform hover:scale-105 transition-transform duration-300">
                        <div className="text-6xl mb-4">🏢</div>
                        <h3 className="text-2xl font-bold text-blue-700 mb-4">Process = Restaurant</h3>
                        <div className="text-left space-y-2">
                            <p>🏠 <strong>Own building</strong> - Separate memory space</p>
                            <p>🚪 <strong>Private entrance</strong> - Protected address space</p>
                            <p>📞 <strong>Phone system</strong> - Inter-process communication</p>
                            <p>💰 <strong>Own budget</strong> - Resource allocation</p>
                            <p>🔒 <strong>Security</strong> - Process isolation</p>
                        </div>
                    </div>
                    <div className="text-center p-6 border-2 border-green-300 rounded-lg bg-gradient-to-b from-green-50 to-green-100 transform hover:scale-105 transition-transform duration-300">
                        <div className="text-6xl mb-4">👨‍🍳</div>
                        <h3 className="text-2xl font-bold text-green-700 mb-4">Thread = Chef</h3>
                        <div className="text-left space-y-2">
                            <p>🍳 <strong>Share kitchen</strong> - Shared memory space</p>
                            <p>🗣️ <strong>Direct communication</strong> - Fast data sharing</p>
                            <p>🔄 <strong>Work together</strong> - Concurrent execution</p>
                            <p>⚡ <strong>Quick coordination</strong> - Low context switching</p>
                            <p>⚠️ <strong>Shared risk</strong> - One crash affects all</p>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={300}>
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-3xl font-semibold mb-6">📊 Technical Comparison</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-200 to-slate-300">
                                <th className="border-2 border-slate-400 p-4 font-bold">Aspect</th>
                                <th className="border-2 border-slate-400 p-4 font-bold text-blue-700">Process</th>
                                <th className="border-2 border-slate-400 p-4 font-bold text-green-700">Thread</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Memory Space', 'Separate virtual address space (4GB on 32-bit)', 'Shares address space with parent process'],
                                ['Creation Cost', 'Expensive (~1000s of instructions)', 'Lightweight (~100s of instructions)'],
                                ['Communication', 'IPC: pipes, sockets, shared memory', 'Direct memory access, shared variables'],
                                ['Context Switching', 'Slow (save/restore memory mappings)', 'Fast (only registers and stack)'],
                                ['Fault Isolation', 'High - crash contained to process', 'Low - thread crash kills entire process'],
                                ['Security', 'Strong isolation via virtual memory', 'Minimal - threads trust each other'],
                                ['Scalability', 'Limited by memory per process', 'Limited by stack space per thread'],
                                ['Debugging', 'Easier - isolated state', 'Harder - race conditions, shared state']
                            ].map(([aspect, process, thread], index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                                    <td className="border border-slate-300 p-4 font-semibold">{aspect}</td>
                                    <td className="border border-slate-300 p-4">{process}</td>
                                    <td className="border border-slate-300 p-4">{thread}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={400}>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-3xl font-semibold mb-6">🎯 When to Use What?</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Choose Processes When:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-3 mt-1">🛡️</span>
                                <div>
                                    <strong>Security is critical</strong> - Web browsers use separate processes for tabs
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-3 mt-1">🔧</span>
                                <div>
                                    <strong>Fault isolation needed</strong> - One component crash shouldn't kill entire app
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-3 mt-1">📡</span>
                                <div>
                                    <strong>Distributed systems</strong> - Different machines, different processes
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-green-600 mb-4">Choose Threads When:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-3 mt-1">⚡</span>
                                <div>
                                    <strong>Performance is key</strong> - Game engines, real-time systems
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-3 mt-1">🔄</span>
                                <div>
                                    <strong>Frequent communication</strong> - Producer-consumer scenarios
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-3 mt-1">🎯</span>
                                <div>
                                    <strong>Parallel processing</strong> - Mathematical computations, data processing
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={500}>
            <div className="bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-semibold mb-6">💡 Interview Questions & Answers</h2>
                <div className="space-y-6">
                    <div className="border-l-4 border-amber-500 pl-6 py-4 bg-amber-50">
                        <h3 className="font-bold text-lg mb-2">Q: Why is process creation more expensive than thread creation?</h3>
                        <p><strong>A:</strong> Process creation requires: (1) Allocating new virtual address space, (2) Setting up page tables, (3) Creating new file descriptor table, (4) Copying environment variables. Thread creation only needs a new stack and register set.</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50">
                        <h3 className="font-bold text-lg mb-2">Q: What happens during a context switch?</h3>
                        <p><strong>A:</strong> For processes: Save registers → Save memory management info → Switch page tables → Load new process state. For threads: Save registers → Switch stack pointer → Load thread state. Process switching is ~10x slower.</p>
                    </div>
                </div>
            </div>
        </AnimatedCard>
    </>
);

export default ProcessThreads;
