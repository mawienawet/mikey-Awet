import React from 'react';
import { StarIcon, BombIcon, CheckIcon } from './icons';
import { type TileStatus } from '../types';

interface TileProps {
    index: number;
    status: TileStatus;
    isLoading: boolean;
    onClick: () => void;
}

const Tile: React.FC<TileProps> = React.memo(({ index, status, isLoading, onClick }) => {
    const isInteractive = !isLoading && status === 'safe';

    const getTileClasses = () => {
        let base = 'aspect-square flex items-center justify-center rounded-lg sm:rounded-xl text-2xl font-bold transition-all duration-500 transform-gpu';
        
        if (isLoading || status === 'hidden') {
            const animationDelay = { animationDelay: `${index * 30}ms` };
            return {
                className: `${base} bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.1)] text-blue-200 animate-pulse`,
                style: animationDelay
            };
        }
        
        if (status === 'revealed') {
            return {
                 className: `${base} bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.6)] border-2 border-cyan-300`,
                style: { transitionDelay: `${index * 25}ms`, transform: 'scale(1)' }
            }
        }

        if (status === 'safe') {
            return {
                className: `${base} bg-gradient-to-br from-green-400 to-teal-500 text-white shadow-[0_0_20px_rgba(22,163,74,0.6)] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] cursor-pointer hover:ring-2 hover:ring-white`,
                style: { transitionDelay: `${index * 25}ms`, transform: 'scale(1)' }
            };
        }
        
        if (status === 'unsafe') {
            return {
                className: `${base} bg-gradient-to-br from-red-500/80 to-rose-600/80 text-white/80 opacity-70`,
                style: { transitionDelay: `${index * 25}ms`, transform: 'scale(0.95)' }
            };
        }
        
        return { className: base, style: {} };
    };

    const { className, style } = getTileClasses();

    const renderIcon = () => {
        if (isLoading || status === 'hidden') return '?';
        if (status === 'revealed') return <CheckIcon className="w-8 h-8 drop-shadow-lg" />;
        if (status === 'safe') return <StarIcon className="w-7 h-7 drop-shadow-lg" />;
        if (status === 'unsafe') return <BombIcon className="w-6 h-6" />;
        return null;
    }

    return (
        <div 
            className={className} 
            style={style}
            onClick={isInteractive ? onClick : undefined}
            role={isInteractive ? "button" : undefined}
            tabIndex={isInteractive ? 0 : -1}
            aria-label={isInteractive ? `Mark tile ${index + 1} as safe` : `Tile ${index + 1}`}
        >
           {renderIcon()}
        </div>
    );
});

export default Tile;
