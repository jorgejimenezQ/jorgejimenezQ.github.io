/**
 * Setup the game.
 */

var canvas = document.getElementById("little_canvas");
var ctx = canvas.getContext("2d");
const nodeSize = 10;
ctx.lineWidth = 0;
snakeCounter = 4;
maxFPS = 60;
gameover = false;

canvas.addEventListener("click", (e) => {
    start();
});

startGame();

var Food = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = "./img/sprites/food.png";
}

Food.prototype.draw = function() {
    ctx.drawImage(this.img, this.x, this.y, nodeSize, nodeSize);
}

var food = new Food(30, 30);

var snake = new Snake(50, 50);
for (let i = 0; i < 0; i++) {
    snake.append();
}


function update(delta) {

    if (snake.collision()) {
        // console.log("collided")
        gameover = true;
    } else {
        snake.update(delta);

        if (snake.ate(food)) {
            var x = Math.floor(Math.random() * canvas.width);
            x -= (x % 10);
            var y = Math.floor(Math.random() * canvas.height);
            y -= (y % 10);
            while (x == snake.head.x && y == snake.head.y) {
                x = Math.floor(Math.random() * canvas.width);
                x -= (x % 10);
                y = Math.floor(Math.random() * canvas.width);
                y -= (y % 10);
            }

            food.x = x;
            food.y = y;
            snake.append();
        }

        snake.timer++;
        if (snake.timer > snakeCounter) {
            snake.move();
            snake.timer = 0;
        }
    }
}

function draw(inter) {
    if (gameover) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.stroke();

        ctx.fillStyle = "WHITE";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 5, 50);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#c1c1c1';

        food.draw();
        snake.draw(inter);
    }
}

document.addEventListener('keydown', keyDownHandler, false);



function keyDownHandler(event) {
    // event.preventDefault()
    if (event.keyCode == 39) {
        event.preventDefault();
        snake.moveRight();
        rightPressed = true;
    } else if (event.keyCode == 37) {
        event.preventDefault();
        snake.moveLeft();
        leftPressed = true;
    }
    if (event.keyCode == 40) {
        event.preventDefault();
        snake.moveDown();
        downPressed = true;
    } else if (event.keyCode == 38) {
        event.preventDefault();
        snake.moveUp();
        upPressed = true;
    }
}

function startGame() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();

    ctx.fillStyle = "WHITE";
    ctx.font = "30px Arial";
    ctx.fillText("START GAME", 5, 50);

    ctx.font = "15px Arial";
    ctx.fillText("click anywhere to begin", 5, 90);
}

function gameover() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();

    ctx.fillStyle = "WHITE";
    ctx.font = "30px Arial";
    ctx.fillText("GAME OVER", 5, 50);
}