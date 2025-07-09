const board = document.getElementById("board");
const statusText = document.getElementById("status");

let cells = [];
let boardState = Array(9).fill(null);
let isGameOver = false;

function createBoard() {
  board.innerHTML = '';
  cells = [];
  boardState = Array(9).fill(null);
  isGameOver = false;
  statusText.textContent = "Your Turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", playerMove);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function playerMove(e) {
  const index = e.target.dataset.index;
  if (boardState[index] || isGameOver) return;

  boardState[index] = "⚡";
  cells[index].textContent = "⚡";
  if (checkGameEnd()) return;

  setTimeout(aiMove, 500);
}

function aiMove() {
  const emptyIndices = boardState
    .map((v, i) => (v === null ? i : null))
    .filter(v => v !== null);

  if (emptyIndices.length === 0) return;

  const aiChoice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  boardState[aiChoice] = "O";
  cells[aiChoice].textContent = "O";

  checkGameEnd();
}

function checkGameEnd() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      statusText.textContent = `${boardState[a]} Wins!`;
      isGameOver = true;
      return true;
    }
  }

  if (!boardState.includes(null)) {
    statusText.textContent = "Draw!";
    isGameOver = true;
    return true;
  }

  return false;
}

function restartGame() {
  createBoard();
}

createBoard();
