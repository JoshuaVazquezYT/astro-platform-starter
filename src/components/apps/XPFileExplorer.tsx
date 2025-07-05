import React, { useState } from 'react';

interface FileItem {
    name: string;
    type: 'folder' | 'file';
    size?: string;
    modified: string;
    icon: string;
}

interface XPFileExplorerProps {
    isRecycleBin?: boolean;
}

export const XPFileExplorer: React.FC<XPFileExplorerProps> = ({ isRecycleBin = false }) => {
    const [currentPath, setCurrentPath] = useState(isRecycleBin ? 'Recycle Bin' : 'C:\\');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const sampleFiles: FileItem[] = isRecycleBin ? [
        { name: 'Deleted Document.txt', type: 'file', size: '2 KB', modified: '12/15/2023 3:45 PM', icon: '📄' },
        { name: 'Old Photo.jpg', type: 'file', size: '156 KB', modified: '12/10/2023 10:30 AM', icon: '🖼️' },
        { name: 'Backup Folder', type: 'folder', modified: '12/08/2023 2:15 PM', icon: '🗂️' }
    ] : [
        { name: 'Documents', type: 'folder', modified: '12/15/2023 3:45 PM', icon: '📁' },
        { name: 'Pictures', type: 'folder', modified: '12/14/2023 2:30 PM', icon: '📁' },
        { name: 'Music', type: 'folder', modified: '12/13/2023 1:15 PM', icon: '📁' },
        { name: 'Videos', type: 'folder', modified: '12/12/2023 4:20 PM', icon: '📁' },
        { name: 'Program Files', type: 'folder', modified: '12/11/2023 9:00 AM', icon: '📁' },
        { name: 'Windows', type: 'folder', modified: '12/10/2023 8:30 AM', icon: '📁' },
        { name: 'README.txt', type: 'file', size: '1 KB', modified: '12/09/2023 5:45 PM', icon: '📄' },
        { name: 'System.ini', type: 'file', size: '512 B', modified: '12/08/2023 7:20 AM', icon: '⚙️' },
        { name: 'Photo.jpg', type: 'file', size: '245 KB', modified: '12/07/2023 3:10 PM', icon: '🖼️' }
    ];

    const [files, setFiles] = useState<FileItem[]>(sampleFiles);
    const [viewMode, setViewMode] = useState<'list' | 'icons'>('list');

    const handleItemClick = (item: FileItem) => {
        setSelectedItem(item.name);
    };

    const handleItemDoubleClick = (item: FileItem) => {
        if (item.type === 'folder') {
            setCurrentPath(`${currentPath}\\${item.name}`);
            // In a real app, this would load the folder contents
            console.log(`Opening folder: ${item.name}`);
        } else {
            console.log(`Opening file: ${item.name}`);
        }
    };

    const goBack = () => {
        if (currentPath !== 'C:\\' && currentPath !== 'Recycle Bin') {
            const pathParts = currentPath.split('\\');
            pathParts.pop();
            setCurrentPath(pathParts.join('\\'));
        }
    };

    const goUp = () => {
        goBack();
    };

    const refresh = () => {
        console.log('Refreshing...');
    };

    const createNewFolder = () => {
        const newFolder: FileItem = {
            name: 'New Folder',
            type: 'folder',
            modified: new Date().toLocaleString(),
            icon: '📁'
        };
        setFiles([...files, newFolder]);
    };

    const deleteSelected = () => {
        if (selectedItem) {
            setFiles(files.filter(file => file.name !== selectedItem));
            setSelectedItem(null);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Menu Bar */}
            <div style={{
                background: '#f0f0f0',
                border: '1px solid #ccc',
                padding: '4px',
                fontSize: '11px'
            }}>
                <span style={{ margin: '0 8px' }}>File</span>
                <span style={{ margin: '0 8px' }}>Edit</span>
                <span style={{ margin: '0 8px' }}>View</span>
                <span style={{ margin: '0 8px' }}>Tools</span>
                <span style={{ margin: '0 8px' }}>Help</span>
            </div>

            {/* Toolbar */}
            <div style={{
                background: '#f0f0f0',
                border: '1px solid #ccc',
                padding: '4px',
                display: 'flex',
                gap: '4px',
                alignItems: 'center'
            }}>
                <button className="xp-button" onClick={goBack} title="Back">←</button>
                <button className="xp-button" onClick={goUp} title="Up">🔼</button>
                <button className="xp-button" onClick={refresh} title="Refresh">🔄</button>

                <div style={{ borderLeft: '1px solid #ccc', height: '20px', margin: '0 4px' }} />

                <button className="xp-button" onClick={createNewFolder} title="New Folder">📁+</button>
                <button className="xp-button" onClick={deleteSelected} title="Delete" disabled={!selectedItem}>🗑️</button>

                <div style={{ borderLeft: '1px solid #ccc', height: '20px', margin: '0 4px' }} />

                <button
                    className="xp-button"
                    onClick={() => setViewMode('list')}
                    style={{ background: viewMode === 'list' ? '#316ac5' : undefined }}
                >
                    📋
                </button>
                <button
                    className="xp-button"
                    onClick={() => setViewMode('icons')}
                    style={{ background: viewMode === 'icons' ? '#316ac5' : undefined }}
                >
                    🔳
                </button>
            </div>

            {/* Address Bar */}
            <div style={{
                background: '#f0f0f0',
                border: '1px solid #ccc',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
            }}>
                <span style={{ fontSize: '11px' }}>Address:</span>
                <input
                    type="text"
                    value={currentPath}
                    onChange={(e) => setCurrentPath(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '2px 4px',
                        border: '1px inset #d4d0c8',
                        fontSize: '11px'
                    }}
                />
            </div>

            {/* File List */}
            <div style={{ flex: 1, background: 'white', overflow: 'auto' }}>
                {viewMode === 'list' ? (
                    <div>
                        {/* Header */}
                        <div style={{
                            background: '#f0f0f0',
                            border: '1px solid #ccc',
                            padding: '4px',
                            display: 'grid',
                            gridTemplateColumns: '200px 80px 120px',
                            fontSize: '11px',
                            fontWeight: 'bold'
                        }}>
                            <span>Name</span>
                            <span>Size</span>
                            <span>Date Modified</span>
                        </div>

                        {/* Files */}
                        {files.map((file, index) => (
                            <div
                                key={index}
                                onClick={() => handleItemClick(file)}
                                onDoubleClick={() => handleItemDoubleClick(file)}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '200px 80px 120px',
                                    padding: '4px',
                                    borderBottom: '1px solid #eee',
                                    cursor: 'pointer',
                                    background: selectedItem === file.name ? '#316ac5' : 'white',
                                    color: selectedItem === file.name ? 'white' : 'black',
                                    fontSize: '11px'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span>{file.icon}</span>
                                    <span>{file.name}</span>
                                </div>
                                <span>{file.size || (file.type === 'folder' ? '' : '0 KB')}</span>
                                <span>{file.modified}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                        gap: '10px',
                        padding: '10px'
                    }}>
                        {files.map((file, index) => (
                            <div
                                key={index}
                                onClick={() => handleItemClick(file)}
                                onDoubleClick={() => handleItemDoubleClick(file)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '8px',
                                    cursor: 'pointer',
                                    background: selectedItem === file.name ? '#316ac5' : 'transparent',
                                    color: selectedItem === file.name ? 'white' : 'black',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '4px' }}>{file.icon}</div>
                                <div style={{ wordBreak: 'break-word', maxWidth: '80px' }}>{file.name}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div style={{
                background: '#f0f0f0',
                border: '1px solid #ccc',
                padding: '2px 8px',
                fontSize: '10px',
                color: '#666',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <span>{files.length} items</span>
                <span>{selectedItem || 'Ready'}</span>
            </div>
        </div>
    );
};