//// Play state
var play = function(game) {};
play.prototype = {
    create: function () {

        //enabling the arcade physics system from Phaser
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('Play: arcade physics enable');
        this.currentMessage;
        //creating background
        map = game.add.tilemap('mario');
        map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
        this.Background = map.createLayer('Background');
        this.egoState = map.createLayer('World1');
        this.idState = map.createLayer('World2');
        this.itemsEgo = map.createLayer('Items');
        this.itemsId = map.createLayer('Items2');
        this.door1 = map.createLayer('Door1');
        this.door2 = map.createLayer('Door2');
        game.physics.arcade.enable(this.egoState);
        game.physics.arcade.enable(this.idState);

        map.setCollisionBetween(162, 165, true, this.egoState); //collision for black blocks in state 1
        map.setCollisionBetween(182, 185, true, this.egoState); //collision for black blocks in state 1

        map.setCollisionBetween(163, 164, false, this.idState); //collision for black blocks in state 2
        map.setCollisionBetween(182, 185, false, this.idState); //collision for black blocks in state 2

        map.setCollisionBetween(163, 164, true, this.Background); //collision for black blocks in Background
        map.setCollisionBetween(182, 185, true, this.Background); //collision for black blocks in Background

        map.setCollisionBetween(340, 345, true, this.egoState); //collision for platforms in state 1
        map.setCollisionBetween(380, 385, true, this.egoState); //collision for platforms in state 1

        map.setCollisionBetween(354, 359, false, this.idState); //collision for platforms in state 2
        map.setCollisionBetween(314, 319, false, this.idState); //collision for platforms in state 2

        map.setTileLocationCallback(36, 107, 1, 1, this.makeText(0), this, this.egoState);
        map.setTileLocationCallback(37, 95, 1, 1, this.makeText(1), this, this.egoState);
        map.setTileLocationCallback(60, 95, 1, 1, this.makeText(2), this, this.idState);
        //map.setTileLocationCallback(19, 7, 1, 1, this.makeText, this, this.layer);

        this.haveText = false;
        this.idState.alpha = 0;
        this.egoState.resizeWorld();
        this.inId = false;
        //tweens for switching from id to ego
        this.egoMapOn = game.add.tween(this.egoState).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.idMapOff = game.add.tween(this.idState).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.egoItemsOn = game.add.tween(this.itemsEgo).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.idItemsOff = game.add.tween(this.itemsId).to({alpha : 0 },100, "Linear", false, 0, 0);


        //tweens for switching from ego to id
        this.egoMapOff = game.add.tween(this.egoState).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.idMapOn = game.add.tween(this.idState).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.idItemsOn = game.add.tween(this.itemsId).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.egoItemsOff = game.add.tween(this.itemsEgo).to({alpha : 0 },100, "Linear", false, 0, 0);


        //adding music sprites
        //this.gameMusic = game.add.audio('Game Music', 0.2);
        //this.cutsceneMusic = game.add.audio('Cutscene Music', 0.3);
        //this.gameMusic.loopFull();

        //adding sfx sprites
        this.switchSound1 = game.add.audio('Switch 1');
        this.switchSound2 = game.add.audio('Switch 2');
        this.textAdvanceSound = game.add.audio('Text Advance');

        //creating player
        p = new Player (game,288,1600);
        game.add.existing(p);
        game.world.bringToTop(p);
        game.camera.follow(p);
        console.log(p);
        // creating cursors
        cursors = game.input.keyboard.createCursorKeys();

        //creating filter
        //this.screenFilter = game.add.sprite(288, 1600, 'filter');
        //this.screenFilter.alpha = 0.3;
        //this.screenFilter.anchor.set(0.5,0.5);

        //creating correct array for unlock
        this.correct = [];

        //unlock
        this.blurX = game.add.filter('BlurX');
        this.blurY = game.add.filter('BlurY');
        this.blurX.blur = 100;
        this.blurY.blur = 100;

        //screen darkener
        //this.screenDarkener = game.add.sprite(game.width/2, game.height/2,'screenfilter');

        //spotLight = new Filter (game, 288, 1600);
        //spotLight.alpha = 0.4;
        //game.add.existing(spotLight);

    },
    
    update: function () {
        //game.debug.body(p);
        game.physics.arcade.collide(p, this.egoState);
        game.physics.arcade.collide(p, this.idState);
        game.physics.arcade.collide(p, this.Background);

        //game.physics.arcade.collide(spotLight, this.egoState);
        //game.physics.arcade.collide(spotLight, this.idState);
        //game.physics.arcade.collide(spotLight, this.Background);

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
             map.setCollisionBetween(340, 345, true, this.egoState);
             map.setCollisionBetween(380, 385, true, this.egoState);
             
             map.setCollisionBetween(162, 165, true, this.egoState);
             map.setCollisionBetween(182, 185, true, this.egoState);

             map.setCollisionBetween(354, 359, false, this.idState); //collision for platforms in state 2
             map.setCollisionBetween(314, 319, false, this.idState); //collision for platforms in state 2

             map.setCollisionBetween(162, 165, false, this.idState);
             map.setCollisionBetween(182, 185, false, this.idState);
             this.egoMapOn.start();
             this.egoItemsOn.start();
             this.idMapOff.start();
             this.idItemsOff.start();
             this.inId = false;
             p.inId = false;
             this.switchSound1.play();
             }else{
            console.log('inId');
            map.setCollisionBetween(354, 359, true, this.idState); //collision for platforms in state 2
            map.setCollisionBetween(314, 319, true, this.idState); //collision for platforms in state 2

            map.setCollisionBetween(162, 165, true, this.idState);
            map.setCollisionBetween(182, 185, true, this.idState);

            map.setCollisionBetween(340, 345, false, this.egoState);
            map.setCollisionBetween(380, 385, false, this.egoState);

            map.setCollisionBetween(162, 165, false, this.egoState);
            map.setCollisionBetween(182, 185, false, this.egoState);
            this.egoMapOff.start();
            this.idMapOn.start();
            this.egoItemsOff.start();
            this.idItemsOn.start();
            this.inId = true;
            p.inId = true;
            this.switchSound2.play();
            }
    },
    
    makeText: function(index){
        this.currentMessage = new TextBox(game, index);
        if(!this.haveText){
            this.haveText = true;
        }
    },
    
    
    lock1: function(){
        unlocking('test');
    },

    
    
    
};



