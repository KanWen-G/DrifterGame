// Title state

var title = function(game) {};
title.prototype = {
create: function() {
    // add title screen text
    game.stage.backgroundColor = "#ffffff";
    
    
    var title = game.add.sprite(game.camera.x + 400, game.camera.y + 300, 'title');
    title.anchor.setTo(0.5, 0.5);
    //title.alpha = 0;

    //this.sceneFadeIn = game.add.tween(this.title).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, false, 0, 0);
    //this.sceneFadeIn.start();

    this.gameMusic = game.add.audio('Game Music', 0.3);
    this.cutsceneMusic = game.add.audio('Cutscene Music', 0.3);
    this.gameMusic.loopFull();
    
},
update: function() {
    //code to center game in browser
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
    // check for UP input
    if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
        game.state.start('introscene');
        this.gameMusic.stop();
    }
},
};
