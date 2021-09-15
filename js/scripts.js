const squares = document.querySelectorAll('.square');
const squaresIds = [];
let currentPlacement = 'X'
let threshold = Math.sqrt(squares.length);

let currentBoard = []
for (let firstTierIndex = 0; firstTierIndex < threshold; firstTierIndex++) {
  currentBoard.push([]);
  for (let secondTierIndex = 0; secondTierIndex < threshold; secondTierIndex++) {
    currentBoard[firstTierIndex][secondTierIndex] = '';
  }
}

const findDimensionalIndex = index => {
  index = parseInt(index)
  let firstTierIndex = Math.floor(index / threshold);
  let secondTierIndex = index % threshold;
  return [firstTierIndex,secondTierIndex]
}

//IIFE to give squares Ids
(function() {
  let currentIndex = 0;
  squares.forEach(item => {
    item.id = currentIndex;
    squaresIds.push(currentIndex)
    currentIndex++;
  })
})();

const addCurrentPlayToBoard = index => {
  dimensionIndex = findDimensionalIndex(index)
  currentBoard[dimensionIndex[0]][dimensionIndex[1]] = currentPlacement;
}

const playerPopulateSquare = event => {
  let dimensionIndex = findDimensionalIndex(event.target.id)
  event.target.textContent = currentPlacement;
  addCurrentPlayToBoard(event.target.id)
  if (checkVictoryConditions()) {
    alert(`Player ${currentPlacement} won!`)
  } else {
    changePlayer();
  }
}

function changePlayer () {
  if (currentPlacement === 'X') {
    currentPlacement = 'O';
  } else {
    currentPlacement = 'X';
  }
}

//IIFE to add event listeners to squares
(function() {
  squares.forEach(item => {
    item.addEventListener('click', playerPopulateSquare);
  })
})();

//checks victory conditions for any sized board
const checkVictoryConditions = () => {

  let row = (function () {
    for (let i = 0; i < threshold; i++){
      if (currentBoard[i][0]){
        if (currentBoard[i].every(item => item === currentBoard[i][0])) {
          return true;
        }
      } else {
        break;
      }
    }
    return false;
  })();

  let column = (function () {
    for (let i = 0; i < threshold; i++){
      if (currentBoard[0][i]){
        let counter = 0;
        for(let j = 0; j < threshold; j++) {
          if (!(currentBoard[j][i] === currentBoard[0][i])) {
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
    for (let i = 0;i < squaresIds.length; i += threshold + 1) {
      if (currentBoard[0][0]) {
        let currentSquare = (findDimensionalIndex(i));
        if (!(currentBoard[currentSquare[0]][currentSquare[1]] === currentBoard[0][0])){
          break;
        } else {
          if (i === (squaresIds.length - 1)) {
            return true;
          }
        }
      }
    }
    for (let i = threshold - 1; i < squaresIds.length; i += threshold - 1){
      if (currentBoard[0][threshold - 1]) {
        let currentSquare = (findDimensionalIndex(i))
        if (!(currentBoard[currentSquare[0]][currentSquare[1]] === currentBoard[0][threshold-1])){
          break;
        } else{
          if (i === (squaresIds.length - threshold)) {
            return true;
          }
        }
      }
    }
    return false;
  })();
  return (row || column || diagonal)
}