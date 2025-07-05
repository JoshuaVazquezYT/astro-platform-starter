import React, { useRef, useState, useEffect } from 'react';

export const XPPaint: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentColor, setCurrentColor] = useState('#000000');
    const [currentTool, setCurrentTool] = useState('brush');
    const [brushSize, setBrushSize] = useState(2);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.strokeStyle = currentColor;
                ctx.lineWidth = brushSize;
            }
        }
    }, [currentColor, brushSize]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const rect = canvas?.getBoundingClientRect();
        if (canvas && rect) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                setIsDrawing(true);
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                ctx.beginPath();
                ctx.moveTo(x, y);
            }
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const rect = canvas?.getBoundingClientRect();
        if (canvas && rect) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    const colors = [
        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
        '#FF00FF', '#00FFFF', '#800000', '#008000', '#000080', '#808000',
        '#800080', '#008080', '#C0C0C0', '#808080'
    ];

    const tools = [
        { name: 'brush', icon: '🖌️', label: 'Brush' },
        { name: 'pencil', icon: '✏️', label: 'Pencil' },
        { name: 'eraser', icon: '🧽', label: 'Eraser' }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Toolbar */}
            <div style={{
                background: '#f0f0f0',
                border: '1px solid #ccc',
                padding: '8px',
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {tools.map(tool => (
                        <button
                            key={tool.name}
                            className={`xp-button ${currentTool === tool.name ? 'active' : ''}`}
                            onClick={() => setCurrentTool(tool.name)}
                            style={{
                                background: currentTool === tool.name ? '#316ac5' : undefined,
                                color: currentTool === tool.name ? 'white' : undefined
                            }}
                            title={tool.label}
                        >
                            {tool.icon}
                        </button>
                    ))}
                </div>

                <div style={{ borderLeft: '1px solid #ccc', height: '20px' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '11px' }}>Size:</span>
                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={brushSize}
                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
                        style={{ width: '80px' }}
                    />
                    <span style={{ fontSize: '11px' }}>{brushSize}px</span>
                </div>

                <div style={{ borderLeft: '1px solid #ccc', height: '20px' }} />

                <button className="xp-button" onClick={clearCanvas}>Clear</button>
            </div>

            {/* Color Palette */}
            <div style={{
                background: '#f0f0f0',
                border: '1px solid #ccc',
                padding: '4px',
                display: 'flex',
                gap: '2px',
                flexWrap: 'wrap'
            }}>
                {colors.map(color => (
                    <button
                        key={color}
                        onClick={() => setCurrentColor(color)}
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: color,
                            border: currentColor === color ? '2px solid #000' : '1px solid #ccc',
                            cursor: 'pointer'
                        }}
                    />
                ))}
                <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                    style={{ width: '20px', height: '20px', border: 'none' }}
                />
            </div>

            {/* Canvas */}
            <div style={{ flex: 1, background: 'white', overflow: 'hidden' }}>
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    style={{
                        cursor: currentTool === 'eraser' ? 'crosshair' : 'crosshair',
                        border: '1px solid #ccc'
                    }}
                />
            </div>

            {/* Status Bar */}
            <div style={{
                background: '#f0f0f0',
                border: '1px solid #ccc',
                padding: '2px 8px',
                fontSize: '10px',
                color: '#666'
            }}>
                Tool: {currentTool} | Color: {currentColor} | Size: {brushSize}px
            </div>
        </div>
    );
};