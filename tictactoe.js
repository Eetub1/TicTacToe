let players = [
    {
        name: "",
        marker: ""
    },
    {
        name: "",
        marker: "" 
    }
];


const start = document.getElementById("start");
start.addEventListener("click", () => GameController());

const closeBtn = document.getElementById("close");
closeBtn.addEventListener("click", () => popup.close());
const form = document.getElementById("form");

const again = document.getElementById("again");
again.style.display = 'none';
again.addEventListener("click", newGame);

const popup = document.querySelector("dialog");

const p1 = document.getElementById("player1");
const p2 = document.getElementById("player2");
const turn = document.getElementById("turn");
const result = document.getElementById("result");
const cells = document.querySelectorAll(".cell");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const playerOneName = document.getElementById("player1name").value;
    const playerTwoName = document.getElementById("player2name").value;
    const playerOneMarker = document.getElementById("player1marker").value;
    const playerTwoMarker = document.getElementById("player2marker").value;

    players[0].name = playerOneName;
    players[0].marker = playerOneMarker;
    players[1].name = playerTwoName;
    players[1].marker = playerTwoMarker;

    p1.textContent = players[0].name;
    p2.textContent = players[1].name;
    
    form.reset();
    popup.close();
})

const empty = "";
let gameOver = false;

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
        if (gameOver === true) return;
        const row = Math.floor((cell - 1) / 3);
        const col = (cell - 1) % 3;
        board[row][col] = player.marker;
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
        if (gameOver === true) return;
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


function startGame() {
    p1.textContent = players[0].name;
    p2.textContent = players[1].name;
}


function placeMarkerUI(cell, player) {
    if (gameOver === true) return;
    for (const cell1 of cells) {
        if (cell1.id == cell) {
            cell1.textContent = player.marker;
        }
    }
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


function checkIsGameOver(pelaaja) {
    if (gameOver === true) return;
    if (isGameOver() === 1) {
        result.textContent = `Game over, ${pelaaja.name} won the game!`;
        gameOver = true;
        again.style.display = 'block';
        return 1;
    }
    else if (isGameOver() === 2) {
        result.textContent = "Its a tie!";
        again.style.display = 'block';
        gameOver = true;
        return 1;
    }
    return 0;
}


function clearUi() {
    for (const cell of cells) {
        cell.textContent = empty;
    }
}


function newGame() {
    game.clearBoard();
    clearUi();
    gameOver = false;
    result.textContent = "";
    GameController();
}


function switchPelaaja(pelaaja) {
    if (pelaaja === players[0]) {
        pelaaja = players[1];
    } else {
        pelaaja = players[0];
    }
    return pelaaja
}


function GameController() {
    if (players[0].name === "") popup.show();
    let pelaaja = players[0];
    turn.textContent = `It's ${pelaaja.name}'s turn`;

    startGame();

    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", function handleClick(event) {
            const cellNum = event.target.id;

            game.placeMarker(cellNum, pelaaja);
            game.printBoard();
            placeMarkerUI(cellNum, pelaaja);

            const num = checkIsGameOver(pelaaja); 
            if (num === 1) return;

            pelaaja = switchPelaaja(pelaaja);
            turn.textContent = `It's ${pelaaja.name}'s turn`;
        });
    });
}