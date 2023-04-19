var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 125},
                { "type": "sawblade", "x": 600, "y": groundY - 10},
                { "type": "sawblade", "x": 900, "y": groundY - 125},
                { "type": "enemy", "x": 400, "y": groundY - 50},
                { "type": "reward", "x": 4000, "y": groundY - 100},
                { "type": "enemy", "x": 2000, "y": groundY - 50},
                { "type": "sawblade", "x": 2400, "y": groundY - 10},
                { "type": "enemy", "x": 2500, "y": groundY - 50},
                { "type": "firehydrant", "x": 1100, "y": groundY - 10},
                { "type": "firehydrant", "x": 2700, "y": groundY - 10},
                { "type": "reward", "x": 2800, "y": groundY - 100},
                { "type": "sawblade", "x": 2900, "y": groundY - 125},
                { "type": "sawblade", "x": 3000, "y": groundY - 10},
                { "type": "enemy", "x": 1300, "y": groundY - 50},
                { "type": "sawblade", "x": 1400, "y": groundY - 10},
                { "type": "sawblade", "x": 1600, "y": groundY - 125},
                { "type": "reward", "x": 1750, "y": groundY - 100},
                { "type": "enemy", "x": 3200, "y": groundY - 50},
                { "type": "firehydrant", "x": 3300, "y": groundY - 10},
                { "type": "sawblade", "x": 3400, "y": groundY - 125},
                { "type": "enemy", "x": 3500, "y": groundY - 50},
                { "type": "sawblade", "x": 3600, "y": groundY - 10},
                { "type": "sawblade", "x": 3800, "y": groundY - 125},
                { "type": "sawblade", "x": 3950, "y": groundY - 125},
                { "type": "enemy", "x": 4150, "y": groundY - 50},
                { "type": "sawblade", "x": 4050, "y": groundY - 10},
                { "type": "sawblade", "x": 4200, "y": groundY - 125},
                { "type": "reward", "x": 4400, "y": groundY - 10},
                { "type": "sawblade", "x": 4300, "y": groundY - 125},
                { "type": "enemy", "x": 4500, "y": groundY - 50},
                { "type": "firehydrant", "x": 4600, "y": groundY - 10},
                { "type": "enemy", "x": 4650, "y": groundY - 50},
                { "type": "sawblade", "x": 4700, "y": groundY - 125},
                { "type": "reward", "x": 4800,  "y": groundY - 100},
                { "type": "reward", "x": 4900, "y": groundY - 100},
                { "type": "reward", "x": 5000, "y": groundY - 100},

            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        // creates sawblades
        function createSawBlade (x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 40;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap("img/sawblade.png");
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        };
        // creates fire hydrants
        function createFireHydrant (x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 25;
            var fireHydrantHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            fireHydrantHitZone.x = x;
            fireHydrantHitZone.y = y;
            game.addGameItem(fireHydrantHitZone);
            var obstacleImage = draw.bitmap("img/firehydrant.jpg");
            fireHydrantHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        };
        // creates enemies
        function createEnemy(x, y){
            var enemy = game.createGameItem("enemy", 25);
            var hitMan = draw.bitmap("img/hitman2.jpg");
            hitMan.x = -25;
            hitMan.y = -25;
            enemy.addChild(hitMan);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -2;
            enemy.onPlayerCollision = function () {
                game.changeIntegrity(-10)
            };
            enemy.onProjectileCollision = function () {
                game.increaseScore(10);
                enemy.fadeOut();
            };
        }
        // creates fire hydrants code only works with this second function.
        function createFireHydrant (x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 25;
            var fireHydrantHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            fireHydrantHitZone.x = x;
            fireHydrantHitZone.y = y;
            game.addGameItem(fireHydrantHitZone);
            var obstacleImage = draw.bitmap("img/firehydrant.jpg");
            fireHydrantHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
            // creates rewards
            function createReward(x, y) {
                var reward = game.createGameItem("reward", 25);
                var bolts = draw.bitmap("img/bolts2.jpg");
                damageFromObstacle = 50;
                bolts.x = -25;
                bolts.y = -25;
                reward.addChild(bolts);
                reward.x = x;
                reward.y = y;
                game.addGameItem(reward);
                reward.velocityX = -2;
                reward.onPlayerCollision = function () {
                    game.changeIntegrity(+50);
                    reward.fadeOut();
                    game.increaseScore(25);
            };
        }
        // loop that calls the game items
        for(var i = 0; i < levelData.gameItems.length; i++ ){
            var gameItem = levelData.gameItems[i];

            if(gameItem.type === "sawblade"){
                createSawBlade(gameItem.x, gameItem.y);
            }
            else if (gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y);
            }
            else if (gameItem.type === "reward"){
                createReward(gameItem.x, gameItem.y);
            }
            else if (gameItem.type === "firehydrant"){
                createFireHydrant(gameItem.x, gameItem.y);
            }
        }
        
        
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
