// Play state

var play = function(game) {};
play.prototype = {
    create: function () {

        //enableing the arcade physics system from Phaser
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('Play: arcade physics enable');

        //creating backgroud
        map = game.add.tilemap('mario');
        map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
        this.Background = map.createLayer('Background');
        this.layer = map.createLayer('World1');
        this.layer2 = map.createLayer('World2');
        this.item = map.createLayer('item');
        game.physics.arcade.enable(this.layer);
        game.physics.arcade.enable(this.layer2);
        map.setCollisionBetween(340, 345, true, this.layer);
        map.setTileLocationCallback(14, 7, 5, 5, this.textbox, this, this.layer);
        this.layer2.alpha = 0;
        this.layer.resizeWorld();
        this.inId = false;
        this.toEgo1 = game.add.tween(this.layer).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.toEgo2 = game.add.tween(this.layer2).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.toId1 = game.add.tween(this.layer).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.toId2 = game.add.tween(this.layer2).to({alpha : 1 },100, "Linear", false, 0, 0);
        //creating player
        p = new Player (game,32,32);
        game.add.existing(p);
        game.world.bringToTop(p);
        game.camera.follow(p);
        console.log(p);
        
        // creating cursors
        cursors = game.input.keyboard.createCursorKeys();

    },
    
    update: function () {
        game.debug.body(p);
        game.physics.arcade.collide(p, this.item);
        game.physics.arcade.collide(p, this.layer);
        if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
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
             }else{
            console.log('inId');
            map.setCollisionBetween(340, 345, false, this.layer);
            map.setCollisionBetween(380, 385, true, this.layer2);
            this.toId1.start();
            this.toId2.start();
            this.inId = true;
            }
     },
    
textbox: function(){
    console.log('do someting');
    },
};



