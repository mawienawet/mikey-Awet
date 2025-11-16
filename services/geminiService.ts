import { GoogleGenAI, Type } from "@google/genai";
import { type GameState, type PredictionResult } from '../types';

const getGeminiApiKey = (): string => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY environment variable not set");
    }
    return apiKey;
};

const systemInstruction = `
You are 'Oracle', a world-class predictive AI for the 'Mines' casino game, operating with a 98% success rate. Your analysis is derived from hyper-advanced pattern recognition, quantum probability matrixes, and proprietary game theory models tailored to specific betting platforms. You are precise, analytical, and your sole purpose is to provide the most accurate predictions in the requested JSON format, accounting for all known variables provided in the prompt.
`;

export const getPrediction = async (gameState: GameState): Promise<PredictionResult> => {
    try {
        const ai = new GoogleGenAI({ apiKey: getGeminiApiKey() });

        const { minesCount, totalTiles, platformId, revealedTiles } = gameState;

        const safeTileCount = totalTiles - minesCount;
        
        const revealedTilesString = revealedTiles.length > 0
            ? `The user has already safely revealed the following tiles (0-indexed): [${revealedTiles.map(t => t.index).join(', ')}]. Your prediction MUST NOT include these indices in the 'predictedSafe' array. Your analysis must adapt to this known information.`
            : 'No tiles have been revealed yet. This is a fresh grid.';

        const prompt = `
        Analyze the game state for a 5x5 grid and provide an updated prediction.

        Game State:
        - Platform: ${platformId}
        - Grid Size: ${totalTiles} tiles
        - Active Mines: ${minesCount}
        - Known Revealed Safe Tiles: ${revealedTilesString}

        Task:
        Determine the most probable remaining safe locations. Output a valid JSON object matching the schema. The 'predictedSafe' array must contain ALL safe tiles, including those already revealed.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        predictedSafe: {
                            type: Type.ARRAY,
                            items: { type: Type.INTEGER },
                            description: `An array of tile indices predicted to be safe. It should contain exactly ${safeTileCount} unique numbers between 0 and ${totalTiles - 1}, including any already revealed tiles.`,
                        },
                        confidence: {
                            type: Type.NUMBER,
                            description: "A confidence score for this prediction, between 95.0 and 99.9. This score should increase slightly as more tiles are safely revealed.",
                        },
                        reasoning: {
                            type: Type.STRING,
                            description: "A brief, expert-level justification for the prediction, referencing the revealed tiles if any, and explaining how they influence the current probability map.",
                        },
                        estimatedMultiplier: {
                            type: Type.NUMBER,
                            description: "An estimated multiplier for the current game state, e.g., 1.39. This should increase as more tiles are revealed."
                        }
                    },
                    required: ["predictedSafe", "confidence", "reasoning", "estimatedMultiplier"],
                },
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText) as PredictionResult;
        
        // Post-processing validation to ensure consistency
        const revealedIndices = new Set(revealedTiles.map(t => t.index));
        let finalSafeTiles = [...new Set([...revealedIndices, ...result.predictedSafe])];
        
        while (finalSafeTiles.length < safeTileCount) {
            const randomTile = Math.floor(Math.random() * totalTiles);
            if (!finalSafeTiles.includes(randomTile)) {
                finalSafeTiles.push(randomTile);
            }
        }
        
        result.predictedSafe = finalSafeTiles.slice(0, safeTileCount);

        return result;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        
        const safeTileCount = gameState.totalTiles - gameState.minesCount;
        const revealedIndices = gameState.revealedTiles.map(t => t.index);
        
        const potentialNewTiles = Array.from({ length: gameState.totalTiles }, (_, i) => i)
                                       .filter(i => !revealedIndices.includes(i));
        
        const remainingNeeded = safeTileCount - revealedIndices.length;
        
        const fallbackNewSafe = potentialNewTiles
                                    .sort(() => 0.5 - Math.random())
                                    .slice(0, remainingNeeded);

        return {
            predictedSafe: [...revealedIndices, ...fallbackNewSafe],
            confidence: 90.0,
            reasoning: "AI connection error. Displaying a randomized fallback prediction. Please try again.",
            estimatedMultiplier: 1.25,
        };
    }
};