/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const WALKER_WIDTH = $("#walker").width();
  const WALKER_HEIGHT = $("#walker").height();
  const KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    A: 65,
    D: 68,
    W: 87,
    S: 83
  };
  
  // Game Item Objects
  var walker = Walker("walker", 0, 0, 0, 0, WALKER_WIDTH, WALKER_HEIGHT);
  var walker2 = Walker("walker2", BOARD_WIDTH - WALKER_WIDTH, BOARD_HEIGHT - WALKER_HEIGHT, 0, 0, WALKER_WIDTH, WALKER_HEIGHT);


  function Walker(id, xPos, yPos, speedX, speedY, width, height){
    let obj = {
      id: id,
      xPos: xPos,
      yPos: yPos,
      speedX: speedX,
      speedY: speedY,
      width: width,
      height: height,
    }
    return obj;
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
   repositionGameItem(walker);
   repositionGameItem(walker2);
   redrawGameItem(); 
   wallCollision();
   doCollide();
   result();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
      
      }
      if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
      
      }
      if (event.which === KEY.UP) {
      walker.speedY = -5;
      
      }
      if (event.which === KEY.DOWN) {
      walker.speedY = 5;
      
      }
      if (event.which === KEY.A) {
      walker2.speedX = -5;
      
      }
      if (event.which === KEY.D) {
      walker2.speedX = 5;
      
      }
      if (event.which === KEY.W) {
      walker2.speedY = -5;
      
      }
      if (event.which === KEY.S) {
      walker2.speedY = 5;
      
      }
      if (event.which === KEY.C){
        changeColor();
      }
    }
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
      walker.speedX = 0;  
    } 
      if (event.which === KEY.UP || event.which === KEY.DOWN) {
      walker.speedY = 0; 
      }
      if (event.which === KEY.A || event.which === KEY.D) {
      walker2.speedX = 0;  
    } 
      if (event.which === KEY.W || event.which === KEY.S) {
      walker2.speedY = 0; 
      }
    }
  


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem(obj) {
    obj.xPos += obj.speedX;
    obj.yPos += obj.speedY;
  };

  function redrawGameItem() {
    $("#walker").css("left", walker.xPos);
    $("#walker").css("top", walker.yPos);
    $("#walker2").css("left", walker2.xPos);
    $("#walker2").css("top", walker2.yPos);
  };
  function wallCollision() {
    if(walker.xPos > BOARD_WIDTH - WALKER_WIDTH){
      walker.xPos -= walker.speedX
    }
    if(walker.xPos < 0){
      walker.xPos -= walker.speedX
    }
    if(walker.yPos < 0){
      walker.yPos -= walker.speedY
    }
    if(walker.yPos > BOARD_HEIGHT - WALKER_HEIGHT){
      walker.yPos -= walker.speedY
    }
    if(walker2.xPos > BOARD_WIDTH - WALKER_WIDTH){
      walker2.xPos -= walker2.speedX
    }
    if(walker2.xPos < 0){
      walker2.xPos -= walker2.speedX
    }
    if(walker2.yPos < 0){
      walker2.yPos -= walker2.speedY
    }
    if(walker2.yPos > BOARD_HEIGHT - WALKER_HEIGHT){
      walker2.yPos -= walker2.speedY
    }
  }
  function doCollide(obj1, obj2) {
    obj1.leftX = obj1.xPos;
    obj1.topY = obj1.yPos;
    obj1.rightX = obj1.xPos + obj1.width;
    obj1.bottomY = obj1.yPos + obj1.height;
    // Do the same for square2
    obj2.leftX = obj2.xPos;
    obj2.topY = obj2.yPos;
    obj2.rightX = obj2.xPos + obj2.width;
    obj2.bottomY = obj2.yPos + obj2.height;
    // Return true if they are overlapping, false otherwise
	if(
    obj2.rightX > obj1.leftX &&
    obj2.leftX < obj1.rightX &&
    obj2.bottomY > obj1.topY &&
    obj2.topY < obj1.bottomY
      ){
      return true;
    }else{
        return false;
      }
    }
    function result(obj1, obj2){
      $("h2").text("Catch me if you can");
      if (doCollide(obj1, obj2)) {
        showResult(true);
    } else {
        showResult(false);
    }
    }

  

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
