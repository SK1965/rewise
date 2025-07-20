import React from 'react';
import AnimatedCard from '../animations/AnimatedCard';

const Virtualization = () => (
    <>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Virtualization & Cloud Computing
        </h1>
        <p className="text-xl text-slate-600 mb-8">How modern systems create virtual machines and abstract physical resources.</p>
        
        <AnimatedCard delay={100}>
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-3xl font-semibold mb-6">☁️ Types of Virtualization</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
                            <h3 className="text-xl font-bold mb-2 text-blue-700">Type 1 Hypervisor (Bare Metal)</h3>
                            <p className="mb-3">Runs directly on hardware. Examples: VMware ESXi, Hyper-V, Xen</p>
                            <div className="bg-white p-3 rounded">
                                <div className="text-xs space-y-1">
                                    <div className="bg-green-200 p-1 rounded text-center">Guest VM 1</div>
                                    <div className="bg-green-200 p-1 rounded text-center">Guest VM 2</div>
                                    <div className="bg-blue-300 p-1 rounded text-center font-bold">Hypervisor</div>
                                    <div className="bg-gray-300 p-1 rounded text-center">Physical Hardware</div>
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-blue-600">
                                <strong>Pros:</strong> Better performance, security isolation<br/>
                                <strong>Cons:</strong> Complex setup, dedicated hardware
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-500">
                            <h3 className="text-xl font-bold mb-2 text-green-700">Type 2 Hypervisor (Hosted)</h3>
                            <p className="mb-3">Runs on top of host OS. Examples: VirtualBox, VMware Workstation</p>
                            <div className="bg-white p-3 rounded">
                                <div className="text-xs space-y-1">
                                    <div className="bg-green-200 p-1 rounded text-center">Guest VM 1</div>
                                    <div className="bg-green-200 p-1 rounded text-center">Guest VM 2</div>
                                    <div className="bg-green-300 p-1 rounded text-center font-bold">Hypervisor</div>
                                    <div className="bg-yellow-200 p-1 rounded text-center">Host Operating System</div>
                                    <div className="bg-gray-300 p-1 rounded text-center">Physical Hardware</div>
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-green-600">
                                <strong>Pros:</strong> Easy setup, desktop friendly<br/>
                                <strong>Cons:</strong> Performance overhead, dependent on host OS
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-b from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-500">
                        <h3 className="text-xl font-bold mb-4 text-purple-700">🐳 Containerization vs VMs</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-3 rounded">
                                    <h4 className="font-bold text-sm text-center mb-2">Virtual Machines</h4>
                                    <div className="text-xs space-y-1">
                                        <div className="bg-blue-200 p-1 rounded text-center">App A</div>
                                        <div className="bg-red-200 p-1 rounded text-center">Guest OS</div>
                                        <div className="bg-blue-200 p-1 rounded text-center">App B</div>
                                        <div className="bg-red-200 p-1 rounded text-center">Guest OS</div>
                                        <div className="bg-yellow-200 p-1 rounded text-center">Hypervisor</div>
                                        <div className="bg-gray-300 p-1 rounded text-center">Host OS</div>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <h4 className="font-bold text-sm text-center mb-2">Containers</h4>
                                    <div className="text-xs space-y-1">
                                        <div className="bg-blue-200 p-1 rounded text-center">App A</div>
                                        <div className="bg-blue-200 p-1 rounded text-center">App B</div>
                                        <div className="bg-purple-200 p-1 rounded text-center">Container Runtime</div>
                                        <div className="bg-gray-300 p-1 rounded text-center">Host OS</div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span><strong>Resource Usage:</strong></span>
                                    <span>Containers win 🏆</span>
                                </div>
                                <div className="flex justify-between">
                                    <span><strong>Isolation:</strong></span>
                                    <span>VMs win 🏆</span>
                                </div>
                                <div className="flex justify-between">
                                    <span><strong>Boot Time:</strong></span>
                                    <span>Containers win 🏆</span>
                                </div>
                                <div className="flex justify-between">
                                    <span><strong>Portability:</strong></span>
                                    <span>Containers win 🏆</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={200}>
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-3xl font-semibold mb-6">🖥️ Hardware-Assisted Virtualization</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-b from-red-50 to-red-100 p-6 rounded-lg text-center">
                        <div className="text-4xl mb-3">🔧</div>
                        <h3 className="text-xl font-bold text-red-700 mb-3">CPU Virtualization</h3>
                        <div className="text-left space-y-2 text-sm">
                            <p><strong>Intel VT-x / AMD-V:</strong></p>
                            <ul className="ml-4 space-y-1">
                                <li>• Hardware support for VMs</li>
                                <li>• Guest OS runs in ring 0</li>
                                <li>• Automatic trapping</li>
                                <li>• Reduced emulation overhead</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-lg text-center">
                        <div className="text-4xl mb-3">🧠</div>
                        <h3 className="text-xl font-bold text-green-700 mb-3">Memory Virtualization</h3>
                        <div className="text-left space-y-2 text-sm">
                            <p><strong>Nested Page Tables:</strong></p>
                            <ul className="ml-4 space-y-1">
                                <li>• Guest virtual → Guest physical</li>
                                <li>• Guest physical → Host physical</li>
                                <li>• Hardware walks both tables</li>
                                <li>• No software translation</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg text-center">
                        <div className="text-4xl mb-3">⚡</div>
                        <h3 className="text-xl font-bold text-blue-700 mb-3">I/O Virtualization</h3>
                        <div className="text-left space-y-2 text-sm">
                            <p><strong>SR-IOV:</strong></p>
                            <ul className="ml-4 space-y-1">
                                <li>• Single Root I/O Virtualization</li>
                                <li>• Hardware creates virtual devices</li>
                                <li>• Direct VM access to hardware</li>
                                <li>• Bypasses hypervisor</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={300}>
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-3xl font-semibold mb-6">🌐 Cloud Computing Models</h2>
                <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-b from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200">
                            <h3 className="text-xl font-bold text-orange-700 mb-3 text-center">IaaS</h3>
                            <h4 className="text-center text-sm mb-3">Infrastructure as a Service</h4>
                            <div className="space-y-2 text-sm">
                                <p><strong>You manage:</strong></p>
                                <ul className="bg-orange-200 p-2 rounded text-xs">
                                    <li>• Applications</li>
                                    <li>• Data</li>
                                    <li>• Runtime</li>
                                    <li>• Middleware</li>
                                    <li>• OS</li>
                                </ul>
                                <p><strong>Provider manages:</strong></p>
                                <ul className="bg-gray-200 p-2 rounded text-xs">
                                    <li>• Virtualization</li>
                                    <li>• Servers</li>
                                    <li>• Storage</li>
                                    <li>• Networking</li>
                                </ul>
                                <p className="text-center"><strong>Examples:</strong> AWS EC2, Azure VMs</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
                            <h3 className="text-xl font-bold text-green-700 mb-3 text-center">PaaS</h3>
                            <h4 className="text-center text-sm mb-3">Platform as a Service</h4>
                            <div className="space-y-2 text-sm">
                                <p><strong>You manage:</strong></p>
                                <ul className="bg-green-200 p-2 rounded text-xs">
                                    <li>• Applications</li>
                                    <li>• Data</li>
                                </ul>
                                <p><strong>Provider manages:</strong></p>
                                <ul className="bg-gray-200 p-2 rounded text-xs">
                                    <li>• Runtime</li>
                                    <li>• Middleware</li>
                                    <li>• OS</li>
                                    <li>• Virtualization</li>
                                    <li>• Servers</li>
                                    <li>• Storage</li>
                                    <li>• Networking</li>
                                </ul>
                                <p className="text-center"><strong>Examples:</strong> Heroku, Google App Engine</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                            <h3 className="text-xl font-bold text-blue-700 mb-3 text-center">SaaS</h3>
                            <h4 className="text-center text-sm mb-3">Software as a Service</h4>
                            <div className="space-y-2 text-sm">
                                <p><strong>You manage:</strong></p>
                                <ul className="bg-blue-200 p-2 rounded text-xs">
                                    <li>• Your data/configuration</li>
                                </ul>
                                <p><strong>Provider manages:</strong></p>
                                <ul className="bg-gray-200 p-2 rounded text-xs">
                                    <li>• Applications</li>
                                    <li>• Data</li>
                                    <li>• Runtime</li>
                                    <li>• Middleware</li>
                                    <li>• OS</li>
                                    <li>• Virtualization</li>
                                    <li>• Servers</li>
                                    <li>• Storage</li>
                                    <li>• Networking</li>
                                </ul>
                                <p className="text-center"><strong>Examples:</strong> Gmail, Salesforce</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={400}>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-center">🎯 Virtualization Interview Questions</h2>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border-l-4 border-indigo-500">
                        <h3 className="font-bold text-lg mb-2 text-indigo-700">Q: What's the difference between full virtualization and paravirtualization?</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p><strong>Full Virtualization:</strong></p>
                                <ul className="text-sm space-y-1 ml-4">
                                    <li>• Guest OS unaware it's virtualized</li>
                                    <li>• Hypervisor traps privileged instructions</li>
                                    <li>• Binary translation or hardware assist</li>
                                    <li>• No guest OS modification needed</li>
                                </ul>
                            </div>
                            <div>
                                <p><strong>Paravirtualization:</strong></p>
                                <ul className="text-sm space-y-1 ml-4">
                                    <li>• Guest OS aware of virtualization</li>
                                    <li>• Uses hypercalls instead of traps</li>
                                    <li>• Better performance</li>
                                    <li>• Requires guest OS modification</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                        <h3 className="font-bold text-lg mb-2 text-green-700">Q: How does live migration work?</h3>
                        <p><strong>A:</strong> Live migration moves a running VM between hosts with minimal downtime:</p>
                        <ol className="mt-3 space-y-2 text-sm">
                            <li>1. <strong>Pre-copy phase:</strong> Copy memory pages while VM runs</li>
                            <li>2. <strong>Track dirty pages:</strong> Mark modified pages during transfer</li>
                            <li>3. <strong>Iterative copy:</strong> Re-copy dirty pages (multiple rounds)</li>
                            <li>4. <strong>Stop-and-copy:</strong> Brief pause to copy remaining pages</li>
                            <li>5. <strong>Resume on target:</strong> Start VM execution on destination</li>
                        </ol>
                        <div className="mt-3 bg-green-50 p-3 rounded">
                            <p className="text-sm text-green-700"><strong>Downtime:</strong> Typically just a few milliseconds during the final stop-and-copy phase!</p>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>
    </>
);

export default Virtualization;
