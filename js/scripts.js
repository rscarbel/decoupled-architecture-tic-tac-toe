const squares = document.querySelectorAll('.square');
const squaresIds = [];
let currentPlacement = 'X'
let threshold = Math.sqrt(squares.length);
let turnsTaken = 0;
let aiLevel = 'hard';
let victory = false;

let currentBoard = []
function reset () {
  turnsTaken = 0;
  currentPlacement = 'X';
  currentBoard = [];
  victory = false;
  for (let firstTierIndex = 0; firstTierIndex < threshold; firstTierIndex++) {
    currentBoard.push([]);
    for (let secondTierIndex = 0; secondTierIndex < threshold; secondTierIndex++) {
      currentBoard[firstTierIndex][secondTierIndex] = '';
    }
  }
  squares.forEach(e => {e.textContent = ''});
}
reset()

document.querySelector('#reset').addEventListener('click',() => {reset()})

const findDimensionalIndex = index => {
  index = parseInt(index)
  let firstTierIndex = Math.floor(index / threshold);
  let secondTierIndex = index % threshold;
  return [firstTierIndex,secondTierIndex]
}

//IIFE to give squares Ids
//This is not hard-coded into the html, because this is designed to be decoupled - you can add as many squares as you want, and it will work just fine.
(function populateIndices () {
  let currentIndex = 0;
  squares.forEach(item => {
    item.id = currentIndex;
    item.classList.add(`S${currentIndex}`);
    squaresIds.push(currentIndex);
    currentIndex++;
  })
})();

const addCurrentPlayToBoard = index => {
  if (victory){
    return
  }
  dimensionIndex = findDimensionalIndex(index);
  currentBoard[dimensionIndex[0]][dimensionIndex[1]] = currentPlacement;
}

const playerPopulateSquare = event => {
  let dimensionIndex = findDimensionalIndex(event.target.id);
  if(currentBoard[dimensionIndex[0]][dimensionIndex[1]]) {
    alert('Please pick a valid square!');
    return
  }
  turnsTaken++;
  if (turnsTaken > squares.length) {
    alert('the game is already over')
    return;
  }
  event.target.textContent = currentPlacement;
  addCurrentPlayToBoard(event.target.id)
  if (checkVictoryConditions()) {
    victory = true;
    alert(`Player ${currentPlacement} won!`)
  } else {
    changePlayer();
    if (turnsTaken < squares.length) {
    aiPlays(aiLevel)
    }
  }
}

function changePlayer () {
    currentPlacement = currentPlacement === 'X' ? 'O' : 'X';
}

//IIFE to add event listeners to squares
(function() {
  squares.forEach(item => {
    item.addEventListener('click', playerPopulateSquare);
  })
})();

//checks victory conditions for any sized board
const checkVictoryConditions = (gameStatus=currentBoard) => {
  let row = (function () {
    for (let i = 0; i < threshold; i++){
      if (gameStatus[i][0]){
        if (gameStatus[i].every(item => item === gameStatus[i][0])) {
          return true;
        }
      }
    }
    return false;
  })();

  let column = (function () {
    for (let i = 0; i < threshold; i++){
      if (gameStatus[0][i]){
        let counter = 0;
        for(let j = 0; j < threshold; j++) {
          if (!(gameStatus[j][i] === gameStatus[0][i])) {
            break;
          } else {
            counter++;
            if (counter === threshold) {
              return true;
            }
          }
        }
      }
    }
    return false;
  })();

  let diagonal = (function () {
    for (let i = 0;i < squares.length; i += threshold + 1) {
      if (gameStatus[0][0]) {
        let currentSquare = (findDimensionalIndex(i));
        if (!(gameStatus[currentSquare[0]][currentSquare[1]] === gameStatus[0][0])){
          break;
        } else {
          if (i === (squares.length - 1)) {
            return true;
          }
        }
      }
    }
    for (let i = threshold - 1; i < squares.length; i += threshold - 1){
      if (gameStatus[0][threshold - 1]) {
        let currentSquare = (findDimensionalIndex(i))
        if (!(gameStatus[currentSquare[0]][currentSquare[1]] === gameStatus[0][threshold-1])){
          break;
        } else{
          if (i === (squares.length - threshold)) {
            return true;
          }
        }
      }
    }
    return false;
  })();
  return (row || column || diagonal)
}