// Title state

var title = function(game) {};
title.prototype = {
create: function() {
    // add title screen text
    game.stage.backgroundColor = "#ffffff";
    
    
    var title = game.add.sprite(game.world.centerX, game.world.centerY, 'title');
    title.anchor.setTo(0.5, 0.5);

    this.gameMusic = game.add.audio('Game Music', 0.2);
    this.cutsceneMusic = game.add.audio('Cutscene Music', 0.3);
    this.gameMusic.loopFull();
    
},
update: function() {
    // check for UP input
    if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
        game.state.start('intromonologue');
        this.gameMusic.stop();
    }
},
};
