import React, { useState, useCallback } from 'react';
import { PLATFORMS } from '../constants';
import { type Platform } from '../types';
import { PlatformLogo, RobotIcon, ExternalLinkIcon, AiStatusIcon, CheckCircleIcon } from './icons';

interface LoginScreenProps {
    onLogin: (platform: Platform) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [selectedPlatformId, setSelectedPlatformId] = useState<string>(PLATFORMS[0].id);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<{ text: string, type: 'success' | 'error' | 'info' } | null>(null);
    
    const selectedPlatform = PLATFORMS.find(p => p.id === selectedPlatformId);

    const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlatformId(e.target.value);
    };

    const handleInitiateLogin = useCallback(() => {
        const platform = PLATFORMS.find(p => p.id === selectedPlatformId);
        if (!platform) {
            setStatusMessage({ text: 'Please select a valid platform.', type: 'error' });
            return;
        }

        setIsLoading(true);
        setStatusMessage({ text: `Opening ${platform.name} for secure login...`, type: 'info' });

        // Simulate redirection and successful callback
        setTimeout(() => {
            window.open(platform.url, '_blank', 'noopener,noreferrer');
            setStatusMessage({ text: `Successfully connected to ${platform.name}! Initializing AI...`, type: 'success' });
            setTimeout(() => {
                onLogin(platform);
            }, 2000); // Wait a bit after success message before switching screen
        }, 2500);

    }, [selectedPlatformId, onLogin]);

    return (
        <div className="flex flex-col animate-fadeIn">
            <header className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <RobotIcon className="w-8 h-8 text-cyan-400" />
                    <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
                        Mines AI Predictor
                    </h1>
                </div>
                <p className="text-sm text-blue-200 opacity-80">Advanced Pattern Recognition & Machine Learning</p>
            </header>

            <div className="space-y-6">
                <div>
                    <label htmlFor="platform" className="block mb-2 text-sm font-semibold text-blue-100">
                        1. Select Gaming Platform
                    </label>
                     <div className="relative flex items-center">
                        {selectedPlatform && (
                            <div className="absolute left-4 pointer-events-none">
                                <PlatformLogo platformId={selectedPlatform.logoId} className="w-6 h-6 text-white/70" />
                            </div>
                        )}
                        <select
                            id="platform"
                            value={selectedPlatformId}
                            onChange={handlePlatformChange}
                            disabled={isLoading}
                            className="w-full pl-12 pr-4 py-3 bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all disabled:opacity-60 appearance-none"
                        >
                            {PLATFORMS.map(p => (
                                <option key={p.id} value={p.id} className="bg-[#0f1b2e]">
                                    {p.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 pointer-events-none text-white/70">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </div>
                    </div>
                </div>

                {statusMessage && (
                    <div className={`p-3 flex items-center justify-center gap-2 rounded-lg text-sm font-medium
                        ${statusMessage.type === 'success' && 'bg-green-500/20 text-green-300 border border-green-500/30'}
                        ${statusMessage.type === 'error' && 'bg-red-500/20 text-red-300 border border-red-500/30'}
                        ${statusMessage.type === 'info' && 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}
                    `}>
                        {statusMessage.type === 'success' && <CheckCircleIcon className="w-5 h-5" />}
                        {statusMessage.text}
                    </div>
                )}
                
                <button
                    onClick={handleInitiateLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-4 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f1b2e] focus:ring-purple-500"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Awaiting Connection...
                        </>
                    ) : (
                        <>
                            <ExternalLinkIcon className="w-5 h-5" />
                            2. Go to Official Site & Connect
                        </>
                    )}
                </button>
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-blue-200">
                <AiStatusIcon className="w-5 h-5 text-green-400" />
                <span>AI System Ready & Online</span>
            </div>
        </div>
    );
};

export default LoginScreen;