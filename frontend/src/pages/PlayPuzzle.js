
import React, { useEffect, useState } from 'react';
import { Puzzle, PuzzlePanel, RatingDiff } from '../components';
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
    const [ratingChange, setRatingChange] = useState(null);
    const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(0);

    const pullNewPuzzle = async () => {
        const pulledUsername = await get('/user/username');
        const response = await get(`/puzzles/`);
        setCurrentPulledPuzzle(response.data);
        setKey(!key);
        setIsIncorrect(false);
        setRating(response.data.user_rating);
        setUsername(pulledUsername.data.username);
        setDisplayGoNext(false);
        setTimeElapsedInSeconds(0);
    };

    useEffect(async () => {
        pullNewPuzzle();        
    }, []);

    useEffect(() => {
        if (displayGoNext) return;
        const increaseElapsedTime = setInterval(() => {
            setTimeElapsedInSeconds(timeElapsedInSeconds + 1);
        }, 1000); 
        return () => clearInterval(increaseElapsedTime);
    }, [timeElapsedInSeconds]);

    const handleDone = async () => {
        setDisplayGoNext(true);
        const response = await post('/puzzles/user-submission', {
            'PuzzleId': currentPulledPuzzle.PuzzleId,
            'Correct': !isIncorrect,
            'Rating': currentPulledPuzzle.Rating,
            'TimeElapsed': timeElapsedInSeconds
        });
        setRatingChange(response.data.rating_change);
    }; 

    const handleIncorrect = () => {
        setIsIncorrect(true);
    };

    const renderGoNext = () => {
        if (displayGoNext === false) return null;
        return (
            <div style={goNextStyle}>
                <div>
                    <RatingDiff 
                        rating={rating} 
                        diff={ratingChange} 
                        id={currentPulledPuzzle.PuzzleId}
                        timeTaken={timeElapsedInSeconds}
                    />
                </div>??
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
                        <PuzzlePanel rating={rating} username={username} timeElapsed={timeElapsedInSeconds}/>
                    </div>
                    {renderGoNext()}
                </div>
            }
        </div>  
    );
};

export default PlayPuzzle;
