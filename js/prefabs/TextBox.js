function TextBox(game, index) {
    this.textstyle = { font: "12px Helvetica", fill: "#000000", 
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "left", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 510 };
    //array to store all textBox dialogues
    this.textLines = ['arrows or wasd to move/ jumP. hold shift to sPrint.', 'press spAcebAr to chAnge mindstAtes. you Are currently in the ego stAte. pressing spAcebAr would tAke you to the id stAte, thAt is more chAotic.', 'preSS f to interact with doorS. there iS a 3 character combination you muSt find.'];


    //Phaser.Sprite.call(this, game,x, y, index, 'TextBox');
    this.currentTextBox = game.add.sprite(game.camera.x + 400, 120, 'textBox');
    this.currentTextBox.scale.setTo(1,0.7);
    this.currentTextBox.anchor.set(0.5, 0.5);
    this.currentTextBox.anchor.set(0.5, 0.5);
    this.currentText = game.add.text(this.currentTextBox.x, this.currentTextBox.y, this.textLines[index], this.textstyle);
    this.currentText.anchor.set(0.5, 0.5);
    this.textIsActive = true;
    this.fadeText = false;


   

    //game.time.events.add(0, fadeText, this);
    this.fadeText1 = game.add.tween(this.currentText).to( { alpha: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Linear.None, false);
    this.fadeText2 = game.add.tween(this.currentTextBox).to( { alpha: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Linear.None, false);
    console.log('in TextBox');
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
TextBox.prototype = Object.create(Phaser.Sprite.prototype);
TextBox.prototype.constructor = TextBox;
