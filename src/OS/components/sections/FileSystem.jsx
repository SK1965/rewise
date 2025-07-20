import React from 'react';
import AnimatedCard from '../animations/AnimatedCard';

const FileSystem = () => (
    <>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            File Systems Architecture
        </h1>

        <AnimatedCard delay={100}>
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-3xl font-semibold mb-6">📁 File Allocation Methods</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                        <h3 className="text-xl font-bold text-blue-700 mb-4">📋 Contiguous Allocation</h3>
                        <div className="mb-4">
                            <div className="grid grid-cols-8 gap-1 mb-2">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className={`h-6 border rounded text-xs flex items-center justify-center ${
                                        (i >= 2 && i <= 5) ? 'bg-blue-300 border-blue-500' :
                                        (i >= 8 && i <= 10) ? 'bg-green-300 border-green-500' :
                                        'bg-gray-100 border-gray-300'
                                    }`}>
                                        {(i >= 2 && i <= 5) ? 'A' : (i >= 8 && i <= 10) ? 'B' : ''}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <p><strong>✅ Pros:</strong></p>
                            <ul className="ml-4 space-y-1">
                                <li>• Fast sequential access</li>
                                <li>• Simple directory entry</li>
                                <li>• Good for streaming</li>
                            </ul>
                            <p><strong>❌ Cons:</strong></p>
                            <ul className="ml-4 space-y-1">
                                <li>• External fragmentation</li>
                                <li>• Hard to grow files</li>
                                <li>• Requires compaction</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
                        <h3 className="text-xl font-bold text-green-700 mb-4">🔗 Linked Allocation</h3>
                        <div className="mb-4">
                            <div className="grid grid-cols-8 gap-1 mb-2">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className={`h-6 border rounded text-xs flex items-center justify-center ${
                                        [1, 4, 7, 12].includes(i) ? 'bg-green-300 border-green-500' :
                                        [3, 6, 9, 14].includes(i) ? 'bg-blue-300 border-blue-500' :
                                        'bg-gray-100 border-gray-300'
                                    }`}>
                                        {[1, 4, 7, 12].includes(i) ? 'A' : [3, 6, 9, 14].includes(i) ? 'B' : ''}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <p><strong>✅ Pros:</strong></p>
                            <ul className="ml-4 space-y-1">
                                <li>• No external fragmentation</li>
                                <li>• Files can grow easily</li>
                                <li>• Dynamic allocation</li>
                            </ul>
                            <p><strong>❌ Cons:</strong></p>
                            <ul className="ml-4 space-y-1">
                                <li>• No random access</li>
                                <li>• Pointer overhead</li>
                                <li>• Reliability issues</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-b from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
                        <h3 className="text-xl font-bold text-purple-700 mb-4">📊 Indexed Allocation</h3>
                        <div className="mb-4">
                            <div className="grid grid-cols-4 gap-1 mb-2">
                                <div className="h-12 bg-purple-200 border-2 border-purple-400 rounded flex flex-col items-center justify-center text-xs">
                                    <div>Index</div>
                                    <div className="text-xs">2,5,8</div>
                                </div>
                                {[2, 5, 8].map(block => (
                                    <div key={block} className="h-12 bg-purple-300 border-2 border-purple-500 rounded flex items-center justify-center text-xs font-bold">
                                        A{block}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <p><strong>✅ Pros:</strong></p>
                            <ul className="ml-4 space-y-1">
                                <li>• Fast random access</li>
                                <li>• No external fragmentation</li>
                                <li>• Supports sparse files</li>
                            </ul>
                            <p><strong>❌ Cons:</strong></p>
                            <ul className="ml-4 space-y-1">
                                <li>• Index block overhead</li>
                                <li>• Wasted space for small files</li>
                                <li>• Complex for very large files</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={200}>
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-3xl font-semibold mb-6">🗃️ Advanced File System Concepts</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-b from-cyan-50 to-cyan-100 p-6 rounded-lg border-l-4 border-cyan-400">
                        <h3 className="text-2xl font-bold text-cyan-800 mb-4">📇 Inodes (Index Nodes)</h3>
                        <p className="mb-4">An inode is the metadata structure for each file, containing everything except the filename and actual data.</p>
                        <div className="bg-white p-4 rounded shadow-inner">
                            <h4 className="font-bold mb-2">Inode Contents:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• File type and permissions (rwxrwxrwx)</li>
                                <li>• Owner and group IDs</li>
                                <li>• File size in bytes</li>
                                <li>• Timestamps (created, modified, accessed)</li>
                                <li>• Link count (hard links)</li>
                                <li>• Block pointers (direct, indirect, double indirect)</li>
                                <li>• Special flags and attributes</li>
                            </ul>
                        </div>
                        <div className="mt-4 bg-cyan-200 p-3 rounded">
                            <p className="text-sm"><strong>Fun Fact:</strong> The filename is stored in the directory, not the inode. This is why you can have multiple filenames (hard links) pointing to the same inode!</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-b from-emerald-50 to-emerald-100 p-6 rounded-lg border-l-4 border-emerald-400">
                        <h3 className="text-2xl font-bold text-emerald-800 mb-4">📝 Journaling File Systems</h3>
                        <p className="mb-4">Journaling prevents file system corruption by logging changes before applying them.</p>
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded shadow-inner">
                                <h4 className="font-bold mb-2">Journal Write Process:</h4>
                                <ol className="space-y-2 text-sm">
                                    <li className="flex items-center">
                                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-xs">1</span>
                                        Write operation to journal log
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 text-xs">2</span>
                                        Wait for journal write to complete
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3 text-xs">3</span>
                                        Apply changes to actual file system
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center mr-3 text-xs">4</span>
                                        Mark journal entry as complete
                                    </li>
                                </ol>
                            </div>
                            <div className="bg-emerald-200 p-3 rounded">
                                <p className="text-sm"><strong>Recovery:</strong> If system crashes, replay incomplete journal entries on next boot. This ensures file system consistency!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={300}>
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-3xl font-semibold mb-6 text-center">🏗️ Modern File System Examples</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg text-center">
                        <div className="text-4xl mb-3">🐧</div>
                        <h3 className="text-xl font-bold text-blue-700 mb-3">ext4 (Linux)</h3>
                        <ul className="text-sm space-y-2">
                            <li><strong>Max File Size:</strong> 16 TB</li>
                            <li><strong>Max Volume:</strong> 1 EB</li>
                            <li><strong>Features:</strong> Journaling, extents, delayed allocation</li>
                            <li><strong>Use Case:</strong> General purpose Linux systems</li>
                        </ul>
                    </div>
                    <div className="bg-gradient-to-b from-purple-50 to-purple-100 p-6 rounded-lg text-center">
                        <div className="text-4xl mb-3">🪟</div>
                        <h3 className="text-xl font-bold text-purple-700 mb-3">NTFS (Windows)</h3>
                        <ul className="text-sm space-y-2">
                            <li><strong>Max File Size:</strong> 256 TB</li>
                            <li><strong>Max Volume:</strong> 256 TB</li>
                            <li><strong>Features:</strong> ACLs, compression, encryption</li>
                            <li><strong>Use Case:</strong> Windows enterprise systems</li>
                        </ul>
                    </div>
                    <div className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-lg text-center">
                        <div className="text-4xl mb-3">🍎</div>
                        <h3 className="text-xl font-bold text-green-700 mb-3">APFS (macOS)</h3>
                        <ul className="text-sm space-y-2">
                            <li><strong>Max File Size:</strong> 8 EB</li>
                            <li><strong>Max Volume:</strong> 8 EB</li>
                            <li><strong>Features:</strong> Snapshots, copy-on-write, encryption</li>
                            <li><strong>Use Case:</strong> macOS and iOS devices</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={400}>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-center">🎯 File System Interview Questions</h2>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                        <h3 className="font-bold text-lg mb-2 text-blue-700">Q: What's the difference between hard links and soft links?</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p><strong>Hard Links:</strong></p>
                                <ul className="text-sm space-y-1 ml-4">
                                    <li>• Point to the same inode</li>
                                    <li>• Share the same data blocks</li>
                                    <li>• Cannot span file systems</li>
                                    <li>• Cannot link to directories</li>
                                    <li>• File exists until last hard link is deleted</li>
                                </ul>
                            </div>
                            <div>
                                <p><strong>Soft Links (Symbolic):</strong></p>
                                <ul className="text-sm space-y-1 ml-4">
                                    <li>• Have their own inode</li>
                                    <li>• Contain path to target file</li>
                                    <li>• Can span file systems</li>
                                    <li>• Can link to directories</li>
                                    <li>• Become broken if target is deleted</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                        <h3 className="font-bold text-lg mb-2 text-green-700">Q: How does a file system handle very large files?</h3>
                        <p><strong>A:</strong> Modern file systems use multi-level indexing:</p>
                        <div className="mt-3 bg-green-50 p-4 rounded">
                            <ul className="space-y-2 text-sm">
                                <li><strong>Direct blocks:</strong> First 12 pointers in inode point directly to data blocks</li>
                                <li><strong>Single indirect:</strong> Points to a block containing 1024 more pointers</li>
                                <li><strong>Double indirect:</strong> Points to blocks that point to pointer blocks</li>
                                <li><strong>Triple indirect:</strong> Three levels of indirection for massive files</li>
                            </ul>
                            <p className="mt-2 text-xs text-green-600"><strong>Result:</strong> Can address files up to several terabytes in size!</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
                        <h3 className="font-bold text-lg mb-2 text-purple-700">Q: What happens during a file delete operation?</h3>
                        <p><strong>A:</strong> It's not actually deleted immediately!</p>
                        <ol className="mt-3 space-y-2 text-sm">
                            <li>1. <strong>Remove directory entry</strong> - Filename is removed from parent directory</li>
                            <li>2. <strong>Decrement inode link count</strong> - Reduce hard link counter</li>
                            <li>3. <strong>Check link count</strong> - If count reaches 0, mark inode as free</li>
                            <li>4. <strong>Mark data blocks as free</strong> - Add blocks to free list (but don't overwrite)</li>
                            <li>5. <strong>Update free space bitmap</strong> - Mark blocks as available</li>
                        </ol>
                        <div className="mt-3 bg-purple-50 p-3 rounded">
                            <p className="text-sm text-purple-700"><strong>This is why file recovery tools work!</strong> The actual data isn't overwritten until the space is needed for new files.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>
    </>
);

export default FileSystem;
