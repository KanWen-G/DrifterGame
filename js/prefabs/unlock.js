function unlocking(word){
    this.counterF = false;
    if(counterF == false){
        if(game.input.keyboard.justPressed(Phaser.Keyboard.F)){
            this.lock = game.add.sprite(game.camera.x + 300, 150, 'lock');
            this.lock.animations.add('error', [0,1], 5);
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
            this.counterF = true;
        }
    }
}

function keyPress (char){ 

    if (this.attempt < this.word.length){
        this.lock.animations.play('error');
        this.lockedSound.play();
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
            this.lock.alpha = 0;
            this.lock.kill();


        }
        if (this.correct < this.word.length){
            this.frame=0;
            this.theInput = [];
            this.attempt = 0;
            this.correct = 0;
            this.failSound.play();
            this.lock.alpha = 0;
            p.pause = false;
            game.input.keyboard.removeCallbacks();
            this.lock.kill();
        }
    }
    console.log(this.theInput);
    console.log(this.attempt);
    console.log(this.word.length);
}
