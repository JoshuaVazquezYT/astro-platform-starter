import React, { useState, useEffect } from 'react';
import { XPTaskbar } from './XPTaskbar';
import { XPWindow } from './XPWindow';
import { XPBootScreen } from './XPBootScreen';
import { XPAIAssistant } from './XPAIAssistant';
import { XPNotification } from './XPNotification';

interface DesktopIcon {
    id: string;
    name: string;
    icon: string;
    position: { x: number; y: number };
    app: string;
}

interface OpenWindow {
    id: string;
    title: string;
    content: string;
    app: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    isMinimized: boolean;
    isMaximized: boolean;
}

export const XPDesktop: React.FC = () => {
    const [isBooting, setIsBooting] = useState(true);
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
    const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
    const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    const desktopIcons: DesktopIcon[] = [
        { id: 'mycomputer', name: 'My Computer', icon: '💻', position: { x: 20, y: 20 }, app: 'explorer' },
        { id: 'recycle', name: 'Recycle Bin', icon: '🗑️', position: { x: 20, y: 100 }, app: 'recycle' },
        { id: 'ie', name: 'Internet Explorer', icon: '🌐', position: { x: 20, y: 180 }, app: 'ie' },
        { id: 'notepad', name: 'Notepad', icon: '📄', position: { x: 20, y: 260 }, app: 'notepad' },
        { id: 'paint', name: 'Paint', icon: '🎨', position: { x: 20, y: 340 }, app: 'paint' },
        { id: 'calc', name: 'Calculator', icon: '🧮', position: { x: 20, y: 420 }, app: 'calc' },
        { id: 'ai', name: 'AI Assistant', icon: '🤖', position: { x: 20, y: 500 }, app: 'ai' },
    ];

    useEffect(() => {
        // Boot sequence
        const bootTimer = setTimeout(() => {
            setIsBooting(false);
            playStartupSound();
            showWelcomeNotification();
        }, 3000);

        // Clock update
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearTimeout(bootTimer);
            clearInterval(timeInterval);
        };
    }, []);

    const playStartupSound = () => {
        if (window.xpOS) {
            window.xpOS.playSound('startup');
        }
    };

    const showWelcomeNotification = () => {
        const notification = {
            id: 'welcome',
            title: 'Welcome to Windows XP AI!',
            message: 'Your AI-powered Windows XP experience is ready.',
            type: 'info',
            duration: 5000
        };
        setNotifications(prev => [...prev, notification]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== 'welcome'));
        }, 5000);
    };

    const handleIconClick = (icon: DesktopIcon) => {
        if (icon.app === 'ai') {
            setIsAIAssistantOpen(true);
            return;
        }

        const newWindow: OpenWindow = {
            id: `window-${Date.now()}`,
            title: getWindowTitle(icon.app),
            content: getWindowContent(icon.app),
            app: icon.app,
            position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
            size: { width: 600, height: 400 },
            isMinimized: false,
            isMaximized: false
        };

        setOpenWindows(prev => [...prev, newWindow]);
        if (window.xpOS) {
            window.xpOS.playSound('notify');
        }
    };

    const getWindowTitle = (app: string): string => {
        const titles = {
            explorer: 'My Computer',
            ie: 'Internet Explorer',
            notepad: 'Untitled - Notepad',
            paint: 'untitled - Paint',
            calc: 'Calculator',
            recycle: 'Recycle Bin'
        };
        return titles[app] || 'Windows XP';
    };

    const getWindowContent = (app: string): string => {
        return app; // This will be handled by the XPWindow component
    };

    const handleWindowClose = (windowId: string) => {
        setOpenWindows(prev => prev.filter(w => w.id !== windowId));
    };

    const handleWindowMinimize = (windowId: string) => {
        setOpenWindows(prev => prev.map(w =>
            w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w
        ));
    };

    const handleWindowMaximize = (windowId: string) => {
        setOpenWindows(prev => prev.map(w =>
            w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
        ));
    };

    const handleDesktopClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setSelectedIcons([]);
            setIsStartMenuOpen(false);
        }
    };

    if (isBooting) {
        return <XPBootScreen />;
    }

    return (
        <div className="xp-desktop-container">
            <div className="xp-desktop-wallpaper" />

            <div className="xp-desktop" onClick={handleDesktopClick}>
                {/* Desktop Icons */}
                {desktopIcons.map(icon => (
                    <div
                        key={icon.id}
                        className={`xp-desktop-icon ${selectedIcons.includes(icon.id) ? 'selected' : ''}`}
                        style={{
                            position: 'absolute',
                            left: icon.position.x,
                            top: icon.position.y
                        }}
                        onClick={() => handleIconClick(icon)}
                    >
                        <div style={{ fontSize: '32px' }}>{icon.icon}</div>
                        <div>{icon.name}</div>
                    </div>
                ))}

                {/* Open Windows */}
                {openWindows.map(window => (
                    <XPWindow
                        key={window.id}
                        window={window}
                        onClose={() => handleWindowClose(window.id)}
                        onMinimize={() => handleWindowMinimize(window.id)}
                        onMaximize={() => handleWindowMaximize(window.id)}
                    />
                ))}

                {/* AI Assistant */}
                {isAIAssistantOpen && (
                    <XPAIAssistant onClose={() => setIsAIAssistantOpen(false)} />
                )}

                {/* Notifications */}
                {notifications.map(notification => (
                    <XPNotification
                        key={notification.id}
                        notification={notification}
                        onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                    />
                ))}
            </div>

            {/* Taskbar */}
            <XPTaskbar
                isStartMenuOpen={isStartMenuOpen}
                onStartMenuToggle={() => setIsStartMenuOpen(!isStartMenuOpen)}
                openWindows={openWindows}
                currentTime={currentTime}
                onWindowClick={handleWindowMinimize}
            />
        </div>
    );
};

// Global type declarations
declare global {
    interface Window {
        xpOS?: {
            sounds: Record<string, HTMLAudioElement>;
            playSound: (soundName: string) => void;
        };
    }
}