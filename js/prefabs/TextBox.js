function TextBox(game, index) {

    //array to store all textBox dialogues
    this.textLines = ['move the subject by using the ‘wasd’ keys or the arrow keys, with uP and ‘w’ making your character jumP. Hold ‘shift’ while moving to sPrint.', 
    'press ‘spacebar’ to switch between the ego and id stAtes of your subject’s mind. The ego stAte is A perception of reAlity and truth, thus is orderly. the id stAte is your subject’s bAse desires and emotions, mAking it more chAotic.', 
    'doorS can be opened with the correct input of letterS to make a paSSword. you can find the clueS to what theSe letterS are hidden in the noteS found in the ego State. PreSS "enter" to attempt to unlock the door, and "f" to exit the unlock attempt. alwayS try aim for thoSe big hintS.',
    'Mr. hooky, if you need to know, each prisoner generates approxiMately /$12,000 per year, with additional payMents froM the governMent for the total nuMber of prisoners our facilities hold. i do not know why this inforMation is iMportant to you; your job is to Manage the prison coMplex, and i cannot see how knowing the value per prisoner would affect your work perforMance.', 
    'dear dad, thank you for being a good dad and workIng hard so we can have a nIce house and nIce clothes and nIce toys and nIce food. I love you very much and I hope you have fun on father’s day.', 
    'employees and maNagers, i waNt to thaNk you all for a job well doNe. thaNks to your hard work, aNd the brilliaNt leadership of peter hooky, our profits from your facility are up 13%. as a reward, your pay is all being iNcreased this comiNg quarter. we look forward to your contiNued hard work for years to come! -----PAC',
    'This is it. Everything’s falling into place. By the end of the month, the money will start rolling in. In a few years, it’ll be coming in even more. I’ve hidden my tracks well, now it is just time to reap my reward.',
    'hello everyone, and thank you for cominG to the vixburG charity feast. half of the proceeds of this event will Go to local community projects, while the other half will Go to a random charity association. we’re holdinG a raffle to determine which orGanization, so make sure to donate and cast your vote!',
    'thank you patron for your donatIon to the world charIty sIspersIon organIzatIon. Your donated funds are as follows: \n$40,000 to ms. anderson cancer center\n $60,000 to doctors without borders\n$25,000 to amerIcan humane\n once agaIn, thank you for your donatIons. your fundIng will help make the world a better place.\nif you dId not gIve these donatIons, please contact our support center at…',
    'mr. hooky, I wanted to thank you again for the donation you gaVe to the hospital. my little girl might make it they said, since they can afford the specialist and unique Vaccine needed to perform the surgery. if you eVer need anything, please, do not hesitate to ask. for helping my family, I can neVer repay you.',
    'Today Vanice wanted to know why I was putting so much of our personal expense into charity. I told her that it was extra money I made at work, and that we already had plenty. She agreed with me this time, but if this is going to become a regular thing I will need to hide even from here where this money is coming from and how I use it.',
    'dEar mr. tad,\n thank you for thE support of my projEct. i will make surE all of this stays quiEt, but it’s rEassuring to sEE somEone who approvEs of my idEal. and thE small monEtary boost isn’t all that bad on your End, is it? thE changEs will be finishEd soon and our inmatEs hErE will finally be contributing some good to this world, whEthEr thEy know it or not.',
    'PRISONER MANIFEST, 8/14/2056 \nwaGery zolfert; assault, theft - 2 years -> 4 years\nalejandro luna; breakinG and enterinG, theft, assault - 3 years -> (6 years)\njake bell; heroine sale, contraband smuGGlinG - 5 years -> (9 years)\nGreGory miGuel; rape, Grand theft auto - 5 years -> 15 years\n1 / 821 paGes',
    'OctOber 3, 2005 \nlOcal resident and prisOn manager peter hOOky was assaulted by a fOrmer prisOner whO had recently been put On parOle leave. the prisOner will remain unnamed, but stated tO the pOlice that he struck ‘for payback of the cruel and prejudiced way peter treated him and Other inmates’ at the cOmplex. he cOntinued tO shOut insults at mr. hOOky as he was arrested by pOlice.',
    'This world is filled with criminal filth. Too many innocent people suffer while they do nothing to help, just worry about their own selfish desires and hurt others to fulfill them. Those monsters should stay in the prisons they return to so often. Then maybe we could fix the world while they’re out of it.'
    ];
    
    if(index == 6 || index == 10 || index == 14){

        this.textstyle = { font: "12px Helvetica", fill: "#ffffff", 
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "left", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 510 };
        
            //Phaser.Sprite.call(this, game,x, y, index, 'TextBox');
        this.currentTextBox = game.add.sprite(game.camera.x + 400, game.camera.y + 120, 'textBox2');
        this.currentTextBox.scale.setTo(1,0.7);
        this.currentTextBox.anchor.set(0.5, 0.5);
        this.currentTextBox.anchor.set(0.5, 0.5);
        this.currentText = game.add.text(this.currentTextBox.x, this.currentTextBox.y, this.textLines[index], this.textstyle);
        this.currentText.anchor.set(0.5, 0.5);
        this.textIsActive = true;
        this.fadeText = false;


    }else {
    this.textstyle = { font: "12px Helvetica", fill: "#000000", 
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "left", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 510 };
            //Phaser.Sprite.call(this, game,x, y, index, 'TextBox');
        this.currentTextBox = game.add.sprite(game.camera.x + 400, game.camera.y + 120, 'textBox');
        this.currentTextBox.scale.setTo(1,0.7);
        this.currentTextBox.anchor.set(0.5, 0.5);
        this.currentTextBox.anchor.set(0.5, 0.5);
        this.currentText = game.add.text(this.currentTextBox.x, this.currentTextBox.y, this.textLines[index], this.textstyle);
        this.currentText.anchor.set(0.5, 0.5);
        this.textIsActive = true;
        this.fadeText = false;
    }



   

    //game.time.events.add(0, fadeText, this);
    this.fadeText1 = game.add.tween(this.currentText).to( { alpha: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Linear.None, false);
    this.fadeText2 = game.add.tween(this.currentTextBox).to( { alpha: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Linear.None, false);
    console.log('in TextBox');
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (TextBox)
TextBox.prototype = Object.create(Phaser.Sprite.prototype);
TextBox.prototype.constructor = TextBox;
