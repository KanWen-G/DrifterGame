function TextBox(game, index) {
    this.textstyle = { font: "12px Helvetica", fill: "#000000", 
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "left", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 510 };
    //array to store all textBox dialogues
    this.textLines = ['Thank you, patron, for your donation to the World Charity Dispersion Organization. Your donated funds are as follows:$40,000 to MD. Anderson Cancer Center $60,000 to Doctors Without Borders $25,000 to American Humane. Once again, thank you for your donations. Your funding will help make the world a better place. If you did not give these donations, please contact our support center at…', 
    'Use arrow key / WASD to controll the charater movement', 'Use SPACEBAR to switch personality', 'Pruss F to unlock doors, with 3 charater password, in this case ,it is pas'];

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
    this.fadeText1 = game.add.tween(this.currentText).to( { alpha: 0 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Linear.None, false);
    this.fadeText2 = game.add.tween(this.currentTextBox).to( { alpha: 0 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Linear.None, false);
    console.log('in TextBox');

}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
TextBox.prototype = Object.create(Phaser.Sprite.prototype);
TextBox.prototype.constructor = TextBox;
