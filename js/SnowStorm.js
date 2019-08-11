function SnowStorm(game, key, scale, rotation, velocityX, velocityY) {
  // call to Phaser.Sprite
    Phaser.Sprite.call(this, game, game.rnd.integerInRange(10, game.world.width - 10), game.rnd.integerInRange(10, game.world.height - 10), key);
    

  // add properties to the snow
  this.anchor.set(0.5);
  this.scale.x = scale;
  this.scale.y = scale;
  this.rotation = rotation;
  this.alpha = 0.5;
  // enable physice to the snow object
  game.physics.enable(this);
  this.body.collideWorldBounds = false;
  this.body.angularVelocity = game.rnd.integerInRange(-150, 300);
  this.body.velocity.x = velocityX;
  this.body.velocity.y = velocityY;

  console.log('Snow Storm Made');
}
// inherit prototype from Phaser.Sprite and set constructor to Snow Storm
// the Object.create method creates a new object w/ the specified prototype object and properties
SnowStorm.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
SnowStorm.prototype.constructor = SnowStorm;

SnowStorm.prototype.update = function() {

  //if the sonw leave the screen, it will goes back
  //for x axis
  if (this.x > game.world.width){
    this.x = 0;
  } else if (this.x < 0){
    this.x = game.world.width;
    } 
  //for y axis
  if (this.y > game.world.height) {
        this.y = 0;
  } else if (this.y < 0) {
        this.y = game.world.height;
  } 
  //if player hit R, the snows change its direction
    if (game.input.keyboard.justPressed(Phaser.Keyboard.R)) {
        console.log('R is down, changing snow X velocity');
        this.body.velocity.x = -(this.body.velocity.x);
    }
}
