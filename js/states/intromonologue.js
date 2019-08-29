// Intro Cutscene state
var intromonologue;
var intromonologue = function(game) {};
intromonologue.prototype = {create: create, update: update}
var content = [
    "The ego and the id.",
    "Two concepts of our consciousness.",
    "The id contains the raw, instinctual desires of our person.",
    "",
    "Emotions, passion, these come from our id.",
    "It can make someone generous and kind, selfless and loving; or it can make someone greedy, lustful, and selfish to appeal to their own desires.",
    "",
    "The ego is the rational, realistic view of our conscious.",
    "It takes in reality, and reigns in our desires for logical views and decisions.",
    " It often mediates between the id and the superego, the moral compass of our conscious that tries to make us do the right thing.",
    "",
    "I don’t get to deal with that part very often in my line of work."
];

var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 150;
var lineDelay = 800;

var introTextStyle = { font: "16px Arial", fill: "#fff", 
align: "center", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
boundsAlignH: "center", 
boundsAlignV: "middle", 
wordWrap: true, wordWrapWidth: 400 };

function create() {
    this.sound = game.add.audio('Walking 2', 0.3);
    this.sound.loopFull();

    game.stage.backgroundColor = "#000000";

    text = game.add.text(game.world.centerX, game.world.centerY , '', introTextStyle);
    text.anchor.setTo(0.5,0.5);

    //text.setTextBounds(20, 20, 780, 580);


    nextLine();

}
function update(){
    if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
        this.sound.stop();
        game.state.start('introscene');
    }
}

function nextLine() {

    if (lineIndex === content.length)
    {
        return;
    }
    //  Split the current line on spaces, so one word per array element
    line = content[lineIndex].split(' ');
    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;
    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay, line.length, nextWord, this);
    //  Advance to the next line
    lineIndex++;

}

function nextWord() {
    //  Add the next word onto the text string, followed by a space
    text.text = text.text.concat(line[wordIndex] + " ");
    //  Advance the word index to the next word in the line
    wordIndex++;
    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        text.text = text.text.concat("\n");
        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay, nextLine, this);
    }

}

