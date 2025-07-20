import React, { useState } from 'react';
import AnimatedCard from '../animations/AnimatedCard';

const Deadlock = () => {
    const [bankerState, setBankerState] = useState({
        processes: [
            { id: 'P0', allocation: [0, 1, 0], max: [7, 5, 3], need: [7, 4, 3] },
            { id: 'P1', allocation: [2, 0, 0], max: [3, 2, 2], need: [1, 2, 2] },
            { id: 'P2', allocation: [3, 0, 2], max: [9, 0, 2], need: [6, 0, 0] },
            { id: 'P3', allocation: [2, 1, 1], max: [2, 2, 2], need: [0, 1, 1] },
            { id: 'P4', allocation: [0, 0, 2], max: [4, 3, 3], need: [4, 3, 1] }
        ],
        available: [3, 3, 2],
        safeSequence: []
    });

    const findSafeSequence = () => {
        const processes = [...bankerState.processes];
        const available = [...bankerState.available];
        const safeSequence = [];
        const finished = new Array(processes.length).fill(false);

        let found = true;
        while (found && safeSequence.length < processes.length) {
            found = false;
            for (let i = 0; i < processes.length; i++) {
                if (!finished[i]) {
                    const canAllocate = processes[i].need.every((need, j) => need <= available[j]);
                    if (canAllocate) {
                        for (let j = 0; j < available.length; j++) {
                            available[j] += processes[i].allocation[j];
                        }
                        safeSequence.push(processes[i].id);
                        finished[i] = true;
                        found = true;
                        break;
                    }
                }
            }
        }

        setBankerState(prev => ({ ...prev, safeSequence }));
        return safeSequence.length === processes.length;
    };

    return (
        <>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Deadlock Prevention & Detection
            </h1>

            <AnimatedCard delay={100}>
                <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                    <h2 className="text-3xl font-semibold mb-6">🔒 The Four Conditions of Deadlock</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "1. Mutual Exclusion",
                                description: "Resources cannot be shared simultaneously",
                                example: "Only one process can use a printer at a time",
                                icon: "🔐",
                                color: "red"
                            },
                            {
                                title: "2. Hold and Wait",
                                description: "Process holds resources while requesting others",
                                example: "Process A holds file1, waits for file2",
                                icon: "✋",
                                color: "blue"
                            },
                            {
                                title: "3. No Preemption",
                                description: "Resources cannot be forcibly taken away",
                                example: "Cannot forcibly take a lock from a process",
                                icon: "🚫",
                                color: "green"
                            },
                            {
                                title: "4. Circular Wait",
                                description: "Chain of processes each waiting for the next",
                                example: "P1→P2→P3→P1 resource dependency",
                                icon: "🔄",
                                color: "purple"
                            }
                        ].map((condition, index) => (
                            <div key={index} className={`bg-${condition.color}-50 border-l-4 border-${condition.color}-400 p-6 rounded-lg`}>
                                <h3 className={`text-xl font-bold text-${condition.color}-700 mb-2 flex items-center`}>
                                    <span className="mr-2 text-2xl">{condition.icon}</span>
                                    {condition.title}
                                </h3>
                                <p className="mb-2">{condition.description}</p>
                                <p className={`text-sm text-${condition.color}-600 italic`}>
                                    <strong>Example:</strong> {condition.example}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedCard>

            <AnimatedCard delay={200}>
                <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                    <h2 className="text-3xl font-semibold mb-6 text-center">🏦 Banker's Algorithm Simulator</h2>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-200">
                                    <th className="border p-3">Process</th>
                                    <th className="border p-3">Allocation (A,B,C)</th>
                                    <th className="border p-3">Max Need (A,B,C)</th>
                                    <th className="border p-3">Remaining Need (A,B,C)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bankerState.processes.map((proc, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                                        <td className="border p-3 font-bold">{proc.id}</td>
                                        <td className="border p-3 text-center">[{proc.allocation.join(', ')}]</td>
                                        <td className="border p-3 text-center">[{proc.max.join(', ')}]</td>
                                        <td className="border p-3 text-center">[{proc.need.join(', ')}]</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center mb-6">
                        <p className="text-lg mb-4">
                            <strong>Available Resources:</strong> [{bankerState.available.join(', ')}]
                        </p>
                        <button 
                            onClick={findSafeSequence}
                            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                            Find Safe Sequence
                        </button>
                    </div>
                    {bankerState.safeSequence.length > 0 && (
                        <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-bold text-green-700 mb-2">✅ Safe Sequence Found!</h3>
                            <p className="text-lg">
                                <strong>Execution Order:</strong> {bankerState.safeSequence.join(' → ')}
                            </p>
                            <p className="text-sm text-green-600 mt-2">
                                The system is in a safe state. No deadlock will occur.
                            </p>
                        </div>
                    )}
                </div>
            </AnimatedCard>
        </>
    );
};

export default Deadlock;
