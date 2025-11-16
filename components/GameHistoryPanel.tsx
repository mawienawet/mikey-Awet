import React, { useMemo } from 'react';
import { type GameRecord } from '../types';
import { HistoryIcon, TrophyIcon, SkullIcon } from './icons';

interface GameHistoryPanelProps {
    history: GameRecord[];
}

interface StatItemProps {
    value: string | number;
    label: string;
    icon: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, icon }) => (
    <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.08)] p-3 rounded-lg border border-transparent">
        <div className="text-cyan-400">{icon}</div>
        <div>
            <div className="text-xl font-bold text-white">{value}</div>
            <div className="text-xs text-blue-200 opacity-80">{label}</div>
        </div>
    </div>
);

const GameHistoryPanel: React.FC<GameHistoryPanelProps> = ({ history }) => {
    const stats = useMemo(() => {
        const wins = history.filter(r => r.outcome === 'win').length;
        const losses = history.filter(r => r.outcome === 'loss').length;
        const total = wins + losses;
        const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0';
        return { wins, losses, total, winRate };
    }, [history]);

    return (
        <div className="bg-[rgba(0,0,0,0.3)] p-4 rounded-2xl animate-fadeIn space-y-3">
            <h3 className="flex items-center gap-2 font-bold text-cyan-300">
                <HistoryIcon className="w-5 h-5" />
                Session Performance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                <StatItem value={stats.wins} label="Rounds Won" icon={<TrophyIcon className="w-6 h-6" />} />
                <StatItem value={stats.losses} label="Rounds Lost" icon={<SkullIcon className="w-6 h-6" />} />
            </div>
            <div className="text-center bg-black/20 p-3 rounded-lg">
                <div className="text-3xl font-bold text-green-400">{stats.winRate}%</div>
                <div className="text-xs text-blue-200 opacity-80">Win Rate ({stats.total} Rounds)</div>
            </div>
        </div>
    );
};

export default GameHistoryPanel;
