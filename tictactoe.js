const start = document.getElementById("start");
start.addEventListener("click", GameController);

const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
    cell.addEventListener("click", addMove);
})

//what represents empty space on the board
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

    const placeMarker = (row, column, players, player) => {
        if (board[row][column] === "") {
            board[row][column] = players[player].token;
        } else {
            console.log("That spot is already taken! As a punishment, its now your opponents turn!");
        }
    }

    //ei tarvita enää kun tehdään käyttöliittymää
    const printBoard = () => {
        for (let row of board) {
            console.log(row.join(" | "));
        }
    }

    function drawOnScreen() {
        for (let i = 0; i < cells.length; i++) {
            let row = Math.floor(i / 3);
            let col = i % 3;
            cells[i].textContent = board[row][col];
        }
    }

    return {getBoard, placeMarker, printBoard, drawOnScreen};
}


function GameController() {

    const playerOneName = prompt("Give the name of player1: ");
    const playerTwoName = prompt("Give the name of player2: ");

    const playerOneMarker = prompt("Give the marker of player1: ");
    const playerTwoMarker = prompt("Give the marker of player2: ");

    const players = [
        {
            name: playerOneName,
            token: playerOneMarker
        },
        {
            name: playerTwoName,
            token: playerTwoMarker 
        }
    ];

    const board = GameBoard();

    let turn = players[0].name;

    function switchTurns() {
        if (turn === players[0].name) {
            turn = players[1].name
        } else {
            turn = players[0].name
        }
    }

    function isGameOver() {
        let lauta = board.getBoard()
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


    //silmukka joka pyörittää peliä
    while (true) {
        console.log(`Its ${turn}'s turn to place a marker`);
        let row = prompt("Row: ");
        let column = prompt("column: ");

        const playerIndex = turn === players[0].name ? 0 : 1;
        board.placeMarker(row, column, players, playerIndex);
        //Nyt jos laitetaan paikkaan jossa on jo markkeri, mennään
        //suoraan uudelle kierrokselle, muista korjata
        
        board.printBoard();

        if (isGameOver() === 1) {
            console.log(`Game over, ${turn} won the game!`);
            break;
        }
        else if (isGameOver() === 2) {
            console.log("Its a tie!");
            break;
        }

        switchTurns();
        board.drawOnScreen();
    }
    
}
