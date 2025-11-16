import React from 'react';
import Tile from './Tile';
import { TOTAL_TILES } from '../constants';
import { type PredictionResult, type TileStatus } from '../types';

interface GridProps {
    prediction: PredictionResult | null;
    isLoading: boolean;
    revealedTiles: number[];
    onTileClick: (index: number) => void;
}

const Grid: React.FC<GridProps> = ({ prediction, isLoading, revealedTiles, onTileClick }) => {
    return (
        <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
            {Array.from({ length: TOTAL_TILES }).map((_, index) => {
                let status: TileStatus = 'hidden';
                const isRevealed = revealedTiles.includes(index);

                if (isRevealed) {
                    status = 'revealed';
                } else if (!isLoading && prediction) {
                    status = prediction.predictedSafe.includes(index) ? 'safe' : 'unsafe';
                }

                return (
                    <Tile 
                        key={index} 
                        index={index} 
                        status={status}
                        isLoading={isLoading}
                        onClick={() => onTileClick(index)}
                    />
                );
            })}
        </div>
    );
};

export default Grid;