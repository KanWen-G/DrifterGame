// Intro Cutscene state
var petertalks;
var petertalks = function(game) {};
petertalks.prototype = {
    create: function(){
        this.content = [
            "Peter: ",
            " My name is Peter Hooky.",
            "57 years old. Married to Vanice Hooky. Father of Isaac Hooky.",
            "",
            "I manage a prison complex for a private prison corporation, a for-profit organization that takes federal prisoners for a fee and detains them until their sentence ends.",
            "...",
            "...",
            "If it ever ends...",
            "",
            "",
            "",
            "Press SPACE to Continue."
        ];
    
        this.line = [];
    
        this.wordIndex = 0;
        this.lineIndex = 0;
    
        this.introTextStyle = { font: "16px Arial", fill: "#fff", 
        align: "center", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "center", 
        boundsAlignV: "middle", 
        wordWrap: true, wordWrapWidth: 400 };

        this.sound = game.add.audio('Walking 2', 0.3);
        this.sound.loopFull();

        game.stage.backgroundColor = "#000000";

        this.text = game.add.text(game.camera.x + 400, game.camera.y + 300 , '', this.introTextStyle);
        this.text.anchor.setTo(0.5,0.5);

        //text.setTextBounds(20, 20, 780, 580);


        this.nextLine2();

    },
    update: function(){
        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            this.sound.stop();
            game.camera.fade(0x000000, 1000);
            game.time.events.add(Phaser.Timer.SECOND * 1, this.startGame, this);
        }
    },

    nextLine2: function() {

        if (this.lineIndex === this.content.length)
        {
            return;
        }
        //  Split the current line on spaces, so one word per array element
        this.line = this.content[this.lineIndex].split(' ');
        //  Reset the word index to zero (the first word in the line)
        this.wordIndex = 0;
        //  Call the 'nextWord2' function once for each word in the line (line.length)
        game.time.events.repeat(wordDelay, this.line.length, this.nextWord2, this);
        //  Advance to the next line
        this.lineIndex++;

    },

    nextWord2: function() {
        //  Add the next word onto the text string, followed by a space
        this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");
        //  Advance the word index to the next word in the line
        this.wordIndex++;
        //  Last word?
        if (this.wordIndex === this.line.length)
        {
            //  Add a carriage return
            this.text.text = this.text.text.concat("\n");
            //  Get the next line after the lineDelay amount of ms has elapsed
            game.time.events.add(lineDelay, this.nextLine2, this);
        }

    },
    startGame: function(){
        game.state.start('tutorial');
    }
}

