const game = document.getElementById("board");
const points = document.getElementById("points");
const context = game.getContext("2d");

const grid = 16;
let count = 0;
let score = 0;

const snake = {
  x: 160,
  y: 160,

  dx: grid,
  dy: 0,

  segments: [],
  actualLength: 1,
};
var award = {
  x: 320,
  y: 320,
};

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 6) {
    return;
  }
  count = 0;
  context.clearRect(0, 0, game.width, game.height);
  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = game.width - grid;
  } else if (snake.x >= game.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = game.height - grid;
  } else if (snake.y >= game.height) {
    snake.y = 0;
  }
  snake.segments.unshift({ x: snake.x, y: snake.y });

  if (snake.segments.length > snake.actualLength) {
    snake.segments.pop();
  }
  context.fillStyle = "green";
  context.fillRect(award.x, award.y, grid - 1, grid - 1);
  context.fillStyle = "gray";
  snake.segments.forEach(function (segment, index) {
    context.fillRect(segment.x, segment.y, grid - 1, grid - 1);
    if (segment.x === award.x && segment.y === award.y) {
      snake.actualLength++;
      score++;
      points.textContent = score;
      award.x = randomNumber(0, 25) * grid;
      award.y = randomNumber(0, 25) * grid;
    }

    for (var i = index + 1; i < snake.segments.length; i++) {
      if (
        segment.x === snake.segments[i].x &&
        segment.y === snake.segments[i].y
      ) {
        snake.x = 160;
        snake.y = 160;
        snake.segments = [];
        snake.actualLength = 1;
        snake.dx = grid;
        snake.dy = 0;
        score = 0;
        points.textContent = score;
        award.x = randomNumber(0, 25) * grid;
        award.y = randomNumber(0, 25) * grid;
      }
    }
  });
}

document.addEventListener("keydown", function (e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

requestAnimationFrame(loop);
