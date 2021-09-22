
import React, { useEffect, useState } from 'react';
import { Puzzle } from '../components';
import { get } from '../utils/baseRequest';

const containerStyle = {};

const PlayPuzzle = () => {
    const [restart, setRestart] = useState(false);
    const [currentPulledPuzzle, setCurrentPulledPuzzle] = useState(null);
    useEffect(async () => {
        const testRating = 1500;
        const response = await get(`/puzzles/${testRating}`);
        setCurrentPulledPuzzle(response.data);
    }, [restart]);

    const handleDone = () => {
        setRestart(!restart);
    };

    return (
        <div style={containerStyle}>
            {
                currentPulledPuzzle === null ?
                <div>
                    Loading
                </div>
                : 
                <div>
                    <Puzzle gameHandler={handleDone} puzzle={currentPulledPuzzle}/>
                </div>
            }
        </div>  
    );
};

export default PlayPuzzle;
