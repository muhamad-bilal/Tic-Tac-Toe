const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const markSquare = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true; // Successful mark
        }
        return false; // Square already taken
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    const checkWinner = (mark) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];
        return winPatterns.some(pattern => pattern.every(index => board[index] === mark));
    };

    const checkTie = () => board.every(square => square !== "");

    return { getBoard, markSquare, resetBoard, checkWinner, checkTie };
})();

const Player = (name, mark) => {
    return { name, mark };
};

const Game = (function () {
    let players = [];
    let currentPlayerIndex = 0;

    const startGame = (player1Name, player2Name) => {
        players = [Player(player1Name, "X"), Player(player2Name, "O")];
        currentPlayerIndex = 0;
        Gameboard.resetBoard();
        // Call displayController.renderBoard() here to update the display
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const switchPlayer = () => {
        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
    };


 const handleTurn = (index) => {
    if (gameOver || !Gameboard.markSquare(index, getCurrentPlayer().mark)) return;
    displayController.renderBoard();

    if (Gameboard.checkWinner(getCurrentPlayer().mark)) {
      gameOver = true;
      displayController.updateStatus(`${getCurrentPlayer().name} wins!`);
    } else if (Gameboard.checkTie()) {
      gameOver = true;
      displayController.updateStatus("It's a tie!");
    } else {
      switchPlayer();
      displayController.updateStatus(`${getCurrentPlayer().name}'s turn`);
    }
  };

  return { startGame, getCurrentPlayer, handleTurn };
})();

const displayController = {
  renderBoard: () => {
    const board = Gameboard.getBoard();
    const squares = document.querySelectorAll(".square");
    squares.forEach((square, index) => {
      square.textContent = board[index];
      square.addEventListener("click", () => Game.handleTurn(index)); 
    });
  },

  updateStatus: (message) => {
    document.getElementById("status").textContent = message;
  },
};

// Event listener for starting the game (example)
document.getElementById("startGameBtn").addEventListener("click", () => {
  const player1Name = document.getElementById("player1Name").value;
  const player2Name = document.getElementById("player2Name").value;
  Game.startGame(player1Name, player2Name);
});

