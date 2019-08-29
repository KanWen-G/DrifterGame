// Intro Cutscene state 2

var infirmaryintroscene = function(game) {};
infirmaryintroscene.prototype = {
    create: function() {

        this.nextQuote2;
        this.line4 = [];

        this.wordIndex4 = 0;
        this.lineIndex4 = 0;

        this.firstTextDone1 = false;

        this.content4 = [
            "Drifter: Another scumbag who profits off the misery of others. The prison system should be used to reform criminals, not turn them into money machines. But it wasn’t my place to try and fix what was broken. Just to make sure the bad parts get thrown out.",
            " ",
            "...",
            "My name is Tad, codename Drifter. I’m a private detective, who has the special ability to enter a person’s conscious. In two states, I can see their id and their ego, their desires and emotions against their sense of reality and truth. From there, I can figure out what secrets they have, what drives them, what their goals are. Is it a pleasant experience?",
            " ",
            "No. But it’s an effective one."
        ];
        this.introTextStyle2 = { font: "14px Arial", fill: "#ffffff", 
        align: "center", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "center", 
        boundsAlignV: "middle", 
        wordWrap: true, wordWrapWidth: 600 };

        //creating first scene
        this.frame1 = game.add.sprite(game.camera.x + 400, game.camera.y + 300, 'infirmaryScene');
        this.frame1.anchor.setTo(0.5,0.5);
        this.frame1.alpha = 0;
        //setting background to black for fade in effect
        game.stage.backgroundColor = "#000000";
        //creating fade in effect and starting the fade in effect
        this.sceneFadeIn = game.add.tween(this.frame1).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, false, 0, 0);
        this.sceneFadeIn.start();

        //starting the first textbox
        game.time.events.add(Phaser.Timer.SECOND * 2, this.firstLine, this);
    },
    update: function() {
        if(this.firstTextDone1){
            this.nextQuote2 = game.add.text(game.camera.x + 400, game.camera.y + 300 + 150, "Press SPACE to continue.", {font: "12px Arial", fill: "#ffffff"});
            this.nextQuote2.anchor.setTo(0.5, 0.5);
            this.nextQuote2.alpha = 0;
            this.flashNext = game.add.tween(this.nextQuote2).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, true).loop(true);
            this.flashNext.start();
        }
        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.firstTextDone1) {
            game.camera.fade(0x000000, 1000);
            game.time.events.add(Phaser.Timer.SECOND * 1, this.startGame, this);
        }
    },
    firstLine: function(){
        
        this.textBack = game.add.sprite(game.camera.x + 400, game.camera.y + 300, 'blackLayer');
        this.textBack.anchor.setTo(0.5, 0.5);
        this.textBack.alpha = 0;

        this.backFadeIn = game.add.tween(this.textBack).to( { alpha: 0.65 }, 1500, Phaser.Easing.Linear.None, false, 0, 0);
        this.backFadeIn.start();

        game.time.events.add(Phaser.Timer.SECOND * 3, this.makeIntroSceneText4, this);

    },
    makeIntroSceneText4: function(){
        this.text4 = game.add.text(game.camera.x + 400, game.camera.y + 300 , '', this.introTextStyle2);
        this.text4.anchor.setTo(0.5,0.5);

        this.nextLine4();
    },
    nextLine4: function() {
        if (this.lineIndex4 === this.content4.length)
        {
            this.firstTextDone1 = true;
            return;
        }
        //  Split the current line on spaces, so one word per array element
        this.line4 = this.content4[this.lineIndex4].split(' ');
        //  Reset the word index to zero (the first word in the line)
        this.wordIndex4 = 0;
        //  Call the 'nextWord' function once for each word in the line (line.length)
        game.time.events.repeat(wordDelay, this.line4.length, this.nextWord4, this);
        //  Advance to the next line
        this.lineIndex4++;
    },
    
    nextWord4: function() {
        //  Add the next word onto the text string, followed by a space
        this.text4.text = this.text4.text.concat(this.line4[this.wordIndex4] + " ");
        //  Advance the word index to the next word in the line
        this.wordIndex4++;
        //  Last word?
        if (this.wordIndex4 === this.line4.length)
        {
            //  Add a carriage return
            this.text4.text = this.text4.text.concat("\n");
            //  Get the next line after the lineDelay amount of ms has elapsed
            game.time.events.add(lineDelay, this.nextLine4, this);
        }
    },
    startGame: function(){
        game.sound.stopAll();
        game.state.start('petertalks');
    }
}