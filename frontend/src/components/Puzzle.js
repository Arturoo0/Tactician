
import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';

const Puzzle = (props) => {
    const colorMapper = {
        'b' : 'black',
        'w' : 'white'
    };

    const [gameInstance, setGameInstance] = useState(null);
    const [moveStack, setMoveStack] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [playerColor, setPlayerColor] = useState(null);

    const generateToAndFrom = (move) => {
        const _from = move[0] + move[1];
        const _to = move[2] + move[3];
        return {_from, _to};
    }; 
    
    useEffect(() => {
        if (gameInstance === null){
            let {
                FEN,
                Moves
            } = props.puzzle;
            Moves = Moves.split(" ").reverse();

            const newGameInstance = new Chess(FEN);
            const lastMove = Moves.pop();

            const { _from, _to} = generateToAndFrom(lastMove);

            newGameInstance.move({from: _from, to: _to});
            setMoveStack(Moves);
            setPlayerColor(colorMapper[newGameInstance.turn()]);
            setGameInstance(newGameInstance);
        }
    }, []);

    const _allowDrag = (piece) => {
        if (piece[0] === gameInstance.turn()) return true;
        return false;
    };

    const _onDrop = (sourceSquare, targetSquare) => {
        const moves = moveStack.slice();
        const neededMove = moveStack[moves.length - 1];

        // for testing purposes
        console.log(neededMove);

        if (neededMove === sourceSquare + targetSquare){
            moves.pop();
            if (moves.length === 0){
                gameInstance.move({from: sourceSquare, to: targetSquare});
                setMoveStack(moves);
                setGameOver(true);
                props.gameHandler();
            }
            else{
                const opposingMove = moves.pop();
                const { _from, _to} = generateToAndFrom(opposingMove);
                gameInstance.move({from: sourceSquare, to: targetSquare});
                gameInstance.move({from: _from, to: _to});
                setMoveStack(moves); 
            }
        }else {
            props.incorrectHandler();
            window.alert(`${sourceSquare + targetSquare} is incorrect`);
        }
    }

    return ( 
        <div>
            {
                gameInstance === null ?
                    <div>Loading</div>
                :
                    gameOver === false ? 
                        <Chessboard 
                            orientation={playerColor} 
                            position={gameInstance.fen()}
                            allowDrag={({piece}) => _allowDrag(piece)}
                            onDrop={({ sourceSquare, targetSquare, piece }) => {
                                _onDrop(sourceSquare, targetSquare);
                            }}
                        />
                        : 
                        <div>finished</div>
            }
        </div>
    );
};

export default Puzzle;