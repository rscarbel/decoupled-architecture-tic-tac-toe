const generateSquareChoice = () => {
  let squareChoice = Math.floor(Math.random() * (squares.length));
  let resultingSquare = findDimensionalIndex(squareChoice);


  if (currentBoard[resultingSquare[0]][resultingSquare[1]]) {
    generateSquareChoice()
  } else {
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
  }
};

function duplicateGame () {
  let duplicateBoard = []
  for (let i = 0;i < threshold; i++){
    duplicateBoard.push([])
    for (let j = 0;j < threshold;j++){
      duplicateBoard[i].push(currentBoard[i][j])
    }
  }
  return duplicateBoard
}

function testWinningMove(move,player=currentPlacement) {
  let dimensionIndex = findDimensionalIndex(move)
  if(currentBoard[dimensionIndex[0]][dimensionIndex[1]] === ('X' || 'O')){
    return false;
  }
  let duplicateBoard = duplicateGame();
  let squareToTest = findDimensionalIndex(move);
  duplicateBoard[squareToTest[0]][squareToTest[1]] = player;
  return checkVictoryConditions(duplicateBoard);
}

//the easy ai just attempts 4 random moves to see if any of them cause a victory
//if no moves cause a victory, the ai just plays randomly
function aiPlaysEasy (choice=0,attempts=0) {
  attempts++
  if (!testWinningMove(choice) && (attempts <= 4)){
    aiPlaysEasy(generateSquareChoice(),attempts);
  } else {
    aiPopulateSquare(choice);
  }
}

//the mediuam ai tests for all possible next moves, and blocks the player if the player will win on their next turn
//if no move is found, it reverts to easy
function aiPlaysMedium () {
  testCondition = currentPlacement === 'O' ? 'X':'O';
  for(let i = 0; i < squares.length;i++){
    if (testWinningMove(i,testCondition)){
      aiPopulateSquare(i)
      return;
    }
  }
  aiPlaysEasy()
}

//the hard ai tests for all possible next moves and if one causes victory, it will pick that.
//if no move is found, it reverts to medium
function aiPlaysHard (choice) {
  for(let i = 0; i < squares.length;i++){
    if (testWinningMove(i,currentPlacement)){
      aiPopulateSquare(i);
      return;
    }
  }
  aiPlaysMedium()
}

function aiPopulateSquare (index) {
  let dimensionIndex = findDimensionalIndex(index);
  if(!(currentBoard[dimensionIndex[0]][dimensionIndex[1]] === '')){
    index = generateSquareChoice()
  }
  while (index === undefined) {
    index = generateSquareChoice()
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