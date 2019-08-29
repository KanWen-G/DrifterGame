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
    'This is it. Everything’s falling into place. By the end of the month, the money will start rolling in. In a few years, it’ll be coming in even more. I’ve hidden my tracks well, now it is just time to reap my reward.',
    'Hello everyone, and thank you for cominG to the VixburG Charity feast. Half of the proceeds of this event will Go to local community projects, while the other half will Go to a random charity association. We’re holdinG a raffle to determine which orGanization, so make sure to donate and cast your vote!',
    'Thank you patron for your donatIon to the World CharIty DIspersIon OrganIzatIon. Your donated funds are as follows: \n$40,000 to MD. Anderson Cancer Center\n $60,000 to Doctors Without Borders\n$25,000 to AmerIcan Humane\n Once agaIn, thank you for your donatIons. Your fundIng will help make the world a better place.\nIf you dId not gIve these donatIons, please contact our support center at…',
    'Mr. Hooky, I wanted to thank you again for the donation you gaVe to the hospital. My little girl might make it they said, since they can afford the specialist and unique Vaccine needed to perform the surgery. If you eVer need anything, please, do not hesitate to ask. For helping my family, I can neVer repay you.',
    'Today Vanice wanted to know why I was putting so much of our personal expense into charity. I told her that it was extra money I made at work, and that we already had plenty. She agreed with me this time, but if this is going to become a regular thing I will need to hide even from here where this money is coming from and how I use it.',
    'DEar Mr. Tad,\n Thank you for thE support of my projEct. I will make surE all of this stays quiEt, but it’s rEassuring to sEE somEone who approvEs of my idEal. And thE small monEtary boost isn’t all that bad on your End, is it? ThE changEs will be finishEd soon and our inmatEs hErE will finally be contributing some good to this world, whEthEr thEy know it or not.',
    'PRISONER MANIFEST, 8/14/2056 \nWaGery Zolfert; assault, theft - 2 years 4 years\nAlejandro Luna; breakinG and enterinG, theft, assault - 3 years (6 years)\nJake Bell; heroine sale, contraband smuGGlinG - 5 years (9 years)\nGreGory MiGuel; rape, Grand theft auto - 5 years 15 years\n1 / 821 paGes',
    'OctOber 3, 2005 \nLOcal resident and prisOn manager Peter HOOky was assaulted by a fOrmer prisOner whO had recently been put On parOle leave. The prisOner will remain unnamed, but stated tO the pOlice that he struck ‘for payback of the cruel and prejudiced way Peter treated him and Other inmates’ at the cOmplex. He cOntinued tO shOut insults at Mr. HOOky as he was arrested by pOlice.',
    'This world is filled with criminal filth. Too many innocent people suffer while they do nothing to help, just worry about their own selfish desires and hurt others to fulfill them. Those monsters should stay in the prisons they return to so often. Then maybe we could fix the world while they’re out of it.'
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
