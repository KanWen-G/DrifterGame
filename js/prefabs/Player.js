function Player(game,x,y) {
    //new Sprite(game, x, y, key, frame)
    Phaser.Sprite.call(this, game,x, y, 'player');
	// Sprite setting
    this.anchor.set(0.5, 0.5);
	//physics
	game.physics.enable(this);
    this.body.collideWorldBounds = true;
    //this.body.setSize();
    this.maxSpeedNormal = new Phaser.Point(250, 10000);
    this.body.maxVelocity = this.maxSpeedNormal;
    this.maxSpeedShift = new Phaser.Point(500, 10000);
    this.accel = 500;
    this.body.gravity.y = 4000;
    this.pause = false;
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override Phaser.Sprite update (to spin the diamond)
Player.prototype.update = function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
        this.body.maxVelocity = this.maxSpeedShift;
    } else {
        this.body.maxVelocity = this.maxSpeedNormal;
    }
    //Movement code
    var xAcc = 0;
    var yAcc = 0;
    if(this.pause){}else{
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) ||
        game.input.keyboard.isDown(Phaser.Keyboard.W)){
        if (this.body.onFloor())
        {
            this.body.velocity.y = -700;
        }
	}
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ||
        game.input.keyboard.isDown(Phaser.Keyboard.D)){
        xAcc += this.accel;
        //this.animations.play('right');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ||
        game.input.keyboard.isDown(Phaser.Keyboard.A)){
        xAcc -= this.accel;
        //this.animations.play('left');
    }
    this.body.acceleration.x = xAcc;
    this.body.acceleration.y = yAcc;
    if (xAcc == 0)
        this.body.velocity.x = 0;
}
}


