const start = document.getElementById("start");

start.addEventListener("click", GameController);

function GameBoard() {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    const getBoard = () => board;

    const placeMarker = (row, column, players, player) => {
        if (board[row][column] === "") {
            board[row][column] = players[player].token;
        } else {
            console.log("That spot is already taken! As a punishment, its now your opponents turn!");
        }
    }

    const printBoard = () => {
        for (let row of board) {
            console.log(row.join(" | "));
        }
    }

    return {getBoard, placeMarker, printBoard};
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
        //horizontal check
        for (row of board.getBoard()) {
            if (row[0] === row[1] && row[1] === row[2] && row[0] != "") return true;
        }

        //vertical check

        //crisscross check

        return false;
    }

    while (true) {
        console.log(`Its ${turn}'s turn to place a marker`);
        let row = prompt("Row: ");
        let column = prompt("column: ");

        const playerIndex = turn === players[0].name ? 0 : 1;
        board.placeMarker(row, column, players, playerIndex);
        //Nyt jos laitetaan paikkaan jossa on jo markkeri, mennään
        //suoraan uudelle kierrokselle, muista korjata
        
        board.printBoard();

        if (isGameOver() === true) break;

        switchTurns();
    }
    //TODO: tee tarkempi viesti josta näkee kumpi voitti
    console.log(`Game over, ${turn} won the game!`)
}
