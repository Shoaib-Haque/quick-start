import { useEffect, useState } from "react";
import Square from "./component/Square";
import Header from "./component/Header";
import Main from "./component/Main";

function TicTocToe () {
    useEffect(() => {
        document.title = "tic toc toe";
    }, []);

    let [board, setBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    let [player, setPlayer] = useState(1);
    let [result, setResult] = useState('');

    let check = (rowIndex, colIndex, curBoard) => {
        const checking = player == 1 ? "X" : "O";
        if(curBoard[rowIndex][0] == checking && curBoard[rowIndex][1] == checking && curBoard[rowIndex][2] == checking) {
            setResult(player + " Wins!");
        } else if(curBoard[0][colIndex] == checking && curBoard[1][colIndex] == checking && curBoard[2][colIndex] == checking) {
            setResult(player + " Wins!");
        } else if(rowIndex == colIndex && curBoard[0][0] == checking && curBoard[1][1] == checking && curBoard[2][2] == checking) {
            setResult(player + " Wins!");
        } else if(rowIndex+colIndex == 2 && curBoard[0][2] == checking && curBoard[1][1] == checking && curBoard[2][0] == checking) {
            setResult(player + " Wins!");
        } else if(curBoard.flat().every(cell => cell !== '')) {
            setResult("It's a draw!!");
        }
    }

    let onSquareClick = (rowIndex, colIndex) => {
        if(!(result || board[rowIndex][colIndex] != '')) {
            let curBoard = board.map(row => [...row]);
            curBoard[rowIndex][colIndex] = player == 1 ? "X" : "O";
            setBoard(curBoard);
            check(rowIndex, colIndex, curBoard);
            setPlayer(player == 1 ? 2 : 1);
        }
    };

    let handleClear = () => {
        setBoard([['', '', ''], ['', '', ''], ['', '', '']]);
        setPlayer(1);
        setResult("");
    }

    return (
        <div>
            <Header />
            <Main>
                {result && <label htmlFor="result">{ result }</label>}
                {!result && <label htmlFor="player">Player { player }</label>}
                {board.map((row, rowIndex) => 
                    <div key={rowIndex} className="flex">
                    {
                        row.map((col, colIndex) => 
                            <Square 
                                value={board[rowIndex][colIndex]} 
                                onSquareClick={ (e) => onSquareClick(rowIndex, colIndex) }
                                />
                        )
                    }
                    </div>
                )}
                <button onClick={ handleClear }>Clear</button>
            </Main>
        </div>
    )

}

export default TicTocToe;