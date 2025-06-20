const board = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const closePopupBtn = document.getElementById("closePopupBtn");

let currentPlayer = "X";
let gameState = Array(9).fill("");
let gameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createBoard() {
  board.innerHTML = '';
  gameState = Array(9).fill("");
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    popupMessage.textContent = `🎉 Player ${currentPlayer} wins!`;
    popup.classList.remove("hidden");
    gameActive = false;
  } else if (gameState.every(cell => cell !== "")) {
    popupMessage.textContent = "🤝 It's a draw!";
    popup.classList.remove("hidden");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

restartBtn.addEventListener("click", createBoard);
closePopupBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  createBoard();
});

createBoard();
