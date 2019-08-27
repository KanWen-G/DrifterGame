function unlocking(word){
    if(game.input.keyboard.justPressed(Phaser.Keyboard.F)){
        this.lock = game.add.sprite(game.camera.x + 300, 150, 'lock');
        //this.lock= game.add.sprite(this, game,game.camera.x + 400, game.camera.y, 'lock');
        this.frame = 0;
        isLock = false;
        this.lockedSound = game.add.audio('Locked');
        this.unlockedSound = game.add.audio('Unlocked');
        this.failSound = game.add.audio('LockFail');
        this.word = word;
        this.attempt = 0;
        this.theInput = [];
        this.correct = 0;
        p.pause = true;
        game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
    }
}

function keyPress (char){ 
    game.camera.shake(0.01, 10);
    if (this.attempt < this.word.length){
        this.lockedSound.play();
        this.frame++;
        this.lock.frame = this.frame;
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
            this.unlockedSound.play();
            p.pause = false;
            game.input.keyboard.removeCallbacks();
            isLock = true;

        }
        if (this.correct < this.word.length){
            this.frame=0;
            this.theInput = [];
            this.attempt = 0;
            this.correct = 0;
            this.failSound.play();
            this.lock.alhpa = 0;
        }
    }
    console.log(this.theInput);
    console.log(this.attempt);
    console.log(this.word.length);
}
