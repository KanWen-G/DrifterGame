// Load state

var load = function(game) {};
load.prototype = {
preload: function() {
    game.load.tilemap('mario', 'assets/Tiled/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/Tiled/super_mario.png');
    game.load.image('player', 'assets/Tiled/phaser-dude.png');
},
create: function() {
    // check for local storage browser support
    if(window.localStorage) {
        console.log('Local storage supported');
    } else {
        console.log('Local storage not supported');
    }
    // go to Title state
    game.state.start('title');
},
};
