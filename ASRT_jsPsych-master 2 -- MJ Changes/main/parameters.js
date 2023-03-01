/*************** PARAMETERS OF THE TASK ***************/

const language = en; //available languages: english (en), hungarian (hu), french (fr), portuguese (pt)
const numberOfPracticeBlocks = 0;
const numberOfBlocks = 20;
const numberOfSequenceRepetitions = 10;
const patternTrialImage = "url(../static/images/dalmata.jpg)";
const randomTrialImage = "url(../static/images/dalmata.jpg)";
const rsi = 120;
const initialDelay = 1000;
const overallWarning = false;
const isOffline = true;
const responseKeys = [['s', 'f', 'j', 'l']];
const isFirstFiveRandom = false;


// New PARAMETERS
const secondTrialImage = "url(../static/images/penguin.jpg)"; // new image 
const blockToBeginUsingSecondImage = 2; // set when the new image starts (set to 1 to have image 2 throughout entire task)

// Audtio files
//const feedbackError = "url(../static/sound/buzz.wav)";
const dog_bark = new Audio("../static/sound/dogBarking.wav"); /* sound to go at feedback at end of dog blocks */
const penguin_sound = new Audio("../static/sound/penguinSound.wav"); /* sound to go at feedback at end of penguin blocks */
const error_sound = new Audio("../static/sound/buzz.wav");
