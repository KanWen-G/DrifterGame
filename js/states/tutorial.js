var tutorial = function(game) {};
tutorial.prototype = {    create: function () {

    //enableing the arcade physics system from Phaser
    game.physics.startSystem(Phaser.Physics.ARCADE);
    console.log('Play: arcade physics enable');
    this.currentMessage;
    this.count = 0;
    this.locked = false;
    //creating background
    map = game.add.tilemap('tutorial');
    map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
    this.Background = map.createLayer('Background');
    this.state1 = map.createLayer('World1');
    this.state2 = map.createLayer('World2');
    this.items = map.createLayer('Items');
    this.items2 = map.createLayer('Items2');
    this.block = map.createLayer('block');
    this.block.alpha = 0;
    this.items2.alpha = 0;
    game.physics.arcade.enable(this.items);
    game.physics.arcade.enable(this.state1);
    game.physics.arcade.enable(this.state2);
    game.physics.arcade.enable(this.block);
    this.cantSwitch = false;
    map.setCollision(310,true, this.items);
    map.setCollision(330,true, this.items);
    map.setCollision(350,true, this.items);
    map.setCollisionBetween(120, 150, true, this.state1); //collision for platforms in state 1
    map.setCollisionBetween(340, 345, true, this.state1); //collision for platforms in state 1
    map.setCollisionBetween(120, 150, false, this.state2); //collision for platforms in state 1
    map.setCollisionBetween(380, 385, false, this.state2); //collision for platforms in state 2
    map.setCollisionBetween(0 ,400, true, this.block); //collision for platforms in state 2
    
    for(var i = 0; i < 400; i ++){
        map.setTileIndexCallback(i, this.onblock, this, this.block);
    }
    
    map.setTileLocationCallback(2, 28, 1, 1, this.makeText, this, this.state1);
    map.setTileLocationCallback(27, 28, 1, 1, this.makeText2, this, this.state1);
    map.setTileLocationCallback(66, 28, 1, 1, this.makeText3, this, this.state1);
    map.setTileLocationCallback(67, 28, 1, 1, this.lock1, this, this.state1);
    map.setTileLocationCallback(69, 28, 1, 1, this.nextlevel, this, this.state1);
    //map.setTileLocationCallback(60, 95, 1, 1, this.lock1, this, this.state1);
    //map.setTileLocationCallback(19, 7, 1, 1, this.makeText, this, this.layer);

    this.haveText = false;
    this.state2.alpha = 0;
    this.state1.resizeWorld();
    this.inId = false;
    this.toEgo1 = game.add.tween(this.state1).to({alpha : 1 },100, "Linear", false, 0, 0);
    this.toEgo2 = game.add.tween(this.state2).to({alpha : 0 },100, "Linear", false, 0, 0);
    this.toEgo3 = game.add.tween(this.items).to({alpha : 1 },100, "Linear", false, 0, 0);
    this.toEgo4 = game.add.tween(this.items2).to({alpha : 0 },100, "Linear", false, 0, 0);

    this.toId1 = game.add.tween(this.state1).to({alpha : 0 },100, "Linear", false, 0, 0);
    this.toId2 = game.add.tween(this.state2).to({alpha : 1 },100, "Linear", false, 0, 0);
    this.toId3 = game.add.tween(this.items).to({alpha : 0 },100, "Linear", false, 0, 0);
    this.toId4 = game.add.tween(this.items2).to({alpha : 1 },100, "Linear", false, 0, 0);

    //adding music sprites
    //this.gameMusic = game.add.audio('Game Music', 0.1);
    //this.cutsceneMusic = game.add.audio('Cutscene Music', 0.3);
    //this.gameMusic.loopFull();

    //adding sfx sprites
    this.switchSound1 = game.add.audio('Switch 1');
    this.switchSound2 = game.add.audio('Switch 2');
    this.textAdvanceSound = game.add.audio('Text Advance');

    //creating player
    p = new Player (game,35,415);
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
    islock = false;
    //this.block.debug = true;
    map.setCollisionBetween(0 ,400, false, this.block); //collision for platforms in state 2
    this.cantSwitch = false;
    //game.debug.body(p);
    game.physics.arcade.collide(p, this.state1);
    game.physics.arcade.collide(p, this.state2);
    game.physics.arcade.collide(p, this.Background);
    game.physics.arcade.collide(p, this.block);
    game.physics.arcade.collide(p, this.items);
    if(p.body.velocity.x != 0 && this.haveText){
        this.currentMessage.fadeText1.start();
        this.currentMessage.fadeText2.start();
        this.haveText = false;
    }
    
    if (!p.pause && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && !this.cantSwitch) {
        this.switchSelf();
    }


},
 switchSelf: function(){
         if (this.inId){
         console.log('inEgo');
         map.setCollisionBetween(120, 150, true, this.state1); //collision for platforms in state 1
         map.setCollisionBetween(340, 345, true, this.state1); //collision for platforms in state 1
         map.setCollisionBetween(120, 150, false, this.state2); //collision for platforms in state 1
         map.setCollisionBetween(380, 385, false, this.state2); //collision for platforms in state 2
         this.toEgo1.start();
         this.toEgo2.start();
         this.toEgo3.start();
         this.toEgo4.start();
         this.inId = false;
         p.inId = false;
         this.switchSound1.play();
         }else{
        console.log('inId');
        map.setCollisionBetween(120, 150, false, this.state1); //collision for platforms in state 1
        map.setCollisionBetween(340, 345, false, this.state1); //collision for platforms in state 1
        map.setCollisionBetween(120, 150, true, this.state2); //collision for platforms in state 1
        map.setCollisionBetween(380, 385, true, this.state2); //collision for platforms in state 2
        this.toId2.start();
        this.toId3.start();
        this.toId4.start();
        this.inId = true;
        p.inId = true;
        this.switchSound2.play();
        }
},

makeText: function(){
    if(!this.haveText && this.items.alpha != 0){
        this.currentMessage = new TextBox(game, 0);
        this.haveText = true;
    }
},
makeText2: function(){
    if(!this.haveText && this.items.alpha != 0){
        this.currentMessage = new TextBox(game, 1);
        this.haveText = true;
    }
},
makeText3: function(){
    if(!this.haveText && this.items.alpha != 0){
        this.currentMessage = new TextBox(game, 2);
        this.haveText = true;
    }
},

onblock: function(){
    console.log(132156614651);
    this.cantSwitch = true;
},

lock1: function(){
    if(!this.inId){
        unlocking('pas');
        if(isLock){    
            map.setCollision(310,false, this.items);
            map.setCollision(330,false, this.items);
            map.setCollision(350,false, this.items);}
    }
},

nextlevel: function(){
    game.camera.fade(0x000000, 1000);
    game.time.events.add(Phaser.Timer.SECOND * 1, this.startPlay, this);
},

startPlay: function(){
    game.state.start('play', true);
}


};
