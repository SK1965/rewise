import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainHomePage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Subject data with Gen-Z friendly emojis and descriptions
    const subjects = [
        {
            id: 'operating-systems',
            title: 'Operating Systems',
            category: 'Computer Science',
            emoji: '🖥️',
            gradient: 'from-blue-500 to-purple-600',
            description: 'Master the core of computing! Learn how OS manages everything behind the scenes.',
            difficulty: 'Intermediate',
            topics: ['Processes', 'Memory', 'File Systems', 'Scheduling'],
            color: '#3B82F6',
            popularity: 95,
            route: '/subject/operating-systems'
        },
        {
            id: 'data-structures',
            title: 'Data Structures',
            category: 'Computer Science',
            emoji: '🌳',
            gradient: 'from-green-500 to-emerald-600',
            description: 'Build solid foundations! Arrays, trees, graphs - the building blocks of code.',
            difficulty: 'Beginner',
            topics: ['Arrays', 'Trees', 'Graphs', 'Hash Tables'],
            color: '#10B981',
            popularity: 92,
            route: '/subject/data-structures'
        },
        {
            id: 'algorithms',
            title: 'Algorithms',
            category: 'Computer Science',
            emoji: '⚡',
            gradient: 'from-yellow-500 to-orange-600',
            description: 'Think like a pro! Sorting, searching, and optimization techniques.',
            difficulty: 'Advanced',
            topics: ['Sorting', 'Dynamic Programming', 'Greedy', 'Graph Algorithms'],
            color: '#F59E0B',
            popularity: 89,
            route: '/subject/algorithms'
        },
        {
            id: 'machine-learning',
            title: 'Machine Learning',
            category: 'AI & ML',
            emoji: '🤖',
            gradient: 'from-pink-500 to-red-600',
            description: 'AI is the future! Train models, predict outcomes, change the world.',
            difficulty: 'Advanced',
            topics: ['Neural Networks', 'Deep Learning', 'NLP', 'Computer Vision'],
            color: '#EC4899',
            popularity: 98,
            route: '/subject/machine-learning'
        },
        {
            id: 'web-development',
            title: 'Web Development',
            category: 'Development',
            emoji: '🌐',
            gradient: 'from-cyan-500 to-blue-600',
            description: 'Create stunning websites! HTML, CSS, JavaScript, and modern frameworks.',
            difficulty: 'Beginner',
            topics: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
            color: '#06B6D4',
            popularity: 96,
            route: '/subject/web-development'
        },
        {
            id: 'cybersecurity',
            title: 'Cybersecurity',
            category: 'Security',
            emoji: '🛡️',
            gradient: 'from-indigo-500 to-purple-600',
            description: 'Be the digital guardian! Protect systems, networks, and data.',
            difficulty: 'Intermediate',
            topics: ['Ethical Hacking', 'Cryptography', 'Network Security', 'Malware Analysis'],
            color: '#6366F1',
            popularity: 94,
            route: '/subject/cybersecurity'
        },
        {
            id: 'blockchain',
            title: 'Blockchain',
            category: 'Emerging Tech',
            emoji: '⛓️',
            gradient: 'from-orange-500 to-red-600',
            description: 'Decentralize everything! Smart contracts, DeFi, and Web3 revolution.',
            difficulty: 'Advanced',
            topics: ['Smart Contracts', 'DeFi', 'NFTs', 'Cryptocurrency'],
            color: '#F97316',
            popularity: 87,
            route: '/subject/blockchain'
        },
        {
            id: 'mobile-development',
            title: 'Mobile Development',
            category: 'Development',
            emoji: '📱',
            gradient: 'from-purple-500 to-pink-600',
            description: 'Apps that rock! iOS, Android, React Native - mobile-first world.',
            difficulty: 'Intermediate',
            topics: ['iOS', 'Android', 'React Native', 'Flutter'],
            color: '#8B5CF6',
            popularity: 91,
            route: '/subject/mobile-development'
        }
    ];

    const categories = ['All', ...new Set(subjects.map(s => s.category))];

    const filteredSubjects = subjects.filter(subject => {
        const matchesSearch = subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            subject.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || subject.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    useEffect(() => {
        // Simulate loading for dramatic effect
        setTimeout(() => setIsLoading(false), 1500);
    }, []);

    // Handle subject click with React Router navigation
    const handleSubjectClick = (subject) => {
        navigate(subject.route);
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 flex items-center justify-center z-50">
                <div className="text-center text-white">
                    <div className="mb-8">
                        <span className="text-6xl animate-bounce inline-block">🚀</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold mt-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            rewisely
                        </h1>
                    </div>
                    <div className="w-80 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-white to-blue-300 rounded-full animate-pulse"></div>
                    </div>
                    <p className="mt-4 text-lg animate-pulse">Preparing your learning universe...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 relative overflow-x-hidden">
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-10 w-32 h-32 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-20 w-16 h-16 bg-white/10 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-32 right-20 w-24 h-24 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
                <div className="absolute top-1/2 left-5 w-28 h-28 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: '4s' }}></div>
                <div className="absolute top-3/4 right-15 w-20 h-20 bg-white/10 rounded-full animate-ping" style={{ animationDelay: '5s' }}></div>
            </div>

            {/* Hero Section */}
            <header className="relative z-10 px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="max-w-7xl mx-auto text-center">
                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                        Welcome to{' '}
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                            rewisely
                        </span>
                        <span className="inline-block ml-2 animate-bounce">👋</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
                        Your ultimate learning companion for mastering tech skills. 
                        Interactive notes, visual explanations, and hands-on practice - all in one place!{' '}
                        <span className="inline-block animate-pulse">🔥</span>
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-lg mx-auto mb-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-xl">🔍</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Search your favorite subject..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 text-lg rounded-full bg-white/95 backdrop-blur-sm 
                                         border-0 shadow-xl focus:ring-4 focus:ring-white/30 focus:outline-none 
                                         transition-all duration-300 hover:shadow-2xl focus:transform focus:scale-105
                                         text-gray-800 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                                    selectedCategory === category
                                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 shadow-lg'
                                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                                } backdrop-blur-sm`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { number: '1K+', label: 'Students Learning' },
                            { number: '10+', label: 'Subjects Available' },
                            { number: '95%', label: 'Success Rate' }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 
                                         hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                            >
                                <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                                <div className="text-white/90 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subjects Section */}
            <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Choose Your Adventure{' '}
                            <span className="inline-block animate-bounce">🚀</span>
                        </h2>
                        <p className="text-xl text-white/80">
                            Pick a subject and start your learning journey
                        </p>
                    </div>

                    {/* Subjects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                        {filteredSubjects.map((subject, index) => (
                            <div
                                key={subject.id}
                                className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl 
                                         cursor-pointer transition-all duration-500 transform hover:scale-105 
                                         hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up`}
                                style={{ animationDelay: `${index * 100}ms` }}
                                onMouseEnter={() => setHoveredCard(subject.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => handleSubjectClick(subject)}
                            >
                                {/* Card Background Gradient */}
                                <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-br ${subject.gradient} opacity-90`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
                                </div>

                                {/* Card Content */}
                                <div className="relative p-6 pt-20">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-5xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                            {subject.emoji}
                                        </span>
                                        <div className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                            <span>🔥</span>
                                            <span>{subject.popularity}%</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                                        {subject.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {subject.description}
                                    </p>

                                    {/* Topics */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {subject.topics.slice(0, 3).map((topic, idx) => (
                                            <span 
                                                key={idx}
                                                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                        {subject.topics.length > 3 && (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                                                +{subject.topics.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex justify-between items-center">
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                            subject.difficulty === 'Beginner' 
                                                ? 'bg-green-100 text-green-700'
                                                : subject.difficulty === 'Intermediate'
                                                ? 'bg-yellow-100 text-yellow-700'  
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {subject.difficulty}
                                        </span>
                                        
                                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full 
                                                      flex items-center justify-center text-white font-bold text-lg
                                                      group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-500/5 
                                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredSubjects.length === 0 && (
                        <div className="text-center py-16">
                            <span className="text-6xl block mb-4">😅</span>
                            <h3 className="text-2xl font-bold text-white mb-2">Oops! No subjects found</h3>
                            <p className="text-white/80">Try adjusting your search or category filter</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 text-center py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <p className="text-white/80 mb-4">Made with ❤️ for Gen-Z learners</p>
                    <div className="flex justify-center items-center gap-2 text-white/60">
                        <span>Follow us:</span>
                        <span className="text-xl">📱 💻 🚀</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainHomePage;
