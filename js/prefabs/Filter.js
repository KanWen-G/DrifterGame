function Filter(game,x,y) {
    //new Sprite(game, x, y, key, frame)
    Phaser.Sprite.call(this, game,x, y, 'filter');
	// Sprite setting
    this.anchor.set(0.5, 0.5);
	//physics
	game.physics.enable(this);
    this.body.offset.setTo(10, 20);
    this.maxSpeedNormal = new Phaser.Point(250, 10000);
    this.body.maxVelocity = this.maxSpeedNormal;
    this.maxSpeedShift = new Phaser.Point(500, 10000);
    this.accel = 500;
    this.body.gravity.y = 4000;
    this.inId = false;
    this.faceleft = false;
    this.pause = false;
    this.scale.x *= -1
    
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Filter.prototype = Object.create(Phaser.Sprite.prototype);
Filter.prototype.constructor = Filter;

// override Phaser.Sprite update (to spin the diamond)
Filter.prototype.update = function () {
    //speed up

    var xAcc = 0;
    
    if(this.pause){
        this.body.velocity.x = 0;
    }else{
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
            this.body.maxVelocity = this.maxSpeedShift;
        } else {
            this.body.maxVelocity = this.maxSpeedNormal;
        }
        
        if( game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT) ||
           game.input.keyboard.justPressed(Phaser.Keyboard.D)){
            this.body.velocity.x = 0;
            if(this.faceleft){
                this.faceleft = false;
                this.scale.x *= -1;
            }
        }
        if(game.input.keyboard.justPressed(Phaser.Keyboard.LEFT) ||
           game.input.keyboard.justPressed(Phaser.Keyboard.A) ) {
            this.body.velocity.x = 0;
            if(!this.faceleft){
                this.faceleft = true;
                this.scale.x *= -1;
            }
        }
        
        
        
        
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) ||
        game.input.keyboard.isDown(Phaser.Keyboard.W)){
        if (this.body.onFloor())
        {
            this.body.velocity.y = -900;
        }
	}
        
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ||
        game.input.keyboard.isDown(Phaser.Keyboard.D)){
        xAcc += this.accel;
        
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ||
        game.input.keyboard.isDown(Phaser.Keyboard.A)){
        xAcc -= this.accel;
        
    } else {
        this.body.velocity.x = 0;
    }
        
    this.body.acceleration.x = xAcc;
        
}
}


