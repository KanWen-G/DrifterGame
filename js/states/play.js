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
        this.door2 = map.createLayer('Door2');
        this.door1 = map.createLayer('Door1');
        this.safe = map.createLayer('Safe');
        this.block = map.createLayer('block');
        
        this.cantSwitch = false;
        this.block.alpha = 0;
        this.itemsId.alpha = 0;
        map.setCollisionBetween(205 ,207, false, this.block);//collision for platforms in state 2
        map.setTileIndexCallback(207, this.onblock, this, this.block);

        game.physics.arcade.enable(this.egoState);
        game.physics.arcade.enable(this.idState);
        game.physics.arcade.enable(this.block);
        game.physics.arcade.enable(this.door1);
        game.physics.arcade.enable(this.safe);
        game.physics.arcade.enable(this.door2);

        map.setCollisionBetween(115, 187, true, this.egoState); //collisionstate 1
        map.setCollisionBetween(340, 345, true, this.egoState);
        map.setCollisionBetween(380, 385, true, this.egoState);
        map.setCollisionBetween(354, 359, true, this.egoState);
        map.setCollisionBetween(115, 187, false, this.idState); //collisionstate 2
        map.setCollisionBetween(340, 345, false, this.idState);
        map.setCollisionBetween(380, 385, false, this.idState);
        map.setCollisionBetween(354, 359, false, this.idState);
        map.setCollision(348,true, this.safe);
        map.setCollision(310,true, this.door1);
        map.setCollision(330,true, this.door1);
        map.setCollision(350,true, this.door1);
        map.setCollision(311,true, this.door2);
        map.setCollision(331,true, this.door2);
        map.setCollision(351,true, this.door2);

        


        map.setTileLocationCallback(50, 108, 1, 1, this.makeText, this, this.egoState);
        map.setTileLocationCallback(51, 108, 1, 1, this.makeText1, this, this.egoState);
        map.setTileLocationCallback(60, 96, 1, 1, this.makeText2, this, this.egoState);
        map.setTileLocationCallback(26, 84, 1, 1, this.makeText3, this, this.egoState);
        
        map.setTileLocationCallback(76, 108, 1, 1, this.makeText4, this, this.egoState);
        map.setTileLocationCallback(75, 85, 1, 1, this.makeText5, this, this.egoState);
        map.setTileLocationCallback(87, 75, 1, 1, this.makeText6, this, this.egoState);
        map.setTileLocationCallback(74, 69, 1, 1, this.makeText7, this, this.egoState);

        map.setTileLocationCallback(6, 65, 1, 1, this.makeText8, this, this.egoState);
        map.setTileLocationCallback(11, 60, 1, 1, this.makeText9, this, this.egoState);
        map.setTileLocationCallback(37, 52, 1, 1, this.makeText10, this, this.egoState);
        map.setTileLocationCallback(29, 44, 1, 1, this.makeText11, this, this.egoState);

        map.setTileLocationCallback(66, 96, 1, 1, this.lock1, this, this.egoState);
        map.setTileLocationCallback(69, 67, 1, 1, this.lock2, this, this.egoState);
        map.setTileLocationCallback(20, 52, 1, 1, this.lock3, this, this.egoState);

        
        this.haveText = false;
        this.idState.alpha = 0;
        this.egoState.resizeWorld();
        this.inId = false;

        //tweens for switching from id to ego
        this.egoMapOn = game.add.tween(this.egoState).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.idMapOff = game.add.tween(this.idState).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.egoItemsOn = game.add.tween(this.itemsEgo).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.idItemsOff = game.add.tween(this.itemsId).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.door2On = game.add.tween(this.door2).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.door1On = game.add.tween(this.door1).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.safeOn = game.add.tween(this.safe).to({alpha : 1 },100, "Linear", false, 0, 0);

        //tweens for switching from ego to id
        this.egoMapOff = game.add.tween(this.egoState).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.idMapOn = game.add.tween(this.idState).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.idItemsOn = game.add.tween(this.itemsId).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.egoItemsOff = game.add.tween(this.itemsEgo).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.door2Off = game.add.tween(this.door2).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.door1Off = game.add.tween(this.door1).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.safeOff = game.add.tween(this.safe).to({alpha : 0 },100, "Linear", false, 0, 0);

        //adding music sprites
        //this.gameMusic = game.add.audio('Game Music', 0.2);
        //this.cutsceneMusic = game.add.audio('Cutscene Music', 0.3);
        //this.gameMusic.loopFull();

        //adding sfx sprites
        this.switchSound1 = game.add.audio('Switch 1');
        this.switchSound2 = game.add.audio('Switch 2');
        this.textAdvanceSound = game.add.audio('Text Advance');

        //creating player
        p = new Player (game,288,1625);
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
        game.debug.body(p);
        this.cantSwitch = false;
        game.physics.arcade.collide(p, this.block);
        game.physics.arcade.collide(p, this.egoState);
        game.physics.arcade.collide(p, this.idState);
        game.physics.arcade.collide(p, this.Background);
        game.physics.arcade.collide(p, this.door1);
        game.physics.arcade.collide(p, this.safe);
        game.physics.arcade.collide(p, this.door2);
        if(p.body.velocity.x != 0 && this.haveText){
            console.log('something');
            this.currentMessage.fadeText1.start();
            this.currentMessage.fadeText2.start();
            this.haveText = false;
        }
        
        if (!p.pause && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && !this.cantSwitch) {
            this.switchSelf();
        }
    

},
     switchSelf: function(){
            //if currently in idState,
             if (this.inId){
                //then turn on all egoState layers and remove idState layers
             console.log('inEgo');

                //code to turn collision on/off for different layers
                map.setCollisionBetween(115, 187, true, this.egoState); //collisionstate 1
                map.setCollisionBetween(340, 345, true, this.egoState);
                map.setCollisionBetween(380, 385, true, this.egoState);
                map.setCollisionBetween(354, 359, true, this.egoState);
                map.setCollisionBetween(115, 187, false, this.idState); //collisionstate 2
                map.setCollisionBetween(340, 345, false, this.idState);
                map.setCollisionBetween(380, 385, false, this.idState);
                map.setCollisionBetween(354, 359, false, this.idState);

                //code to turn on/off visual appearance of layers
                this.egoMapOn.start();
                this.egoItemsOn.start();
                this.idMapOff.start();
                this.idItemsOff.start();
                this.door2On.start();
                this.door1On.start();
                this.safeOn.start();
        
                this.inId = false;
                p.inId = false;
                this.switchSound1.play();
            }else{ //else
                //turn on all idState layers and remove egoState layers
                console.log('inId');

                //code to turn collision on/off for different layers
                map.setCollisionBetween(115, 187, false, this.egoState); //collisionstate 1
                map.setCollisionBetween(340, 345, false, this.egoState);
                map.setCollisionBetween(380, 385, false, this.egoState);
                map.setCollisionBetween(354, 359, false, this.egoState);
                map.setCollisionBetween(115, 187, true, this.idState); //collisionstate 2
                map.setCollisionBetween(340, 345, true, this.idState);
                map.setCollisionBetween(380, 385, true, this.idState);
                map.setCollisionBetween(354, 359, true, this.idState);

                //code to turn on/off visual appearance of layers
                this.egoMapOff.start();
                this.idMapOn.start();
                this.egoItemsOff.start();
                this.idItemsOn.start();
                this.door2Off.start();
                this.door1Off.start();
                this.safeOff.start();
                //updating variables
                this.inId = true;
                p.inId = true;
                //playing switch effect
                this.switchSound2.play();
            }
    },
    
    makeText: function(){
        if(!this.haveText && this.egoState.alpha != 0){
            this.currentMessage = new TextBox(game, 3);
            this.haveText = true;
        }
    },
    makeText1: function(){
        if(!this.haveText && this.idState.alpha != 0){
            this.currentMessage = new TextBox(game, 6);
            this.haveText = true;
        }
    },
    makeText2: function(){
        if(!this.haveText && this.egoState.alpha != 0){
            this.currentMessage = new TextBox(game, 5);
            this.haveText = true;
        }
    },
    makeText3: function(){
        if(!this.haveText && this.egoState.alpha != 0){
            this.currentMessage = new TextBox(game, 4);
            this.haveText = true;
        }
    },
    makeText4: function(){
        if(!this.haveText && this.egoState.alpha != 0){
            this.currentMessage = new TextBox(game, 7);
            this.haveText = true;
        }
    },
    makeText5: function(){
        if(!this.haveText && this.egoState.alpha != 0){
            this.currentMessage = new TextBox(game, 8);
            this.haveText = true;
        }
    },
    makeText6: function(){
        if(!this.haveText && this.idState.alpha != 0){
            this.currentMessage = new TextBox(game, 10);
            this.haveText = true;
        }
    },
    makeText7: function(){
        if(!this.haveText && this.egoState.alpha != 0){
            this.currentMessage = new TextBox(game, 9);
            this.haveText = true;
        }
    },
    makeText8: function(){
        if(!this.haveText && this.egoState.alpha != 0){
            this.currentMessage = new TextBox(game, 11);
            this.haveText = true;
        }
    },
    makeText9: function(){
        if(!this.haveText && this.idState.alpha != 0){
            this.currentMessage = new TextBox(game, 14);
            this.haveText = true;
        }
    },
    makeText10: function(){
        if(!this.haveText && this.egoState.alpha != 0){
            this.currentMessage = new TextBox(game, 13);
            this.haveText = true;
        }
    },
    makeText11: function(){
        if(!this.haveText && this.egoState.alpha != 0){
            this.currentMessage = new TextBox(game, 12);
            this.haveText = true;
        }
    },
    
    onblock: function(){
        this.cantSwitch = true;
    },

    lock1: function(){
        if(!this.inId){
            unlocking('min');
            if(isLock == 2){    
                this.door1.kill();
            }
        }
    }, 

    lock2: function(){
        if(!this.inId){
            unlocking('giv');
            if(isLock == 3){    
                this.door2.kill();
                }
            }
    }, 

    lock3: function(){
        if(!this.inId){
            unlocking('ego');
            if(isLock == 3){    
                this.safe.kill();
                }
            }
    }, 
};



