const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board; // Gets board - leaves actual board array private

    const placeMarker = (index, marker) => { // Places player marker at index position
        board[index] = marker;
    };

    return { 
        getBoard, placeMarker
    }

})();

console.log(Gameboard.getBoard);
