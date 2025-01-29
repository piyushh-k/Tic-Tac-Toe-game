import "./App.css";
import { useState } from "react";

function Square({ value, boxClick }) {
  return (
    <button className="square" onClick={boxClick}>
      {value}
    </button>
  );
}

function Win(boxes) {
  if (!Array.isArray(boxes) || boxes.length !== 9) {
    return null; 
  }

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (boxes[a] !== null && boxes[a] === boxes[b] && boxes[b] === boxes[c]) {
      return boxes[a]; 
    }
  }
  return null; 
}

function Board({ nextPlayer, boxes, onPlay, Reset }) {
  const handleClick = (i) => {
    const newBoxes = boxes.slice();
    if (newBoxes[i] !== null || Win(boxes)) {
      return;
    }
    newBoxes[i] = nextPlayer ? "x" : "o";
    onPlay(newBoxes);
  };

  const winner = Win(boxes);
  const status = winner ? `Winner: ${winner}` : `Next Player: ${nextPlayer ? "X" : "O"}`;
  console.log(status);

  return (
    <>
      <div className="Board">
        <div className="row">
          <Square value={boxes[0]} boxClick={() => handleClick(0)} />
          <Square value={boxes[1]} boxClick={() => handleClick(1)} />
          <Square value={boxes[2]} boxClick={() => handleClick(2)} />
        </div>
        <div className="row">
          <Square value={boxes[3]} boxClick={() => handleClick(3)} />
          <Square value={boxes[4]} boxClick={() => handleClick(4)} />
          <Square value={boxes[5]} boxClick={() => handleClick(5)} />
        </div>
        <div className="row">
          <Square value={boxes[6]} boxClick={() => handleClick(6)} />
          <Square value={boxes[7]} boxClick={() => handleClick(7)} />
          <Square value={boxes[8]} boxClick={() => handleClick(8)} />
        </div>
        <div className="status">{status}</div>
      </div>
    </>
  );
}

function Game() {
  const [isNext, setNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentBoxes = history[currentMove];

  const Reset = () => {
    setHistory([Array(9).fill(null)]); 
    setNext(true); 
    setCurrentMove(0);
  };

  const jump = (nextMove) => {
    setCurrentMove(nextMove);
    setNext(nextMove % 2 === 0); 
  };

  const moves = history.map((_, move) => {
    let desc;
    if (move > 0) {
      desc = 'Go to move #' + move;
    } else {
      desc = 'Reset Game';
    }
    return (
      <li key={move} className="buttons">
        <button onClick={() => jump(move)} className="moveList">{desc}</button>
      </li>
    );
  });

  const handlePlay = (newBoxes) => {
    const newHistory = [...history.slice(0, currentMove + 1), newBoxes]; 
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setNext(!isNext);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board nextPlayer={isNext} boxes={currentBoxes} onPlay={handlePlay} Reset={Reset} />
      </div>
      <div className="game-info">
        <h3>Move history</h3>
        <ul>{moves}</ul> 
      </div>
    </div>
  );
}

export default Game;
