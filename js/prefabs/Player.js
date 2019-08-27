function Player(game,x,y) {
    //new Sprite(game, x, y, key, frame)
    Phaser.Sprite.call(this, game,x, y, 'player');
    this.animations.add('walk', [1, 2, 3, 4], 10, true);
	// Sprite setting
    this.anchor.set(0.5, 0.5);
	//physics
	game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.setSize(15,45);
    this.body.offset.setTo(10, 20);
    this.maxSpeedNormal = new Phaser.Point(250, 10000);
    this.body.maxVelocity = this.maxSpeedNormal;
    this.maxSpeedShift = new Phaser.Point(500, 10000);
    this.accel = 500;
    this.body.gravity.y = 4000;
    this.inId = false;
    this.faceleft = false;
    this.pause = false;
    this.jumpSound = game.add.audio('Jump', 0.2);
    this.walkingSound1 = game.add.audio('Walking 1');
    this.walkingSound2 = game.add.audio('Walking 2');
    this.scale.x *= -1
    
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override Phaser.Sprite update (to spin the diamond)
Player.prototype.update = function () {
    //speed up

    var xAcc = 0;
    
    if(this.pause){
        this.frame = 5;
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
            this.jumpSound.play();
        }
	}
        
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ||
        game.input.keyboard.isDown(Phaser.Keyboard.D)){
        this.animations.play('walk');
        xAcc += this.accel;
        if(!this.inId){
            if(!this.walkingSound1.isPlaying && !this.walkingSound2.isPlaying){
                this.walkingSound1.play();
            }
        }
        if(this.inId){
            if(!this.walkingSound1.isPlaying && !this.walkingSound2.isPlaying){
                this.walkingSound2.play();
            }
        }
        
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ||
        game.input.keyboard.isDown(Phaser.Keyboard.A)){
        this.animations.play('walk');
        xAcc -= this.accel;
        if(!this.inId){
            if(!this.walkingSound1.isPlaying && !this.walkingSound2.isPlaying){
                this.walkingSound1.play();
            }
        }
        if(this.inId){
            if(!this.walkingSound1.isPlaying && !this.walkingSound2.isPlaying){
                this.walkingSound2.play();
            }
        }
        
    } else {
        this.frame = 5;
        this.walkingSound1.stop();
        this.walkingSound2.stop();
        this.body.velocity.x = 0;
    }
        
    this.body.acceleration.x = xAcc;
        
        if(!this.body.onFloor()){
            this.walkingSound1.stop();
            this.walkingSound2.stop();
            this.frame = 0;
        }
        
}
}


