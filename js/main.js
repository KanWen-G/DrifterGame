// Declaring strict mode
"use strict";

// initialize / create / define the game object by Phaser
let game = new Phaser.Game(500, 500, Phaser.AUTO, '');

// creating global scope variables / objects
let player;
let platforms;
let platforms2;
let background;
let cursors;
let scoreText;
let inPast = false;
var toPast;


// define the MainMenu state and it's methods
var MainMenu = function (game) { }
MainMenu.prototype = {
    preload: function() {
    // preload all the assets that needed for this project
    game.load.audio('coin-pop', 'assets/audio/coin-pop.wav');
    game.load.audio('dieSound', 'assets/audio/die.wav');
    game.load.audio('popSound', 'assets/audio/pop01.mp3');
    game.load.image('sky', 'assets/img/sky.png');
    game.load.image('ground', 'assets/img/platform.png');
    game.load.image('ground2', 'assets/img/platform2.png');
    game.load.image('snow', 'assets/img/2744.png');
    game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
    console.log('MainMenu: perload completed');
    },

    create: function () {
        
        // creating simple instructions for the player
        let title = game.add.text(0, 0, 'The Snowy State!', { fontSize: '20px', fill: '#ffffff' });
        let tutorial = game.add.text(0, 30, "Use Arrow Keys to Move", { fontSize: '20px', fill: '#ffffff' });
        let toStartText = game.add.text(0, 60, "press [SPACE] to start", { fontSize: '20px', fill: '#ffffff' });
        game.stage.backgroundColor = "#87cefa"; // change the background color and fit the theme
        console.log('MainMenu: create completed');
    },

    update: function () { 
        // the only method / logic for the menu state
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('Play'); // .start(key, clearWorld, clearCache, parameter)
            console.log('MainMenu completed, goes to Play state');
        }
    }
}
// define the Play state and it's methods
var Play = function (game) { };
Play.prototype = {
    init: function () {
        
        this.countingStars = 0;// make sure the stars counter reset to zero
        this.score = 0; // creating a local score variable that can be pass through
        console.log('Play: init completed');
    },

    create: function () {
        game.world.setBounds(0,0,1000,1000);
        //enableing the arcade physics system from Phaser
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('Play: arcade physics enable');
        //Creating the platforms group that contains all the solid ground including the primary ground and the four ledge
        platforms = game.add.group();
        //apply physics to all the platform, enabling them to have collisions with other objects
        platforms.enableBody = true;
        //Creating a bridge-like ground using 3 ground objects, in a difference scale
        let ground = platforms.create(0, game.world.height - 100, 'ground');//.create works like (x,y,the image)
        ground.body.immovable = true; //body.immovable make the object immovable even when other objects collied with it (there is no mass in this game (yet) ) 
        ground.scale.setTo(1.5, 0.7); //a scale method that allows us to scale the image whatever we want, .setTo works like (x * something, y * something)
        let groundSup1 = platforms.create(50, game.world.height - 60, 'ground');
        groundSup1.body.immovable = true;
        groundSup1.scale.setTo(0.1, 20);
        let groundSup2 = platforms.create(game.world.width - 50 - (groundSup1.width), game.world.height - 60, 'ground');
        groundSup2.body.immovable = true;
        groundSup2.scale.setTo(0.1, 20);
        //here is all the ledge. I'm not quilt used to that they can all have the same name, so I changed them to different names so that it can make more sense to me. 
        //method is just like how we creating the ground
        let ledge1 = platforms.create(400, game.world.height - 150, 'ground');
        ledge1.body.immovable = true;
        ledge1.scale.setTo(0.5, 0.2);
        let ledge2 = platforms.create(130, game.world.height - 230, 'ground');
        ledge2.body.immovable = true;
        ledge2.scale.setTo(0.5, 0.2);
        let ledge3 = platforms.create(-130, game.world.height - 350, 'ground');
        ledge3.body.immovable = true;
        ledge3.scale.setTo(0.5, 0.2);
        let ledge4 = platforms.create(190, game.world.height - 420, 'ground');
        ledge4.body.immovable = true;
        ledge4.scale.setTo(0.2, 0.2);
        console.log('Play: all platforms created');

        //Creating the platforms group that contains all the solid ground including the primary ground and the four ledge
        platforms2 = game.add.group();
        //apply physics to all the platform, enabling them to have collisions with other objects
        platforms2.enableBody = true;
        //Creating a bridge-like ground using 3 ground objects, in a difference scale
        let ground2 = platforms2.create(0, game.world.height - 60, 'ground2');//.create works like (x,y,the image)
        ground2.body.immovable = true; //body.immovable make the object immovable even when other objects collied with it (there is no mass in this game (yet) ) 
        ground2.scale.setTo(1.5, 0.7); //a scale method that allows us to scale the image whatever we want, .setTo works like (x * something, y * something)
        //here is all the ledge. I'm not quilt used to that they can all have the same name, so I changed them to different names so that it can make more sense to me. 
        //method is just like how we creating the ground
        var ledge5 = platforms2.create(50, game.world.height - 150, 'ground2');
        ledge5.body.immovable = true;
        ledge5.scale.setTo(0.5, 0.2);
        var ledge6 = platforms2.create(0, game.world.height - 230, 'ground2');
        ledge6.body.immovable = true;
        ledge6.scale.setTo(0.5, 0.2);
        var ledge7 = platforms2.create(400, game.world.height - 350, 'ground2');
        ledge7.body.immovable = true;
        ledge7.scale.setTo(0.5, 0.2);
        var ledge8 = platforms2.create(0, game.world.height - 420, 'ground2');
        ledge8.body.immovable = true;
        ledge8.scale.setTo(0.2, 0.2);
        console.log('Play: all platforms created');

        // it seems like that phaser has a layer system, the things that add at the least will show on the top, so I add the baddies first.
        //adding baddies and player to the game, as sprite and not a group.
        player = game.add.sprite(10, 10, 'dude');
        //enable physics on the player and the baddies, same reason as the platforms
        game.physics.arcade.enable(player);
        //adding detail to the physics system on the player and the baddies. Precisely the Y-axis, the number in .bounce.y should be the percentage of speed that "bounce back", .gravity.y is the acceleration of gravity 
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 3300;
        player.body.collideWorldBounds = true; //stoping player from going out the bounds
        //creating animations for the player and the baddies, works as "add(name [, frames] [, frameRate] [, loop] [, useNumericIndex])"
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        game.camera.follow(player);
        console.log('Play: all character created');

        //Creating the scoreText object, works like text( [x] [, y] [, text] [, style] [, group]), The style object containing style attributes like font, font size , etc.
        scoreText = game.add.text(12, 12, 'score: 0', { fontSize: '20px', fill: '#000' });
        console.log('Play: score text created');

        //creating the control system, don't know much detail yet.
        cursors = game.input.keyboard.createCursorKeys();
        console.log('Play: control system created');

        //creating sound object to the game
        console.log('Play: sound object created');

        //creating the snow storm using prefeb
        //creating 100 of them, using for loop
        console.log('Play: Snow Storm created');
        
        //reset platforms
        platforms2.setAll('body.enable',false);
         //platforms2.setAll('alpha',0);
        platforms2.alpha = 0;
        
        //add tween
        platforms2.toPast = game.add.tween(platforms2).to({alpha : 1 },100, "Linear", false, 0, 0);
        platforms2.toNow = game.add.tween(platforms2).to({alpha : 0 },100, "Linear", false, 0, 0);
        platforms.toNow = game.add.tween(platforms).to({alpha : 1 },100, "Linear", false, 0, 0);
        platforms.toPast = game.add.tween(platforms).to({alpha : 0 },100, "Linear", false, 0, 0);
    },

    

    update: function () {


        // creating the Collide for everything, including player, stars and the baddies with the platforms
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player, platforms2);
        //it reset the plaer speed to zero (so that it wouldn't go by itself)
        player.body.velocity.x = 0;

        //here is the moveset for the player
        //cursors.left.isDown or cursors.anything.isDown check the input every frame
        if (cursors.left.isDown) {
            //here is when the player moves to the left, including the velocity and the animation
            player.body.velocity.x = -250;
            player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            //here is when the player moves to the right, including the velocity and the animation
            player.body.velocity.x = 250;
            player.animations.play('right');
        }
        else {
            //here is the standstill animation and speed (which is none)
            player.animations.stop();
            player.frame = 4;
        }


        //enable an upward velocity (jump) when player pressing up, due to it check the input every frame, it is not easy to enable double jump.
        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -950;
        }

        if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            if (inPast){
                platforms.setAll('body.enable',true);
                platforms.toNow.start();
                inPast = false;
                platforms2.setAll('body.enable',false);
                platforms2.toNow.start();
                
            } else {
                platforms2.setAll('body.enable',true);
                platforms2.toPast.start();
                inPast = true;
                platforms.setAll('body.enable',false);
                platforms.toPast.start();
            }
        }
    }
}

var GameOver = function (game) { };
GameOver.prototype = {
    init: function (score) {
        //pass through score variable
        this.score = score;
        console.log('GameOver: init completed (score passed)');
        },

    create: function () {
            //show game result
            let gameOver = game.add.text(0, 0, "Game Over!", { fontSize: '20px', fill: '#ffffff' });
            let finalScore = game.add.text(0, 30, "Your Final Score is :" + this.score, { fontSize: '20px', fill: '#ffffff' });
            let rePlay = game.add.text(0, 60, "press [SPACE] to retry", { fontSize: '20px', fill: '#ffffff' });
            console.log('GameOver: create completed');
        },

    update: function () {
            //allow player get back and retry
            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                game.state.start('Play');
            }
        }
    }

//add states to stateManager and start MainMenu

game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');
