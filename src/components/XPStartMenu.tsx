import React from 'react';

interface XPStartMenuProps {
    onClose: () => void;
}

export const XPStartMenu: React.FC<XPStartMenuProps> = ({ onClose }) => {
    const menuItems = [
        { id: 'programs', name: 'All Programs', icon: '📁', action: 'programs' },
        { id: 'docs', name: 'My Documents', icon: '📄', action: 'docs' },
        { id: 'recent', name: 'My Recent Documents', icon: '📋', action: 'recent' },
        { id: 'pics', name: 'My Pictures', icon: '🖼️', action: 'pics' },
        { id: 'music', name: 'My Music', icon: '🎵', action: 'music' },
        { id: 'computer', name: 'My Computer', icon: '💻', action: 'computer' },
        { id: 'network', name: 'My Network Places', icon: '🌐', action: 'network' },
        { id: 'control', name: 'Control Panel', icon: '⚙️', action: 'control' },
        { id: 'connect', name: 'Connect To', icon: '🔗', action: 'connect' },
        { id: 'help', name: 'Help and Support', icon: '❓', action: 'help' },
        { id: 'search', name: 'Search', icon: '🔍', action: 'search' },
        { id: 'run', name: 'Run...', icon: '▶️', action: 'run' },
    ];

    const handleMenuItemClick = (action: string) => {
        console.log(`Start menu action: ${action}`);
        if (window.xpOS) {
            window.xpOS.playSound('notify');
        }
        onClose();
    };

    return (
        <div className="xp-start-menu">
            <div className="xp-start-menu-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontSize: '24px' }}>👤</div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Windows XP User</div>
                        <div style={{ fontSize: '10px', opacity: 0.8 }}>AI-Powered Edition</div>
                    </div>
                </div>
            </div>

            <div className="xp-start-menu-items">
                {menuItems.map(item => (
                    <div
                        key={item.id}
                        className="xp-start-menu-item"
                        onClick={() => handleMenuItemClick(item.action)}
                    >
                        <span style={{ fontSize: '16px' }}>{item.icon}</span>
                        <span>{item.name}</span>
                    </div>
                ))}

                <div style={{ height: '1px', background: '#a0a0a0', margin: '4px 16px' }} />

                <div className="xp-start-menu-item" onClick={() => handleMenuItemClick('logoff')}>
                    <span style={{ fontSize: '16px' }}>🚪</span>
                    <span>Log Off</span>
                </div>

                <div className="xp-start-menu-item" onClick={() => handleMenuItemClick('shutdown')}>
                    <span style={{ fontSize: '16px' }}>⏻</span>
                    <span>Turn Off Computer</span>
                </div>
            </div>
        </div>
    );
};