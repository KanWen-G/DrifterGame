// Team Dritfer
// Kan Wen, Jorge Ortiz, Zachery Wolfert
// Github: https://github.com/KanWen-G/DrifterGame

"use strict";


// wait for browser to load before creating Phaser game
window.onload = function() {
    // uncomment the following line if you need to purge local storage data
    localStorage.clear();
    
    // define game
    game = new Phaser.Game(800,600, Phaser.AUTO, 'myGame');
    // define states
    game.state.add('load', load);
    game.state.add('intromonologue', intromonologue);
    game.state.add('introscene', introscene);
    game.state.add('petertalks', petertalks);
    game.state.add('infirmaryintroscene', infirmaryintroscene);
    game.state.add('title', title);
    game.state.add('tutorial', tutorial);
    game.state.add('play', play);
    game.state.add('gameOver', gameOver);
    game.state.add('gameOver2', gameOver2);
    game.state.add('credits', credits);
    game.state.start('load');

}







