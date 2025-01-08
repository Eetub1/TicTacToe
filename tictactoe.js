
//this is an iife factory that returns the board object
const Gameboard = (() => {
    return {
        board: [
            ["-", "-", "-"],
            ["-", "-", "-"],
            ["-", "-", "-"]
        ],
    }
})();

//displayController
const DisplayController (() => {
    //method that takes coordinates of the board and places playerone marker on the spot
    //method that takes coordinates of the board and places playertwo marker on the spot
    return {//those methods};
})();

const playerOne = {
    name: "",
    marker: "X"
};

const playerTwo = {
    name: "",
    marker: "O"
};


function isGameOver() {

}