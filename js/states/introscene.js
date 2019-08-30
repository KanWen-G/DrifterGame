// Intro Cutscene state

var introscene = function(game) {};
introscene.prototype = {
    
    create: function(){
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.nextQuote;
        this.line2 = [];
        
        this.time = 0;
        this.worldIndex2 = 0;
        this.lineIndex2 = 0;
        this.onlyOne = 0;
        this.firstTextDone = false;
        this.secondTextDone = false;

        this.line3 = [];

        this.wordIndex3 = 0;
        this.lineIndex3 = 0;


        this.content2 = [
            "Officer: His name is Peter Hooky. He manages a prison complex near Vixburg. Large building, houses a few hundred thousand inmates. Private prison corporations like the one that owned Peter’s complex sometimes hold inmates longer than they’re supposed to to make more money, since they get paid per prisoner they hold. ",
            " ",
            "Drifter: So Peter’s been over-holding prisoners? Is that why he’s been arrested?",
            "",
            "Officer: Well, usually the prisons can get away with keeping prisoners through legal methods. Denying paroles, giving needless infractions, small methods that build up into longer sentences. But we think either Peter or his superiors got greedy. He may have tried to secretly manipulate prisoner information to give them longer sentences, or altered policies for paroles that don’t agree with the state’s. "
        ];
        this.content3 = [
            "Drifter: So let me guess why I’m here: you don’t have enough evidence and need me to help with that.",
            "",
            "Officer: Not exactly. We think we have enough evidence for a case. Hence why we were able to get a warrant to detain him. But we don’t have a clear motive. Without a motive, a good enough lawyer can shut down the case. We need you to do your ‘special trick’ to figure out what he gets out of this, or if it was all just for the money.",
            "",
            "Drifter: It’ll be my usual fee. Is he already prepped?",
            "",
            "Officer: Yep. Done this for a few years now, Drifter. We know the drill.",
            "",
            "Drifter: Then let’s get this done. I don’t have all night."
        ];
        this.introTextStyle2 = { font: "14px Arial", fill: "#ffffff", 
        align: "center", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "center", 
        boundsAlignV: "middle", 
        wordWrap: true, wordWrapWidth: 600 };


        this.cutSceneMusic = game.add.audio('Cutscene Music', 0.2);
        this.cutSceneMusic.loopFull();
        //creating first scene
        this.frame1 = game.add.sprite(game.camera.x + 400, game.camera.y + 300, 'lobbyScene');
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
        //console.log(this.time);
        if(this.firstTextDone&&this.onlyOne == 0){
            this.nextQuote = game.add.text(game.camera.x + 400, game.camera.y + 300 + 150, "Press SPACE to continue.", {font: "12px Arial", fill: "#ffffff"});
            this.nextQuote.anchor.setTo(0.5, 0.5);
            this.onlyOne = 1;
            //this.nextQuote.alpha = 0;
            //this.flashNext = game.add.tween(this.nextQuote).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, true);
            //this.flashNext.start();
            //this.flashNextOff = game.add.tween(this.nextQuote).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, true);

        }
        if(this.secondTextDone){
            this.nextQuote.text = "Press SPACE to continue.";
        }
        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.firstTextDone) {
            this.firstTextDone = false;
            this.nextQuote.text = "";
            //this.flashNextOff.start();
            this.text2.kill();
            this.text3 = game.add.text(game.camera.x + 400, game.camera.y + 300 , '', this.introTextStyle2);
            this.text3.anchor.setTo(0.5,0.5);
            this.secondLine();
        }

        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.secondTextDone){
            game.camera.fade(0x000000, 1000);
            game.time.events.add(Phaser.Timer.SECOND * 1, this.startNextScene, this);
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

        game.time.events.add(Phaser.Timer.SECOND * 3, this.makeIntroSceneText, this);

    },
    secondLine: function(){
        game.time.events.add(Phaser.Timer.SECOND * 1, this.makeIntroSceneText2, this);
    },
    makeIntroSceneText: function(){
        this.text2 = game.add.text(game.camera.x + 400, game.camera.y + 300 , '', this.introTextStyle2);
        this.text2.anchor.setTo(0.5,0.5);

        this.nextline2();
    },
    makeIntroSceneText2: function(){
        //this.text3 = game.add.text(game.camera.x + 400, game.camera.y + 300 , '', this.introTextStyle2);
        //this.text3.anchor.setTo(0.5,0.5);

        this.nextLine3();
    },
    nextline2: function() {
        //console.log(this.lineIndex2);
        if (this.lineIndex2 === this.content2.length)
        {
            this.firstTextDone = true;
            return;
        }
        //  Split the current line on spaces, so one word per array element
        this.line2 = this.content2[this.lineIndex2].split(' ');
        //  Reset the word index to zero (the first word in the line)
        this.wordIndex2 = 0;
        //  Call the 'nextWord' function once for each word in the line (line.length)
        game.time.events.repeat(wordDelay, this.line2.length, this.nextWord2, this);
        //  Advance to the next line
        this.lineIndex2++;
    },
    nextLine3: function() {
        if (this.lineIndex3 === this.content3.length)
        {
            this.secondTextDone = true;
            return;
        }
        //  Split the current line on spaces, so one word per array element
        this.line3 = this.content3[this.lineIndex3].split(' ');
        //  Reset the word index to zero (the first word in the line)
        this.wordIndex3 = 0;
        //  Call the 'nextWord' function once for each word in the line (line.length)
        game.time.events.repeat(wordDelay, this.line3.length, this.nextWord3, this);
        //  Advance to the next line
        this.lineIndex3++;
    },
    
    nextWord2: function() {
        //  Add the next word onto the text string, followed by a space
        this.text2.text = this.text2.text.concat(this.line2[this.wordIndex2] + " ");
        //  Advance the word index to the next word in the line
        this.wordIndex2++;
        //  Last word?
        if (this.wordIndex2 === this.line2.length)
        {
            //  Add a carriage return
            this.text2.text = this.text2.text.concat("\n");
            //  Get the next line after the lineDelay amount of ms has elapsed
            game.time.events.add(lineDelay, this.nextline2, this);
        }
    },
    nextWord3: function() {
        //  Add the next word onto the text string, followed by a space
        this.text3.text = this.text3.text.concat(this.line3[this.wordIndex3] + " ");
        //  Advance the word index to the next word in the line
        this.wordIndex3++;
        //  Last word?
        if (this.wordIndex3 === this.line3.length)
        {
            //  Add a carriage return
            this.text3.text = this.text3.text.concat("\n");
            //  Get the next line after the lineDelay amount of ms has elapsed
            game.time.events.add(lineDelay, this.nextLine3, this);
        }
    },
    startNextScene: function(){
        game.state.start('infirmaryintroscene');
    },
}