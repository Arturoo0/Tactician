
import React, { useEffect, useState } from 'react';
import { Puzzle } from '../components';
import { get, post } from '../utils/baseRequest';

const containerStyle = {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
};

const PlayPuzzle = () => {
    const [currentPulledPuzzle, setCurrentPulledPuzzle] = useState(null);
    const [key, setKey] = useState(false);
    const [isIncorrect, setIsIncorrect] = useState(false);
    const [rating, setRating] = useState('loading...');

    const pullNewPuzzle = async () => {
        if (currentPulledPuzzle !== null){
            await post('/puzzles/user-submission', {
                'PuzzleId': currentPulledPuzzle.PuzzleId,
                'Correct': !isIncorrect,
                'Rating': currentPulledPuzzle.Rating
            });
        }
        const testRating = 1500;
        const response = await get(`/puzzles/${testRating}`);
        setCurrentPulledPuzzle(response.data);
        setKey(!key);
        setIsIncorrect(false);
        setRating(response.data.user_rating)
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
                    <h3>Rating {rating}</h3>
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
