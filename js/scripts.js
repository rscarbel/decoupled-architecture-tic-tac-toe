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
  index = parseInt(index)
  let firstTierIndex = Math.floor(index / threshold);
  let secondTierIndex = index % threshold;
  currentBoard[firstTierIndex][secondTierIndex] = currentPlacement;
}

const populateSquare = event => {
  let index = parseInt(event.target.id);
  let firstTierIndex = Math.floor(index / threshold);
  let secondTierIndex = index % threshold;
  if (!currentBoard[firstTierIndex][secondTierIndex]){
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

//checks victory conditions for any sized board
const checkVictoryConditions = () => {


}