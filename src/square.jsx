    
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
    if (boxes[a] == boxes[b]) {
      if (boxes[b] == boxes[c]) {
        return boxes[a]; //winner
      }
    }
  }
  return null;
}

function Board() {
  const [bool, setBool] = useState(true);
  const [boxes, setBoxes] = useState(Array(9).fill(null));

  const handleClick = (i) => {
    const newBoxes = boxes.slice();
    if (newBoxes[i] != null || Win(boxes)) {
      return;
    }
    if (bool) {
      newBoxes[i] = "x";
    } else {
      newBoxes[i] = "o";
    }
    setBoxes(newBoxes);
    setBool(!bool);
  };

  const Reset = () => {
    setBoxes(Array(9).fill(null));
    setBool(true);

  };

  const winner = Win(boxes);

  return (
    <>
      <h1 className="Head">{winner ? `Winner: ${winner}` : `Next Player: ${bool ? "X" : "O"}`}</h1>
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
      <button className="reset-button" onClick={Reset}>
        Reset Game
      </button>
      </div>
    </>
  );
}

export default Board;
