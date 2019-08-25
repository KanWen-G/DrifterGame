function unlocking(word){
    if(game.input.keyboard.justPressed(Phaser.Keyboard.F)){
        p.filter = [this.blurX, this.blurY];
        this.word = word;
        this.attempt = 0;
        this.theInput = [];
        this.correct = 0;
        p.pause = true;
        game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
    }
}

function keyPress (char){
    lockedSound.play();
    if (this.attempt < this.word.length){
        this.theInput[this.attempt] = char;
        this.attempt++;
    }
    if(this.attempt == this.word.length){
        for (var i = 0; i < this.word.length; i++)
        {
            if(this.theInput[i] == this.word.charAt(i))
                this.correct++;
        }
        if (this.correct == this.word.length){
            unlockedSound.play();
            p.pause = false;
            game.input.keyboard.removeCallbacks();
        }
        if (this.correct < this.word.length){
            this.theInput = [];
            this.attempt = 0;
            this.correct = 0;
        }
    }
    console.log(this.theInput);
    console.log(this.attempt);
    console.log(this.word.length);
}
