import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import AnimatedCard from '../animations/AnimatedCard';
import { MEMORY_FRAME_COUNT, DEFAULT_PAGE_STRING, PAGE_REPLACEMENT_ALGORITHMS } from '../../utils/constants';

const MemoryManagement = () => {
    const [simState, setSimState] = useState(null);
    const [algorithm, setAlgorithm] = useState('fifo');

    const pageAlgoRules = {
        fifo: {
            title: 'FIFO (First-In, First-Out)',
            rule: 'Evict the page that has been in memory the longest (the "First-In").',
            pros: ['Simple to implement', 'Fair (all pages get equal treatment)', 'Low overhead'],
            cons: ['Ignores page usage patterns', 'Can evict frequently used pages', 'Suffers from Belady\'s anomaly'],
            complexity: 'O(1) per page reference'
        },
        lru: {
            title: 'LRU (Least Recently Used)',
            rule: 'Evict the page that has not been used for the longest time.',
            pros: ['Good approximation to optimal', 'Considers recent usage patterns', 'Better hit ratio than FIFO'],
            cons: ['Higher implementation complexity', 'Requires tracking usage timestamps', 'More overhead'],
            complexity: 'O(1) with proper data structures'
        },
        opt: {
            title: 'Optimal (OPT)',
            rule: 'Look into the future. Evict the page that will not be needed for the longest time.',
            pros: ['Theoretical minimum page faults', 'Perfect replacement strategy', 'Used as benchmark'],
            cons: ['Impossible to implement (needs future knowledge)', 'Only useful for analysis', 'Not practical'],
            complexity: 'O(n) for analysis'
        }
    };

    const resetSim = (algo) => {
        const pageString = DEFAULT_PAGE_STRING.split(',').map(n => parseInt(n));
        setSimState({
            pageString: pageString,
            frameCount: MEMORY_FRAME_COUNT,
            currentStep: 0,
            frames: [],
            hits: 0,
            faults: 0,
            log: 'Simulation ready. Click "Next Step" to begin.',
            fifoQueue: [],
            lruQueue: [],
            stepHistory: []
        });
    };

    useEffect(() => {
        resetSim(algorithm);
    }, [algorithm]);

    const stepSim = () => {
        if (!simState || simState.currentStep >= simState.pageString.length) return;

        setSimState(prevState => {
            const newState = JSON.parse(JSON.stringify(prevState));
            const currentPage = newState.pageString[newState.currentStep];
            let logMessage = `Step ${newState.currentStep + 1}: Requesting page <strong>${currentPage}</strong>. `;
            const isHit = newState.frames.includes(currentPage);

            let stepResult = {
                step: newState.currentStep + 1,
                page: currentPage,
                isHit: isHit,
                framesBefore: [...newState.frames],
                framesAfter: [],
                evicted: null
            };

            if (isHit) {
                newState.hits++;
                logMessage += `<span class="text-green-600 font-bold">HIT! 🎯</span> Page ${currentPage} is already in memory.`;
                if (algorithm === 'lru') {
                    const index = newState.lruQueue.indexOf(currentPage);
                    newState.lruQueue.splice(index, 1);
                    newState.lruQueue.push(currentPage);
                    logMessage += ` Updated as most recently used.`;
                }
                stepResult.framesAfter = [...newState.frames];
            } else {
                newState.faults++;
                logMessage += `<span class="text-red-600 font-bold">PAGE FAULT! 💥</span> `;
                
                if (newState.frames.length < newState.frameCount) {
                    // Empty frame available
                    newState.frames.push(currentPage);
                    if (algorithm === 'fifo') newState.fifoQueue.push(currentPage);
                    if (algorithm === 'lru') newState.lruQueue.push(currentPage);
                    logMessage += `Loaded into empty frame ${newState.frames.length}.`;
                } else {
                    // Need to evict a page
                    let evictPage;
                    let evictIndex = -1;
                    
                    if (algorithm === 'fifo') {
                        evictPage = newState.fifoQueue.shift();
                        evictIndex = newState.frames.indexOf(evictPage);
                        logMessage += `Evicting page <strong>${evictPage}</strong> (oldest in memory).`;
                        newState.fifoQueue.push(currentPage);
                    } else if (algorithm === 'lru') {
                        evictPage = newState.lruQueue.shift();
                        evictIndex = newState.frames.indexOf(evictPage);
                        logMessage += `Evicting page <strong>${evictPage}</strong> (least recently used).`;
                        newState.lruQueue.push(currentPage);
                    } else if (algorithm === 'opt') {
                        let farthest = -1;
                        newState.frames.forEach((framePage, index) => {
                            let futureUse = newState.pageString.slice(newState.currentStep + 1).indexOf(framePage);
                            if (futureUse === -1) {
                                farthest = Infinity;
                                evictIndex = index;
                                evictPage = framePage;
                            } else if (farthest !== Infinity && (futureUse > farthest || farthest === -1)) {
                                farthest = futureUse;
                                evictIndex = index;
                                evictPage = framePage;
                            }
                        });
                        logMessage += `Evicting page <strong>${evictPage}</strong> (won't be used for longest time).`;
                    }

                    if (evictIndex !== -1) {
                        newState.frames[evictIndex] = currentPage;
                        stepResult.evicted = evictPage;
                    }
                }
                stepResult.framesAfter = [...newState.frames];
            }
            
            newState.stepHistory.push(stepResult);
            newState.log = logMessage;
            newState.currentStep++;
            return newState;
        });
    };

    if (!simState) return <div className="text-center">Loading memory simulation...</div>;

    const currentAlgo = pageAlgoRules[algorithm];
    const hitRate = simState.hits + simState.faults > 0 ? ((simState.hits / (simState.hits + simState.faults)) * 100).toFixed(1) : 0;

    return (
        <>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Memory Management Deep Dive
            </h1>

            <AnimatedCard delay={100}>
                <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                    <h2 className="text-3xl font-semibold mb-6">🧠 Virtual Memory Concepts</h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-400">
                            <h3 className="text-xl font-bold text-blue-700 mb-3">📄 Pages & Frames</h3>
                            <p className="text-sm mb-3">Virtual memory is divided into fixed-size pages. Physical memory has corresponding frames.</p>
                            <div className="grid grid-cols-4 gap-1">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className={`h-6 border-2 rounded text-xs flex items-center justify-center ${
                                        i < 3 ? 'bg-blue-200 border-blue-400 text-blue-800' : 'bg-gray-100 border-gray-300'
                                    }`}>
                                        {i < 3 ? `P${i}` : ''}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs mt-2 text-blue-600">Physical Memory Frames</p>
                        </div>
                        
                        <div className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-400">
                            <h3 className="text-xl font-bold text-green-700 mb-3">🗂️ Page Table</h3>
                            <p className="text-sm mb-3">Maps virtual pages to physical frames. Contains valid/invalid bits.</p>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between bg-white p-1 rounded">
                                    <span>Page 0:</span> <span className="text-green-600">Frame 1 ✓</span>
                                </div>
                                <div className="flex justify-between bg-white p-1 rounded">
                                    <span>Page 1:</span> <span className="text-red-600">Invalid ✗</span>
                                </div>
                                <div className="flex justify-between bg-white p-1 rounded">
                                    <span>Page 2:</span> <span className="text-green-600">Frame 3 ✓</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-b from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-400">
                            <h3 className="text-xl font-bold text-purple-700 mb-3">💾 Secondary Storage</h3>
                            <p className="text-sm mb-3">Pages not in memory are stored on disk (swap space).</p>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-purple-200 rounded-full flex items-center justify-center mb-2">
                                    <span className="text-2xl">💽</span>
                                </div>
                                <p className="text-xs text-purple-600">Swap File/Partition</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedCard>

            <AnimatedCard delay={200}>
                <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                    <h2 className="text-3xl font-semibold mb-6">🎯 Page Replacement Simulator</h2>
                    
                    {/* Algorithm Selection */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        {Object.keys(pageAlgoRules).map(algo => (
                            <button 
                                key={algo} 
                                onClick={() => setAlgorithm(algo)} 
                                className={`p-4 rounded-lg font-semibold transition-all duration-300 ${
                                    algorithm === algo 
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white transform scale-105 shadow-lg' 
                                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300 hover:scale-102'
                                }`}
                            >
                                {algo.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Algorithm Info */}
                    <AnimatedCard delay={300}>
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-6 border-l-4 border-indigo-400">
                            <h3 className="text-2xl font-bold mb-2 text-indigo-800">{currentAlgo.title}</h3>
                            <p className="text-lg mb-4">{currentAlgo.rule}</p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-green-600 mb-2">✅ Advantages:</h4>
                                    <ul className="text-sm space-y-1">
                                        {currentAlgo.pros.map((pro, i) => (
                                            <li key={i}>• {pro}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-600 mb-2">❌ Disadvantages:</h4>
                                    <ul className="text-sm space-y-1">
                                        {currentAlgo.cons.map((con, i) => (
                                            <li key={i}>• {con}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <p className="mt-4 text-sm"><strong>Complexity:</strong> {currentAlgo.complexity}</p>
                        </div>
                    </AnimatedCard>

                    {/* Page Reference String */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Page Reference String:</h3>
                        <div className="bg-slate-100 p-4 rounded-lg">
                            <div className="flex flex-wrap gap-2 text-lg font-mono">
                                {simState.pageString.map((page, i) => (
                                    <span 
                                        key={i} 
                                        className={`px-3 py-1 rounded transition-all duration-300 ${
                                            i === simState.currentStep 
                                                ? 'bg-yellow-400 text-yellow-900 transform scale-110 shadow-md' 
                                                : i < simState.currentStep 
                                                    ? 'bg-green-200 text-green-800' 
                                                    : 'bg-white text-slate-600'
                                        }`}
                                    >
                                        {page}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Memory Frames Visualization */}
                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                        <div>
                            <h3 className="font-semibold mb-4 text-center">Memory Frames ({simState.frameCount} frames)</h3>
                            <div className="flex justify-center gap-3">
                                {Array.from({ length: simState.frameCount }).map((_, i) => {
                                    const page = simState.frames[i];
                                    return (
                                        <div 
                                            key={i} 
                                            className={`page-frame ${
                                                page !== undefined 
                                                    ? 'bg-blue-100 border-blue-400 text-blue-800' 
                                                    : 'bg-gray-100 border-gray-300 text-gray-500 empty'
                                            }`}
                                        >
                                            {page ?? '-'}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Statistics</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg">
                                    <span className="font-semibold">Hits:</span>
                                    <span className="text-2xl font-bold text-green-600">{simState.hits}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-100 rounded-lg">
                                    <span className="font-semibold">Page Faults:</span>
                                    <span className="text-2xl font-bold text-red-600">{simState.faults}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-100 rounded-lg">
                                    <span className="font-semibold">Hit Rate:</span>
                                    <span className="text-2xl font-bold text-blue-600">{hitRate}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Log Display */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Step Log:</h3>
                        <div 
                            className="bg-slate-100 p-4 rounded-lg h-20 overflow-y-auto text-sm"
                            dangerouslySetInnerHTML={{ __html: simState.log }}
                        ></div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex justify-center gap-4">
                        <button 
                            onClick={() => resetSim(algorithm)}
                            className="bg-slate-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors duration-300"
                        >
                            Reset Simulation
                        </button>
                        <button 
                            onClick={stepSim}
                            disabled={simState.currentStep >= simState.pageString.length}
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                        >
                            Next Step ({simState.currentStep + 1}/{simState.pageString.length})
                        </button>
                    </div>
                </div>
            </AnimatedCard>
        </>
    );
};

export default MemoryManagement;
