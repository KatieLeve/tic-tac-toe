const cells = document.querySelectorAll('.cell');
const PLAYER_X = 'X';
const PLAYER_O = 'O';
let turn = PLAYER_X;

const boardState = Array(cells.length);
boardState.fill(null);

const strike = document.getElementById('strike');
const strike1 = document.getElementById('strike1');

cells.forEach((cell) => cell.addEventListener('click', cellClicked));

function setHoverText() {
  cells.forEach((cell) => {
    cell.classList.remove('x-hover');
    cell.classList.remove('o-hover');
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  cells.forEach((cell) => {
    if (cell.innerText == '') {
      cell.classList.add(hoverClass);
    }
  });
}

setHoverText();

function cellClicked(event) {
  // need to find if game not running and return

  const cell = event.target;
  const cellNumber = cell.dataset.index;
  if (cell.innerText != '') {
    return;
  }

  if (turn === PLAYER_X) {
    cell.innerText = PLAYER_X;
    boardState[cellNumber] = PLAYER_X;
    turn = PLAYER_O;
  } else {
    cell.innerText = PLAYER_O;
    boardState[cellNumber] = PLAYER_O;
    turn = PLAYER_X;
  }
  setHoverText();
  checkMatch();
}

function checkMatch() {
  for (const matchCombination of matchCombinations) {
    const { combo, strikeClass } = matchCombination;
    const cellValue1 = boardState[combo[0]];
    const cellValue2 = boardState[combo[1]];
    const cellValue3 = boardState[combo[2]];

    if (cellValue1 != null && cellValue1 === cellValue2 && cellValue1 === cellValue3) {
      strike.classList.add(strikeClass);  
      strike.classList.add(strikeClass);  

    }
   }
}

const matchCombinations = [
  { combo: [0, 1, 2], strikeClass: 'strike-row-1' },
  { combo: [3, 4, 5], strikeClass: 'strike-row-2' },
  { combo: [6, 7, 8], strikeClass: 'strike-row-3' },

  { combo: [0, 3, 6], strikeClass: 'strike-column-1' },
  { combo: [1, 4, 7], strikeClass: 'strike-column-2' },
  { combo: [2, 5, 8], strikeClass: 'strike-column-3' },

  { combo: [0, 4, 8], strikeClass: 'strike-diagonal-1' },
  { combo: [6, 4, 2], strikeClass: 'strike-diagonal-1' },

  { combo: [9, 10, 11], strikeClass: 'strike-row-1' },
  { combo: [12, 13, 14], strikeClass: 'strike-row-2' },
  { combo: [15, 16, 17], strikeClass: 'strike-row-3' },
];


   //need help - get strike to go through right bigTile
  //  function checkBigTile() {
    // let bigTile = document.getElementsById('topLeft').parentElement.nodeName;

    // console.log(bigTile);

    
    // when find strike through then set that tile to color of winner
    //       const matchWinColor_X = document.getElementsByClassName('.matchWinColor-x')
    // matchWinColor_X();
  // }