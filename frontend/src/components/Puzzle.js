
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
    useEffect(() => {
        if (gameInstance === null){
            let {
                FEN,
                Moves
            } = props.puzzle;
            Moves = Moves.split(" ").reverse();

            const newGameInstance = new Chess(FEN);
            const lastMove = Moves.pop();

            const _from = lastMove[0] + lastMove[1];
            const _to = lastMove[2] + lastMove[3];

            newGameInstance.move({from: _from, to: _to});
            setMoveStack(Moves);
            setPlayerColor(colorMapper[newGameInstance.turn()]);
            setGameInstance(newGameInstance);
        }
    }, []);

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
                            allowDrag={({piece}) => {
                                if (piece[0] === gameInstance.turn()) return true;
                                return false;
                            }}
                            onDrop={({ sourceSquare, targetSquare, piece }) => {
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
                                        const _from = opposingMove[0] + opposingMove[1];
                                        const _to = opposingMove[2] + opposingMove[3];
                                        gameInstance.move({from: sourceSquare, to: targetSquare});
                                        gameInstance.move({from: _from, to: _to});
                                        setMoveStack(moves); 
                                    }
                                }else {
                                    window.alert(`${sourceSquare + targetSquare} is incorrect`);
                                }
                            }}
                        />
                        : 
                        <div>finished</div>
            }
        </div>
    );
};

export default Puzzle;