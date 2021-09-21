
import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { get } from '../utils/baseRequest';

const containerStyle = {};

const PlayPuzzle = () => {
    const [currentPulledPuzzle, setCurrentPulledPuzzle] = useState(null);
    useEffect(async () => {
        const testRating = 1500;
        const response = await get(`/puzzles/${testRating}`);
        console.log(response.data);
        setCurrentPulledPuzzle(response.data);
    }, []);

    return (
        <div style={containerStyle}>
            {
                currentPulledPuzzle === null ?
                <div>
                    Loading
                </div>
                : 
                <div>
                    <Chessboard position={currentPulledPuzzle.FEN}/>
                </div>
            }
        </div>  
    );
};

export default PlayPuzzle;
