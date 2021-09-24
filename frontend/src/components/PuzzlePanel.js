
import React, { useEffect } from 'react';
import { BsFillPersonFill } from "react-icons/bs";

const puzzleContainer = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '0 3px 3px 0',
    width: '125px'
};

const profileStyle = {
    width: '100%',
    textAlign: 'center',
    fontSize: '4rem', 
    padding: '10px 0 3px 0'
};

const ratingStyle = {
    fontSize: '2rem',
    width: '100%',
    textAlign: 'center'
};

const PuzzlePanel = (props) => {
    return (
        <div style={puzzleContainer}>
            <div style={profileStyle}>
                <BsFillPersonFill></BsFillPersonFill>   
            </div>
            <div style={ratingStyle}>
                {Math.round(props.rating)}
            </div>
        </div>
    );
};

export default PuzzlePanel;