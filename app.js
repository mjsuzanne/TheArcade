const statusDisplay = document.querySelector('.status');

let gameActive = true;
let isPlayerXTurn = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

let playerX=''
let playerY=''

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `It's a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

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

function addPlayers(){
    console.log('add function has been called')
    return;

// function addPlayers(event) {
//     event.preventDefault();
//     if(this.player1.value === '' || this.player2.value ===''){
//         alert('You must enter a name for each filed')
//         return;
//     }

    // const playerFormContainer= document.querySelector('.enter-players')
    // playerFormContainer.classList.add ('hide-container');

    // playerX.name= this.player1.value
    // playerY.name=this.player2.value
    

    // addPlayers();

}

function cellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function playerChange() {
    currentPlayer = isPlayerXTurn ? playerX : playerY
    isPlayerXTurn = !isPlayerXTurn
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