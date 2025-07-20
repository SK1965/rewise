export const runSchedulingAlgorithm = (algorithm, processes) => {
    let ganttChart = [];
    let waitTimes = {};
    let turnaroundTimes = {};
    let currentTime = 0;
    let processesCopy = JSON.parse(JSON.stringify(processes));

    switch(algorithm) {
        case 'fcfs':
            return runFCFS(processesCopy);
        case 'sjf':
            return runSJF(processesCopy);
        case 'priority':
            return runPriority(processesCopy);
        case 'rr':
            return runRoundRobin(processesCopy, 3);
        default:
            return { ganttChart: [], waitTimes: {}, turnaroundTimes: {} };
    }
};

const runFCFS = (processes) => {
    let ganttChart = [];
    let waitTimes = {};
    let turnaroundTimes = {};
    let currentTime = 0;

    processes.sort((a, b) => a.arrival - b.arrival);
    
    processes.forEach(p => {
        const waitTime = Math.max(0, currentTime - p.arrival);
        waitTimes[p.id] = waitTime;
        turnaroundTimes[p.id] = waitTime + p.burst;
        
        ganttChart.push({ 
            id: p.id, 
            start: currentTime, 
            end: currentTime + p.burst,
            color: p.color 
        });
        currentTime += p.burst;
    });

    return { ganttChart, waitTimes, turnaroundTimes };
};

const runSJF = (processes) => {
    let ganttChart = [];
    let waitTimes = {};
    let turnaroundTimes = {};
    let currentTime = 0;
    let remaining = [...processes];

    while (remaining.length > 0) {
        let available = remaining.filter(p => p.arrival <= currentTime);
        
        if (available.length === 0) {
            currentTime = Math.min(...remaining.map(p => p.arrival));
            continue;
        }

        available.sort((a, b) => a.burst - b.burst);
        let selected = available[0];
        
        waitTimes[selected.id] = currentTime - selected.arrival;
        turnaroundTimes[selected.id] = waitTimes[selected.id] + selected.burst;
        
        ganttChart.push({
            id: selected.id,
            start: currentTime,
            end: currentTime + selected.burst,
            color: selected.color
        });
        
        currentTime += selected.burst;
        remaining = remaining.filter(p => p.id !== selected.id);
    }

    return { ganttChart, waitTimes, turnaroundTimes };
};

const runPriority = (processes) => {
    let ganttChart = [];
    let waitTimes = {};
    let turnaroundTimes = {};
    let currentTime = 0;
    let remaining = [...processes];

    while (remaining.length > 0) {
        let available = remaining.filter(p => p.arrival <= currentTime);
        
        if (available.length === 0) {
            currentTime = Math.min(...remaining.map(p => p.arrival));
            continue;
        }

        available.sort((a, b) => a.priority - b.priority);
        let selected = available[0];
        
        waitTimes[selected.id] = currentTime - selected.arrival;
        turnaroundTimes[selected.id] = waitTimes[selected.id] + selected.burst;
        
        ganttChart.push({
            id: selected.id,
            start: currentTime,
            end: currentTime + selected.burst,
            color: selected.color
        });
        
        currentTime += selected.burst;
        remaining = remaining.filter(p => p.id !== selected.id);
    }

    return { ganttChart, waitTimes, turnaroundTimes };
};

const runRoundRobin = (processes, quantum) => {
    let ganttChart = [];
    let waitTimes = {};
    let turnaroundTimes = {};
    let currentTime = 0;
    let queue = [...processes];
    let remainingBurst = {};
    let lastTime = {};

    processes.forEach(p => {
        remainingBurst[p.id] = p.burst;
        waitTimes[p.id] = 0;
    });

    while(Object.values(remainingBurst).some(burst => burst > 0)) {
        for (let p of queue) {
            if (remainingBurst[p.id] <= 0) continue;
            
            const timeSlice = Math.min(quantum, remainingBurst[p.id]);
            
            if (lastTime[p.id] !== undefined) {
                waitTimes[p.id] += currentTime - lastTime[p.id];
            } else {
                waitTimes[p.id] = Math.max(0, currentTime - p.arrival);
            }

            ganttChart.push({ 
                id: p.id, 
                start: currentTime, 
                end: currentTime + timeSlice,
                color: p.color 
            });
            
            currentTime += timeSlice;
            remainingBurst[p.id] -= timeSlice;
            lastTime[p.id] = currentTime;

            if (remainingBurst[p.id] <= 0) {
                turnaroundTimes[p.id] = currentTime - p.arrival;
            }
        }
    }

    return { ganttChart, waitTimes, turnaroundTimes };
};

export const createGanttChart = (ganttChart, totalBurst) => {
    return (
        <div className="bg-slate-100 p-4 rounded-lg">
            <div className="flex items-center mb-2">
                <span className="text-sm font-semibold mr-4">Timeline:</span>
                {ganttChart.map((_, index) => (
                    <span key={index} className="text-xs text-slate-600 mr-4">
                        {ganttChart[index]?.start || 0}
                    </span>
                ))}
                <span className="text-xs text-slate-600">
                    {ganttChart[ganttChart.length - 1]?.end || 0}
                </span>
            </div>
            <div className="flex border-2 border-slate-400 rounded-lg overflow-hidden">
                {ganttChart.map((block, index) => (
                    <div 
                        key={index} 
                        className="gantt-block flex items-center justify-center text-white font-bold text-sm border-r border-slate-300 last:border-r-0 min-h-12 transition-all duration-300 hover:opacity-80"
                        style={{ 
                            backgroundColor: block.color, 
                            width: `${((block.end - block.start) / totalBurst) * 100}%`
                        }}
                    >
                        {block.id}
                        <br />
                        <span className="text-xs">({block.end - block.start}ms)</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
