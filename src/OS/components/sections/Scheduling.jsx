import React, { useRef, useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import AnimatedCard from '../animations/AnimatedCard';
import { DEFAULT_PROCESSES, SCHEDULING_ALGORITHMS } from '../../utils/constants';
import { runSchedulingAlgorithm, createGanttChart } from '../../utils/schedulingAlgorithms';

const Scheduling = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [activeAlgo, setActiveAlgo] = useState('fcfs');
    const [ganttChart, setGanttChart] = useState([]);
    const [totalBurst, setTotalBurst] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const schedulingData = {
        processes: DEFAULT_PROCESSES,
        explanations: {
            fcfs: {
                title: 'First-Come, First-Served (FCFS)',
                description: 'The simplest non-preemptive algorithm. Processes execute in arrival order.',
                pros: ['Simple to implement', 'Fair in order of arrival', 'No starvation'],
                cons: ['Convoy effect (long processes block short ones)', 'Poor average waiting time', 'Not suitable for interactive systems'],
                complexity: 'O(n)',
                realWorld: 'Print queues, batch processing systems'
            },
            sjf: {
                title: 'Shortest-Job-First (SJF)',
                description: 'Non-preemptive algorithm that selects the process with minimum burst time.',
                pros: ['Optimal average waiting time', 'Minimizes total completion time'],
                cons: ['Starvation of long processes', 'Requires burst time prediction', 'Not suitable for interactive systems'],
                complexity: 'O(n log n)',
                realWorld: 'Batch systems where job times are known'
            },
            priority: {
                title: 'Priority Scheduling',
                description: 'Processes are scheduled based on priority (lower number = higher priority).',
                pros: ['Important processes get preference', 'Flexible priority assignment'],
                cons: ['Starvation of low-priority processes', 'Priority inversion problem'],
                complexity: 'O(n log n)',
                realWorld: 'Operating system kernels, real-time systems'
            },
            rr: {
                title: 'Round Robin (RR)',
                description: 'Preemptive algorithm with fixed time quantum. Each process gets equal CPU time.',
                pros: ['Fair allocation', 'Good response time', 'No starvation'],
                cons: ['Higher context switching overhead', 'Performance depends on quantum size'],
                complexity: 'O(n)',
                realWorld: 'Time-sharing systems, interactive systems'
            }
        }
    };

    useEffect(() => {
        runScheduling(activeAlgo);
    }, [activeAlgo]);

    const runScheduling = (algorithm) => {
        setIsRunning(true);
        setTotalBurst(schedulingData.processes.reduce((acc, p) => acc + p.burst, 0));

        setTimeout(() => {
            const result = runSchedulingAlgorithm(algorithm, schedulingData.processes);
            setGanttChart(result.ganttChart);
            updateChart(result.waitTimes, result.turnaroundTimes);
            setIsRunning(false);
        }, 500);
    };

    const updateChart = (waitTimes, turnaroundTimes) => {
        const labels = schedulingData.processes.map(p => p.id);
        const waitData = labels.map(id => waitTimes[id] || 0);
        const turnData = labels.map(id => turnaroundTimes[id] || 0);
        const avgWait = waitData.reduce((a, b) => a + b, 0) / waitData.length;
        const avgTurn = turnData.reduce((a, b) => a + b, 0) / turnData.length;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        chartInstance.current = new Chart(chartRef.current, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { 
                        label: 'Waiting Time', 
                        data: waitData, 
                        backgroundColor: 'rgba(59, 130, 246, 0.6)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 2
                    },
                    { 
                        label: 'Turnaround Time', 
                        data: turnData, 
                        backgroundColor: 'rgba(16, 185, 129, 0.6)',
                        borderColor: 'rgba(16, 185, 129, 1)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    title: { 
                        display: true, 
                        text: `Avg Wait: ${avgWait.toFixed(2)}ms | Avg Turnaround: ${avgTurn.toFixed(2)}ms`,
                        font: { size: 16 }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Time (ms)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Processes'
                        }
                    }
                }
            }
        });
    };
    
    const currentAlgo = schedulingData.explanations[activeAlgo];

    return (
        <>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CPU Scheduling Deep Dive
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                CPU scheduling is the heart of multitasking. It determines which process runs when, directly impacting system performance and user experience.
            </p>

            <AnimatedCard delay={100}>
                <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                    <h2 className="text-3xl font-semibold mb-6 text-center">🎯 Our Test Processes</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-center border-collapse mb-6">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-200 to-slate-300">
                                    <th className="border-2 border-slate-400 p-4">Process</th>
                                    <th className="border-2 border-slate-400 p-4">Arrival Time</th>
                                    <th className="border-2 border-slate-400 p-4">Burst Time (ms)</th>
                                    <th className="border-2 border-slate-400 p-4">Priority</th>
                                    <th className="border-2 border-slate-400 p-4">Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedulingData.processes.map(p => (
                                    <tr key={p.id} className="hover:bg-slate-50">
                                        <td className="border border-slate-300 p-4 font-bold text-lg">{p.id}</td>
                                        <td className="border border-slate-300 p-4">{p.arrival}</td>
                                        <td className="border border-slate-300 p-4">{p.burst}</td>
                                        <td className="border border-slate-300 p-4">{p.priority}</td>
                                        <td className="border border-slate-300 p-4">
                                            <div className="w-8 h-8 rounded-full mx-auto" style={{ backgroundColor: p.color }}></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center flex-wrap gap-3 mb-8">
                        {Object.keys(schedulingData.explanations).map(algo => (
                            <button 
                                key={algo} 
                                onClick={() => setActiveAlgo(algo)} 
                                disabled={isRunning}
                                className={`px-6 py-3 rounded-lg font-semibold transform transition-all duration-300 ${
                                    activeAlgo === algo 
                                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white scale-105 shadow-lg' 
                                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300 hover:scale-105'
                                } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
                            >
                                {algo.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <AnimatedCard delay={200}>
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-400 mb-8">
                            <h3 className="text-2xl font-bold mb-3 text-blue-800">{currentAlgo.title}</h3>
                            <p className="mb-4 text-lg">{currentAlgo.description}</p>
                            <div className="grid md:grid-cols-3 gap-6 text-sm">
                                <div>
                                    <h4 className="font-bold text-green-600 mb-2">✅ Advantages:</h4>
                                    <ul className="space-y-1">
                                        {currentAlgo.pros.map((pro, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="text-green-500 mr-2">•</span>
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-600 mb-2">❌ Disadvantages:</h4>
                                    <ul className="space-y-1">
                                        {currentAlgo.cons.map((con, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="text-red-500 mr-2">•</span>
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-600 mb-2">📊 Details:</h4>
                                    <p><strong>Complexity:</strong> {currentAlgo.complexity}</p>
                                    <p><strong>Used in:</strong> {currentAlgo.realWorld}</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold mb-4 text-center">📊 Gantt Chart Visualization</h3>
                        {isRunning ? (
                            <div className="flex justify-center items-center h-16">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                                <span className="ml-3 text-amber-600 font-semibold">Calculating schedule...</span>
                            </div>
                        ) : (
                            createGanttChart(ganttChart, totalBurst)
                        )}
                    </div>

                    <div className="chart-container relative mx-auto" style={{ maxWidth: '800px', height: '400px' }}>
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>
            </AnimatedCard>

            <AnimatedCard delay={300}>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold mb-6 text-center">🎯 Interview Questions</h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg border-l-4 border-amber-500">
                            <h3 className="font-bold text-lg mb-2 text-amber-700">Q: What's the difference between preemptive and non-preemptive scheduling?</h3>
                            <p><strong>A:</strong> Preemptive scheduling can interrupt a running process (RR, SRTF), while non-preemptive waits for the process to complete or block (FCFS, SJF). Preemptive provides better responsiveness but has higher overhead.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                            <h3 className="font-bold text-lg mb-2 text-green-700">Q: How do you choose the optimal time quantum for Round Robin?</h3>
                            <p><strong>A:</strong> Time quantum should be: (1) Large enough to amortize context-switch overhead, (2) Small enough for good responsiveness. Rule of thumb: 80% of processes should complete within one quantum. Typical values: 10-100ms.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                            <h3 className="font-bold text-lg mb-2 text-blue-700">Q: How does the OS predict burst time for SJF?</h3>
                            <p><strong>A:</strong> Uses exponential averaging: τ(n+1) = α × t(n) + (1-α) × τ(n), where t(n) is actual burst time, τ(n) is predicted time, and α is typically 0.5. This gives recent history more weight.</p>
                        </div>
                    </div>
                </div>
            </AnimatedCard>
        </>
    );
};

export default Scheduling;
