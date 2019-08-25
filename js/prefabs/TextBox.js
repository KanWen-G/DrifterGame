function TextBox(game, index) {
    //Phaser.Sprite.call(this, game,x, y, index, 'TextBox');

    this.newTextBox = game.add.sprite(400, 400, 'textBox');
    console.log(1234);
	// Sprite setting
    //this.anchor.set(0.5, 0.5);
    this.newTextBox.anchor.set(0.5, 0.5);


    this.textstyle = { font: "12px Arial", fill: "#000000", 
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "left", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 525 };

    //array to store all textBox dialogues
    this.textLines = ['Thank you patron for your donation to the World Charity Dispersion Organization. Your donated funds are as follows:$40,000 to MD. Anderson Cancer Center $60,000 to Doctors Without Borders $25,000 to American Humane. Once again, thank you for your donations. Your funding will help make the world a better place. If you did not give these donations, please contact our support center at…'];

    this.textToWrite = game.add.text(150, 300, this.textLines[index], this.textstyle);

}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
TextBox.prototype = Object.create(Phaser.Sprite.prototype);
TextBox.prototype.constructor = TextBox;