//global variables

//var jumpButton;
var leftKey;
var rightKey;
var upKey;

var gameMusic;
var cutsceneMusic;
var jumpSound;
var walkingSound1;
var walkingSound2;
var switchSound1;
var switchSound2;
var lockedSound;
var unlockedSound;
var textAdvanceSound;

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
        this.item = map.createLayer('item');
        this.layer = map.createLayer('World1');
        this.layer2 = map.createLayer('World2');
        game.physics.arcade.enable(this.layer);
        game.physics.arcade.enable(this.layer2);
        map.setCollisionBetween(340, 345, true, this.layer);
        map.setTileLocationCallback(14, 7, 1, 1, this.unlocking, this, this.layer);
        this.layer2.alpha = 0;
        this.layer.resizeWorld();
        this.inId = false;
        this.toEgo1 = game.add.tween(this.layer).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.toEgo2 = game.add.tween(this.layer2).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.toId1 = game.add.tween(this.layer).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.toId2 = game.add.tween(this.layer2).to({alpha : 1 },100, "Linear", false, 0, 0);

        //adding music sprites
        gameMusic = game.add.audio('Game Music', 0.6);
        cutsceneMusic = game.add.audio('Cutscene Music', 0.3);

        //adding sfx sprites
        jumpSound = game.add.audio('Jump', 0.2);
        walkingSound1 = game.add.audio('Walking 1');
        walkingSound2 = game.add.audio('Walking 2');
        switchSound1 = game.add.audio('Switch 1');
        switchSound2 = game.add.audio('Switch 2');
        lockedSound = game.add.audio('Locked');
        unlockedSound = game.add.audio('Unlocked');
        textAdvanceSound = game.add.audio('Text Advance');

        gameMusic.loopFull();
        //walkingSound1.loopFull();
        //walkingSound1.pause();

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

    },
    
    update: function () {

        game.physics.arcade.collide(p, this.layer);


        if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            this.switchSelf();
        }
        if(upKey.downDuration(5)){
            this.playFX('jump');
        }
        if(leftKey.downDuration(5)){
            this.playFX('walking1');
        }
        if(rightKey.downDuration(5)){
            this.playFX('walking2');
        }
    
        //STILL NEED TO FIGURE OUT HOW TO STOP WALKING SOUNDS
        //jumpButton.onDown.add(playFX(jump), this);
    
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
     //function to play sounds depending on the input name
    playFX: function(soundType){
        if(soundType === 'jump'){
            jumpSound.play();
        }
        if(soundType === 'walking1'){
            walkingSound1.play();
        }
        if(soundType === 'walking2'){
            walkingSound2.play();
        }
        if(soundType === 'switch1'){
            switchSound1.play();
        }
        if(soundType === 'switch2'){
            switchSound1.play();
        }
        if(soundType === 'textAdvance'){
            textAdvanceSound.play();
        }
    },

    unlocking: function(){
        
        console.log('1');
        if(game.input.keyboard.justPressed(Phaser.Keyboard.F)){
            this.bmd = game.make.bitmapData(800, 200);
            this.bmd.context.font = '64px Arial';
            this.bmd.context.fillStyle = '#ffffff';
            this.word = 'test';
            this.bmd.context.fillText(this.word, 64, 64);
            this.bmd.addToWorld();
            p.pause = true;
            
            game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
            for (var i = 0; i < this.word.length; i++)
    {
        this.correct[this.word[i]] = false;
    }


        }
    },

    keyPress: function(char){
        //  Clear the BMD
        this.bmd.cls();

    //  Set the x value we'll start drawing the text from
    var x = 64;

    //  Loop through each letter of the word being entered and check them against the key that was pressed
    for (var i = 0; i < this.word.length; i++)
    {
        this.letter = this.word.charAt(i);

        //  If they pressed one of the letters in the word, flag it as correct
        if (char === this.letter)
        {
            this.correct[this.letter] = true;
        }

        //  Now draw the word, letter by letter, changing colour as required
        if (this.correct[this.letter])
        {
            this.bmd.context.fillStyle = '#00ff00';
        }
        else
        {
            this.bmd.context.fillStyle = '#ffffff';
        }

        this.bmd.context.fillText(this.letter, x, 64);

        x += this.bmd.context.measureText(this.letter).width;
    }
},
};



