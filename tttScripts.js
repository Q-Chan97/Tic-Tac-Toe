const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

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

    const refreshBoard = () =>{ // This will console log board state
        console.log(board)
    };

    return { 
        getBoard, placeMarker, resetBoard, isEmpty, refreshBoard
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

    const swapPlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    const checkWin = () => {
        const activeMarker = activePlayer.marker;

        return (
            // Horizontal wins
            (board[0] == activeMarker && board[1] == activeMarker && board[2] == activeMarker) ||
            (board[3] == activeMarker && board[4] == activeMarker && board[5] == activeMarker) ||
            (board[6] == activeMarker && board[7] == activeMarker && board[8] == activeMarker) ||
            // Vertical wins
            (board[0] == activeMarker && board[3] == activeMarker && board[6] == activeMarker) ||
            (board[1] == activeMarker && board[4] == activeMarker && board[7] == activeMarker) ||
            (board[2] == activeMarker && board[5] == activeMarker && board[8] == activeMarker) ||
            // Diagonal wins
            (board[0] == activeMarker && board[4] == activeMarker && board[8] == activeMarker) ||
            (board[2] == activeMarker && board[4] == activeMarker && board[6] == activeMarker)
        );
    };

    const checkTie = () => board.every(index => index !== ""); // Returns true (tie game) if every index has a value

    const playRound = (index) => {
        if (gameOver) {
            return; // Stops playRound
        }

        Gameboard.placeMarker(index, activePlayer.marker);

        if (checkWin()) {
            gameOver = true;
            Gameboard.refreshBoard();
            return; // Stops playRound
        }

        if (checkTie()) {
            gameOver = true;
            Gameboard.refreshBoard();
            return; // Stops playRound
        }

        else {
            swapPlayer();
            Gameboard.refreshBoard();
        }
    }

    const getActivePlayer = () => activePlayer;
    const getGameOver = () => gameOver;

    return {
        resetGame, playRound, getActivePlayer, getGameOver
    }

})();

const screenController = (function () {
    const activePlayer = gameController.getActivePlayer();
    const announceDiv = document.getElementById("player-announce-div");

    const screenUpdate = () => {
        announceDiv.textContent = `${activePlayer.name} it's your turn!`
    }

    return {
        screenUpdate
    }
})();
