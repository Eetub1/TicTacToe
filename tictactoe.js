const start = document.getElementById("start");
start.addEventListener("click", GameController);

const p1 = document.getElementById("player1");
const p2 = document.getElementById("player2");

const turn = document.getElementById("turn");

const result = document.getElementById("result");

const cells = document.querySelectorAll(".cell")

//what represents empty space on the board
const empty = "";

function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    /*for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = "";
        } 
    }*/

    const getBoard = () => board;

    const placeMarker = (cell, player) => {
        //pitäisi asettaa käyttöliittymään markkerin
        


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
        //TODO: laita täällä markkeri UI:hin.
        //paranna myös logiikkaa niin, että jos ruutu on varattu
        //niin seuraavaan vuoroon mennään vasta kun pelaaja saa
        //laitettua merkkinsä

    }

    //ei tarvita enää kun tehdään käyttöliittymää
    const printBoard = () => {
        for (const row of board) {
            console.log(row.join(" | "));
        }
        console.log(" ")
    }

    return {getBoard, placeMarker, printBoard};
}


function GameController() {
    const playerOneName = prompt("Give the name of player1: ");
    const playerTwoName = prompt("Give the name of player2: ");

    p1.textContent = playerOneName;
    p2.textContent = playerTwoName;

    const playerOneMarker = prompt("Give the marker of player1: ");
    const playerTwoMarker = prompt("Give the marker of player2: ");

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

    const board = GameBoard();

    let pelaaja = players[0];

    turn.textContent = `It's ${pelaaja.name}'s turn`;

    function switchPelaaja() {
        if (pelaaja === players[0]) {
            pelaaja = players[1];
        } else {
            pelaaja = players[0];
        }
    }

    function placeMarkerUI(cell, player) {
        for (const cell1 of cells) {
            if (cell1.id == cell) {
                cell1.textContent = player.marker;
            }
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

    function freezeGame() {
        document.querySelectorAll(".cell").forEach((cell, index) => {
            cell.id = `stopGame-${index}`;
        });
    }

    function handleCellClick(event) {
        const cell = event.target;
        const cellNum = cell.id;

        board.placeMarker(cellNum, pelaaja);
        //laitetaan pelaajan merkki klikattuun soluun
        //sekä lisätään se taulukkoon

        board.printBoard();
        
        placeMarkerUI(cellNum, pelaaja);

        if (isGameOver() === 1) {
            result.textContent = `Game over, ${pelaaja.name} won the game!`;
            freezeGame();
            return;
        }
        else if (isGameOver() === 2) {
            result.textContent = "Its a tie!";
            freezeGame();
            return;
        }
        // tarkista laudan tilanne

        switchPelaaja();
        //vaihda pelaaja
        turn.textContent = `It's ${pelaaja.name}'s turn`;

        
    }
    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });
    
    
}
