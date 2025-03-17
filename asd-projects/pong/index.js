/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const PADDLE_HEIGHT = $("#paddleLeft").height();
  const BALL_HEIGHT = $("#ball").height();
  const BALL_WIDTH = $("#ball").width();
  // Game Item Objects
  const KEY = {
    "W": 87,
    "S": 83,
    "UP": 38,
    "DOWN": 40,
  }


  function GameItem(id, speedX, speedY){
    var obj = {
      id: id,
      x: parseFloat($(id).css("left")),
      y: parseFloat($(id).css("top")),
      speedX: speedX,
      speedY: speedY,
      w: $(id).width(),
      h: $(id).height(),
    }
    return obj
  }

  var paddleLeft = GameItem("#paddleLeft", 0, 0);
  var paddleRight = GameItem("#paddleRight", 0, 0);
  var ball = GameItem("#ball",(Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1), (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1) )
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawGameItem(paddleLeft);
    updateGameItem(paddleLeft);
    drawGameItem(paddleRight);
    updateGameItem(paddleRight);
    paddleWallCollision(paddleLeft);
    paddleWallCollision(paddleRight);
    drawGameItem(ball);
    updateGameItem(ball);
    ballWallCollision(ball);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      paddleLeft.speedY = -5;
    }
    if(event.which === KEY.S){
      paddleLeft.speedY = 5;
    }
    if(event.which === KEY.UP){
      paddleRight.speedY = -5;
    }
    if(event.which === KEY.DOWN){
      paddleRight.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if(event.which === KEY.W){
      paddleLeft.speedY = 0;
    }
    if(event.which === KEY.S){
      paddleLeft.speedY = 0;
    }
    if(event.which === KEY.UP){
      paddleRight.speedY = 0;
    }
    if(event.which === KEY.DOWN){
      paddleRight.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  // Movement Helper
  function drawGameItem(obj){
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  function updateGameItem(obj){
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  }
  
  function paddleWallCollision(obj){
    if(obj.y > BOARD_HEIGHT - PADDLE_HEIGHT){
      obj.speedY = 0;
      obj.y = BOARD_HEIGHT - PADDLE_HEIGHT;
  }
  if(obj.y < 0){
    obj.speedY = 0;
    obj.y = 0;
  }
}
function ballWallCollision(obj){
  if(obj.y > BOARD_HEIGHT - BALL_HEIGHT){
    obj.speedY = -obj.speedY;
}
if(obj.y < 0){
  obj.speedY = -obj.speedY;
}
if(obj.x > BOARD_WIDTH - BALL_WIDTH){
  obj.speedX = -obj.speedX;
}
if(obj.x < 0){
  obj.speedX = -obj.speedX;
}
}

//check boundaries of paddles
//handle what happens when ball hits the walls
//handle what happpens when the ball hits the paddles
//handle what happens when someone wins
//handles the points
//handles resetting the game


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
