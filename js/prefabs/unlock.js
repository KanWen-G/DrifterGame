function unlocking(word){

        if(game.input.keyboard.justPressed(Phaser.Keyboard.F) && lockCounter){
            this.lock = game.add.sprite(game.camera.x + 300, 150, 'lock');
            this.lock.animations.add('error', [0,1], 14, true, true);
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
            lockConuter = false;
            game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
        }else if (game.input.keyboard.justPressed(Phaser.Keyboard.F) && !lockCounter){
            p.pause = false;
            game.input.keyboard.removeCallbacks();
            game.time.events.add(300, killLock, this);
            lockCounter = true;
        }
    
    }


function stopAnimation(){
    this.lock.animations.stop()
}

function killLock(){
    this.lock.kill();
}

function keyPress (char){ 
    this.theInput[this.correct] = char;
    console.log(this.theInput[this.correct]);
    if (this.correct == 0){
        if(this.theInput[this.correct] == this.word.charAt(this.correct)){
            this.correct++;
            this.lock.frame = 2;
            this.lockedSound.play();
        } else {
            this.lock.animations.play('error');
            this.failSound.play()
            this.theInput = [];
            this.correct = 0;
            game.time.events.add(200, stopAnimation, this);
        }
    } else if (this.correct == 1){
        if(this.theInput[this.correct]  == this.word.charAt(this.correct)){
            this.correct++;
            this.lock.frame = 3;
            this.lockedSound.play();
        } else {
            this.lock.animations.play('error');
            this.failSound.play()
            this.theInput = [];
            this.correct = 0;
            game.time.events.add(200, stopAnimation, this);
        }
    } else if (this.correct == 2){
        if(this.theInput[this.correct]  == this.word.charAt(this.correct)){
            this.lock.frame = 4;
            this.unlockedSound.play();
            p.pause = false;
            game.input.keyboard.removeCallbacks();
            isLock = true;
            game.time.events.add(300, killLock, this);
        }else {
            this.lock.animations.play('error');
            this.failSound.play()
            this.theInput = [];
            this.correct = 0;
            game.time.events.add(200, stopAnimation, this);
        }
    } 
    console.log(this.theInput[this.correct]);
    console.log(this.word.charAt(this.correct));
}