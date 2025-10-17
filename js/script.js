let board;
let currentPlayer;
let gameActive;

const cells = document.querySelectorAll('.cell');
const playerTurnDisplay = document.getElementById('current-player');
const restartButton = document.getElementById('restart-button');

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

function initializeGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    playerTurnDisplay.textContent = currentPlayer;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o', 'winning');
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (board[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    handleResultValidation();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            highlightWinningCells(winCondition);
            break;
        }
    }

    if (roundWon) {
        playerTurnDisplay.textContent = `Player ${currentPlayer} Has Won!`;
        gameActive = false;
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
        return;
    }

    let roundDraw = !board.includes("");
    if (roundDraw) {
        playerTurnDisplay.textContent = "Game Ended in a Draw!";
        gameActive = false;
        return;
    }

    changePlayer();
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerTurnDisplay.textContent = currentPlayer;
}

function highlightWinningCells(winCondition) {
    winCondition.forEach(index => {
        cells[index].classList.add('winning');
    });
}

function restartGame() {
    initializeGame();
}

restartButton.addEventListener('click', restartGame);

initializeGame();
