
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
    const [playerColor, setPlayerColor] = useState(null);

    const generateToAndFrom = (move) => {
        const _from = move[0] + move[1];
        const _to = move[2] + move[3];
        let _promotion = null
        if (move.length === 5)
            _promotion = move[4];
        return {_from, _to, _promotion};
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
        if (sourceSquare === targetSquare) return;
        const moves = moveStack.slice();
        const neededMove = moveStack[moves.length - 1];
        if (neededMove.substring(0, 4) === sourceSquare + targetSquare){
            moves.pop();
            if (moves.length === 0){
                if (neededMove.length === 5)
                    gameInstance.move({from: sourceSquare, to: targetSquare, promotion: neededMove[4]}); 
                else
                    gameInstance.move({from: sourceSquare, to: targetSquare});
                setMoveStack(moves);
                props.gameHandler();
            }
            else{
                const opposingMove = moves.pop();
                const { _from, _to, _promotion} = generateToAndFrom(opposingMove);

                if (neededMove.length === 5)
                    gameInstance.move({from: sourceSquare, to: targetSquare, promotion: neededMove[4]}); 
                else
                    gameInstance.move({from: sourceSquare, to: targetSquare});

                if (_promotion !== null)
                    gameInstance.move({from: _from, to: _to, promotion: _promotion});
                else
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
                    <Chessboard 
                        orientation={playerColor} 
                        position={gameInstance.fen()}
                        allowDrag={({piece}) => _allowDrag(piece)}
                        onDrop={({ sourceSquare, targetSquare, piece }) => {
                            _onDrop(sourceSquare, targetSquare);
                        }}
                    />
            }
        </div>
    );
};

export default Puzzle;