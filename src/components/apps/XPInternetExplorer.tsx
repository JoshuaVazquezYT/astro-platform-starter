import React, { useState } from 'react';

export const XPInternetExplorer: React.FC = () => {
    const [url, setUrl] = useState('http://www.google.com');
    const [currentUrl, setCurrentUrl] = useState('http://www.google.com');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<string[]>(['http://www.google.com']);
    const [historyIndex, setHistoryIndex] = useState(0);

    const navigate = (newUrl: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setCurrentUrl(newUrl);
            setUrl(newUrl);
            const newHistory = [...history.slice(0, historyIndex + 1), newUrl];
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
            setIsLoading(false);
        }, 1000);
    };

    const goBack = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentUrl(history[newIndex]);
            setUrl(history[newIndex]);
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCurrentUrl(history[newIndex]);
            setUrl(history[newIndex]);
        }
    };

    const refresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(url);
    };

    const quickLinks = [
        { name: 'Google', url: 'http://www.google.com' },
        { name: 'Yahoo', url: 'http://www.yahoo.com' },
        { name: 'MSN', url: 'http://www.msn.com' },
        { name: 'Wikipedia', url: 'http://www.wikipedia.org' }
    ];

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
                <span style={{ margin: '0 8px' }}>Favorites</span>
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
                <button
                    className="xp-button"
                    onClick={goBack}
                    disabled={historyIndex === 0}
                    title="Back"
                >
                    ←
                </button>
                <button
                    className="xp-button"
                    onClick={goForward}
                    disabled={historyIndex === history.length - 1}
                    title="Forward"
                >
                    →
                </button>
                <button className="xp-button" onClick={refresh} title="Refresh">🔄</button>
                <button className="xp-button" title="Home">🏠</button>

                <div style={{ borderLeft: '1px solid #ccc', height: '20px', margin: '0 4px' }} />

                <form onSubmit={handleUrlSubmit} style={{ flex: 1, display: 'flex', gap: '4px' }}>
                    <span style={{ fontSize: '11px', alignSelf: 'center' }}>Address:</span>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '2px 4px',
                            border: '1px inset #d4d0c8',
                            fontSize: '11px'
                        }}
                    />
                    <button type="submit" className="xp-button">Go</button>
                </form>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, background: 'white', position: 'relative' }}>
                {isLoading ? (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'white'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div className="xp-loading" style={{ margin: '0 auto 10px' }} />
                            <div>Loading {currentUrl}...</div>
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <h2 style={{ color: '#0066cc' }}>Internet Explorer 6.0</h2>
                            <p>Simulated Web Browser</p>
                        </div>

                        <div style={{
                            background: '#f8f8f8',
                            border: '1px solid #ccc',
                            padding: '10px',
                            marginBottom: '20px'
                        }}>
                            <strong>Current URL:</strong> {currentUrl}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <h3>Quick Links:</h3>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {quickLinks.map(link => (
                                    <button
                                        key={link.name}
                                        className="xp-button"
                                        onClick={() => navigate(link.url)}
                                        style={{ color: '#0066cc', textDecoration: 'underline' }}
                                    >
                                        {link.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{
                            background: '#fff',
                            border: '1px solid #ccc',
                            padding: '20px',
                            textAlign: 'center'
                        }}>
                            <h3>Welcome to the Internet</h3>
                            <p>This is a simulated web browser experience reminiscent of Windows XP era.</p>
                            <p>Enter any URL in the address bar above to "navigate" to different sites.</p>
                            <div style={{ marginTop: '20px' }}>
                                <div style={{ fontSize: '12px', color: '#666' }}>
                                    🌐 Connecting to the web... (simulated)
                                </div>
                            </div>
                        </div>
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
                <span>{isLoading ? 'Loading...' : 'Done'}</span>
                <span>Internet Explorer 6.0</span>
            </div>
        </div>
    );
};