
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
    padding: '10px 0 3px 0', 
    display: 'flex',
    flexDirection: 'column'
};

const infoStyle = {
    fontSize: '1.5rem',
    width: '100%',
    textAlign: 'center',
    fontWeight: '500'
};

const PuzzlePanel = (props) => {
    return (
        <div style={puzzleContainer}>
            <div style={profileStyle}>
                <div>
                    <BsFillPersonFill size={'4rem'}></BsFillPersonFill>   
                </div>
                <div style={infoStyle}>
                    {props.username}
                </div>
            </div>
            <div style={infoStyle}>
                {Math.round(props.rating)}
            </div>
        </div>
    );
};

export default PuzzlePanel;