
import React, { useEffect, useState } from 'react';
import { Puzzle, PuzzlePanel } from '../components';
import { get, post } from '../utils/baseRequest';
import { Button } from 'react-bootstrap';
import { BsArrowRight } from "react-icons/bs";

const containerStyle = {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
};

const puzzleStyle = {
    display: 'flex',
    flexDirection: 'row'
};

const goNextStyle = {
    display: 'flex',
    justifyContent: 'end',
    margin: '5px 0 0 0'
}

const PlayPuzzle = () => {
    const [currentPulledPuzzle, setCurrentPulledPuzzle] = useState(null);
    const [key, setKey] = useState(false);
    const [isIncorrect, setIsIncorrect] = useState(false);
    const [rating, setRating] = useState('loading...');
    const [username, setUsername] = useState('loading...');
    const [displayGoNext, setDisplayGoNext] = useState(false);

    const pullNewPuzzle = async () => {
        const pulledUsername = await get('/user/username');
        // console.log(pulledUsername);
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
        setRating(response.data.user_rating);
        setUsername(pulledUsername.data.username);
        setDisplayGoNext(false);
    };

    useEffect(async () => {
        pullNewPuzzle();
    }, []);

    const handleDone = () => {
        setDisplayGoNext(true);
    }; 

    const handleIncorrect = () => {
        setIsIncorrect(true);
    };

    const renderGoNext = () => {
        if (displayGoNext === false) return null;
        return (
            <div style={goNextStyle}>
                <Button onClick={() => {pullNewPuzzle()}}>
                    <BsArrowRight style={{fontSize: '2rem'}}></BsArrowRight>
                </Button>
            </div>
        );
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
                    <div style={puzzleStyle}>
                        <Puzzle 
                            key={key} 
                            gameHandler={handleDone} 
                            puzzle={currentPulledPuzzle}
                            incorrectHandler={handleIncorrect}
                        />
                        <PuzzlePanel rating={rating} username={username}/>
                    </div>
                    {renderGoNext()}
                </div>
            }
        </div>  
    );
};

export default PlayPuzzle;
