/*  project for scissor , Stone ,Paper project
// generate the random number 1 to 3
// random object as array index 0 = SCISSOR , index 1 = PAPER, index 2= stone
// random number as index to get the random object*/
// Helper function to get coumputer output SISSIR OR PAPER OR STONEramdomly to
var getRandomObject = function () {
  var randomNum = Math.floor(Math.random() * 3);
  var ramdomObject = ["SCISSOR", "PAPER", "STONE"]; // \andom object array o= SCISSor 1 = paper  2 for ston
  var computerObject = ramdomObject[randomNum];
  return computerObject;
};
// Declar Global variable declarion
var numberOfPlay = 0;
var numberOfWin = 0;
var numberOfloss = 0;
var numberOfDraw = 0;
var numberOfInputEntry = 0;
var gameModeNumber = 0;
var ModeSelectionNormalOrReverse = "";
var main = function (inputObject) {
  // check the number of Player name engry is not zero, computr wiil request to enter the user name
  if (numberOfInputEntry === 0) {
    var playerNameEntryMessage = "Please Enter your Player Name";
    numberOfInputEntry += 1;
    return playerNameEntryMessage;
  }
  if (numberOfInputEntry === 1) {
    var gameModeMessage =
      "Hello " +
      inputObject +
      "<br>" +
      "Please Enter Game Mode " +
      "<br>" +
      "Enter 1 for normal Scissors Paper Stone" +
      "<br>" +
      "Enter 2 for muk-jji-ppa";
    numberOfInputEntry += 1;
    gameModeNumber = inputObject;
    return gameModeMessage;
  }
  // set var game mode inside the function block
  //  if enter 1 for normal moce  or 2 Muk-jji-ppa , it will be us te index of game mode array .
  if (numberOfInputEntry === 2) {
    var gameMode = [
      ["normal Scissor Paper Stone Mode Please enter Normal or revers "],
      ["Muk-jji-ppa"]
    ];
    var modeMessage = gameMode[inputObject - 1]; // index 0 for nomal game mode and index 2 for Muk-jji -ppa mode
    numberOfInputEntry += 1;
    return modeMessage;
  }
  // get the normal or revese game mode at input entry 4 time
  if (numberOfInputEntry === 3) {
    ModeSelectionNormalOrReverse = inputObject;
    numberOfInputEntry += 1;
    return (
      ModeSelectionNormalOrReverse +
      " nomal please enter SCISSOR OR PAPER OR STONE "
    );
  }
  var computerObject = getRandomObject();
  // input vallidy check
  if (
    inputObject !== "SCISSOR" &&
    inputObject !== "PAPER" &&
    inputObject !== "STONE"
  ) {
    var myOutPutValue =
      inputObject +
      " It is ivalid entry Plase enter  SCCISSOR ot PAPER ot STONE ";
    return myOutPutValue;
  }
  // check win or loss at mode is selected for normal mode
  if (
    (ModeSelectionNormalOrReverse == "normal" &&
      inputObject == "SCISSOR" &&
      computerObject == "SCISSOR") ||
    (ModeSelectionNormalOrReverse == "normal" &&
      inputObject == "PAPER" &&
      computerObject == "PAPER") ||
    (ModeSelectionNormalOrReverse == "normal" &&
      inputObject == "STONE" &&
      computerObject == "STONE")
  ) {
    var bettingStatus = 0; // 0  equal to draw
    numberOfPlay += 1;
    numberOfWin += 0;
    numberOfloss += 0;
    numberOfDraw += 1;
    var percentOfWin = (numberOfWin * 100) / numberOfPlay;
    console.log(percentOfWin);
    var percentOfLoss = (numberOfloss * 100) / numberOfPlay;
    console.log(percentOfLoss);
    var percentOfDraw = (numberOfDraw * 100) / numberOfPlay;
    console.log(percentOfDraw);
  }
  if (
    (ModeSelectionNormalOrReverse == "normal" &&
      inputObject == "SCISSOR" &&
      computerObject == "PAPER") ||
    (ModeSelectionNormalOrReverse == "normal" &&
      inputObject == "PAPER" &&
      computerObject == "STONE") ||
    (ModeSelectionNormalOrReverse == "normal" &&
      inputObject == "STONE" &&
      computerObject == "SCISSOR")
  ) {
    var bettingStatus = 1;
    numberOfPlay += 1;
    numberOfWin += 1;
    numberOfloss += 0;
    var percentOfWin = (numberOfWin * 100) / numberOfPlay;
    console.log(percentOfWin);
    var percentOfLoss = (numberOfloss * 100) / numberOfPlay;
    console.log(percentOfLoss);
    var percentOfDraw = (numberOfDraw * 100) / numberOfPlay;
    console.log(percentOfDraw);
  }
  if (
    (ModeSelectionNormalOrReverse == "normal" &&
      inputObject == "SCISSOR" &&
      computerObject == "STONE") ||
    (ModeSelectionNormalOrReverse == "normal" &&
      inputObject == "PAPER" &&
      computerObject == "SCISSOR") ||
    (ModeSelectionNormalOrReverse == "normal" &&
      inputObject == "STONE" &&
      computerObject == "PAPER")
  ) {
    var bettingStatus = 2;
    numberOfPlay += 1;
    numberOfWin += 0;
    numberOfloss += 0;
    var percentOfWin = (numberOfWin * 100) / numberOfPlay;
    console.log(percentOfWin);
    var percentOfLoss = (numberOfloss * 100) / numberOfPlay;
    console.log(percentOfLoss);
    var percentOfDraw = (numberOfDraw * 100) / numberOfPlay;
    console.log(percentOfDraw);
  }
  // check the win and loss at mode is selected for reverse
  if (
    (ModeSelectionNormalOrReverse == "reverse" &&
      inputObject == "SCISSOR" &&
      computerObject == "SCISSOR") ||
    (ModeSelectionNormalOrReverse == "reverse" &&
      inputObject == "PAPER" &&
      computerObject == "PAPER") ||
    (ModeSelectionNormalOrReverse == "reverse" &&
      inputObject == "STONE" &&
      computerObject == "STONE")
  ) {
    var bettingStatus = 3; // 0  equal to draw
    numberOfPlay += 1;
    numberOfWin += 0;
    numberOfloss += 0;
    numberOfDraw += 1;
    var percentOfWin = (numberOfWin * 100) / numberOfPlay;
    console.log(percentOfWin);
    var percentOfLoss = (numberOfloss * 100) / numberOfPlay;
    console.log(percentOfLoss);
    var percentOfDraw = (numberOfDraw * 100) / numberOfPlay;
    console.log(percentOfDraw);
  }
  if (
    (ModeSelectionNormalOrReverse == "reverse" &&
      inputObject == "SCISSOR" &&
      computerObject == "PAPER") ||
    (ModeSelectionNormalOrReverse == "revers" &&
      inputObject == "PAPER" &&
      computerObject == "STONE") ||
    (ModeSelectionNormalOrReverse == "reverse" &&
      inputObject == "STONE" &&
      computerObject == "SCISSOR")
  ) {
    var bettingStatus = 4;
    numberOfPlay += 1;
    numberOfWin += 1;
    numberOfloss += 0;
    var percentOfWin = (numberOfWin * 100) / numberOfPlay;
    console.log(percentOfWin);
    var percentOfLoss = (numberOfloss * 100) / numberOfPlay;
    console.log(percentOfLoss);
    var percentOfDraw = (numberOfDraw * 100) / numberOfPlay;
    console.log(percentOfDraw);
  }
  if (
    (ModeSelectionNormalOrReverse == "reverse" &&
      inputObject == "SCISSOR" &&
      computerObject == "STONE") ||
    (ModeSelectionNormalOrReverse == "reverse" &&
      inputObject == "PAPER" &&
      computerObject == "SCISSOR") ||
    (ModeSelectionNormalOrReverse == "reverse" &&
      inputObject == "STONE" &&
      computerObject == "PAPER")
  ) {
    var bettingStatus = 5;
    numberOfPlay += 1;
    numberOfWin += 0;
    numberOfloss += 0;
    var percentOfWin = (numberOfWin * 100) / numberOfPlay;
    console.log(percentOfWin);
    var percentOfLoss = (numberOfloss * 100) / numberOfPlay;
    console.log(percentOfLoss);
    var percentOfDraw = (numberOfDraw * 100) / numberOfPlay;
    console.log(percentOfDraw);
  }
  // betting out put staus as array (normal mode) index 0 draw , index= 1 win indexl 2= loss
  // betting out put staus as array (reverse mode ) index 3 draw index 4 for win and index 5 for loss
  var outPutOfBettingStatus = [
    [
      " number play  " +
        numberOfPlay +
        " <br>" +
        "Draw and Input Object " +
        "<br>" +
        inputObject +
        "<br>" +
        "  ComputerObject = " +
        computerObject +
        "<br>" +
        " Wins = " +
        numberOfWin +
        "  (" +
        percentOfWin +
        "  %)" +
        " Losses  " +
        numberOfloss +
        " ( " +
        percentOfLoss +
        " % )" +
        "<br>" +
        "number of tie" +
        numberOfDraw +
        "%" +
        "please try again"
    ],
    [
      " number play" +
        numberOfPlay +
        "<br>" +
        " You Win and U enter " +
        inputObject +
        " Computer generate = " +
        computerObject +
        "<br>" +
        " Wins = " +
        numberOfWin +
        "  (" +
        percentOfWin +
        "  %)" +
        " Losses  " +
        numberOfloss +
        " ( " +
        percentOfLoss +
        " % )" +
        "<br>" +
        "number of tie" +
        numberOfDraw +
        "%" +
        "please try again"
    ],
    [
      " number play" +
        numberOfPlay +
        " <br>" +
        " You loss and Your input  " +
        inputObject +
        "   Computer generte is  " +
        computerObject +
        "<br>" +
        " Wins = " +
        numberOfWin +
        "  (" +
        percentOfWin +
        "  %)" +
        " Losses  " +
        numberOfloss +
        " ( " +
        percentOfLoss +
        " % )" +
        "<br>" +
        "number of tie" +
        numberOfDraw +
        "%" +
        "please try again"
    ],
    [
      " number play  " +
        numberOfPlay +
        " <br>" +
        "Draw and Input Object " +
        "<br>" +
        inputObject +
        "<br>" +
        "  ComputerObject = " +
        computerObject +
        "<br>" +
        " Wins = " +
        numberOfWin +
        "  (" +
        percentOfWin +
        "  %)" +
        " Losses  " +
        numberOfloss +
        " ( " +
        percentOfLoss +
        " % )" +
        "<br>" +
        "number of tie" +
        numberOfDraw +
        "%" +
        "please try again"
    ],
    [
      " number play" +
        numberOfPlay +
        "<br>" +
        " You Loss at Reverse mode and U enter " +
        inputObject +
        " Computer generate = " +
        computerObject +
        "<br>" +
        " Wins = " +
        numberOfWin +
        "  (" +
        percentOfWin +
        "  %)" +
        " Losses  " +
        numberOfloss +
        " ( " +
        percentOfLoss +
        " % )" +
        "<br>" +
        "number of tie" +
        numberOfDraw +
        "%" +
        "please try again"
    ],
    [
      " number play" +
        numberOfPlay +
        " <br>" +
        " You Win at Reverse mode and Your input  " +
        inputObject +
        "   Computer generte is  " +
        computerObject +
        "<br>" +
        " Wins = " +
        numberOfWin +
        "  (" +
        percentOfWin +
        "  %)" +
        " Losses  " +
        numberOfloss +
        " ( " +
        percentOfLoss +
        " % )" +
        "<br>" +
        "number of tie" +
        numberOfDraw +
        "%" +
        "please try again"
    ]
  ];
  // betting status is used as index of output message
  myOutPutValue = outPutOfBettingStatus[bettingStatus];
  return myOutPutValue;
};
