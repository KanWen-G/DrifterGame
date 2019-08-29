function TextBox(game, index) {
    this.textstyle = { font: "12px Helvetica", fill: "#000000", 
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "left", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 510 };
    //array to store all textBox dialogues
    this.textLines = ['Move the subject by using the ‘WASD’ keys or the arrow keys, with uP and ‘W’ making your character jumP. Hold ‘SHIFT’ while moving to sPrint.', 
    'Press ‘SPACE’ to switch between the ego and id stAtes of your subject’s mind. The ego stAte is A perception of reAlity and truth, thus is orderly. The id stAte is your subject’s bAse desires and emotions, mAking it more chAotic.', 
    'DoorS can be opened with the correct input of letterS to make a paSSword. You can find the clueS to what theSe letterS are hidden in the noteS found in the ego State. PreSS "ENTER" to attempt to unlock the door, and "f" to exit the unlock attempt.',
    'Mr. Hooky,If you need to know, each prisoner generates approxiMately /$12,000 per year, with additional payMents froM the governMent for the total nuMber of prisoners our facilities hold. I do not know why this inforMation is iMportant to you; your job is to Manage the prison coMplex, and I cannot see how knowing the value per prisoner would affect your work perforMance.', 
    'Dear dad, Thank you for being a good dad and workIng hard so we can have a nIce house and nIce clothes and nIce toys and nIce food. I love you very much and I hope you have fun on father’s day.', 
    'Employees and maNagers, I waNt to thaNk you all for a job well doNe. ThaNks to your hard work, aNd the brilliaNt leadership of Peter Hooky, our profits from your facility are up 13%. As a reward, your pay is all being iNcreased this comiNg quarter. We look forward to your contiNued hard work for years to come! -----PAC',
    'This is it. Everything’s falling into place. By the end of the month, the money will start rolling in. In a few years, it’ll be coming in even more. I’ve hidden my tracks well, now it is just time to reap my reward.'
    ];


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
