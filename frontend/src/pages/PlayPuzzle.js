
import React, { useEffect, useState } from 'react';
import { Puzzle } from '../components';
import { get } from '../utils/baseRequest';

const containerStyle = {};

const PlayPuzzle = () => {
    const [currentPulledPuzzle, setCurrentPulledPuzzle] = useState(null);
    const [key, setKey] = useState(0);

    const pullNewPuzzle = async () => {
        const testRating = 1500;
        const response = await get(`/puzzles/${testRating}`);
        setCurrentPulledPuzzle(response.data);
        setKey(Math.random());
    };

    useEffect(async () => {
        pullNewPuzzle();
    }, []);

    const handleDone = () => {
        pullNewPuzzle();
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
                    <Puzzle key={key} gameHandler={handleDone} puzzle={currentPulledPuzzle}/>
                </div>
            }
        </div>  
    );
};

export default PlayPuzzle;
