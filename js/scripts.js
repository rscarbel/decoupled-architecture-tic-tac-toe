const squares = document.querySelectorAll('.square');
let currentPlacement = 'X'
let threshold = Math.sqrt(squares.length);
let currentBoard = new Array(threshold).fill([]);

const populateSquare = event => {
  event.target.textContent = currentPlacement;
  if (currentPlacement === 'X') {
    currentPlacement = 'O';
  } else {
    currentPlacement = 'X';
  }
}

squares.forEach(item => {
  item.addEventListener('click', populateSquare)
})

//checks victory conditions for any sized board
const checkVictoryConditions = () => {


}