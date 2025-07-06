import React, { useState } from 'react';
import XPVideoGenerator from './apps/XPVideoGenerator';

const VideoGeneratorDemo: React.FC = () => {
    const [showGenerator, setShowGenerator] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        AI Video Generator Demo
                    </h1>

                    <div className="text-center mb-8">
                        <p className="text-lg text-gray-600 mb-6">
                            Experience the power of AI video generation with 100 English voices and 100 video styles!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                <h3 className="text-xl font-semibold text-green-800 mb-3">✅ SFW Features</h3>
                                <ul className="text-left text-green-700 space-y-2">
                                    <li>• 50 Professional English voices</li>
                                    <li>• 50 Creative video styles</li>
                                    <li>• Educational & business content</li>
                                    <li>• Family-friendly generation</li>
                                    <li>• High-quality output</li>
                                </ul>
                            </div>

                            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                                <h3 className="text-xl font-semibold text-red-800 mb-3">🔞 NSFW Features</h3>
                                <ul className="text-left text-red-700 space-y-2">
                                    <li>• 50 Seductive English voices</li>
                                    <li>• 50 Adult video styles</li>
                                    <li>• Age verification required</li>
                                    <li>• Mature content generation</li>
                                    <li>• Privacy-focused</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
                            <h3 className="text-xl font-semibold text-blue-800 mb-3">🎯 Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                                <div>
                                    <h4 className="font-medium text-blue-700 mb-2">Voice Options</h4>
                                    <p className="text-sm text-blue-600">Male, Female, Neutral voices with various accents and ages</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-blue-700 mb-2">Style Variety</h4>
                                    <p className="text-sm text-blue-600">Anime, 3D, Realistic, Artistic, and many more styles</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-blue-700 mb-2">Advanced Filtering</h4>
                                    <p className="text-sm text-blue-600">Search and filter by gender, genre, and keywords</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowGenerator(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
                        >
                            🎬 Launch Video Generator
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-500 mt-8">
                        <p>⚠️ This is a demonstration interface. In production, this would connect to real AI video generation services.</p>
                    </div>
                </div>
            </div>

            {showGenerator && (
                <div className="fixed inset-0 z-50">
                    <XPVideoGenerator onClose={() => setShowGenerator(false)} />
                </div>
            )}
        </div>
    );
};

export default VideoGeneratorDemo;