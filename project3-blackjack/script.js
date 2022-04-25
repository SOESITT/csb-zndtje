/*============================
======GLOBAL VARIABLES========
=============================*/

var stateOne = "to Enter Number of Player";
var stateTwo = "to Enter the Player Name";
var stateThree = "to enter the betting amount";
var stateFour = "MODE_DEAL_CARDS";
var stateFive = " checking is there BLACKJACK";
var stateSix = "to enter hit or stand ";
var stateSeven = "MODE_COMPUTER_PLAYS";
var stateEight = "MODE_DISPLAY_RESULTS";
// Set the starting mode
var mode = stateOne;

// Store players' details (e.g. name, hand, bet) in an array of objects
var playerRecords = [];

// Store computer's cards in an array
var cardAtComputerHand = [];

// set a var that points to the current player within the playerProfile array. The pointer/index starts at 0 since arrays are 0 indexed
var currentPlayerIndex = 0;

// The maximum valid sum in Blackjack is 21.
var sumBurstPoint = 21;

// Dealer always hits until she reaches a sum greater than 16.
var dealerHitThreshold = 16;

// Determine whether the computer's card has been revealed
var isComputerCardHidden = true;

// Keep track of when the game ends to prevent further moves
var gameOver = false;

// Track num of players that the game starts with
var initialNumOfPlayers = 0;

// Store the cardDeck in an array
var cardDeck = [];

/*============================
======HELPER FUNCTIONS========
=============================*/

// ------Helper functions taken from unit 10.3-----
/** Make a cardDeck of cards
 */
var makecardDeck = function () {
  // create the empty cardDeck at the beginning
  var cardDeck = [];
  var suits = ["♥️", "♦️", "♠️", "♣️"];
  // var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    var rankCounterNumber = 1;
    while (rankCounterNumber <= 13) {
      var cardName = rankCounterNumber;
      var cardNum = rankCounterNumber;

      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = "ace";
        cardNum = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardNum = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardNum = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardNum = 10;
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounterNumber,
        cardNum: cardNum
      };

      // add the card to the cardDeck
      cardDeck.push(card);

      rankCounterNumber = rankCounterNumber + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return cardDeck;
};

/** Get a random number within a specified range of possibilities starting from 0
 * @param {number} size The upper bound that constrains the range of possible integers generated
 */
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

/** Shuffle a Deck of cards
 * @param {array} cards A Deck of cards
 * @returns A shuffled Deck of the cards that were provided
 */
var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);

    var currentItem = cards[index];

    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;

    index = index + 1;
  }

  return cards;
};

// ------New Helper Functions-----

// Deal a card to the given hand
var dealCardToHand = function (hand) {
  hand.push(cardDeck.pop());
};

/** Get sum of cards in hand
 * @param {Array} hand A player or computer's hand
 * @returns {number} The sum of the cards' value in a given hand
 **/
var getHandSum = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currentCard = hand[i];
    console.log("cardNum ====");
    console.log(currentCard.cardNum);
    //
    sum += currentCard.cardNum;

    // If card is Ace, value is 11 by default
    if (currentCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    }
  }
  // If sum is greater than sum limit and hand contains Aces, convert Aces from value of 11
  // to value of 1, until sum is less than or equal to sum limit or there are no more Aces.
  if (sum > sumBurstPoint && numAcesInHand > 0) {
    for (let i = 0; i < numAcesInHand; i += 1) {
      sum -= 10;
      // If the sum is less than sumBurstPoint before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (sum <= sumBurstPoint) {
        break;
      }
    }
  }
  return sum;
};

/**Return whether the hand contains a Blackjack combination
 * @param {Array} hand
 * @returns {Boolean} True if Blackjack detected, else False
 */
var isBlackjack = function (hand) {
  return hand.length === 2 && getHandSum(hand) === sumBurstPoint;
};

/** Convert hand to a string where objects within the array are stringified
 * @param {Array} hand
 * @returns {String} A string displaying card names in a given hand e.g. [6,2]. Note that while there are square brackets, the output is not an array because the square brackets are of type String.
 */
var convertHandToString = function (hand) {
  // The map function takes a function F as input, and returns a new array A_new after applying
  // F to each element e_orig in the original array A_orig. F takes e_orig as input and F's
  // return value is e_new, the element at the same index as e_orig in A_new.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  // Arrow function syntax (i.e. "=>") is a shorthand function syntax in JS.
  // The equivalent function in traditional function syntax would be:
  // function (card) {
  //   return card.name;
  // }
  //return card.name;
  return hand.map((card) => ` [${card.name} of ${card.suit}]`);
};

/** Create output that displays player and computer's output, as well as total hand value
 * @returns {String}
 */
var getDefaultOutput = function () {
  var myOutputValue = `${playerRecords[currentPlayerIndex].name}'s hand: <br>
  ${convertHandToString(playerRecords[currentPlayerIndex].hand)} <br>
  Sum: ${getHandSum(playerRecords[currentPlayerIndex].hand)} 
  <br><br>
  Computer's first card: ${convertHandToString([cardAtComputerHand[0]])} <br>
  Sum: ${getHandSum([cardAtComputerHand[0]])}`;
  console.log("playerRecords=>");
  console.log(playerRecords);

  return myOutputValue;
};

/** Display all the computer's cards to the user
 * @returns {string}
 */
var displayComputerFullHand = function () {
  return `Computer's hand: ${convertHandToString(cardAtComputerHand)}<br>
  Sum: ${getHandSum(cardAtComputerHand)}`;
};

/** Create a profile for each player
 * @param {string} playerName A string containing the name that a player identifies with
 */
var createplayerRecords = function (playerName) {
  playerRecords.push({
    id: currentPlayerIndex + 1,
    name: playerName,
    hand: [],
    bet: 0,
    points: 100
  });
};

/** Deal cards to player and computer
 */
var dealCardsToPlayersAndComputer = function () {
  for (var j = 0; j < 2; j += 1) {
    // Iterate thru playerRecords, deal 1 cards to each player's hand
    for (var i = 0; i < playerRecords.length; i += 1) {
      dealCardToHand(playerRecords[i].hand);
    }
    dealCardToHand(cardAtComputerHand);
  }
};

/** Calculate a player's winnings from winning a bet
 * @param {object} player A given player's profile
 * @returns {number} The amount won by a given player
 */
var calcBetWinnings = function (player) {
  var winAmt = player.bet;
  // If player wins with a blackjack
  if (isBlackjack(player.hand)) {
    //  Multiplier is 1.5 times of betted amt
    winAmt = player.bet * 1.5;

    // player.points += winAmt;
    return winAmt;
  }
  // else player did not win with blackjack, multiplier is 1 times of the betted amt
  // playerRecords[currentPlayerIndex].points += winAmt;
  return winAmt;
};

/** Calculate a player losses a player incurs from losing a bet
 * @param {object} player A given player's profile
 * @returns {number} The amount lost by a given player
 */
var calcBetLosses = function (player) {
  // return the amount lost
  return player.bet;
};

/** Create a string that cues the next person to play. If there are no other players, cue user that computer will be playing next
 * @returns {string} Directions about what happens next
 */
var craftInstructionsForNextSteps = function () {
  // If the last player is playing, it's the end of the current game. Press refresh to start again
  if (currPlayerIsLastPlayer()) {
    return "All players have played. Next, click submit to see computer's cards";
  }
  // If the last player is not playing, cue the next person is play
  return (
    "It's " +
    playerRecords[currentPlayerIndex + 1].name +
    "s turn next. Click submit to continue"
  );
};

/** Empty computer's and all players' hand
 */
var emptyAllHands = function () {
  // Empty the players' hand
  for (var i = 0; i < playerRecords.length; i += 1) {
    // replace each player's hand with an empty array
    playerRecords[i].hand = [];
  }
  // empty the computer hand
  cardAtComputerHand = [];
};

/** End a players turn by resetting relevant global variables and changing to an appropriate mode
 */
var endCurrPlayerTurn = function () {
  // Start a new round-- change mode and reset currentPlayerIndex
  if (currPlayerIsLastPlayer()) {
    // Change mode to progress the game
    mode = stateSeven;
    // Point the current player to first player
    currentPlayerIndex = 0;
    return;
  }
  // Increase currentPlayerIndex to point at the next player in playerRecords
  currentPlayerIndex += 1;
  // Change mode to progress the game
  mode = stateFive;
};

/** Determine if current player is the last player in the playerRecords array
 * @returns {boolean} true if curent player is the last player
 */
var currPlayerIsLastPlayer = function () {
  // The current player is the last player if the currentPlayerIndex is equal to the length -1 (We deduct one to account for arrays be 0 indexed)
  return currentPlayerIndex == playerRecords.length - 1;
};

/** Determine if the computer busts its hand
 * @returns {boolean} true if the computer's hand's value exceeds the sumBurstPoint
 */
var didComputerBust = function () {
  return getHandSum(cardAtComputerHand) > sumBurstPoint;
};

/** Display a summary of each player's performance in the current game
 * @returns {string} A list of each player's bet, winnings/losses, and remaining points. Also cues first player to enter bet
 */
var getGameResults = function () {
  // Set a preamble
  var gameResults = "Results: <br>";
  // Handle scenario  where computer busts
  if (didComputerBust()) {
    // Iterate thru all players
    for (var i = 0; i < playerRecords.length; i += 1) {
      var currPlayer = playerRecords[i];
      var listIndex = i + 1;
      // If the player also busted, they lose their bet
      if (getHandSum(currPlayer.hand) > sumBurstPoint) {
        // Calculate how much the player lost
        var amtLost = calcBetLosses(currPlayer);
        // Subtract the bet from the player's points
        currPlayer.points -= amtLost;
        gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || diffAmount - ${currPlayer.bet} points. || Total points: ${currPlayer.points}<br>`;
        continue;
      }
      // Else the computer busts but the player did not: Player wins.
      // Calculate the player winnings
      var amtWon = calcBetWinnings(currPlayer);
      //  Add the winnings to the player's points
      currPlayer.points += amtWon;
      // Update the string that will be printed
      gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || diffAmount + ${amtWon} points. || Total points: ${currPlayer.points}<br>`;
    }
    // Return the string of results
    return gameResults;
  }

  // If computer did not bust, it could have won; check if it won by blackjack. If so, all players lose their bets
  if (isBlackjack(cardAtComputerHand)) {
    // Iterate thru all the player profiles
    for (var i = 0; i < playerRecords.length; i += 1) {
      // Set a var to refer to the current player in the loop
      var currPlayer = playerRecords[i];
      var listIndex = i + 1;
      //Calculate how much the current player lost
      var amtLost = calcBetLosses(currPlayer);
      // Subtract the bet from the player's points
      currPlayer.points -= amtLost;
      // Append results to existing gameResults String
      gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || diffAmount - ${currPlayer.bet} points. || Total points: ${currPlayer.points}<br>`;
    }
    // Return the string of results
    return gameResults;
  }

  // Else if the computer did not bust and did not win by blackjack, check if it wins by outnumbering each player's hand
  // iterate thru the player hands.
  for (var i = 0; i < playerRecords.length; i += 1) {
    // Make the current player easily accessible using an intuitive variable name
    var currPlayer = playerRecords[i];
    var listIndex = i + 1;

    // Compare each hand against the computer hand.
    // if player busts, they lose their bet
    if (getHandSum(currPlayer.hand) > sumBurstPoint) {
      // Calculate the player's losses
      var amtLost = calcBetLosses(currPlayer);
      // Subtract the losses from the player's points
      currPlayer.points -= amtLost;
      // Append results to existing gameResults String
      gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || diffAmount - ${currPlayer.bet} points. || Total points: ${currPlayer.points}<br>`;
    }
    // If player did not bust, player wins if their hand's sum >computer's hand sum
    else if (getHandSum(currPlayer.hand) > getHandSum(cardAtComputerHand)) {
      // Calculate the player's winnings
      var amtWon = calcBetWinnings(currPlayer);
      // Add winnings to player's points
      currPlayer.points += amtWon;
      gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || diffAmount + ${amtWon} points. || Total points: ${currPlayer.points}<br>`;
    } else {
      // In all other scenarios, computer wins
      // Calculate the player's losses
      var amtLost = calcBetLosses(currPlayer);
      // Subtract the losses from the player's points
      currPlayer.points -= amtLost;
      // Append results to existing gameResults String
      gameResults += `${listIndex}. ${currPlayer.name} - Bet: ${currPlayer.bet} || diffAmount - ${currPlayer.bet} points. || Total points: ${currPlayer.points}<br>`;
    }
  }
  return gameResults;
};

/** After each round, reset the necessary variables so that players can continue playing by entering their bet
 */
var restartFromBets = function () {
  // Empty each player's hand
  emptyAllHands();
  // Change mode to collect bets
  mode = stateThree;
  // reset currentPlayerIndex so that the first person in playerRecords plays first
  currentPlayerIndex = 0;

  isComputerCardHidden = true;
};

/** Identify which players have been Removed for having <1 point.
 * @returns {array} An array of playerRecords that are Removed
 */
var getRemovedPlayers = function () {
  /* The .filter method returns a NEW array of elements that meet the specified criteria 
  (i.e. where each player has more than 1 point, in our case below)
  More info here: https://www.w3schools.com/jsref/jsref_filter.asp */
  var conditionToEliminate = function (player) {
    return player.points < 1;
  };
  return playerRecords.filter(conditionToEliminate);
};

/** Identify which players are still in the game  i.e. they have >1 points
 * @returns {array} An array of playerRecords still in the game
 */
var getRemainingPlayers = function () {
  /* The .filter method returns a NEW array of elements that meet the specified criteria 
  (i.e. where each player has more than 1 point, in our case below)
  More info here: https://www.w3schools.com/jsref/jsref_filter.asp */
  var conditionToRemain = function (player) {
    return player.points > 0;
  };
  return playerRecords.filter(conditionToRemain);
};

/** Display which players were Removed
 * @param {array} RemovedPlayersArray
 * @returns {string} A list of which players were Removed this round
 */
var displayRemovedPlayers = function (RemovedPlayersArray) {
  // Set a preamble that is of datatype String
  var outputMsg = `Players with 0 points and thus will be Removed:`;

  // If the array is empty, return null
  if (RemovedPlayersArray.length < 1) {
    outputMsg += `<br> 1. ${null}`;
  } else {
    // Else there will be players who need to be Removed.
    // Loop thru the array and append their names to the outputMsg
    for (var i = 0; i < RemovedPlayersArray.length; i += 1) {
      var listIndex = i + 1;
      // Append info about the Removed player onto the preamble
      outputMsg += `<br> ${listIndex}. ${RemovedPlayersArray[i].name}`;
    }
  }
  // Return the string
  return outputMsg;
};

/*============================
=======Main function==========
=============================*/
var main = function (input) {
  //If a gameOver is true, display a message to prompt user to refresh the screen
  if (gameOver) {
    return "The game is over. Please refresh to play again.";
  }

  // Mode for user to indicate the number of players
  if (mode == stateOne) {
    // Validate that user has provided an an integer larger than 0
    if (isNaN(input) == true || !Number(input) > 0) {
      return "Please enter a number of players larger than 0";
    }
    // Convert user input from string to number, and assign it to the global var tracking the number of dice users have chosen to play with
    initialNumOfPlayers = Number(input);

    //Progress game to next mode
    mode = stateTwo;
    // Output a msg about the number of players the user has chosen
    var myOutputValue1 = `There are ${initialNumOfPlayers} players in this game. Player 1, please enter your name to begin.`;
    return myOutputValue1;
  }

  // Mode to get player names
  if (mode == stateTwo) {
    // Validate if user provided a name. Prompt user again if input field was empty.
    // The trim() method allows removes empty spaces before and after a word. Hence if the user inputs a series of empty spaces, it be trimemed to a single space i.e. ''
    if (input.trim() == "") {
      var myOutputValue2 = "Please input your name to begin";
      return myOutputValue2;
    }
    // Assign input to a more descriptive variable name
    var playerName = input;

    // Create a player profile with the given name
    createplayerRecords(playerName);

    // Based on the indicated number of players, determine if all players have submitted their names. If so:
    if (playerRecords[currentPlayerIndex].id == initialNumOfPlayers) {
      // change the mode
      mode = stateThree;

      // reset currPlayer Index;
      currentPlayerIndex = 0;

      // output a message that welcomes the latest player and cues first player to enter a bet
      return (
        "Welcome, " +
        playerRecords[playerRecords.length - 1].name +
        ". <br><br>" +
        playerRecords[0].name +
        ", you have " +
        playerRecords[0].points +
        " points.<br> Please enter a bet."
      );
    }

    // Else not all players have submitted their names. Output a msg that acknowldeges the player's name submission, and cues the next player to enter their name
    // Assign the currentPlayerIndex to previousPlayer

    var prevPlayerIndex = currentPlayerIndex;
    // Increment the currentPlayerIndex so it points at the next player
    currentPlayerIndex += 1;
    return `Welcome,
      ${playerRecords[prevPlayerIndex].name}. Player 
      ${playerRecords[prevPlayerIndex].id + 1}
    , please enter your name.`;
  }

  // Mode to collect user input on their bet amount
  if (mode == stateThree) {
    // Validate that user has provided an an integer larger than 0
    if (isNaN(input) == true || !Number(input) > 0) {
      return "Please enter a number larger than 0";
    }

    // Validate that the bet amount is not larger than the amount of points this player has
    if (input > playerRecords[currentPlayerIndex].points) {
      return `${playerRecords[currentPlayerIndex].name}, you have ${playerRecords[currentPlayerIndex].points} points. Please enter an amount less than or equal to this.`;
    }
    // update player's profile with the betted amount
    playerRecords[currentPlayerIndex].bet = Number(input);

    //If all players have submitted their bets, cue player 1 to start playing
    if (currPlayerIsLastPlayer()) {
      //Progress game to next mode
      mode = stateFour;

      // Reset currentPlayerIndex back to 0 so that he/she is the next player
      currentPlayerIndex = 0;

      return ` 
        ${playerRecords[playerRecords.length - 1].name}
        , you've chosen to bet 
        ${playerRecords[playerRecords.length - 1].bet} 
       points. 
       <br><br>==>
       ${playerRecords[currentPlayerIndex].name}
       , you'll play first. Click submit to deal cards and see your cards`;
    }

    // Else, some players have not submitted their bet. Acknowledge the current player's bet and invite the next player to enter their bet.
    // Assign current player's index to prevPlayrIndex
    var prevPlayerIndex = currentPlayerIndex;
    // Increase currentPlayerIndex so that it points at the next player in playerRecords
    currentPlayerIndex += 1;
    return ` ${playerRecords[prevPlayerIndex].name}, you've chosen to bet ${playerRecords[prevPlayerIndex].bet} points. ${playerRecords[currentPlayerIndex].name}, please enter your bet.`;
  }

  // Mode to deal cards out to players and computer
  if (mode == stateFour) {
    // Shuffle a cardDeck and assign it to cardDeck
    cardDeck = shuffleCards(makecardDeck());
    // Deal cards to all all players and computer
    dealCardsToPlayersAndComputer();
    // Change mode to progress the game
    mode = stateFive;
  }

  // Mode to scan for blackjack in user's hand
  if (mode === stateFive) {
    // If player has Blackjack, inform them and end the turn
    if (isBlackjack(playerRecords[currentPlayerIndex].hand)) {
      // Craft an output msg to inform player of Blackjack
      var myOutputValue = `
      ${playerRecords[currentPlayerIndex].name}
      has a Blackjack! Player will win if computer/dealer does not also have a Blackjack.<br>
      ${getDefaultOutput()} 
      <br><br>==>  ${craftInstructionsForNextSteps()}`;

      // End curr player's turn: Cue next player to play, else cue computer's turn if currPlayer is the last player
      endCurrPlayerTurn();

      return myOutputValue;
    }
    // If no one has a blackjack, change mode to progress game
    mode = stateSix;

    // Display card to user and prompt them to hit or stand
    return `${getDefaultOutput()} <br><br>
      ==> Please enter "hit" or "stand", then press Submit`;
  }

  // Mode where user must decide whether to hit or stand.
  if (mode == stateSix) {
    // Validate input to ensure either 'hit' or 'stand
    if (input !== "hit" && input !== "stand") {
      return '==> Please input either "hit" or "stand" as possible moves in Blackjack';
    }
    // Get the default output that is relevant if player stands
    var defaultOutput = getDefaultOutput();
    // Get the instructions on the next steps
    var instructionsForNextSteps = craftInstructionsForNextSteps();

    // Handle 'hit'
    if (input == "hit") {
      // Deal a card to the player
      dealCardToHand(playerRecords[currentPlayerIndex].hand);

      // Update the default output since player drew a card
      defaultOutput = getDefaultOutput();

      // If bust, show player that they bust
      if (getHandSum(playerRecords[currentPlayerIndex].hand) > sumBurstPoint) {
        // Display info to player that he has busted
        myOutputValue = `${playerRecords[currentPlayerIndex].name} 
        has busted. <br> ${defaultOutput} 
        <br><br>==> ${instructionsForNextSteps}`;

        // End the player's turn
        endCurrPlayerTurn();

        return myOutputValue;
      }
      // If player did not bust, show them their hand and prompt them to hit or stand
      return `${defaultOutput}
      <br> Please enter "hit" to draw another card, or "stand" to end your turn.`;
    }

    // Handle 'stand'
    if (input == "stand") {
      // If all other players have played
      if (currPlayerIsLastPlayer()) {
        // Set an output value
        var myOutputValue = `${playerRecords[currentPlayerIndex].name}'s chosen to stand. ${defaultOutput} 
        <br>==> ${instructionsForNextSteps}`;

        // End the current players turn
        endCurrPlayerTurn();

        return myOutputValue;
      }
      // else, other players have not played; move to the next player
      // Set an output message
      var myOutputValue = `You've chosen to stand. <br> 
      ${defaultOutput} 
      <br><br> ==> ${
        playerRecords[currentPlayerIndex + 1].name
      }, click submit to see your cards. <br>`;
      // End the current player's turn
      endCurrPlayerTurn();
      //Return the message to the user
      return myOutputValue;
    }
  }

  if (mode == stateSeven) {
    if (isComputerCardHidden) {
      // Set to false so that this doesn't appear when main runs again
      isComputerCardHidden = false;

      return `Computer's cards are: <br> ${displayComputerFullHand()}.
      <br><br>==> Click submit to see computer's next move`;
    }

    // Check if computer has blackjack
    if (isBlackjack(cardAtComputerHand)) {
      // Change the mode
      mode = stateEight;
      // Inform all players that computer wins
      return `Computer has a Blackjack and wins all players! <br>
      ${displayComputerFullHand()}
      <br><br>==> Click submit to see results`;
    }
    // Else if computer does not have a blackjack, it has to decide to hit or stand.
    var cardAtComputerHandSum = getHandSum(cardAtComputerHand);

    // Computer hits if sum less than or equal to dealer hit threshold
    if (cardAtComputerHandSum <= dealerHitThreshold) {
      dealCardToHand(cardAtComputerHand);
      // Update computer hand sum after dealing new card
      cardAtComputerHandSum = getHandSum(cardAtComputerHand);
      // If computer busts
      if (didComputerBust()) {
        // Change mode so that results will be displayed next
        mode = stateEight;
        // Inform players of the bust
        return `Computer has busted and loses. <br> ${displayComputerFullHand()} 
        <br><br>==> Click submit to see results `;
      }
      // Else computer has not busted.
      return `Computer chose to hit. <br> ${displayComputerFullHand()}
      <br><br>==> Click submit to see computer's next move.`;
    }

    // Otherwise, computer stands
    // get the game results
    mode = stateEight;
    return `Computer chose to stand. <br> ${displayComputerFullHand()}
    <br><br>==> Click submit to see results`;
  }
  if (mode == stateEight) {
    // Get the game's results in the form of a string
    var gameResults = getGameResults();
    // Eliminate the players with 0 points left
    var RemovedPlayers = getRemovedPlayers();
    // Identify which players are still playing
    var remainingPlayers = getRemainingPlayers();

    // If all players have been Removed, display the results and  prompt users to refresh screen to play again
    if (remainingPlayers.length < 1) {
      gameOver = true;
      return `${gameResults} 
      <br> ${displayRemovedPlayers(RemovedPlayers)}
      <br><br>==> There are no remaining players. Please hit refresh to play again`;
    }

    // If there are still players remaining, replace playerRecords with the remaining players' profiles
    playerRecords = remainingPlayers;

    // reset the game so that the players continue by submitting bets
    restartFromBets();

    // Display the results from the current game
    return `${gameResults} 
    <br> ${displayRemovedPlayers(RemovedPlayers)}
    <br><br>==> ${playerRecords[0].name}
    , enter your bet to begin the new round.
    `;
  }
};

/*var main = function (input) {
  var myOutputValue = 'hello world';
  return myOutputValue;
};*/
