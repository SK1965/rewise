export const SCHEDULING_ALGORITHMS = {
    FCFS: 'fcfs',
    SJF: 'sjf',
    SRTF: 'srtf',
    PRIORITY: 'priority',
    ROUND_ROBIN: 'rr'
};

export const PROCESS_STATES = {
    NEW: 'new',
    READY: 'ready',
    RUNNING: 'running',
    WAITING: 'waiting',
    TERMINATED: 'terminated'
};

export const PAGE_REPLACEMENT_ALGORITHMS = {
    FIFO: 'fifo',
    LRU: 'lru',
    OPTIMAL: 'opt'
};

export const DEFAULT_PROCESSES = [
    {id: 'P1', burst: 6, priority: 2, arrival: 0, color: '#3b82f6'}, 
    {id: 'P2', burst: 8, priority: 1, arrival: 1, color: '#10b981'}, 
    {id: 'P3', burst: 7, priority: 4, arrival: 2, color: '#ef4444'}, 
    {id: 'P4', burst: 3, priority: 3, arrival: 3, color: '#8b5cf6'}
];

export const MEMORY_FRAME_COUNT = 4;
export const DEFAULT_PAGE_STRING = "7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1";

export const NAVIGATION_ITEMS = [
    { id: 'intro', label: 'Introduction', icon: '🖥️' },
    { id: 'process', label: 'Processes & Threads', icon: '⚙️' },
    { id: 'scheduling', label: 'CPU Scheduling', icon: '⏰' },
    { id: 'sync', label: 'Synchronization', icon: '🔄' },
    { id: 'deadlock', label: 'Deadlocks', icon: '🔒' },
    { id: 'memory', label: 'Memory Management', icon: '🧠' },
    { id: 'filesystem', label: 'File Systems', icon: '📁' },
    { id: 'io', label: 'I/O Systems', icon: '💾' },
    { id: 'virtualization', label: 'Virtualization', icon: '☁️' },
];

export const COLORS = {
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#f59e0b',
    danger: '#ef4444',
    success: '#22c55e',
    warning: '#eab308',
    info: '#06b6d4'
};
