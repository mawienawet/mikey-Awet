import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { type Platform, type GameRecord } from '../types';
import { TOTAL_TILES } from '../constants';
import { getPrediction } from '../services/geminiService';
import Grid from './Grid';
import StatsPanel from './StatsPanel';
import GameHistoryPanel from './GameHistoryPanel';
import LoadingOverlay from './LoadingOverlay';
import useLocalStorage from '../hooks/useLocalStorage';
import { gameReducer, initialState, LOADING_MESSAGES } from '../reducers/gameReducer';
import { PlatformLogo, SyncIcon, LogoutIcon, InfoIcon, TrophyIcon, SkullIcon, ResetIcon } from './icons';

interface PredictionScreenProps {
    platform: Platform;
    onLogout: () => void;
}

const PredictionScreen: React.FC<PredictionScreenProps> = ({ platform, onLogout }) => {
    const [savedMinesCount, setSavedMinesCount] = useLocalStorage<number>(`mines-count-${platform.id}`, 12);
    const [state, dispatch] = useReducer(gameReducer, { ...initialState, minesCount: savedMinesCount });
    const { minesCount, prediction, isLoading, loadingMessage, revealedTiles, hasNewReveals } = state;

    const [history, setHistory] = useLocalStorage<GameRecord[]>('mines-ai-history', []);
    
    const handleMinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 1));
        setSavedMinesCount(count);
        dispatch({ type: 'CHANGE_MINES', payload: count });
    };

    const fetchPrediction = useCallback(async () => {
        let messageIndex = 0;
        const intervalId = setInterval(() => {
            messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
            dispatch({ type: 'SET_LOADING_MESSAGE', payload: LOADING_MESSAGES[messageIndex] });
        }, 1200);

        try {
            const result = await getPrediction({
                minesCount,
                totalTiles: TOTAL_TILES,
                platformId: platform.id,
                revealedTiles,
            });
            dispatch({ type: 'PREDICTION_SUCCESS', payload: result });
        } catch (error) {
            console.error("Prediction failed", error);
            dispatch({ type: 'PREDICTION_ERROR' });
        } finally {
            clearInterval(intervalId);
        }
    }, [minesCount, platform.id, revealedTiles]);

    useEffect(() => {
        dispatch({ type: 'START_PREDICTION', payload: { isInitial: true } });
        fetchPrediction();
    }, [minesCount, platform.id]);

    const handleUpdatePrediction = () => {
        dispatch({ type: 'START_PREDICTION' });
        fetchPrediction();
    };
    
    const handleTileClick = (index: number) => {
        if (isLoading || !prediction || !prediction.predictedSafe.includes(index) || revealedTiles.some(t => t.index === index)) {
            return;
        }
        dispatch({ type: 'REVEAL_TILE', payload: index });
    };
    
    const handleGameEnd = (outcome: 'win' | 'loss') => {
        const newRecord: GameRecord = {
            id: `game_${Date.now()}`,
            platformId: platform.id,
            minesCount,
            outcome,
            timestamp: Date.now(),
        };
        setHistory(prev => [newRecord, ...prev]);
        dispatch({ type: 'RESET_ROUND' });
        dispatch({ type: 'START_PREDICTION', payload: { isInitial: true } });
        fetchPrediction();
    };

    const handleResetRound = () => {
        dispatch({ type: 'RESET_ROUND' });
        dispatch({ type: 'START_PREDICTION', payload: { isInitial: true } });
        fetchPrediction();
    };
    
    const isPredictionComplete = useMemo(() => {
        if (!prediction) return false;
        const safeTileCount = TOTAL_TILES - minesCount;
        return revealedTiles.length >= safeTileCount;
    }, [revealedTiles.length, minesCount, prediction]);

    return (
        <div className="flex flex-col animate-fadeIn space-y-4 relative">
            <LoadingOverlay isLoading={isLoading} message={loadingMessage} />
            
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-xl ring-2 ring-offset-2 ring-offset-[#0f1b2e] ring-cyan-500">
                        AI
                    </div>
                    <div>
                        <h2 className="font-semibold">Connected User</h2>
                         <div className="flex items-center gap-1.5 text-xs text-green-300">
                           <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                           <span>Live Analysis Active</span>
                        </div>
                    </div>
                </div>
                 <div className="bg-[rgba(255,255,255,0.1)] text-blue-200 text-xs font-semibold px-3 py-1.5 rounded-full border border-transparent hover:border-cyan-400 transition-colors flex items-center gap-2">
                    <PlatformLogo platformId={platform.logoId} className="w-4 h-4" />
                    <span>{platform.name}</span>
                </div>
            </header>

            <div className="bg-[rgba(0,0,0,0.3)] p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <label htmlFor="minesCount" className="font-semibold text-sm whitespace-nowrap">Mines:</label>
                    <input
                        type="number" id="minesCount" value={minesCount} onChange={handleMinesChange}
                        min="1" max="20" disabled={isLoading}
                        className="w-full sm:w-20 text-center py-2 px-3 bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-60"
                    />
                </div>
                <button
                    onClick={handleUpdatePrediction}
                    disabled={isLoading || !hasNewReveals}
                    className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f1b2e] focus:ring-blue-500"
                >
                    <SyncIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? 'Analyzing...' : 'Update Prediction'}
                </button>
                 <button onClick={handleResetRound} disabled={isLoading} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl hover:from-gray-500 hover:to-gray-600 disabled:opacity-50 transition-all">
                    <ResetIcon className="w-5 h-5" />
                    Reset
                </button>
            </div>

            {!isLoading && prediction && (
                 <div className="flex items-center justify-center gap-2 text-center text-xs text-blue-200 px-2 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 min-h-[36px]">
                    <InfoIcon className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {isPredictionComplete ? "Round complete. Record outcome below." : "Click safe tiles to reveal, then Update."}
                    </span>
                </div>
            )}
            
            <Grid 
                prediction={prediction} 
                isLoading={isLoading}
                revealedTiles={revealedTiles.map(t => t.index)}
                onTileClick={handleTileClick}
            />
            
            {prediction && !isLoading && (
                 <div className="bg-[rgba(0,0,0,0.3)] p-4 rounded-2xl text-center animate-fadeIn">
                     <h3 className="font-bold text-cyan-300 mb-1">AI Analysis</h3>
                     <p className="text-sm text-blue-200 opacity-90">{prediction.reasoning}</p>
                 </div>
            )}

            <StatsPanel minesCount={minesCount} prediction={prediction} />

            <div className="bg-[rgba(0,0,0,0.3)] p-4 rounded-2xl animate-fadeIn space-y-3">
                 <h3 className="text-center font-bold text-cyan-300">Record Round Outcome</h3>
                 <div className="grid grid-cols-2 gap-3">
                     <button onClick={() => handleGameEnd('win')} disabled={isLoading || revealedTiles.length === 0} className="flex items-center justify-center gap-2 py-3 font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-xl hover:from-green-500 hover:to-teal-500 disabled:opacity-50 transition-all transform hover:scale-[1.03]">
                         <TrophyIcon className="w-5 h-5" /> Cash Out (Win)
                     </button>
                     <button onClick={() => handleGameEnd('loss')} disabled={isLoading} className="flex items-center justify-center gap-2 py-3 font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-xl hover:from-red-500 hover:to-rose-500 disabled:opacity-50 transition-all transform hover:scale-[1.03]">
                         <SkullIcon className="w-5 h-5" /> Hit Mine (Loss)
                     </button>
                 </div>
            </div>

            <GameHistoryPanel history={history} />
            
            <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f1b2e] focus:ring-purple-500"
            >
                <LogoutIcon className="w-5 h-5" />
                Disconnect Session
            </button>
        </div>
    );
};

export default PredictionScreen;
