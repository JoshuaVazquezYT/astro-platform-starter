import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

interface XPAIAssistantProps {
    onClose: () => void;
}

export const XPAIAssistant: React.FC<XPAIAssistantProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            text: 'Hello! I\'m your Windows XP AI Assistant. How can I help you today?',
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const aiResponse = await simulateAIResponse(inputText);
            const aiMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: aiResponse,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);

            // Text-to-speech
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(aiResponse);
                utterance.rate = 0.8;
                utterance.pitch = 1;
                utterance.volume = 0.8;
                utterance.onstart = () => setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                speechSynthesis.speak(utterance);
            }
        } catch (error) {
            console.error('AI response error:', error);
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const simulateAIResponse = async (input: string): Promise<string> => {
        // Simulate AI response - in real app, this would call OpenAI API
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        const responses = [
            `I understand you're asking about "${input}". That's a great question!`,
            `Regarding "${input}", I can help you with that. Here's what I know...`,
            `That's interesting about "${input}". Let me think about that for you.`,
            `I see you mentioned "${input}". Here's my thoughts on that topic.`,
            `Thanks for asking about "${input}". I'm here to help with Windows XP and more!`,
            `I'd be happy to help you with "${input}". What specific aspect would you like to know about?`
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    };

    const startVoiceRecognition = () => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new (window as any).webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInputText(transcript);
                setIsListening(false);
            };

            recognition.onerror = () => {
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
        }
    };

    const stopSpeaking = () => {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    return (
        <Draggable handle=".xp-ai-titlebar">
            <div className="xp-ai-assistant">
                <div
                    className="xp-ai-titlebar"
                    style={{
                        height: '25px',
                        background: 'linear-gradient(to bottom, #0997ff 0%, #0053ee 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 8px',
                        cursor: 'move',
                        borderRadius: '8px 8px 0 0',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🤖</span>
                        <span>AI Assistant</span>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'linear-gradient(to bottom, #ff4444 0%, #cc0000 100%)',
                            border: '1px outset #ff4444',
                            color: 'white',
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer',
                            fontSize: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ×
                    </button>
                </div>

                <div className="xp-ai-character">
                    <div style={{
                        animation: isSpeaking ? 'pulse 0.5s ease-in-out infinite' : 'float 3s ease-in-out infinite',
                        fontSize: '40px'
                    }}>
                        {isSpeaking ? '🗣️' : '🤖'}
                    </div>
                </div>

                <div className="xp-ai-chat">
                    {messages.map(message => (
                        <div
                            key={message.id}
                            style={{
                                marginBottom: '8px',
                                padding: '4px 8px',
                                background: message.sender === 'user' ? '#e3f2fd' : '#f5f5f5',
                                borderRadius: '4px',
                                fontSize: '11px',
                                border: '1px solid #ccc'
                            }}
                        >
                            <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                                {message.sender === 'user' ? 'You' : 'AI Assistant'}:
                            </div>
                            <div>{message.text}</div>
                            <div style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>
                                {message.timestamp.toLocaleTimeString()}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div style={{ textAlign: 'center', padding: '10px' }}>
                            <div className="xp-loading" />
                            <div style={{ fontSize: '10px', marginTop: '5px' }}>AI is thinking...</div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div style={{ padding: '10px', display: 'flex', gap: '4px' }}>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask me anything..."
                        className="xp-ai-input"
                        style={{ flex: 1 }}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputText.trim()}
                        className="xp-button"
                        style={{ minWidth: '40px' }}
                    >
                        Send
                    </button>
                </div>

                <div style={{ padding: '0 10px 10px', display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    <button
                        onClick={startVoiceRecognition}
                        disabled={isListening}
                        className="xp-button"
                        style={{ fontSize: '10px' }}
                    >
                        {isListening ? '🎤 Listening...' : '🎤 Voice'}
                    </button>
                    <button
                        onClick={stopSpeaking}
                        disabled={!isSpeaking}
                        className="xp-button"
                        style={{ fontSize: '10px' }}
                    >
                        {isSpeaking ? '🔇 Stop' : '🔊 Speak'}
                    </button>
                </div>

                <style jsx>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}</style>
            </div>
        </Draggable>
    );
};