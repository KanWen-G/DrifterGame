var currentTextBox = null;
var currentText = null;
var textIsActive = null;

function TextBox(game, index) {
    //Phaser.Sprite.call(this, game,x, y, index, 'TextBox');

    currentTextBox = game.add.sprite(400, 400, 'textBox');
	
    currentTextBox.anchor.set(0.5, 0.5);


    this.textstyle = { font: "12px Helvetica", fill: "#000000", 
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "left", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 510 };

    //array to store all textBox dialogues
    this.textLines = ['Thank you, patron, for your donation to the World Charity Dispersion Organization. Your donated funds are as follows:$40,000 to MD. Anderson Cancer Center $60,000 to Doctors Without Borders $25,000 to American Humane. Once again, thank you for your donations. Your funding will help make the world a better place. If you did not give these donations, please contact our support center at…'];

    currentText = game.add.text(150, 300, this.textLines[index], this.textstyle);
    textIsActive = true;
    //game.time.events.add(0, fadeText, this);


}
function fadeText() {
    game.add.tween(currentText).to( { alpha: 0 }, Phaser.Timer.SECOND * 10, Phaser.Easing.Linear.None, true);
    game.add.tween(currentTextBox).to( { alpha: 0 }, Phaser.Timer.SECOND * 10, Phaser.Easing.Linear.None, true);
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
TextBox.prototype = Object.create(Phaser.Sprite.prototype);
TextBox.prototype.constructor = TextBox;