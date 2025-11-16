import React from 'react';
import { SpinnerIcon } from './icons';

interface LoadingOverlayProps {
    isLoading: boolean;
    message: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, message }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div className="absolute inset-0 bg-[#0f1b2e]/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-3xl transition-opacity duration-300 animate-fadeIn">
            <div className="flex items-center gap-4">
                <SpinnerIcon className="w-8 h-8 text-cyan-400 animate-spin" />
                <span className="text-lg font-semibold text-white">{message}</span>
            </div>
        </div>
    );
};

export default LoadingOverlay;
