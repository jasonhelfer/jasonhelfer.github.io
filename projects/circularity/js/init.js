var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle; // variable for a single circle
        var circles = []; // variable to hold every circle in an array


        // TODO 2 : Create a function that draws a circle 
        function drawCircle() {
            // code to draw circle
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);
            physikz.addRandomVelocity(circle, canvas);
            view.addChild(circle);
            circles.push(circle);
        }

        // TODO 3 / 7 : Call the drawCircle() function 
        // loop that makes 100 circles
        for (var loopsCompleted = 0; loopsCompleted < 100; loopsCompleted++){
            drawCircle();
        }
       

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
           // deleted for array
            

            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
          // deleted for array

            // TODO 9 : Iterate over the array
            // loop that makes the new circles move and stay inbounds
           for (var i = 0; i < circles.length; i++) {
            var eachCircle = circles[loopsCompleted];
            var eachCircle = circles[i];
            physikz.updatePosition(circles[i]);
            game.checkCirclePosition(circles[i]);
           }
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) {
                circle.x = 0;
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            // if the circle goes past the left of the screen place it on the right
            if ( circle.x < canvas.length ) {
                circle.x = 0;
            }
            // if the circle goes past the bottom place it on the top
            if ( circle.y > canvas.width ) {
                circle.y = 0;
            }
            // if the circle goes past the top place it at the bottom
            if ( circle.y < canvas.length ) {
                circle.y = 0;
            }
        }    

            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
