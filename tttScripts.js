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

function gamePlayer (name, marker, score) { // Factory function for players
    return { name, marker, score };
};

const gameController = (function () {
    const board = Gameboard.getBoard(); // Pulls board array

    const playerOne = gamePlayer("Player One", "X", 0);

    const playerTwo = gamePlayer("Player Two", "O", 0);

    let activePlayer = playerOne; // Player One starts first

    let gameOver = false; // Game is not over by default

    const resetGame = () => {
        Gameboard.resetBoard(); // Clears board array
        activePlayer = playerOne; // Default player set
        gameOver = false; // Game is not over
    }

    const swapPlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
        console.log(activePlayer)
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
            activePlayer.score++;
            console.log("round over")
            screenController.screenUpdate();
            screenController.updateMessage(`${activePlayer.name} is the winner!`)
            return; // Stops playRound
        }

        if (checkTie()) {
            gameOver = true;
            Gameboard.refreshBoard();
            console.log("tie game");
            screenController.updateMessage("Tie game. Go again!")
            return; // Stops playRound
        }

        else {
            swapPlayer();
            screenController.updateMessage(`${activePlayer.name}, it's your turn!`)
            screenController.boardDisplay();
        }
    }

    const getActivePlayer = () => activePlayer;
    const getGameOver = () => gameOver;
    const getPlayerOne = () => playerOne;
    const getPlayerTwo = () => playerTwo;

    return {
        resetGame, playRound, getActivePlayer, getGameOver, getPlayerOne, getPlayerTwo
    }

})();

const screenController = (function () {
    const activePlayer = gameController.getActivePlayer();
    const announceDiv = document.getElementById("player-announce-div");

    const playerOneDiv = document.getElementById("player-one-info");
    const playerTwoDiv = document.getElementById("player-two-info");
    const playerOne = gameController.getPlayerOne();
    const playerTwo = gameController.getPlayerTwo();

    const cells = document.querySelectorAll(".cell");

    const newGameBtn = document.getElementById("new-game-button");

    const screenUpdate = () => {
        announceDiv.textContent = `${activePlayer.name}, it's your turn!`

        playerOneDiv.textContent = `Player One: ${playerOne.score}`
        playerTwoDiv.textContent = `Player Two: ${playerTwo.score}`
    }

    const boardDisplay = () => {
        const board = Gameboard.getBoard(); // Board array

        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        })
    }

    const cellClick = (event) => {
        const index = event.target.dataset.index
        if (Gameboard.getBoard()[index] === "") {
            gameController.playRound(index);
        }
    }

    const updateMessage = (message) => {
        announceDiv.textContent = message
    }

    const restartGame = () => {
        Gameboard.resetBoard();
        boardDisplay();
        gameController.resetGame();
        updateMessage(`New game, go ${activePlayer.name}!`)
    }

    screenUpdate();

    cells.forEach(cell => cell.addEventListener("click", cellClick));

    newGameBtn.addEventListener("click", restartGame);

    return {
        boardDisplay, screenUpdate, updateMessage, 
    }
})();
