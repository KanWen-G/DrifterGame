// Team Dritfer
// Kan Wen, Jorge Ortiz, Zachery Wolfert
// Github: https://github.com/KanWen-G/DrifterGame

"use strict";

// define globals
var game;
var p;
var inId = false;
var map;
// wait for browser to load before creating Phaser game
window.onload = function() {
    // uncomment the following line if you need to purge local storage data
    localStorage.clear();
    
    // define game
    game = new Phaser.Game(800,600, Phaser.AUTO, 'myGame');
    
    // define states
    game.state.add('load', load);
    game.state.add('title', title);
    game.state.add('tutorial', tutorial);
    game.state.add('play', play);
    game.state.add('gameOver', gameOver);
    game.state.start('load');
}







