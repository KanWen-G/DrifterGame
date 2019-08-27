//// Play state
var play = function(game) {};
play.prototype = {
    create: function () {

        //enableing the arcade physics system from Phaser
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('Play: arcade physics enable');
        this.currentMessage;
        //creating background
        map = game.add.tilemap('mario');
        map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
        this.Background = map.createLayer('Background');
        this.state1 = map.createLayer('World1');
        this.state2 = map.createLayer('World2');
        this.items = map.createLayer('Items');
        game.physics.arcade.enable(this.state1);
        game.physics.arcade.enable(this.state2);

        map.setCollisionBetween(163, 164, true, this.state1); //collision for black blocks in state 1
        map.setCollisionBetween(183, 184, true, this.state1); //collision for black blocks in state 1

        map.setCollisionBetween(163, 164, false, this.state2); //collision for black blocks in state 2
        map.setCollisionBetween(183, 184, false, this.state2); //collision for black blocks in state 2

        map.setCollisionBetween(163, 164, true, this.Background); //collision for black blocks in Background
        map.setCollisionBetween(183, 184, true, this.Background); //collision for black blocks in Background

        map.setCollisionBetween(340, 345, true, this.state1); //collision for platforms in state 1
        map.setCollisionBetween(380, 385, true, this.state1); //collision for platforms in state 1

        map.setCollisionBetween(340, 345, false, this.state2); //collision for platforms in state 2
        map.setCollisionBetween(380, 385, false, this.state2); //collision for platforms in state 2

        map.setTileLocationCallback(60, 95, 2, 2, this.makeText, this, this.state1);
        map.setTileLocationCallback(60, 95, 1, 1, this.lock1, this, this.state1);
        //map.setTileLocationCallback(19, 7, 1, 1, this.makeText, this, this.layer);

        this.haveText = false;
        this.state2.alpha = 0;
        this.state1.resizeWorld();
        this.inId = false;
        this.toEgo1 = game.add.tween(this.state1).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.toEgo2 = game.add.tween(this.state2).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.toId1 = game.add.tween(this.state1).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.toId2 = game.add.tween(this.state2).to({alpha : 1 },100, "Linear", false, 0, 0);

        //adding music sprites
        this.gameMusic = game.add.audio('Game Music', 0.1);
        this.cutsceneMusic = game.add.audio('Cutscene Music', 0.3);
        this.gameMusic.loopFull();

        //adding sfx sprites
        this.switchSound1 = game.add.audio('Switch 1');
        this.switchSound2 = game.add.audio('Switch 2');
        this.textAdvanceSound = game.add.audio('Text Advance');

        //creating player
        p = new Player (game,192,3400);
        game.add.existing(p);
        game.world.bringToTop(p);
        game.camera.follow(p);
        console.log(p);
        // creating cursors
        cursors = game.input.keyboard.createCursorKeys();

        //creating correct array for unlock
        this.correct = [];

        //unlock
        this.blurX = game.add.filter('BlurX');
        this.blurY = game.add.filter('BlurY');
        this.blurX.blur = 100;
        this.blurY.blur = 100;
    },
    
    update: function () {
        game.debug.body(p);
        game.physics.arcade.collide(p, this.state1);
        game.physics.arcade.collide(p, this.state2);
        game.physics.arcade.collide(p, this.Background);

        if(p.body.velocity.x != 0 && this.haveText){
            console.log('something')
            this.currentMessage.fadeText1.start();
            this.currentMessage.fadeText2.start();
            this.haveText = false;
        }
        
        if (!p.pause && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            this.switchSelf();
        }
    

},
     switchSelf: function(){
             if (this.inId){
             console.log('inEgo');
             map.setCollisionBetween(340, 345, true, this.state1);
             map.setCollisionBetween(380, 385, true, this.state1);

            map.setCollisionBetween(380, 385, false, this.state2);
            map.setCollisionBetween(340, 345, false, this.state2);

             map.setCollisionBetween(163, 164, false, this.state2);
             map.setCollisionBetween(183, 184, false, this.state2);
             this.toEgo1.start();
             this.toEgo2.start();
             this.inId = false;
             p.inId = false;
             this.switchSound1.play();
             }else{
            console.log('inId');
            map.setCollisionBetween(380, 385, true, this.state2);
            map.setCollisionBetween(340, 345, true, this.state2);

            map.setCollisionBetween(340, 345, false, this.state1);
            map.setCollisionBetween(380, 385, false, this.state1);

            map.setCollisionBetween(163, 164, false, this.state1);
            map.setCollisionBetween(183, 184, false, this.state1);
            this.toId1.start();
            this.toId2.start();
            this.inId = true;
            p.inId = true;
            this.switchSound2.play();
            }
    },
    
    makeText: function(){
        this.currentMessage = new TextBox(game, 0);
        if(!this.haveText){
            this.haveText = true;
        }
    },
    
    
    lock1: function(){
        unlocking('test');
    },

    
    
    
};



