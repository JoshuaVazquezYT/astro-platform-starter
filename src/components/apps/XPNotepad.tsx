import React, { useState } from 'react';

export const XPNotepad: React.FC = () => {
    const [text, setText] = useState('');
    const [fileName, setFileName] = useState('Untitled');

    const handleSave = () => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleOpen = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setText(e.target?.result as string);
                    setFileName(file.name.replace('.txt', ''));
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
                background: '#f0f0f0',
                border: '1px solid #ccc',
                padding: '4px',
                display: 'flex',
                gap: '4px'
            }}>
                <button className="xp-button" onClick={() => setText('')}>New</button>
                <button className="xp-button" onClick={handleOpen}>Open</button>
                <button className="xp-button" onClick={handleSave}>Save</button>
                <div style={{ borderLeft: '1px solid #ccc', margin: '0 4px' }} />
                <button className="xp-button" onClick={() => document.execCommand('cut')}>Cut</button>
                <button className="xp-button" onClick={() => document.execCommand('copy')}>Copy</button>
                <button className="xp-button" onClick={() => document.execCommand('paste')}>Paste</button>
            </div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                    flex: 1,
                    border: '2px inset #d4d0c8',
                    padding: '8px',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '12px',
                    resize: 'none',
                    outline: 'none',
                    backgroundColor: 'white'
                }}
                placeholder="Type your text here..."
            />
            <div style={{
                background: '#f0f0f0',
                border: '1px solid #ccc',
                padding: '2px 8px',
                fontSize: '10px',
                color: '#666'
            }}>
                Characters: {text.length}
            </div>
        </div>
    );
};