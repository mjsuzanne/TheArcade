const statusDisplay = document.querySelector('.status');

let gameActive = true;
let isPlayerXTurn = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

let playerX=''
let playerY=''

const winningMessage = () => `Player ${currentPlayerName()} has won!`;
const drawMessage = () => `It's a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayerName()}'s turn`;
const currentPlayerName = () => {
    const playerName = currentPlayer === 'X' ? playerX : playerY;
    console.log ('playerName' , playerName )
    return playerName;
}

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function addPlayers(event) {
    console.log('add function has been called')
  const player1Value = document.getElementById ("player1").value
  console.log (player1Value)
  const player2Value = document.getElementById ("player2").value

    event.preventDefault();
    if(player1Value === '' || player2Value ===''){
        alert('You must enter a name for each filed')
        return;
    }

    // const playerFormContainer= document.querySelector('.enter-players')
    // playerFormContainer.classList.add ('hide-container');

    playerX = player1Value
    playerY = player2Value
    console.log (playerX)
    console.log (playerY)
    

}

function cellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function playerChange() {
    console.log(playerX)
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    // isPlayerXTurn = !isPlayerXTurn
    statusDisplay.innerHTML = currentPlayerTurn();
}

function resultValidation() {
    let playerWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            playerWon = true;
            break
        }
    }

    if (playerWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let gameDraw = !gameState.includes('');
    if (gameDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    playerChange();
}

function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = "";
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.restart').addEventListener('click', restartGame); 
document.querySelector('.submitPlayers').addEventListener('click', addPlayers); 