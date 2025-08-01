const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 20;

const board = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,1,0,1],
  [1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
canvas.width = board[0].length * tileSize;
canvas.height = board.length * tileSize;

const pacman = { x: 1, y: 1, dirX: 0, dirY: 0 };
let score = 0;

function drawBoard() {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 1) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        if (board[y][x] === 0) {
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(x * tileSize + tileSize/2, y * tileSize + tileSize/2, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
}

function drawPacman() {
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(pacman.x * tileSize + tileSize/2, pacman.y * tileSize + tileSize/2, tileSize/2 - 2, 0.25 * Math.PI, 1.75 * Math.PI);
  ctx.lineTo(pacman.x * tileSize + tileSize/2, pacman.y * tileSize + tileSize/2);
  ctx.fill();
}

function update() {
  const newX = pacman.x + pacman.dirX;
  const newY = pacman.y + pacman.dirY;

  if (board[newY][newX] !== 1) {
    pacman.x = newX;
    pacman.y = newY;
    if (board[newY][newX] === 0) {
      board[newY][newX] = 2;
      score++;
    }
  }
}

function gameLoop() {
  update();
  drawBoard();
  drawPacman();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') { pacman.dirX = 0; pacman.dirY = -1; }
  if (e.key === 'ArrowDown') { pacman.dirX = 0; pacman.dirY = 1; }
  if (e.key === 'ArrowLeft') { pacman.dirX = -1; pacman.dirY = 0; }
  if (e.key === 'ArrowRight') { pacman.dirX = 1; pacman.dirY = 0; }
});

drawBoard();
drawPacman();
requestAnimationFrame(gameLoop);
