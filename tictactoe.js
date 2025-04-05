const start = document.getElementById("start");
start.addEventListener("click", GameController);

const p1 = document.getElementById("player1");
const p2 = document.getElementById("player2");
const turn = document.getElementById("turn");
const result = document.getElementById("result");
const cells = document.querySelectorAll(".cell");

const empty = "";

function GameBoard() {
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
        if (cell == 1) {
            board[0][0] = player.marker;
        } 
        else if (cell == 2) {
            board[0][1] = player.marker;
        } 
        else if (cell == 3) {
            board[0][2] = player.marker;
        } 
        else if (cell == 4) {
            board[1][0] = player.marker;
        } 
        else if (cell == 5) {
            board[1][1] = player.marker;
        } 
        else if (cell == 6) {
            board[1][2] = player.marker;
        } 
        else if (cell == 7) {
            board[2][0] = player.marker;
        } 
        else if (cell == 8) {
            board[2][1] = player.marker;
        } 
        else if (cell == 9) {
            board[2][2] = player.marker;
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

    return {getBoard, placeMarker, printBoard};
}

function GameController() {
    const playerOneName = "e";
    const playerTwoName = "a";

    //tästä oma aliohjelmansa joka tekee tämän
    p1.textContent = playerOneName;
    p2.textContent = playerTwoName;

    const playerOneMarker = "e";
    const playerTwoMarker = "a";

    const players = [
        {
            name: playerOneName,
            marker: playerOneMarker
        },
        {
            name: playerTwoName,
            marker: playerTwoMarker 
        }
    ];
}
