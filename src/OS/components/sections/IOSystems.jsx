import React from 'react';
import AnimatedCard from '../animations/AnimatedCard';

const IOSystems = () => (
    <>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            I/O Systems & Device Management
        </h1>
        <p className="text-xl text-slate-600 mb-8">Understanding how the OS manages input/output operations and communicates with hardware devices.</p>
        
        <AnimatedCard delay={100}>
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-3xl font-semibold mb-6">🔌 I/O Hardware Architecture</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-400">
                        <h3 className="text-xl font-bold mb-4 text-blue-700">🖥️ Memory-Mapped I/O</h3>
                        <p className="mb-4">Device registers are mapped to memory addresses. CPU uses regular load/store instructions.</p>
                        <div className="bg-white p-3 rounded">
                            <div className="text-xs font-mono">
                                <div>Memory Address Space:</div>
                                <div className="mt-2 space-y-1">
                                    <div className="bg-gray-200 p-1 rounded">0x0000-0x7FFF: RAM</div>
                                    <div className="bg-blue-200 p-1 rounded">0x8000-0x8FFF: Device Regs</div>
                                    <div className="bg-gray-200 p-1 rounded">0x9000-0xFFFF: RAM</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 text-sm">
                            <strong>Advantages:</strong> Simple programming model, no special instructions needed
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-400">
                        <h3 className="text-xl font-bold mb-4 text-green-700">⚡ Direct Memory Access (DMA)</h3>
                        <p className="mb-4">Devices can transfer data directly to/from memory without CPU intervention.</p>
                        <div className="bg-white p-3 rounded">
                            <div className="text-center">
                                <div className="flex justify-center items-center space-x-4 mb-2">
                                    <div className="w-8 h-8 bg-blue-200 rounded flex items-center justify-center text-xs">CPU</div>
                                    <div className="text-gray-400">↔</div>
                                    <div className="w-8 h-8 bg-green-200 rounded flex items-center justify-center text-xs">DMA</div>
                                    <div className="text-green-600">↔</div>
                                    <div className="w-8 h-8 bg-purple-200 rounded flex items-center justify-center text-xs">MEM</div>
                                </div>
                                <div className="text-xs">Direct transfer bypasses CPU</div>
                            </div>
                        </div>
                        <div className="mt-3 text-sm">
                            <strong>Benefits:</strong> Reduces CPU load, enables concurrent processing
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-b from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-400">
                        <h3 className="text-xl font-bold mb-4 text-purple-700">🔔 Interrupt-Driven I/O</h3>
                        <p className="mb-4">Devices signal CPU when operations complete, avoiding busy waiting.</p>
                        <div className="bg-white p-3 rounded">
                            <ol className="text-xs space-y-1">
                                <li>1. CPU starts I/O operation</li>
                                <li>2. CPU continues other work</li>
                                <li>3. Device completes operation</li>
                                <li>4. Device sends interrupt</li>
                                <li>5. CPU handles interrupt</li>
                            </ol>
                        </div>
                        <div className="mt-3 text-sm">
                            <strong>Efficiency:</strong> CPU can multitask while I/O is in progress
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={200}>
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-3xl font-semibold mb-6">🚗 I/O Scheduling Algorithms</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg border-l-4 border-red-400">
                            <h3 className="text-xl font-bold text-red-700 mb-3">📀 Disk Scheduling: SCAN Algorithm</h3>
                            <p className="mb-3 text-sm">Also known as the "elevator algorithm" - services requests in one direction, then reverses.</p>
                            <div className="bg-white p-3 rounded">
                                <div className="text-center">
                                    <div className="text-xs mb-2">Disk Head Movement:</div>
                                    <div className="flex items-center justify-center space-x-1">
                                        {[1, 4, 7, 9, 12, 15, 18].map((pos, i) => (
                                            <div key={i} className={`w-4 h-4 border rounded ${
                                                i === 3 ? 'bg-red-400 border-red-600' : 'bg-gray-200 border-gray-400'
                                            }`}></div>
                                        ))}
                                    </div>
                                    <div className="text-xs mt-1">Current position: Track 9</div>
                                </div>
                            </div>
                            <div className="mt-3 text-sm">
                                <strong>Advantages:</strong> Predictable, fair, reduces starvation
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-400">
                            <h3 className="text-xl font-bold text-green-700 mb-3">🎯 Shortest Seek Time First (SSTF)</h3>
                            <p className="mb-3 text-sm">Services the request closest to the current head position first.</p>
                            <div className="bg-white p-3 rounded">
                                <div className="text-xs">
                                    <div>Requests: 10, 22, 20, 2, 40, 6, 38</div>
                                    <div>Current: 20</div>
                                    <div className="text-green-600 font-bold">Next: 22 (distance: 2)</div>
                                </div>
                            </div>
                            <div className="mt-3 text-sm">
                                <strong>Problem:</strong> Can cause starvation of distant requests
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-400">
                        <h3 className="text-xl font-bold text-blue-700 mb-4">💿 Modern SSD Considerations</h3>
                        <p className="mb-4">Solid State Drives have different characteristics than traditional HDDs.</p>
                        <div className="space-y-3">
                            <div className="bg-white p-3 rounded">
                                <h4 className="font-bold text-sm mb-2">Key Differences:</h4>
                                <ul className="text-xs space-y-1">
                                    <li>• <strong>No seek time:</strong> Uniform access to all locations</li>
                                    <li>• <strong>Wear leveling:</strong> Distribute writes evenly</li>
                                    <li>• <strong>Garbage collection:</strong> Background cleanup process</li>
                                    <li>• <strong>TRIM command:</strong> Inform SSD about unused blocks</li>
                                </ul>
                            </div>
                            <div className="bg-blue-200 p-3 rounded">
                                <p className="text-sm"><strong>Result:</strong> Traditional disk scheduling algorithms are less relevant for SSDs. Focus shifts to wear leveling and parallel access.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={300}>
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-3xl font-semibold mb-6">🔧 Device Drivers & Kernel Interface</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-yellow-700 mb-4">🖥️ Device Driver Architecture</h3>
                        <div className="space-y-3">
                            <div className="bg-white p-3 rounded border">
                                <h4 className="font-bold text-sm">User Space Applications</h4>
                                <div className="text-xs text-gray-600">File operations, network calls</div>
                            </div>
                            <div className="flex justify-center">
                                <div className="text-yellow-600">↓ System Calls ↓</div>
                            </div>
                            <div className="bg-yellow-200 p-3 rounded border">
                                <h4 className="font-bold text-sm">Kernel I/O Subsystem</h4>
                                <div className="text-xs text-yellow-800">Buffering, caching, scheduling</div>
                            </div>
                            <div className="flex justify-center">
                                <div className="text-yellow-600">↓ Driver Interface ↓</div>
                            </div>
                            <div className="bg-yellow-300 p-3 rounded border">
                                <h4 className="font-bold text-sm">Device Drivers</h4>
                                <div className="text-xs text-yellow-900">Hardware-specific code</div>
                            </div>
                            <div className="flex justify-center">
                                <div className="text-yellow-600">↓ Hardware Interface ↓</div>
                            </div>
                            <div className="bg-gray-300 p-3 rounded border">
                                <h4 className="font-bold text-sm">Hardware Devices</h4>
                                <div className="text-xs text-gray-700">Disk, network, graphics</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-6 rounded-lg border-l-4 border-cyan-400">
                            <h3 className="text-xl font-bold text-cyan-700 mb-3">🔄 I/O Request Lifecycle</h3>
                            <ol className="text-sm space-y-2">
                                <li className="flex items-start">
                                    <span className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                                    <div>Application makes system call (e.g., read())</div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                                    <div>Kernel validates request and buffer</div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                                    <div>I/O subsystem queues request</div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                                    <div>Device driver receives request</div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">5</span>
                                    <div>Hardware performs operation</div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">6</span>
                                    <div>Interrupt signals completion</div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">7</span>
                                    <div>Data copied to user space</div>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-lg border-l-4 border-indigo-400">
                            <h3 className="text-xl font-bold text-indigo-700 mb-3">⚡ Performance Optimizations</h3>
                            <ul className="text-sm space-y-2">
                                <li><strong>Buffering:</strong> Temporary storage to handle speed mismatches</li>
                                <li><strong>Caching:</strong> Keep frequently used data in fast memory</li>
                                <li><strong>Spooling:</strong> Queue jobs for devices that can't multiplex</li>
                                <li><strong>Device reservation:</strong> Exclusive access for critical operations</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>
    </>
);

export default IOSystems;
