import React, { useState, useEffect } from 'react';

export const XPBootScreen: React.FC = () => {
    const [loadingDots, setLoadingDots] = useState('');
    const [bootMessage, setBootMessage] = useState('Starting Windows XP...');

    useEffect(() => {
        const messages = [
            'Starting Windows XP...',
            'Loading AI Assistant...',
            'Initializing Desktop Environment...',
            'Preparing Your Experience...'
        ];

        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            setBootMessage(messages[messageIndex]);
            messageIndex = (messageIndex + 1) % messages.length;
        }, 750);

        const dotsInterval = setInterval(() => {
            setLoadingDots(prev => {
                if (prev.length >= 3) return '';
                return prev + '.';
            });
        }, 300);

        return () => {
            clearInterval(messageInterval);
            clearInterval(dotsInterval);
        };
    }, []);

    return (
        <div className="xp-boot-screen">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#0080ff',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    marginBottom: '20px'
                }}>
                    Microsoft Windows XP
                </div>
                <div style={{
                    fontSize: '18px',
                    color: '#cccccc',
                    marginBottom: '10px'
                }}>
                    AI-Powered Edition
                </div>
                <div style={{
                    fontSize: '14px',
                    color: '#888888'
                }}>
                    Experience the nostalgia with modern AI features
                </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{
                    width: '300px',
                    height: '20px',
                    background: '#333333',
                    border: '2px inset #666666',
                    borderRadius: '10px',
                    margin: '0 auto',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        background: 'linear-gradient(to right, #0080ff, #00ccff)',
                        animation: 'loading-bar 2s ease-in-out infinite',
                        borderRadius: '8px'
                    }} />
                </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '16px', color: '#ffffff' }}>
                {bootMessage}{loadingDots}
            </div>

            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '12px',
                color: '#888888'
            }}>
                © 2024 Windows XP AI OS - Built with React & AI
            </div>

            <style jsx>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
        </div>
    );
};