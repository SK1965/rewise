// src/components/layout/Sidebar.jsx
import React, { useState, useEffect } from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(280);
    const [isResizing, setIsResizing] = useState(false);

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

    // Handle resize functionality
    const handleMouseDown = (e) => {
        setIsResizing(true);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (isResizing) {
            const newWidth = Math.max(200, Math.min(400, e.clientX));
            setSidebarWidth(newWidth);
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

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
                    ${isCollapsed ? 'lg:w-20' : ''}
                `}
                style={{ 
                    width: window.innerWidth >= 1024 ? (isCollapsed ? '80px' : `${sidebarWidth}px`) : '280px'
                }}
            >
                {/* Header */}
                <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-between">
                    <h1 className={`font-bold transition-all duration-300 ${
                        isCollapsed ? 'text-lg' : 'text-xl lg:text-2xl'
                    }`}>
                        {isCollapsed ? '🚀' : 'OS Study Guide 🚀'}
                    </h1>
                    
                    {/* Desktop Collapse Button */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:block p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        <span className="text-lg">
                            {isCollapsed ? '→' : '←'}
                        </span>
                    </button>
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
                                ${isCollapsed ? 'justify-center' : ''}
                            `}
                            title={isCollapsed ? item.label : ''}
                        >
                            <span className="text-xl flex-shrink-0">{item.icon}</span>
                            {!isCollapsed && (
                                <span className="text-sm lg:text-base font-medium truncate">
                                    {item.label}
                                </span>
                            )}
                            
                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="absolute left-full ml-2 px-3 py-2 bg-slate-700 text-white text-sm rounded-lg 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </a>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-slate-700 text-center">
                    <div className="text-xs text-slate-400">
                        {isCollapsed ? '🎯' : '🎯 Master OS Concepts'}
                    </div>
                </div>
            </aside>

            {/* Resize Handle (Desktop only) */}
            {!isCollapsed && (
                <div
                    className="hidden lg:block fixed top-0 h-full w-1 bg-transparent hover:bg-amber-400 cursor-col-resize transition-colors z-50"
                    style={{ left: `${sidebarWidth - 2}px` }}
                    onMouseDown={handleMouseDown}
                />
            )}
        </>
    );
};

export default Sidebar;
