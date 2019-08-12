// Declaring strict mode
"use strict";



// creating global scope variables / objects
let player;
let platforms;
let platforms2;
let background;
let scoreText;
let cursors;
let inPast = true;


// define the MainMenu state and it's methods
var MainMenu = function (game) { }
MainMenu.prototype = {
    preload: function() {
    // preload all the assets that needed for this project
    game.load.image('ground', 'assets/img/platform.png');
    game.load.image('ground2', 'assets/img/platform2.png');
    game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
    game.load.tilemap('level','assets/Tiled/LayOut.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileSheet', 'assets/Tiled/tileSheet.png', 32, 32);
    console.log('MainMenu: perload completed');
    },

    create: function () {
        // creating simple instructions for the player
        let title = game.add.text(0, 0, 'Drifter ver. -1 ', { fontSize: '20px', fill: '#000000' });
        let tutorial = game.add.text(0, 30, "Use Arrow Keys to move, SPACEBAR to switch layout", { fontSize: '20px', fill: '#000000' });
        let toStartText = game.add.text(0, 60, "press [SPACE] to start", { fontSize: '20px', fill: '#000000' });
        let Text = game.add.text(0, 90, "It is a prototype of tilemap, camera and the switch function", { fontSize: '20px', fill: '#000000' });
        let Text2 = game.add.text(0, 120, "So please ignore the level design and character moveset.", { fontSize: '20px', fill: '#000000' });
        game.stage.backgroundColor = "#ffffff"; // change the background color and fit the theme
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
        //enableing the arcade physics system from Phaser
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.TILE_BIAS = 32;
        console.log('Play: arcade physics enable');

        // create new Tilemap object - when using Tiled, you only need to pass the key
		this.map = game.add.tilemap('level');
        // add an image to the map to be used as a tileset (tileset, key)
		// the tileset name is specified w/in the .json file (or in Tiled)
		// a single map may use multiple tilesets
        this.map.addTilesetImage('tileSheet', 'tileSheet')
        
        // create new TilemapLayer object 
		// A Tilemap Layer is a set of map data combined with a tileset
        this.ULayer = this.map.createLayer('Universal Platforms');
        this.map.setCollisionByExclusion([],true,this.ULayer);
        this.redLayer = this.map.createLayer('Red Platforms');
        this.map.setCollisionByExclusion([],true,this.redLayer);
        this.blueLayer = this.map.createLayer('Blue Platforms');
        this.map.setCollisionByExclusion([],true,this.blueLayer);
        game.physics.arcade.enable(this.redLayer);
        game.physics.arcade.enable(this.blueLayer);
        game.physics.arcade.enable(this.ULayer);
		// set the world size to match the size of the Tilemap layer
        this.ULayer.resizeWorld();
        // set ALL tiles to collide *except* those passed in the array
        this.map.setCollision([1],true,this.ULayer,true);
        
        player = game.add.sprite(0, 3000, 'dude');
        game.physics.arcade.enable(player);
        //adding detail to the physics system on the player and the baddies. Precisely the Y-axis, the number in .bounce.y should be the percentage of speed that "bounce back", .gravity.y is the acceleration of gravity 
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 3300;
        player.body.collideWorldBounds = true; //stoping player from going out the bounds
        //creating animations for the player and the baddies, works as "add(name [, frames] [, frameRate] [, loop] [, useNumericIndex])"

        //Creating the scoreText object, works like text( [x] [, y] [, text] [, style] [, group]), The style object containing style attributes like font, font size , etc.
        scoreText = game.add.text(12, 12, 'score: 0', { fontSize: '20px', fill: '#000' });
        console.log('Play: score text created');

        //creating the control system, don't know much detail yet.
        cursors = game.input.keyboard.createCursorKeys();
        console.log('Play: control system created');

        //creating sound object to the game
        game.camera.follow(player);
        this.blueLayer.alpha = 0;
        this.toPast1 = game.add.tween(this.redLayer).to({alpha : 1 },100, "Linear", false, 0, 0);
        this.toPast2 = game.add.tween(this.blueLayer).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.toNow1 = game.add.tween(this.redLayer).to({alpha : 0 },100, "Linear", false, 0, 0);
        this.toNow2 = game.add.tween(this.blueLayer).to({alpha : 1 },100, "Linear", false, 0, 0);
    },

    

    update: function () {


        // creating the Collide for everything
        game.physics.arcade.collide(player, this.ULayer);
        game.physics.arcade.collide(player, this.redLayer);
        game.physics.arcade.collide(player, this.blueLayer);
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
        if (game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
            player.body.velocity.y = -950;
        }

        if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            if (inPast){
                this.map.setCollisionByExclusion([],true,this.blueLayer);
                this.map.setCollisionByExclusion([],false,this.redLayer);
                this.toNow1.start();
                this.toNow2.start();
                inPast = false;
            } else {
                this.map.setCollisionByExclusion([],false,this.blueLayer);
                this.map.setCollisionByExclusion([],true,this.redLayer);
                this.toPast1.start();
                this.toPast2.start();
                inPast = true;
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
var game = new Phaser.Game(900, 700, Phaser.AUTO);
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');