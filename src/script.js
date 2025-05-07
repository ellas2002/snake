var blockSize = 35;
var rows = 20;
var cols = 20;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var snakeBody = [];

var gameOver = false;

var speedX = 1;
var speedY = 0;

var foodX = blockSize * 10;
var foodY = blockSize * 10;

let board, ctx, pattern;

const food = new Image();
food.src = 'img/newfruit.png';

const grass = new Image();
grass.src = "img/green.avif";

const snake = new Image();
snake.src = "img/lastpls.webp";

var gameInterval; // Store the game loop interval

function letsDoThis() {
    board = document.getElementById("gameboard");
    document.getElementById("restart-game").style.display = "none"; // Hide restart button\
    document.getElementById("start-game").style.display = "none"; // Hide restart button


    ctx = board.getContext("2d");

    board.height = rows * blockSize;
    board.width = cols * blockSize;

    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    snakeBody = [];
    gameOver = false;

    speedX = 1;
    speedY = 0;

    placeFood();
    document.addEventListener("keydown", UpdateSnake);
    
    // Clear the previous interval if there's one
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    // Start the game loop
    gameInterval = setInterval(update, 80);
};

function update() {
    if (gameOver) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, board.width, board.height);

    ctx.drawImage(food, foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    ctx.drawImage(snake, snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    endGame();
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function UpdateSnake(e) {
    if (e.code === "ArrowUp" && speedY !== 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.code === "ArrowDown" && speedY !== -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.code === "ArrowRight" && speedX !== -1) {
        speedX = 1;
        speedY = 0;
    } else if (e.code === "ArrowLeft" && speedX !== 1) {
        speedX = -1;
        speedY = 0;
    }
}

function endGame() {
    if (snakeX < 0 || snakeX >= cols * blockSize ||
        snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        alert("Game Over");
        document.getElementById("restart-game").style.display = "inline-block"; 
        clearInterval(gameInterval);
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
            document.getElementById("restart-game").style.display = "inline-block"; 
            clearInterval(gameInterval);
        }
    }
}

function restartGame() {
    clearInterval(gameInterval); 
    letsDoThis();
}