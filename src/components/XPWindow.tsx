import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { XPNotepad } from './apps/XPNotepad';
import { XPCalculator } from './apps/XPCalculator';
import { XPPaint } from './apps/XPPaint';
import { XPInternetExplorer } from './apps/XPInternetExplorer';
import { XPFileExplorer } from './apps/XPFileExplorer';

interface Window {
    id: string;
    title: string;
    content: string;
    app: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    isMinimized: boolean;
    isMaximized: boolean;
}

interface XPWindowProps {
    window: Window;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
}

export const XPWindow: React.FC<XPWindowProps> = ({
    window,
    onClose,
    onMinimize,
    onMaximize
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const renderAppContent = () => {
        switch (window.app) {
            case 'notepad':
                return <XPNotepad />;
            case 'calc':
                return <XPCalculator />;
            case 'paint':
                return <XPPaint />;
            case 'ie':
                return <XPInternetExplorer />;
            case 'explorer':
                return <XPFileExplorer />;
            case 'recycle':
                return <XPFileExplorer isRecycleBin={true} />;
            default:
                return (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        <h3>Windows XP Application</h3>
                        <p>This is a simulated {window.app} application.</p>
                        <p>App ID: {window.app}</p>
                    </div>
                );
        }
    };

    const getWindowIcon = () => {
        const icons = {
            notepad: '📄',
            calc: '🧮',
            paint: '🎨',
            ie: '🌐',
            explorer: '💻',
            recycle: '🗑️'
        };
        return icons[window.app] || '🪟';
    };

    if (window.isMinimized) {
        return null;
    }

    const windowStyle = window.isMaximized ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 40px)',
        zIndex: 200
    } : {
        width: window.size.width,
        height: window.size.height,
        zIndex: 200
    };

    const WindowContent = (
        <div className="xp-window" style={windowStyle}>
            <div
                className="xp-window-titlebar"
                style={{ cursor: window.isMaximized ? 'default' : 'move' }}
            >
                <div className="xp-window-title">
                    <span style={{ fontSize: '16px' }}>{getWindowIcon()}</span>
                    <span>{window.title}</span>
                </div>
                <div className="xp-window-controls">
                    <button
                        className="xp-window-control"
                        onClick={onMinimize}
                        title="Minimize"
                    >
                        _
                    </button>
                    <button
                        className="xp-window-control"
                        onClick={onMaximize}
                        title={window.isMaximized ? "Restore" : "Maximize"}
                    >
                        {window.isMaximized ? '⧉' : '□'}
                    </button>
                    <button
                        className="xp-window-control"
                        onClick={onClose}
                        title="Close"
                        style={{ background: 'linear-gradient(to bottom, #ff4444 0%, #cc0000 100%)' }}
                    >
                        ×
                    </button>
                </div>
            </div>
            <div className="xp-window-content">
                {renderAppContent()}
            </div>
        </div>
    );

    if (window.isMaximized) {
        return WindowContent;
    }

    return (
        <Draggable
            handle=".xp-window-titlebar"
            defaultPosition={window.position}
            onStart={() => setIsDragging(true)}
            onStop={() => setIsDragging(false)}
        >
            {WindowContent}
        </Draggable>
    );
};