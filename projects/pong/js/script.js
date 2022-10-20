/**
 * @Author Jorge Jimenez
 * @jimenezjorge717@gmail.com
 */
 
const paddleW   = 10;
const paddleH   = 100;
const WIN_SCORE = 3

var winScreen   = false;
var canvas;
var canvasContext;
var ballX       = 50;
var ballY       = 50;
var speedY      = 4;
var speedX      = 10;
var ballSize    = 10;
var paddle1Y    = 400;
var paddle2Y    = 400;

function Player( score ){
    this.score = score;
}

var player   = new Player( 0 );
var computer = new Player( 0 );

// mouse clicked
function mouseClick( evt ){
    if ( winScreen ){
        player.score   = 0;
        computer.score = 0;
        
        winScreen = false;
    }
}

window.onload = function() {
    canvas        = document.getElementById( 'gameCanvas' );
    canvasContext = canvas.getContext( '2d' );
    
    framesPerSecond = 30;
    setInterval( function(){
        move();
        draw();
    }, 1000/framesPerSecond );
    
    canvas.addEventListener( 'mousemove',
        function( evt ){
            var mousePos = calculateMousePos( evt );
            paddle1Y = mousePos.y - ( paddleH / 2 );
    });
    
    canvas.addEventListener( 'mousedown', mouseClick );
    canvasContext.font = "50px Arial";
};

// draws all the shape on the canvas
function draw(){
    
    console.log(speedX, speedY);
    // canvas, black
    drawRect( 0, 0, canvas.width, canvas.height, 'black' );
    
    // display win screen
    if ( winScreen ){
        canvasContext.fillStyle = 'white';        
        if ( player.score >= WIN_SCORE ){
            
            canvasContext.fillText( "You Won!!!", canvas.width/3, 100 );
        }else if ( computer.score >= WIN_SCORE ){
            
            canvasContext.fillText( "You lost :(", canvas.width/3, 100 );
        }
        

        canvasContext.fillText( "Click to continue", canvas.width/3, canvas.height/2 );
        return;
    }

    // draw net 
    net();
    
    // ball circle, red
    drawCircle( ballX, ballY, 'white' );
    
    // draw paddles 
    paddle( 0, paddle1Y );
    paddle( canvas.width - paddleW, paddle2Y);
    
    canvasContext.fillText( player.score, 100, 100 );
    canvasContext.fillText( computer.score, 700, 100 );
}

// starts the ball moving on the canvas
function move(){
    
    if ( winScreen ){
        return;
    }
    computerMove();
    //zombie();
    
    boundaries();
    
    ballX  += speedX;
    ballY  += speedY;
}

// draws net 

function net(){
    for ( var i = 0; i < canvas.height; i += 40 ){
            drawRect( canvas.width / 2 - 1, i, 2, 10, 'white' );
    }
}
function boundaries(){
    var deltaY;
    // collision top and bottom
    if ( ballY > ( canvas.height - ballSize ) || ballY < 0 ){
        speedY *= -1;
    }
    
    // collision right boundary
    if ( ballX < 0 ){
        if ( ballY > paddle1Y && ballY < ( paddle1Y + paddleH ) ){
            deltaY = ballY 
                - ( paddle1Y + paddleH / 2);
            speedY = deltaY * 0.35;
            speedX *= -1;
        }
        else{
            computer.score++;
            resetBall();
        }
    }
    
    // collision left boundary
    if ( ballX > ( canvas.width - ballSize ) ){
        if ( ballY > paddle2Y && ballY < ( paddle2Y + paddleH) ){
            deltaY = ballY 
                - ( paddle2Y + paddleH / 2);
            speedY = deltaY * 0.35;
            speedX *= -1;
        }
        else{
            player.score++;
            resetBall();   
        }
    }
}

function calculateMousePos( evt ) {
    
    var rect   = canvas.getBoundingClientRect();
    var root   = document.documentElement;
    
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    
    return{
        x: mouseX,
        y: mouseY
    };
    
}

// AI for the computer paddle
function zombie(){
    var paddleCenter = paddle1Y + ( paddleH / 2 );
    var ballOffSet = 35;
    if ( paddleCenter < ( ballY - ballOffSet ) )
        paddle1Y += 6;
    else if ( paddleCenter > ( ballY + ballOffSet ) )
        paddle1Y -= 6;
}
// AI for the computer paddle
function computerMove(){
    var paddleCenter = paddle2Y + ( paddleH / 2 );
    var ballOffSet = 35;
    if ( paddleCenter < ( ballY - ballOffSet ) )
        paddle2Y += 6;
    else if ( paddleCenter > ( ballY + ballOffSet ) )
        paddle2Y -= 6;
}

function paddle( x, y){
    drawRect( x, y, paddleW, paddleH, 'white' );
}

// draws a circle on the canvas
function drawCircle( x, y , color ){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc( x, y, 10, 0, Math.PI*2, true );
    canvasContext.fill();
}

// draws a rectangle on the canvas
function drawRect( x, y, width, height, color ){
    
    canvasContext.fillStyle = color;
    canvasContext.fillRect( x, y, width, height);
}

// resets the ball 
function resetBall(){
    
    if ( player.score >= WIN_SCORE || computer.score >= WIN_SCORE )
        winScreen      = true;
    
    paddle2Y = canvas.height / 2 + paddleW;
    speedX *= -1; 
    ballX = canvas.width / 2;
    ballY = canvas.width / 2;
}