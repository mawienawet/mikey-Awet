import React from 'react';
import { TOTAL_TILES } from '../constants';
import { type PredictionResult } from '../types';

interface StatsPanelProps {
    minesCount: number;
    prediction: PredictionResult | null;
}

interface StatItemProps {
    value: string | number;
    label: string;
    valueClassName?: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, valueClassName = '' }) => (
    <div className="text-center bg-[rgba(255,255,255,0.08)] p-3 rounded-lg border border-transparent">
        <div className={`text-2xl sm:text-3xl font-bold mb-1 ${valueClassName}`}>{value}</div>
        <div className="text-xs text-blue-200 opacity-80">{label}</div>
    </div>
);

const StatsPanel: React.FC<StatsPanelProps> = ({ minesCount, prediction }) => {
    const safeCount = TOTAL_TILES - minesCount;
    const confidence = prediction ? prediction.confidence.toFixed(1) : '...';
    const multiplier = prediction ? `${prediction.estimatedMultiplier.toFixed(2)}x` : '...';

    const getConfidenceColor = () => {
        if (!prediction) return 'text-cyan-400';
        const conf = prediction.confidence;
        if (conf >= 98) return 'text-green-400';
        if (conf >= 95) return 'text-yellow-400';
        return 'text-orange-400';
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatItem value={safeCount} label="Predicted Safe" valueClassName="text-cyan-400" />
            <StatItem value={minesCount} label="Mines on Board" valueClassName="text-cyan-400" />
            <StatItem value={`${confidence}%`} label="AI Confidence" valueClassName={getConfidenceColor()} />
            <StatItem value={multiplier} label="Est. Multiplier" valueClassName="text-cyan-400" />
        </div>
    );
};

export default StatsPanel;