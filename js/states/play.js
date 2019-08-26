//// Play state
var play = function(game) {};
play.prototype = {
    create: function () {

        //enableing the arcade physics system from Phaser
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('Play: arcade physics enable');
        
        //creating background
        map = game.add.tilemap('mario');
        map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
        this.Background = map.createLayer('Background');
        this.layer = map.createLayer('World1');
        this.layer2 = map.createLayer('World2');
        this.item = map.createLayer('item');
        game.physics.arcade.enable(this.layer);
        game.physics.arcade.enable(this.layer2);
        map.setCollisionBetween(340, 345, true, this.layer);
        map.setCollisionBetween(380, 385, true, this.layer2);
        map.setTileLocationCallback(14, 7, 1, 1, this.lock1, this, this.layer);
        this.layer2.alpha = 0;
        this.layer.resizeWorld();
        this.inId = false;
        this.toEgo1 = game.add.tween(this.layer).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.toEgo2 = game.add.tween(this.layer2).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.toId1 = game.add.tween(this.layer).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.toId2 = game.add.tween(this.layer2).to({alpha : 1 },100, "Linear", false, 0, 0);

        //adding music sprites
        this.gameMusic = game.add.audio('Game Music', 0.1);
        this.cutsceneMusic = game.add.audio('Cutscene Music', 0.3);
        this.gameMusic.loopFull();

        //adding sfx sprites
        this.switchSound1 = game.add.audio('Switch 1');
        this.switchSound2 = game.add.audio('Switch 2');
        this.textAdvanceSound = game.add.audio('Text Advance');



        //creating key objects
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

        //creating player
        p = new Player (game,32,32);
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
        game.physics.arcade.collide(p, this.layer);
        game.physics.arcade.collide(p, this.layer2);
        if (!p.pause && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            this.switchSelf();
        }
    

},
     switchSelf: function(){
             if (this.inId){
             console.log('inEgo');
             map.setCollisionBetween(340, 345, true, this.layer);
             map.setCollisionBetween(380, 385, false, this.layer2);
             this.toEgo1.start();
             this.toEgo2.start();
             this.inId = false;
             p.inId = false;
                 this.switchSound1.play();
             }else{
            console.log('inId');
            map.setCollisionBetween(340, 345, false, this.layer);
            map.setCollisionBetween(380, 385, true, this.layer2);
            this.toId1.start();
            this.toId2.start();
            this.inId = true;
            p.inId = true;
                 this.switchSound2.play();
            }
     },
    
textbox: function(){
    console.log('do someting');
    },
    
    
    lock1: function(){
        unlocking('test');
    },

    
    
    
};



