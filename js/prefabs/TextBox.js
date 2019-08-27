var currentTextBox = null;
var currentText = null;
var textIsActive = null;

function TextBox(game, index) {
    this.fadeText = false;
    //Phaser.Sprite.call(this, game,x, y, index, 'TextBox');

    this.currentTextBox = game.add.sprite(400, 400, 'textBox');
	
    this.currentTextBox.anchor.set(0.5, 0.5);


    this.textstyle = { font: "12px Helvetica", fill: "#000000", 
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "left", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 510 };

    //array to store all textBox dialogues
    this.textLines = ['one time', 'two times', 'three times'];


    this.currentText = game.add.text(150, 300, this.textLines[index], this.textstyle);
    this.textIsActive = true;
    //game.time.events.add(0, fadeText, this);
    this.fadeText1 = game.add.tween(this.currentText).to( { alpha: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Linear.None, true);
    this.fadeText2 = game.add.tween(this.currentTextBox).to( { alpha: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Linear.None, true);
    console.log('in TextBox:' + this.textLines[index]);
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
TextBox.prototype = Object.create(Phaser.Sprite.prototype);
TextBox.prototype.constructor = TextBox;
