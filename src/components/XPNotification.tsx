import React, { useEffect } from 'react';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error';
    duration?: number;
}

interface XPNotificationProps {
    notification: Notification;
    onClose: () => void;
}

export const XPNotification: React.FC<XPNotificationProps> = ({
    notification,
    onClose
}) => {
    useEffect(() => {
        if (notification.duration) {
            const timer = setTimeout(() => {
                onClose();
            }, notification.duration);
            return () => clearTimeout(timer);
        }
    }, [notification.duration, onClose]);

    const getNotificationIcon = () => {
        switch (notification.type) {
            case 'info': return 'ℹ️';
            case 'warning': return '⚠️';
            case 'error': return '❌';
            default: return 'ℹ️';
        }
    };

    const getNotificationColor = () => {
        switch (notification.type) {
            case 'info': return '#d4edda';
            case 'warning': return '#fff3cd';
            case 'error': return '#f8d7da';
            default: return '#d4edda';
        }
    };

    return (
        <div
            className="xp-notification"
            style={{
                backgroundColor: getNotificationColor(),
                animation: 'slideIn 0.3s ease-out'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ fontSize: '16px', marginTop: '2px' }}>
                    {getNotificationIcon()}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontWeight: 'bold',
                        fontSize: '12px',
                        marginBottom: '4px',
                        color: '#000'
                    }}>
                        {notification.title}
                    </div>
                    <div style={{
                        fontSize: '11px',
                        color: '#333',
                        lineHeight: '1.4'
                    }}>
                        {notification.message}
                    </div>
                </div>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#666',
                        padding: '2px',
                        lineHeight: '1'
                    }}
                >
                    ×
                </button>
            </div>

            <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
};