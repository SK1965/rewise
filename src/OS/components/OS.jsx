import React, { useState, useEffect, useCallback, Suspense } from 'react';
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
import '../styles/animations.css';

export default function Os() {
    const [activeSection, setActiveSection] = useState('intro');
    const [sidebarWidth, setSidebarWidth] = useState(280);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setActiveSection(hash);
        }
    }, []);

    // Handle sidebar width changes
    const handleSidebarWidthChange = useCallback((width, collapsed) => {
        setSidebarWidth(width);
        setIsCollapsed(collapsed);
    }, []);

    // Enhanced section change handler with scroll reset
    const handleSectionChange = useCallback((section) => {
        setActiveSection(section);
        // Scroll to top when changing sections
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    // Calculate dynamic margin based on sidebar state
    const getMainContentStyle = () => {
        // No margin on mobile (sidebar overlays)
        if (isMobile) {
            return { marginLeft: 0 };
        }
        
        // Dynamic margin based on sidebar width on desktop
        return { 
            marginLeft: `${sidebarWidth}px`,
            transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        };
    };

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Suspense fallback={
                <div className="flex h-screen items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                        <p className="text-slate-600 font-medium">Loading OS Study Guide...</p>
                    </div>
                </div>
            }>
                <Sidebar 
                    activeSection={activeSection} 
                    setActiveSection={handleSectionChange} // Use enhanced handler
                    onWidthChange={handleSidebarWidthChange}
                />
                
                {/* Main Content Area - Dynamically Positioned */}
                <main 
                    className="min-h-screen transition-all duration-300"
                    style={getMainContentStyle()}
                >
                    {/* Mobile Header Spacer */}
                    <div className="lg:hidden h-16"></div>
                    
                    {/* Content Container */}
                    <div className="w-full min-h-screen">
                        <div className="p-6 sm:p-8 md:p-12">
                            <div className="max-w-6xl mx-auto">
                                {renderSection()}
                            </div>
                        </div>
                    </div>
                </main>
            </Suspense>
        </div>
    );
}
