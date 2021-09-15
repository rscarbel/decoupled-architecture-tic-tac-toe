let aiDifficulty = 'easy'

const generateSquareChoice = () => {
  let squareChoice = Math.floor(Math.random() * (squares.length));
  let resultingSquare = findDimensionalIndex(squareChoice);


  if (currentBoard[resultingSquare[0]][resultingSquare[1]]) {
    generateSquareChoice()
  } else {
    console.log(`current board square position --> ${currentBoard[resultingSquare[0]][resultingSquare[1]]}`)
    return squareChoice;
  }
}

function aiPlays (difficulty) {
  if (difficulty === 'easy') {
    aiPlaysEasy();
  } else if (difficulty === 'medium') {
    aiPlaysMedium()
  } else if (difficulty === 'hard') {
    aiPlaysHard();
  } else if (difficulty === 'impossible') {
    aiPlaysImpossible();
  }
};

function aiPlaysEasy () {
  aiPopulateSquare(generateSquareChoice())
}

function aiPlaysMedium () {
  //javascript
}

function aiPlaysHard () {
  //javascript
}

function aiPlaysImpossible () {
  //javascript
}

function aiPopulateSquare (index) {
  console.log(index)
  while (index === undefined || (document.querySelector(`.S${squaresIds[index]}`) === null)) {
    index = generateSquareChoice()
    console.log(index)
  }
  turnsTaken++;
  if (turnsTaken > squares.length) {
    alert('the game is already over')
    return;
  }
  let targetSquare = document.querySelector(`.S${squaresIds[index]}`);
  targetSquare.textContent = currentPlacement;
  addCurrentPlayToBoard(index);
  if (checkVictoryConditions()) {
    alert(`Player ${currentPlacement} won!`)
  } else {
    changePlayer();
  }
}