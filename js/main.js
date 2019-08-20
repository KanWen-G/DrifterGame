
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.tilemap('mario', 'assets/Tiled/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/Tiled/super_mario.png');
    game.load.image('player', 'assets/Tiled/phaser-dude.png');
    
}

var map;
var tileset;
var layer;
var p;
var cursors;

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
    console.log(p);
    
    game.camera.follow(p);
    
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {
    game.debug.bodyInfo(p);
    
    game.physics.arcade.collide(p, layer);
    
}

function render() {
    
    // game.debug.body(p);
    game.debug.bodyInfo(p, 32, 320);
    
}
