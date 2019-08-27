// Title state

var title = function(game) {};
title.prototype = {
create: function() {
    // add title screen text
    game.stage.backgroundColor = "#ffffff";
    var instructStyle = { font: "12px Helvetica", fill: "#000000", 
    align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
    boundsAlignH: "left", 
    boundsAlignV: "top", 
    wordWrap: true, wordWrapWidth: 510 };
    
    //var title = game.add.sprite(game.width / 2, game.height / 3, 'title');
    //title.anchor.set(0.5);
    var instruct = game.add.text(game.width / 2, game.height * .3, 'Move with ASD or Arrows. Jump with W or UP Arrow.', instructStyle);
    instruct.anchor.set(0.5);

    var switchInstruct = game.add.text(game.width/2, game.height * .5, 'Switch states with SPACEBAR.', instructStyle)
    switchInstruct.anchor.set(0.5);

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
