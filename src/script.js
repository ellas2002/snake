//design game Board
var blockSize =  25;
var rows = 20;
var cols = 20;


var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var snakeBody = [];
var gameOver = false;


var speedX = 1;
var speedY = 1;

var foodX = blockSize * 10;
var foodY = blockSize * 10;


window.onload = function(){
    boardHeight = rows * blockSize;
    boardWidth = cols * blockSize;
    board = document.getElementById("gameboard");
    ctx = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", UpdateSnake);
    //snakeHungry();
    update();
    setInterval(update, 100);

}
    

function update(){
    if (gameOver){
        return
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, boardWidth, boardHeight);

    ctx.fillStyle = "yellow";
    ctx.fillRect(foodX, foodY, blockSize, blockSize);


    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY]);
        placeFood();
    }

    for(let i = snakeBody.length - 1; i > 0;  i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    ctx.fillStyle = "green";
    ctx.fillRect(snakeX, snakeY, blockSize, blockSize);


    for(let i = 0; i < snakeBody.length; i++){
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);

    }

    if (snakeX < 0 || snakeX > cols*blockSize ||snakeY < 0 || snakeY >rows*blockSize){
        gameOver = true;
        alert("Game Over");
    }
    
    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver= true;
            alert("game over");
        }
    }
    
}


function placeFood(){
    foodX = Math.floor(Math.random() * rows) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}


function UpdateSnake(e){
    if (e.code == "ArrowUp"){
        speedY = -1;
        speedX = 0;
    }else if (e.code == "ArrowDown"){
        speedY = +1;
        speedX = 0;
    }else if (e.code == "ArrowRight"){
        speedY = 0;
        speedX = +1;
    }else if (e.code == "ArrowLeft"){
        speedY = 0;
        speedX = -1;
    }
}

    
