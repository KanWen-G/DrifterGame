function TextBox(game, index) {
    this.textstyle = { font: "12px Helvetica", fill: "#000000", 
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "left", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 510 };
    //array to store all textBox dialogues
    this.textLines = ['Move the subject by using the ‘WASD’ keys or the arrow keys, with uP and ‘W’ making your character jumP. Hold ‘SHIFT’ while moving to sPrint.', 'Press ‘SPACE’ to switch between the ego and id stAtes of your subject’s mind. The ego stAte is A perception of reAlity and truth, thus is orderly. The id stAte is your subject’s bAse desires and emotions, mAking it more chAotic.', 'DoorS can be opened with the correct input of letterS to make a paSSword. You can find the clueS to what theSe letterS are hidden in the noteS found in the ego State. PreSS "ENTER" to attempt to unlock the door, and "f" to exit the unlock attempt.', ''];


    //Phaser.Sprite.call(this, game,x, y, index, 'TextBox');
    this.currentTextBox = game.add.sprite(game.camera.x + 400, game.camera.y + 120, 'textBox');
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

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (TextBox)
TextBox.prototype = Object.create(Phaser.Sprite.prototype);
TextBox.prototype.constructor = TextBox;
