
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.tilemap('mario', 'assets/Tiled/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/Tiled/super_mario.png');
    game.load.image('player', 'assets/Tiled/phaser-dude.png');

    game.load.audio('Game Music', 'assets/audio/In Game Music.ogg');
    game.load.audio('Cutscene Music', 'assets/audio/Cutscene Music.ogg');
    game.load.audio('Jump', 'assets/audio/Jump.ogg');
    game.load.audio('Walking 1', 'assets/audio/Normal Walking Sound.ogg');
    game.load.audio('Walking 2', 'assets/audio/Hollow Walking Sound.ogg');
    game.load.audio('Switch 1', 'assets/audio/State 1 Switch.ogg');
    game.load.audio('Switch 2', 'assets/audio/State 2 Switch.ogg');
    game.load.audio('Locked', 'assets/audio/Locked.ogg');
    game.load.audio('Unlocked', 'assets/audio/Unlocked.ogg');
    game.load.audio('Text Advance', 'assets/audio/Text Advance.ogg');
}

//global variables
var map;
var tileset;
var layer;
var p;
var cursors;
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

function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.stage.backgroundColor = '#787878';
    
    map = game.add.tilemap('mario');
    
    map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
    
    //  14 = ? block
    // map.setCollisionBetween(14, 15);
    
    this.Background = map.createLayer('Background');
    this.item = map.createLayer('item');
    layer = map.createLayer('World1');
    game.physics.arcade.enable(layer);
    map.setCollisionBetween(340, 350, true, layer);

    
    //  Un-comment this on to see the collision tiles
    // layer.debug = true;
    
    layer.resizeWorld();
    
    p = new Player (game,32,32);
    game.add.existing(p);
    game.world.bringToTop(p);
    game.camera.follow(p);

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

    gameMusic.play();
    //walkingSound1.loopFull();
    //walkingSound1.pause();

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

    //jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    console.log(p);
    
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {
    if(upKey.downDuration(5)){
        playFX('jump');
    }
    if(leftKey.downDuration(5)){
        playFX('walking1');
    }
    if(rightKey.downDuration(5)){
        playFX('walking2');
    }
    
    //jumpButton.onDown.add(playFX(jump), this);

    game.debug.bodyInfo(p);
    
    game.physics.arcade.collide(p, layer);
    
}

function render() {
    // game.debug.body(p);
    game.debug.bodyInfo(p, 32, 320);
}

//function to play sounds depending on the input name
function playFX(soundType){
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
}
