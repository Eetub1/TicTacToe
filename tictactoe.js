const players = [
    {
        name: "p1",
        marker: "X"
    },
    {
        name: "p2",
        marker: "O"
    }
]

//object that has the player's info whose turn it is
let whoseTurn
//what represents an empty cell on the board
const empty = ""
//if false game is not over, if true game is over
let gameState = false

const startBtn = document.getElementById("start")
startBtn.addEventListener("click", startGame)

const player1name = document.getElementById("player1")
const player2name = document.getElementById("player2")
const turn = document.getElementById("turn")
const cells = document.querySelectorAll(".cell")
const info = document.getElementById("info")
const result = document.getElementById("result")
const again = document.getElementById("again")
again.addEventListener("click", startNewGame)
again.style.display = "none"


function startGame() {
    player1name.textContent = players[0].name
    player2name.textContent = players[1].name
    turn.textContent = players[0].name
    whoseTurn = players[0]

    cells.forEach(cell => {
        cell.addEventListener("click", (event) => handleClick(event))
    })

    startBtn.style.display = "none"
}

function handleClick(event) {
    if (gameState === true) return

    const wasSuccess = game.placeMarker(event.target.id, whoseTurn)
    if (!wasSuccess) {
        info.textContent = "That cell is already taken!"
        return
    }
    info.textContent = ""
    game.printBoard()
    placeMarkerUI(event)
    const isOver = checkIsGameOver()
    if (isOver) {
        again.style.display = "block"
        return
    }
    switchTurn(whoseTurn)
    turn.textContent = whoseTurn.name
}

function startNewGame() {
    result.textContent = ""
    turn.textContent = ""
    clearUi()
    game.clearBoard()
    whoseTurn = players[0]
    turn.textContent = whoseTurn.name
    gameState = false
}

function clearUi() {
    for (const cell of cells) {
        cell.textContent = empty;
    }
}

function placeMarkerUI(event) {
    event.target.textContent = whoseTurn.marker
}

function switchTurn(player) {
    whoseTurn = (player === players[0]) ? players[1] : players[0]
}

function checkIsGameOver() {
    if (isGameOver() === 1) {
        result.textContent = `Game over, ${whoseTurn.name} won the game!`;
        gameState = true
        return 1;
    }
    else if (isGameOver() === 2) {
        result.textContent = "Its a tie!";
        gameState = true
        return 1;
    }
    return 0
}

function isGameOver() {
    let lauta = game.getBoard()
    //horizontal check
    for (row of lauta) {
        if (row[0] === row[1] && row[1] === row[2] && row[0] != "") return 1;
    }

    //vertical check
    for (let i = 0; i < 3; i++) {
        if (lauta[0][i] === lauta[1][i] && lauta[1][i] === lauta[2][i] && lauta[0][i] != "") return 1;
    }

    //crisscross check
    if (lauta[0][0] === lauta[1][1] && lauta[1][1] === lauta[2][2] && lauta[0][0] != "") return 1;
    if (lauta[0][2] === lauta[1][1] && lauta[1][1] === lauta[2][0] && lauta[0][2] != "") return 1;

    //tie check
    let notEmptyCells = 0;
    for (row of lauta) {
        for (cell of row) {
            if (cell != empty) notEmptyCells += 1;
        }
        if (notEmptyCells === 9) return 2;
    }
    return 0;
}

const game = (function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = empty;
        } 
    }

    const getBoard = () => board;

    const placeMarker = (cell, player) => {
        const row = Math.floor((cell - 1) / 3);
        const col = (cell - 1) % 3;
        if (board[row][col] !== empty) {
            return false
        }
        board[row][col] = player.marker;
        return true
    }

    const clearBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = empty;
            } 
        }
    }

    const printBoard = () => {
        let boardConsole = "";
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (j != 2) {
                    boardConsole += board[i][j] + "|";
                }
                else {
                    boardConsole += board[i][j];
                } 
            }
            boardConsole += "\n";
        }
        console.log(boardConsole);
    }
    return {getBoard, placeMarker, printBoard, clearBoard};
})();

