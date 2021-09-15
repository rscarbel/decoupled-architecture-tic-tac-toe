const squares = document.querySelectorAll('.square');
const squaresIds = [];
let currentPlacement = 'X'
let threshold = Math.sqrt(squares.length);

let victoryCombinations = []
for (let i = 0; i < threshold + 2; i++) {
  victoryCombinations[i] = [];
}

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

const populateSquare = event => {
  let dimensionIndex = findDimensionalIndex(event.target.id)
  if (!currentBoard[dimensionIndex[0]][dimensionIndex[1]]){
    event.target.textContent = currentPlacement;
    addCurrentPlayToBoard(event.target.id)
    if (currentPlacement === 'X') {
      currentPlacement = 'O';
    } else {
      currentPlacement = 'X';
    }
  }
}

//IIFE to add event listeners to squares
(function() {
  squares.forEach(item => {
    item.addEventListener('click', populateSquare);
  })
})();

const populateVictoryCombinations = index => {

}

//checks victory conditions for any sized board
const checkVictoryConditions = (index) => {

  let row = (function () {
    for (let i = 0; i < currentBoard.length; i++){
      if (currentBoard[i][0]){
        if (currentBoard[i].every(currentBoard[i].textContent === currentBoard[0])) {
          return true;
        }
      }
    }
    return false;
  })();

  let column = (function () {

  })();

  let diagonal = (function () {

  })();

  return (row && column && diagonal)
}