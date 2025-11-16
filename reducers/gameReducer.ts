import { type GameReducerState, type GameReducerAction } from '../types';
import { TOTAL_TILES } from '../constants';

export const LOADING_MESSAGES = [
    "Analyzing historical patterns...",
    "Calculating quantum probabilities...",
    "Running proprietary game theory models...",
    "Cross-referencing platform-specific data...",
    "Finalizing prediction matrix...",
];

export const initialState: GameReducerState = {
    minesCount: 12,
    prediction: null,
    isLoading: true,
    loadingMessage: "Initializing AI analysis...",
    revealedTiles: [],
    hasNewReveals: false,
};

export const gameReducer = (state: GameReducerState, action: GameReducerAction): GameReducerState => {
    switch (action.type) {
        case 'START_PREDICTION':
            return {
                ...state,
                isLoading: true,
                loadingMessage: action.payload?.isInitial 
                    ? "Initializing AI analysis..." 
                    : LOADING_MESSAGES[0],
                hasNewReveals: false,
            };
        
        case 'SET_LOADING_MESSAGE':
            return {
                ...state,
                loadingMessage: action.payload,
            };

        case 'PREDICTION_SUCCESS':
            return {
                ...state,
                isLoading: false,
                prediction: action.payload,
            };

        case 'PREDICTION_ERROR':
            return {
                ...state,
                isLoading: false,
                prediction: {
                    predictedSafe: Array.from({length: TOTAL_TILES - state.minesCount}, (_, i) => i),
                    confidence: 0,
                    reasoning: "An error occurred. Could not fetch AI prediction.",
                    estimatedMultiplier: 1.0,
                }
            };

        case 'REVEAL_TILE':
            if (state.revealedTiles.some(t => t.index === action.payload)) {
                return state; // Avoid duplicates
            }
            return {
                ...state,
                revealedTiles: [...state.revealedTiles, { index: action.payload, type: 'safe' }],
                hasNewReveals: true,
            };

        case 'CHANGE_MINES':
            return {
                ...initialState,
                minesCount: action.payload,
                isLoading: true, // Immediately go into loading for new prediction
            };

        case 'RESET_ROUND':
            return {
                ...state,
                prediction: null,
                revealedTiles: [],
                hasNewReveals: false,
            };

        default:
            return state;
    }
};
