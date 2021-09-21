
import React, { useEffect, useState } from 'react';
import { Puzzle } from '../components';
import { get } from '../utils/baseRequest';

const containerStyle = {};

const PlayPuzzle = () => {
    const [currentPulledPuzzle, setCurrentPulledPuzzle] = useState(null);
    useEffect(async () => {
        const testRating = 1500;
        const response = await get(`/puzzles/${testRating}`);
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
                    <Puzzle puzzle={currentPulledPuzzle}/>
                </div>
            }
        </div>  
    );
};

export default PlayPuzzle;
