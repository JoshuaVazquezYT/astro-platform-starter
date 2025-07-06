import React, { useState, useEffect, useRef } from 'react';
import {
    voices,
    styles,
    getVoicesByCategory,
    getStylesByCategory,
    getVoiceById,
    getStyleById,
    Voice,
    Style
} from './video-generator-data';

interface VideoGeneratorProps {
    onClose: () => void;
}

interface GenerationStatus {
    stage: string;
    progress: number;
    message: string;
}

export const XPVideoGenerator: React.FC<VideoGeneratorProps> = ({ onClose }) => {
    const [mode, setMode] = useState<'sfw' | 'nsfw'>('sfw');
    const [showAgeVerification, setShowAgeVerification] = useState(false);
    const [ageVerified, setAgeVerified] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [selectedVoice, setSelectedVoice] = useState<string>('');
    const [selectedStyle, setSelectedStyle] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStatus, setGenerationStatus] = useState<GenerationStatus>({ stage: '', progress: 0, message: '' });
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [statusLogs, setStatusLogs] = useState<string[]>([]);
    const [voiceFilter, setVoiceFilter] = useState('');
    const [styleFilter, setStyleFilter] = useState('');
    const [voiceGenderFilter, setVoiceGenderFilter] = useState<'all' | 'male' | 'female' | 'neutral'>('all');
    const [styleGenreFilter, setStyleGenreFilter] = useState('all');

    const videoRef = useRef<HTMLVideoElement>(null);

    // Filter voices based on current mode and filters
    const filteredVoices = getVoicesByCategory(mode)
        .filter(voice => {
            const matchesName = voice.name.toLowerCase().includes(voiceFilter.toLowerCase());
            const matchesGender = voiceGenderFilter === 'all' || voice.gender === voiceGenderFilter;
            return matchesName && matchesGender;
        });

    // Filter styles based on current mode and filters
    const filteredStyles = getStylesByCategory(mode)
        .filter(style => {
            const matchesName = style.name.toLowerCase().includes(styleFilter.toLowerCase());
            const matchesGenre = styleGenreFilter === 'all' || style.genre === styleGenreFilter;
            return matchesName && matchesGenre;
        });

    // Get unique genres for the filter dropdown
    const availableGenres = [...new Set(getStylesByCategory(mode).map(style => style.genre))];

    useEffect(() => {
        // Reset selections when mode changes
        setSelectedVoice('');
        setSelectedStyle('');
        setVoiceFilter('');
        setStyleFilter('');
        setVoiceGenderFilter('all');
        setStyleGenreFilter('all');
    }, [mode]);

    const handleModeChange = (newMode: 'sfw' | 'nsfw') => {
        if (newMode === 'nsfw' && !ageVerified) {
            setShowAgeVerification(true);
            return;
        }
        setMode(newMode);
    };

    const handleAgeVerification = (verified: boolean) => {
        if (verified) {
            setAgeVerified(true);
            setMode('nsfw');
        }
        setShowAgeVerification(false);
    };

    const addStatusLog = (message: string) => {
        setStatusLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    };

    const simulateGeneration = async () => {
        setIsGenerating(true);
        setGeneratedVideoUrl(null);
        setStatusLogs([]);

        const stages = [
            { stage: 'Initializing', progress: 0, message: 'Preparing generation pipeline...' },
            { stage: 'Text Processing', progress: 10, message: 'Processing script and prompt...' },
            { stage: 'Voice Synthesis', progress: 25, message: 'Generating speech with selected voice...' },
            { stage: 'Style Analysis', progress: 40, message: 'Analyzing visual style parameters...' },
            { stage: 'Scene Generation', progress: 55, message: 'Creating video scenes...' },
            { stage: 'Animation', progress: 70, message: 'Animating visual elements...' },
            { stage: 'Audio Sync', progress: 85, message: 'Synchronizing audio with video...' },
            { stage: 'Rendering', progress: 95, message: 'Final rendering and optimization...' },
            { stage: 'Complete', progress: 100, message: 'Video generation completed!' }
        ];

        for (const status of stages) {
            setGenerationStatus(status);
            addStatusLog(status.message);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        // Simulate generated video
        setGeneratedVideoUrl('https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4');
        setIsGenerating(false);
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            alert('Please enter a prompt or script');
            return;
        }
        if (!selectedVoice) {
            alert('Please select a voice');
            return;
        }
        if (!selectedStyle) {
            alert('Please select a style');
            return;
        }

        const selectedVoiceData = getVoiceById(selectedVoice);
        const selectedStyleData = getStyleById(selectedStyle);

        addStatusLog(`Starting generation with voice: ${selectedVoiceData?.name}, style: ${selectedStyleData?.name}`);

        await simulateGeneration();
    };

    const handleDownload = () => {
        if (generatedVideoUrl) {
            const link = document.createElement('a');
            link.href = generatedVideoUrl;
            link.download = `generated-video-${Date.now()}.mp4`;
            link.click();
        }
    };

    const handleCancel = () => {
        setIsGenerating(false);
        setGenerationStatus({ stage: '', progress: 0, message: '' });
        addStatusLog('Generation cancelled by user');
    };

    if (showAgeVerification) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-black text-white p-8">
                <div className="max-w-md mx-auto bg-black bg-opacity-50 rounded-lg p-6 border border-red-500">
                    <h2 className="text-2xl font-bold mb-4 text-center">Age Verification Required</h2>
                    <div className="mb-6">
                        <p className="text-center mb-4">You must be 18 or older to access NSFW content.</p>
                        <div className="bg-red-900 bg-opacity-50 p-4 rounded border border-red-500">
                            <p className="text-sm">⚠️ WARNING: This section contains adult content intended for mature audiences only.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => handleAgeVerification(true)}
                            className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium transition-colors"
                        >
                            I am 18+
                        </button>
                        <button
                            onClick={() => handleAgeVerification(false)}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded font-medium transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 border border-blue-500">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            AI Video Generator
                        </h1>
                        <button
                            onClick={onClose}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium transition-colors"
                        >
                            Close
                        </button>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => handleModeChange('sfw')}
                            className={`px-6 py-2 rounded font-medium transition-colors ${mode === 'sfw'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                                }`}
                        >
                            SFW Mode
                        </button>
                        <button
                            onClick={() => handleModeChange('nsfw')}
                            className={`px-6 py-2 rounded font-medium transition-colors ${mode === 'nsfw'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                                }`}
                        >
                            NSFW Mode {mode === 'nsfw' && '🔞'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Panel - Input Controls */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Prompt Input */}
                        <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-blue-500">
                            <h2 className="text-xl font-bold mb-4">Script / Prompt</h2>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Enter your video script or prompt here..."
                                className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                            />
                            <div className="flex justify-between text-sm text-gray-400 mt-2">
                                <span>{prompt.length} characters</span>
                                <span>Max: 2000 characters</span>
                            </div>
                        </div>

                        {/* Voice Selection */}
                        <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-blue-500">
                            <h2 className="text-xl font-bold mb-4">Voice Selection ({filteredVoices.length} voices)</h2>

                            {/* Voice Filters */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Search voices..."
                                    value={voiceFilter}
                                    onChange={(e) => setVoiceFilter(e.target.value)}
                                    className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                />
                                <select
                                    value={voiceGenderFilter}
                                    onChange={(e) => setVoiceGenderFilter(e.target.value as 'all' | 'male' | 'female' | 'neutral')}
                                    className="p-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="all">All Genders</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="neutral">Neutral</option>
                                </select>
                            </div>

                            <div className="max-h-64 overflow-y-auto space-y-2">
                                {filteredVoices.map((voice) => (
                                    <div
                                        key={voice.id}
                                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedVoice === voice.id
                                                ? 'border-blue-500 bg-blue-900 bg-opacity-50'
                                                : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800'
                                            }`}
                                        onClick={() => setSelectedVoice(voice.id)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{voice.name}</h3>
                                                <p className="text-sm text-gray-400">{voice.description}</p>
                                            </div>
                                            <div className="text-right text-sm text-gray-400">
                                                <div>{voice.gender} • {voice.age}</div>
                                                <div>{voice.accent}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Style Selection */}
                        <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-blue-500">
                            <h2 className="text-xl font-bold mb-4">Style Selection ({filteredStyles.length} styles)</h2>

                            {/* Style Filters */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Search styles..."
                                    value={styleFilter}
                                    onChange={(e) => setStyleFilter(e.target.value)}
                                    className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                />
                                <select
                                    value={styleGenreFilter}
                                    onChange={(e) => setStyleGenreFilter(e.target.value)}
                                    className="p-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="all">All Genres</option>
                                    {availableGenres.map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="max-h-64 overflow-y-auto space-y-2">
                                {filteredStyles.map((style) => (
                                    <div
                                        key={style.id}
                                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedStyle === style.id
                                                ? 'border-blue-500 bg-blue-900 bg-opacity-50'
                                                : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800'
                                            }`}
                                        onClick={() => setSelectedStyle(style.id)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{style.name}</h3>
                                                <p className="text-sm text-gray-400">{style.description}</p>
                                            </div>
                                            <div className="text-right text-sm text-gray-400">
                                                <div>{style.genre}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-blue-500">
                            <div className="flex gap-4">
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating || !prompt.trim() || !selectedVoice || !selectedStyle}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    {isGenerating ? 'Generating...' : 'Generate Video'}
                                </button>
                                {isGenerating && (
                                    <button
                                        onClick={handleCancel}
                                        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Status and Preview */}
                    <div className="space-y-6">
                        {/* Generation Status */}
                        <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-blue-500">
                            <h2 className="text-xl font-bold mb-4">Generation Status</h2>

                            {isGenerating && (
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>{generationStatus.stage}</span>
                                        <span>{generationStatus.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${generationStatus.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2">{generationStatus.message}</p>
                                </div>
                            )}

                            {/* Status Logs */}
                            <div className="bg-gray-900 rounded p-4 max-h-64 overflow-y-auto">
                                <h3 className="font-medium mb-2">Logs:</h3>
                                {statusLogs.length === 0 ? (
                                    <p className="text-gray-400 text-sm">No logs yet...</p>
                                ) : (
                                    <div className="space-y-1">
                                        {statusLogs.map((log, index) => (
                                            <div key={index} className="text-sm text-gray-300 font-mono">
                                                {log}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Video Preview */}
                        {generatedVideoUrl && (
                            <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-blue-500">
                                <h2 className="text-xl font-bold mb-4">Video Preview</h2>
                                <video
                                    ref={videoRef}
                                    src={generatedVideoUrl}
                                    controls
                                    className="w-full rounded-lg"
                                    style={{ maxHeight: '300px' }}
                                />
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={handleDownload}
                                        className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-medium transition-colors"
                                    >
                                        Download Video
                                    </button>
                                    <button
                                        onClick={() => setGeneratedVideoUrl(null)}
                                        className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded font-medium transition-colors"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Current Selection Summary */}
                        <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-blue-500">
                            <h2 className="text-xl font-bold mb-4">Current Selection</h2>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="font-medium text-blue-400">Mode:</h3>
                                    <p className="text-sm">{mode.toUpperCase()}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-blue-400">Voice:</h3>
                                    <p className="text-sm">
                                        {selectedVoice ? getVoiceById(selectedVoice)?.name : 'None selected'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-blue-400">Style:</h3>
                                    <p className="text-sm">
                                        {selectedStyle ? getStyleById(selectedStyle)?.name : 'None selected'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-blue-400">Script Length:</h3>
                                    <p className="text-sm">{prompt.length} characters</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default XPVideoGenerator;