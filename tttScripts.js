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

    const isEmpty = (index) => {   // Can check to see if an array index is empty or not
        if (board[index] === "") {
            return true;
        }

        else {
            return false;
        }
    }

    return { 
        getBoard, placeMarker, resetBoard, isEmpty
    }

})();

function gamePlayer (name, marker) { // Factory function for players
    return { name, marker };
};

const gameController = (function () {
    const board = Gameboard.getBoard(); // Pulls board array

    const playerOne = gamePlayer("Player One", "X");

    const playerTwo = gamePlayer("Player Two", "O");

    let activePlayer = playerOne; // Player One starts first

    let gameOver = false; // Game is not over by default

    const resetGame = () => {
        Gameboard.resetBoard(); // Clears board array
        activePlayer = playerOne; // Default player set
        gameOver = false; // Game is not over
    }

    return {
        resetGame
    }

})();

console.log(Gameboard.getBoard()); // Testing
gameController.resetGame();
console.log(Gameboard.getBoard());
