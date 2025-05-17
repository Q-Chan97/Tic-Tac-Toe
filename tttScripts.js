const Gameboard = (function () {
    const board = ["x", "x", "x", "x", "o", "o", "o", "o", "o"]; // Filled with dummy markers

    const getBoard = () => board; // Gets board - leaves actual board array private

    const placeMarker = (index, marker) => { // Places player marker at index position
        board[index] = marker;
    };

    const resetBoard = () => { // Loop through board, reset cells
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
            console.log("clear");
        }
    };

    return { 
        getBoard, placeMarker, resetBoard
    }

})();

console.log(Gameboard.getBoard);
