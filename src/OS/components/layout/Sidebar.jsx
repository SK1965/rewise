import React, { useState, useEffect, useCallback } from 'react';

const Sidebar = ({ activeSection, setActiveSection, onWidthChange }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(280);
    const [isResizing, setIsResizing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const navItems = [
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

    // Notify parent component of width changes - DEFINE FIRST
    const notifyWidthChange = useCallback((width, collapsed) => {
        if (onWidthChange) {
            onWidthChange(collapsed ? 80 : width, collapsed);
        }
    }, [onWidthChange]);

    // Get current sidebar width based on state
    const getCurrentWidth = useCallback(() => {
        if (isMobile) return 280; // Fixed mobile width
        return isCollapsed ? 80 : sidebarWidth;
    }, [isMobile, isCollapsed, sidebarWidth]);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Notify parent of initial width - AFTER notifyWidthChange is defined
    useEffect(() => {
        notifyWidthChange(sidebarWidth, isCollapsed);
    }, [notifyWidthChange, sidebarWidth, isCollapsed]);

    // Handle resize functionality
    const handleMouseDown = useCallback((e) => {
        if (!isMobile && !isCollapsed) {
            setIsResizing(true);
            e.preventDefault();
        }
    }, [isMobile, isCollapsed]);

    const handleMouseMove = useCallback((e) => {
        if (isResizing && !isMobile) {
            const newWidth = Math.max(200, Math.min(400, e.clientX));
            setSidebarWidth(newWidth);
            notifyWidthChange(newWidth, false);
        }
    }, [isResizing, isMobile, notifyWidthChange]);

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
    }, []);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isResizing, handleMouseMove, handleMouseUp]);

    // Handle collapse/expand
    const handleCollapseToggle = useCallback(() => {
        if (!isMobile) {
            const newCollapsed = !isCollapsed;
            setIsCollapsed(newCollapsed);
            notifyWidthChange(sidebarWidth, newCollapsed);
        }
    }, [isCollapsed, sidebarWidth, notifyWidthChange, isMobile]);

    // Close mobile menu when section changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [activeSection]);

    // Handle mobile menu toggle
    const handleNavClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-amber-500 text-white p-3 rounded-lg shadow-lg"
                aria-label="Toggle navigation menu"
            >
                <span className="text-xl">
                    {isMobileMenuOpen ? '✕' : '☰'}
                </span>
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`
                    fixed top-0 left-0 h-full bg-gradient-to-b from-slate-800 to-slate-900 text-slate-100 
                    flex flex-col shadow-xl transition-all duration-300 z-40
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
                style={{ 
                    width: `${getCurrentWidth()}px`
                }}
            >
                {/* Header */}
                <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-between">
                    <h1 className={`font-bold transition-all duration-300 ${
                        isCollapsed && !isMobile ? 'text-lg' : 'text-xl lg:text-2xl'
                    }`}>
                        {isCollapsed && !isMobile ? '🚀' : 'OS Study Guide 🚀'}
                    </h1>
                    
                    {/* Desktop Collapse Button */}
                    {!isMobile && (
                        <button
                            onClick={handleCollapseToggle}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            <span className="text-lg">
                                {isCollapsed ? '→' : '←'}
                            </span>
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                    {navItems.map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.id);
                            }}
                            className={`
                                nav-item flex items-center gap-3 p-3 rounded-lg transition-all duration-300 
                                hover:bg-slate-700 relative group
                                ${activeSection === item.id 
                                    ? 'bg-amber-500 text-white shadow-lg transform scale-105' 
                                    : 'hover:translate-x-2'
                                }
                                ${isCollapsed && !isMobile ? 'justify-center' : ''}
                            `}
                            title={!isCollapsed && !isMobile ? item.label : ''}
                        >
                            <span className="text-xl flex-shrink-0">{item.icon}</span>
                            {(!isCollapsed || isMobile) && (
                                <span className="text-sm lg:text-base font-medium truncate">
                                    {item.label}
                                </span>
                            )}
                            
                            {/* Tooltip for collapsed state */}
                            
                        </a>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-slate-700 text-center">
                    <div className="text-xs text-slate-400">
                        {isCollapsed && !isMobile ? '🎯' : '🎯 Master OS Concepts'}
                    </div>
                </div>
            </aside>

            {/* Resize Handle (Desktop only) */}
            {!isCollapsed && !isMobile && (
                <div
                    className="fixed top-0 h-full w-1 bg-transparent hover:bg-amber-400 cursor-col-resize transition-colors z-50 resize-handle"
                    style={{ left: `${sidebarWidth - 2}px` }}
                    onMouseDown={handleMouseDown}
                />
            )}
        </>
    );
};

export default Sidebar;
