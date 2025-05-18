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

let chris = gamePlayer("Chris", "Z"); // Testing

console.log(`${chris.name}'s marker is ${chris.marker}.`)
