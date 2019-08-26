// Load state

var load = function(game) {};
load.prototype = {
preload: function() {
    game.load.tilemap('mario', 'assets/Tiled/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('player', 'assets/img/PeterSprites.png',32,64);
    game.load.image('tiles', 'assets/Tiled/super_mario.png');
    game.load.image('filter', 'assets/img/filter.png');
    game.load.image('textBox', 'assets/img/TextBox.png');
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
    game.load.script('BlurX', 'https://cdn.rawgit.com/photonstorm/phaser-ce/master/filters/BlurX.js');
    game.load.script('BlurY', 'https://cdn.rawgit.com/photonstorm/phaser-ce/master/filters/BlurY.js');
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
