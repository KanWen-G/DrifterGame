// Intro Cutscene state 2

var gameOver = function(game) {};
gameOver.prototype = {
    create: function() {

        this.cutSceneMusic = game.add.audio('Cutscene Music', 0.2);
        this.cutSceneMusic.loopFull();
        isLock = 0;
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
            "Peter: You… what did you do to me?",
            " ",
            "...",
            "Drifter: I looked into your conscious. Your thoughts betray you, Peter. I know why you held those prisoners. Why you tried to bend the rules.",
            " ",
            "Peter: You can’t know anything.",
            " ",
            "Drifter: You never kept the extra cash those illegally-held prisoners generated. You always donated them to different organizations. Cancer research. Disaster aid. Charity dispersion. You thought that it would justify keeping those people locked up when they had served their time?"
        ];
        this.content5 = [
            "Peter: You don’t get it. I have seen those people. Those prisoners. You think they’re all ready for society as soon as they send a certain amount of time behind bars? That they’ll go out and be productive members of their communities? I’ve seen it time and time again. Only a few months before they go back to their old criminal ways and end up back in a cell. So why not just keep them here? The money they generate is doing more good for the world than they would back on the streets! ",
            "",
            "Drifter: … You’re delusional. It's not your call to decide who walks and who stays locked up. No amount of good intentions can justify ruining people’s lives and taking their freedom."
        ];
        this.introTextStyle2 = { font: "14px Arial", fill: "#ffffff", 
        align: "center", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "center", 
        boundsAlignV: "middle", 
        wordWrap: true, wordWrapWidth: 600 };

        //creating first scene
        this.frame1 = game.add.sprite(game.camera.x + 400, game.camera.y + 300, 'endScene1');
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

        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.secondTextDone){
            game.camera.fade(0x000000, 1000);
            game.time.events.add(Phaser.Timer.SECOND * 1, this.startNextScene, this);
        }

        if(this.firstTextDone1){
            this.nextQuote2 = game.add.text(game.camera.x + 400, game.camera.y + 300 + 150, "Press SPACE to continue.", {font: "12px Arial", fill: "#ffffff"});
            this.nextQuote2.anchor.setTo(0.5, 0.5);
            this.nextQuote2.alpha = 0;
            this.flashNext = game.add.tween(this.nextQuote2).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, true).loop(true);
            this.flashNext.start();
        }
        
        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.firstTextDone1) {
            this.firstTextDone1 = false;
            this.text4.kill();
            this.text5 = game.add.text(game.camera.x + 400, game.camera.y + 300 , '', this.introTextStyle2);
            this.text5.anchor.setTo(0.5,0.5);
            this.secondLine();
        }
                
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.time++;
        }

        if(game.input.keyboard.justReleased(Phaser.Keyboard.SPACEBAR)) {
            this.time = 0;
        } 

        if(this.time > 100){
            this.time = 0;
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
        game.state.start('gameOver2');
    }
}