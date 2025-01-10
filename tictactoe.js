
function Gameboard () {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(" ");
        }
      }
    console.log(board);

    //returns the board object
    const getBoard = () => board;

    //this method is used to place a players marker on the board
    const placeMarker 

    //prints the whole board in console
    //this is not needed when building the UI
    const printBoard = () => {
        const boardCellValues = board.map((row) => row.map((cell) =>
        cell.getValue()))
        console.log(boardCellValues)
    };

    return { getBoard, printBoard};
}

Gameboard();