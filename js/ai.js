let aiDifficulty = 'easy'

const generateSquareChoice = (0, squaresIds.length) => {
  let squareChoice = Math.floor(Math.random() * (squaresIds.length);
  let resultingSquare = findDimensionalIndex(squareChoice)

  while (currentBoard[squareChoice[0]][squareChoice[1]]) {
    squareChoice = findDimensionalIndex(Math.floor(Math.random() * (squaresIds.length))
  }
  return squareChoice;
}

const aiPlays = difficulty => {
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

const aiPopulateSquare = index => {
  let targetSquare = document.querySelector(`#${index}`);
  targetSquare.textContent = currentPlacement;
  addCurrentPlayToBoard(index)
  if (checkVictoryConditions()) {
    alert(`Player ${currentPlacement} won!`)
  } else {
    changePlayer();
  }
}