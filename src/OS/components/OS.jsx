import React, { useState, useEffect } from 'react';
import Sidebar from './layout/Sidebar';
import Introduction from './sections/Introduction';
import ProcessThreads from './sections/ProcessThreads';
import Scheduling from './sections/Scheduling';
import Synchronization from './sections/Synchronization';
import Deadlock from './sections/Deadlock';
import MemoryManagement from './sections/MemoryManagement';
import FileSystem from './sections/FileSystem';
import IOSystems from './sections/IOSystems';
import Virtualization from './sections/Virtualization';
//import '../styles/main.css';
import '../styles/animations.css';

export default function Os() {
    const [activeSection, setActiveSection] = useState('intro');

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setActiveSection(hash);
        }
    }, []);

    const renderSection = () => {
        switch (activeSection) {
            case 'process': return <ProcessThreads />;
            case 'scheduling': return <Scheduling />;
            case 'sync': return <Synchronization />;
            case 'deadlock': return <Deadlock />;
            case 'memory': return <MemoryManagement />;
            case 'filesystem': return <FileSystem />;
            case 'io': return <IOSystems />;
            case 'virtualization': return <Virtualization />;
            case 'intro':
            default: return <Introduction />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className="ml-64 flex-1 p-6 sm:p-8 md:p-12 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {renderSection()}
                </div>
            </main>
        </div>
    );
}
