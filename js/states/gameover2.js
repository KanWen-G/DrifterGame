// Intro Cutscene state 2

var gameOver2 = function(game) {};
gameOver2.prototype = {
    create: function() {
        this.cutSceneMusic = game.add.audio('Cutscene Music', 0.2);
        this.cutSceneMusic.loopFull();

        this.nextQuote2;
        this.line4 = [];
        this.line5 = []

        this.wordIndex4 = 0;
        this.lineIndex4 = 0;

        this.wordIndex5 = 0;
        this.lineIndex5 = 0;

        this.firstTextDone1 = false;
        this.SecondTextDone = false;


        this.content4 = [
            "Drifter: You’re finished Peter. For the motive of donating the extra funds to charity, you’re under arrest for manipulating prisoner information illegally to extend their prison sentences.",
            " ",
            "Peter: Do you realize how absurd you’re sounding!? I’m trying to make the world better! You can’t punish me for this!"
        ];
        this.content5 = [
            "Officer: Well, Drifter, another case finished. We’ll have your payment sent to your account. Thanks for your help.",
            "",
            "Drifter: Anytime, officer. If you need me again, you know how to reach me. My job is never done."
        ];
        this.introTextStyle2 = { font: "14px Arial", fill: "#ffffff", 
        align: "center", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "center", 
        boundsAlignV: "middle", 
        wordWrap: true, wordWrapWidth: 600 };

        //creating first scene
        this.frame1 = game.add.sprite(game.camera.x + 400, game.camera.y + 300, 'endScene2');
        this.frame1.anchor.setTo(0.5,0.5);
        this.frame1.alpha = 0;
        //setting background to black for fade in effect
        game.stage.backgroundColor = "#000000";
        //creating fade in effect and starting the fade in effect
        this.sceneFadeIn = game.add.tween(this.frame1).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, false, 0, 0);
        this.sceneFadeIn.start();

        //starting the first textbox
        game.time.events.add(Phaser.Timer.SECOND * 2, this.firstLine, this);
        this.onlyOne = 0;
    },
    update: function() {
        if(this.firstTextDone1 && this.onlyOne == 0){
            this.nextQuote2 = game.add.text(game.camera.x + 400, game.camera.y + 300 + 150, "Press SPACE to continue.", {font: "12px Arial", fill: "#ffffff"});
            this.nextQuote2.anchor.setTo(0.5, 0.5);
            this.nextQuote2.alpha = 0;
            this.onlyOne = 1;
            this.flashNext = game.add.tween(this.nextQuote2).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, true).loop(true);
            this.flashNext.start();
        }
        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.firstTextDone1) {
            this.firstTextDone1 = false;
            this.flashNext.stop();
            this.nextQuote2.alpha = 0;
            this.text4.kill();
            this.text5 = game.add.text(game.camera.x + 400, game.camera.y + 300 , '', this.introTextStyle2);
            this.text5.anchor.setTo(0.5,0.5);
            this.secondLine();
        }
        if (this.secondTextDone){
            this.flashNext = game.add.tween(this.nextQuote2).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, true).loop(true);
            this.flashNext.start();
        }
        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.secondTextDone){
            game.camera.fade(0x000000, 1000);
            game.time.events.add(Phaser.Timer.SECOND * 1, this.startNextScene, this);
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
    secondLine: function(){
        game.time.events.add(Phaser.Timer.SECOND * 1, this.makeIntroSceneText5, this);
    },
    makeIntroSceneText4: function(){
        this.text4 = game.add.text(game.camera.x + 400, game.camera.y + 300 , '', this.introTextStyle2);
        this.text4.anchor.setTo(0.5,0.5);

        this.nextLine4();
    },
    makeIntroSceneText5: function(){
        //this.text3 = game.add.text(game.camera.x + 400, game.camera.y + 300 , '', this.introTextStyle2);
        //this.text3.anchor.setTo(0.5,0.5);

        this.nextLine5();
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
    nextLine5: function() {
        if (this.lineIndex5 === this.content5.length)
        {
            this.secondTextDone = true;
            return;
        }
        //  Split the current line on spaces, so one word per array element
        this.line5 = this.content5[this.lineIndex5].split(' ');
        //  Reset the word index to zero (the first word in the line)
        this.wordIndex5 = 0;
        //  Call the 'nextWord' function once for each word in the line (line.length)
        game.time.events.repeat(wordDelay, this.line5.length, this.nextWord5, this);
        //  Advance to the next line
        this.lineIndex5++;
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
    nextWord5: function() {
        //  Add the next word onto the text string, followed by a space
        this.text5.text = this.text5.text.concat(this.line5[this.wordIndex5] + " ");
        //  Advance the word index to the next word in the line
        this.wordIndex5++;
        //  Last word?
        if (this.wordIndex5 === this.line5.length)
        {
            //  Add a carriage return
            this.text5.text = this.text5.text.concat("\n");
            //  Get the next line after the lineDelay amount of ms has elapsed
            game.time.events.add(lineDelay, this.nextLine5, this);
        }
    },
    startNextScene: function(){
        game.sound.stopAll();
        game.state.start('credits');
    }
}