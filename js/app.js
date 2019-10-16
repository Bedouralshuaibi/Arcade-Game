'use strict';


// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x +=  this.speed * dt;
    if (this.x > 505){
      this.x -= 500;
      this.speed = 50 + Math.floor(Math.random() * 350)

    }};
Enemy.prototype.checkCollisions = function() {
    let enemyLiftSide = this.x -50;  // create a shape for enemy wth add 50 /subtract 60 (on x and y axis)
    let enemyRightSide = this.x + 50; // chosing these number because the canvas size 505 * 606
    let enemyTopSide = this.y - 60;
    let enemyDownSide = this.y + 60;
    if (player.x >= enemyLiftSide && player.x <= enemyRightSide
       && player.y >= enemyTopSide && player.y <= enemyDownSide){
          player.x = 200;
          player.y = 410;
          var x = document.getElementById("snackbar2");
           x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
           console.log('restart after collision!');
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor(x, y){
   this.x = x;
   this.y = y;
   this.sprite = 'images/char-cat-girl.png';

  }

  render(){
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(allowedKeys) { /// put the player inside the canvas
     if (allowedKeys == 'left' && this.x > 0){
        this.x -= 100;
     }
     if (allowedKeys == 'right' && this.x < 400){
         this.x += 100;
     }
      if (allowedKeys == 'up' && this.y > 0){
        this.y -=90;
      }
      if (allowedKeys == 'down' && this.y < 400){
        this.y +=90;
      }

      if (this.y < 0){     /// won
         var x = document.getElementById("snackbar"); // won message
         x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
         setTimeout(restPlayer,1000); // rest player position
      }
            function restPlayer(){
              player.x = 200;
              player.y = 410;
              setTimeout(function(){ window.location.reload(); }, 200);
             }
     }
};

var Gem = function(x,y){
   this.x=x;
   this.y = y;
   this.image = 'images/Gem-Orange.png';
 }

Gem.prototype.render = function () {
ctx.drawImage(Resources.get(this.image), this.x, this.y);
 }
Gem.prototype.collected = function () {
   let gemLiftSide = this.x -50;
   let gemRightSide = this.x + 50;
   let gemTopSide = this.y - 60;
   let gemDownSide = this.y + 60;

   if (player.x >= gemLiftSide && player.x <= gemRightSide
      && player.y >= gemTopSide && player.y <= gemDownSide){
         this.x = '-100';
         this.y = '-100';
         console.log('gem Gon');
         var mes = document.getElementById("snackbar3");
          mes.className = "show";
         setTimeout(function(){ mes.className = mes.className.replace("show", ""); }, 900)

}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
let locationEnemiesOnY = [63, 145, 230];
locationEnemiesOnY.forEach(function(locationOnY){
  let enemy = new Enemy(0, locationOnY, 200);
   allEnemies.push(enemy);
});

var player = new Player(200,410);

let allGem = [];
let locationGem = [63, 104,230];
locationGem.forEach(function(){
  let x =  50 + Math.floor(Math.random() * 350);
  let y = 60 + Math.floor(Math.random() * 350);
  let gem = new Gem(x, y);
   allGem.push(gem);
});
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
