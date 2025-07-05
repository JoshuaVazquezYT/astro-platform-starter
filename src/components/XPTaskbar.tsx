import React from 'react';
import { XPStartMenu } from './XPStartMenu';

interface OpenWindow {
    id: string;
    title: string;
    app: string;
    isMinimized: boolean;
}

interface XPTaskbarProps {
    isStartMenuOpen: boolean;
    onStartMenuToggle: () => void;
    openWindows: OpenWindow[];
    currentTime: Date;
    onWindowClick: (windowId: string) => void;
}

export const XPTaskbar: React.FC<XPTaskbarProps> = ({
    isStartMenuOpen,
    onStartMenuToggle,
    openWindows,
    currentTime,
    onWindowClick
}) => {
    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            {isStartMenuOpen && <XPStartMenu onClose={() => onStartMenuToggle()} />}

            <div className="xp-taskbar">
                <button className="xp-start-button" onClick={onStartMenuToggle}>
                    <span style={{ fontSize: '16px', color: '#ffffff' }}>⊞</span>
                    <span>start</span>
                </button>

                <div className="xp-taskbar-separator" style={{ width: '2px', height: '24px', background: '#1941a5', margin: '0 8px' }} />

                <div className="xp-taskbar-buttons" style={{ display: 'flex', gap: '2px', flexGrow: 1 }}>
                    {openWindows.map(window => (
                        <button
                            key={window.id}
                            className={`xp-taskbar-button ${window.isMinimized ? 'minimized' : ''}`}
                            onClick={() => onWindowClick(window.id)}
                            style={{
                                height: '32px',
                                padding: '0 12px',
                                background: window.isMinimized
                                    ? 'linear-gradient(to bottom, #1941a5 0%, #245edb 100%)'
                                    : 'linear-gradient(to bottom, #245edb 0%, #1941a5 100%)',
                                border: window.isMinimized ? '2px inset #245edb' : '2px outset #245edb',
                                color: 'white',
                                fontSize: '11px',
                                cursor: 'pointer',
                                maxWidth: '180px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {window.title}
                        </button>
                    ))}
                </div>

                <div className="xp-system-tray" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
                    <div className="xp-tray-icons" style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ fontSize: '16px', cursor: 'pointer' }}>🔊</div>
                        <div style={{ fontSize: '16px', cursor: 'pointer' }}>🌐</div>
                        <div style={{ fontSize: '16px', cursor: 'pointer' }}>🔒</div>
                    </div>

                    <div className="xp-clock" style={{
                        color: 'white',
                        fontSize: '11px',
                        padding: '4px 8px',
                        border: '1px inset #245edb',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '2px',
                        minWidth: '50px',
                        textAlign: 'center'
                    }}>
                        {formatTime(currentTime)}
                    </div>
                </div>
            </div>
        </>
    );
};