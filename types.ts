export interface Platform {
    id: string;
    name: string;
    url: string;
    logoId: string;
}

export interface PredictionResult {
    predictedSafe: number[];
    confidence: number;
    reasoning: string;
    estimatedMultiplier: number;
}

export interface GameState {
    minesCount: number;
    totalTiles: number;
    platformId: string;
    revealedTiles: { index: number; type: 'safe' }[];
}

export type TileStatus = 'safe' | 'unsafe' | 'hidden' | 'revealed';

export interface GameRecord {
    id: string;
    platformId: string;
    minesCount: number;
    outcome: 'win' | 'loss';
    timestamp: number;
}


// --- Reducer Types ---

export interface GameReducerState {
    minesCount: number;
    prediction: PredictionResult | null;
    isLoading: boolean;
    loadingMessage: string;
    revealedTiles: { index: number; type: 'safe' }[];
    hasNewReveals: boolean;
}

export type GameReducerAction =
  | { type: 'START_PREDICTION'; payload?: { isInitial?: boolean } }
  | { type: 'SET_LOADING_MESSAGE'; payload: string }
  | { type: 'PREDICTION_SUCCESS'; payload: PredictionResult }
  | { type: 'PREDICTION_ERROR' }
  | { type: 'REVEAL_TILE'; payload: number }
  | { type: 'CHANGE_MINES'; payload: number }
  | { type: 'RESET_ROUND' };
