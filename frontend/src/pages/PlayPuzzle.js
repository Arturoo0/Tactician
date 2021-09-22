
import React, { useEffect, useState } from 'react';
import { Puzzle } from '../components';
import { get, post } from '../utils/baseRequest';

const containerStyle = {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
};

const PlayPuzzle = () => {
    const [currentPulledPuzzle, setCurrentPulledPuzzle] = useState(null);
    const [key, setKey] = useState(false);
    const [isIncorrect, setIsIncorrect] = useState(false);

    const pullNewPuzzle = async () => {
        if (currentPulledPuzzle !== null){
            console.log(isIncorrect);
            post('/puzzles/user-submission', {
                'PuzzleId': currentPulledPuzzle.PuzzleId,
                'Correct': !isIncorrect
            });
        }
        const testRating = 1500;
        const response = await get(`/puzzles/${testRating}`);
        setCurrentPulledPuzzle(response.data);
        setKey(!key);
        setIsIncorrect(false);
    };

    useEffect(async () => {
        pullNewPuzzle();
    }, []);

    const handleDone = () => {
        pullNewPuzzle();
    }; 

    const handleIncorrect = () => {
        setIsIncorrect(true);
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
                    <Puzzle 
                        key={key} 
                        gameHandler={handleDone} 
                        puzzle={currentPulledPuzzle}
                        incorrectHandler={handleIncorrect}
                    />
                </div>
            }
        </div>  
    );
};

export default PlayPuzzle;
