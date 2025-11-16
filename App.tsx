import React, { useState, useEffect, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import PredictionScreen from './components/PredictionScreen';
import { type Platform } from './types';
import { PLATFORMS } from './constants';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>('mines-ai-auth', false);
    const [platformId, setPlatformId] = useLocalStorage<string | null>('mines-ai-platform-id', null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const currentPlatform = PLATFORMS.find(p => p.id === platformId) || null;

    useEffect(() => {
        // The useLocalStorage hook handles initialization, so we just need to manage the loading state.
        setIsLoading(false);
    }, []);

    const handleLogin = useCallback((platform: Platform) => {
        setPlatformId(platform.id);
        setIsAuthenticated(true);
    }, [setPlatformId, setIsAuthenticated]);

    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        setPlatformId(null);
    }, [setPlatformId, setIsAuthenticated]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  Initializing Secure Session...
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen text-white flex justify-center items-center p-4 sm:p-5">
            <main className="w-full max-w-lg bg-[rgba(255,255,255,0.08)] backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[rgba(255,255,255,0.1)] relative overflow-hidden">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-radial-gradient from-[rgba(0,210,255,0.1)] to-transparent -z-10"></div>
                {!isAuthenticated || !currentPlatform ? (
                    <LoginScreen onLogin={handleLogin} />
                ) : (
                    <PredictionScreen platform={currentPlatform} onLogout={handleLogout} />
                )}
                 <footer>
                    <p className="text-center mt-6 text-xs text-blue-200 opacity-60">
                        Mines AI Predictor &copy; 2024 | For entertainment purposes only.
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default App;
