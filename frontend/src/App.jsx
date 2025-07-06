import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:8000';

function App() {
    const [text, setText] = useState('');
    const [voices, setVoices] = useState([]);
    const [styles, setStyles] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [mode, setMode] = useState('sfw');
    const [audioURL, setAudioURL] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [videoStatus, setVideoStatus] = useState(null);
    const [jobId, setJobId] = useState(null);
    const [ageVerified, setAgeVerified] = useState(false);
    const [showAgeVerification, setShowAgeVerification] = useState(false);

    // Load voices and styles
    useEffect(() => {
        loadVoicesAndStyles();
    }, [mode]);

    const loadVoicesAndStyles = async () => {
        try {
            const [voicesRes, stylesRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/voices?category=${mode}`),
                axios.get(`${API_BASE_URL}/styles?category=${mode}`)
            ]);

            setVoices(voicesRes.data.voices);
            setStyles(stylesRes.data.styles);

            // Reset selections when switching modes
            setSelectedVoice('');
            setSelectedStyle('');
        } catch (error) {
            console.error('Error loading voices/styles:', error);
        }
    };

    const handleModeSwitch = (newMode) => {
        if (newMode === 'nsfw' && !ageVerified) {
            setShowAgeVerification(true);
            return;
        }
        setMode(newMode);
    };

    const handleAgeVerification = (verified) => {
        setAgeVerified(verified);
        setShowAgeVerification(false);
        if (verified) {
            setMode('nsfw');
        }
    };

    const generateTTS = async () => {
        if (!text.trim() || !selectedVoice) {
            alert('Please enter text and select a voice');
            return;
        }

        setIsGenerating(true);
        setAudioURL(null);

        try {
            const formData = new FormData();
            formData.append('text', text);
            formData.append('voice_id', selectedVoice);

            const response = await axios.post(`${API_BASE_URL}/generate-tts`, formData);

            if (response.data.success) {
                if (response.data.audio_base64) {
                    // Convert base64 to blob URL
                    const byteCharacters = atob(response.data.audio_base64);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'audio/mpeg' });
                    const url = URL.createObjectURL(blob);
                    setAudioURL(url);
                } else {
                    // Mock mode - show success message
                    alert('TTS generated successfully (mocked)');
                }
            }
        } catch (error) {
            console.error('TTS generation error:', error);
            alert('Error generating TTS: ' + (error.response?.data?.detail || error.message));
        } finally {
            setIsGenerating(false);
        }
    };

    const generateVideo = async () => {
        if (!text.trim() || !selectedVoice || !selectedStyle) {
            alert('Please enter text, select a voice, and select a style');
            return;
        }

        setIsGenerating(true);
        setVideoStatus(null);
        setJobId(null);

        try {
            const formData = new FormData();
            formData.append('text', text);
            formData.append('voice_id', selectedVoice);
            formData.append('style_id', selectedStyle);
            formData.append('mode', mode);

            const response = await axios.post(`${API_BASE_URL}/generate-video`, formData);

            if (response.data.success) {
                setJobId(response.data.job_id);
                setVideoStatus(response.data);
                startStatusPolling(response.data.job_id);
            }
        } catch (error) {
            console.error('Video generation error:', error);
            alert('Error generating video: ' + (error.response?.data?.detail || error.message));
            setIsGenerating(false);
        }
    };

    const startStatusPolling = (jobId) => {
        const pollInterval = setInterval(async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/status/${jobId}`);
                setVideoStatus(response.data);

                if (response.data.status === 'completed' || response.data.status === 'failed') {
                    clearInterval(pollInterval);
                    setIsGenerating(false);
                }
            } catch (error) {
                console.error('Status polling error:', error);
                clearInterval(pollInterval);
                setIsGenerating(false);
            }
        }, 2000);
    };

    return (
        <div className="app">
            <div className="container">
                <h1 className="title">🎬 TTS AI Video Generator</h1>

                {/* Mode Toggle */}
                <div className="mode-toggle">
                    <label className="mode-label">Content Mode:</label>
                    <div className="toggle-buttons">
                        <button
                            className={`toggle-btn ${mode === 'sfw' ? 'active sfw' : ''}`}
                            onClick={() => handleModeSwitch('sfw')}
                        >
                            SFW
                        </button>
                        <button
                            className={`toggle-btn ${mode === 'nsfw' ? 'active nsfw' : ''}`}
                            onClick={() => handleModeSwitch('nsfw')}
                        >
                            NSFW (18+)
                        </button>
                    </div>
                </div>

                {/* Text Input */}
                <div className="input-section">
                    <label className="input-label">Enter your text:</label>
                    <textarea
                        className="text-input"
                        placeholder="Type your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={4}
                    />
                    <div className="char-counter">{text.length} characters</div>
                </div>

                {/* Voice Selection */}
                <div className="select-section">
                    <label className="select-label">Select Voice ({mode.toUpperCase()}):</label>
                    <select
                        className="select-input"
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value)}
                    >
                        <option value="">Choose a voice...</option>
                        {voices.map((voice) => (
                            <option key={voice.id} value={voice.id}>
                                {voice.name} ({voice.gender}, {voice.age}, {voice.accent})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Style Selection */}
                <div className="select-section">
                    <label className="select-label">Select Video Style ({mode.toUpperCase()}):</label>
                    <select
                        className="select-input"
                        value={selectedStyle}
                        onChange={(e) => setSelectedStyle(e.target.value)}
                    >
                        <option value="">Choose a style...</option>
                        {styles.map((style) => (
                            <option key={style.id} value={style.id}>
                                {style.name} ({style.genre})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="button-section">
                    <button
                        className="action-btn tts-btn"
                        onClick={generateTTS}
                        disabled={isGenerating || !text.trim() || !selectedVoice}
                    >
                        {isGenerating ? '🔄 Generating...' : '🎤 Generate TTS'}
                    </button>

                    <button
                        className="action-btn video-btn"
                        onClick={generateVideo}
                        disabled={isGenerating || !text.trim() || !selectedVoice || !selectedStyle}
                    >
                        {isGenerating ? '🔄 Generating...' : '🎬 Generate Video'}
                    </button>
                </div>

                {/* Audio Preview */}
                {audioURL && (
                    <div className="preview-section">
                        <h3>🎵 Audio Preview:</h3>
                        <audio controls src={audioURL} className="audio-player"></audio>
                    </div>
                )}

                {/* Video Generation Status */}
                {videoStatus && (
                    <div className="status-section">
                        <h3>📹 Video Generation Status:</h3>
                        <div className="status-info">
                            <p><strong>Job ID:</strong> {videoStatus.job_id || jobId}</p>
                            <p><strong>Status:</strong> {videoStatus.status}</p>
                            <p><strong>Progress:</strong> {videoStatus.progress || 0}%</p>
                            <p><strong>Message:</strong> {videoStatus.message}</p>
                            {videoStatus.estimated_time_remaining && (
                                <p><strong>Est. Time Remaining:</strong> {videoStatus.estimated_time_remaining}s</p>
                            )}
                        </div>
                        {videoStatus.progress && (
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${videoStatus.progress}%` }}
                                ></div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="footer">
                    <p>🚀 Powered by ElevenLabs TTS & AI Video Generation</p>
                    <p>⚡ {voices.length} voices & {styles.length} styles available in {mode.toUpperCase()} mode</p>
                </div>
            </div>

            {/* Age Verification Modal */}
            {showAgeVerification && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>⚠️ Age Verification Required</h2>
                        <p>NSFW content is intended for adults only.</p>
                        <p>You must be 18 years or older to access this content.</p>
                        <div className="modal-buttons">
                            <button
                                className="modal-btn confirm"
                                onClick={() => handleAgeVerification(true)}
                            >
                                I am 18+ years old
                            </button>
                            <button
                                className="modal-btn cancel"
                                onClick={() => handleAgeVerification(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;