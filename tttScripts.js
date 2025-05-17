const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board; // Gets board - leaves actual board array private

    return { getBoard }

})();

console.log(Gameboard.getBoard);
