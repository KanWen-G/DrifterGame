// Title state

var title = function(game) {};
title.prototype = {
create: function() {
    // add title screen text
    game.stage.backgroundColor = "#ffffff";
    
    //var title = game.add.sprite(game.width / 2, game.height / 3, 'title');
    //title.anchor.set(0.5);
    
    var playText = game.add.text(game.width / 2, game.height * .8, 'Press the SPACEBAR to Start');
    playText.anchor.set(0.5);
    
},
update: function() {
    // check for UP input
    if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
        game.state.start('tutorial');
    }
},
};
