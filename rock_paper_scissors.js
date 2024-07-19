const readline = require('readline-sync');
const gameMessages = require('./game_messages.json');
const ask = readline.question;
const GAME_OPTIONS = ['Rock', 'Paper', 'Scissors', 'Spock', 'Lizard'];
const ABBREVIATED_GAME_OPTIONS = ['R', 'P', 'Sc', 'Sp', 'L'];
let playerScore = 0;
let computerScore = 0;

function prompt(message) {
  console.log(` => ${message}`);
}

const changeAbbreviationToFullWord = function (string) {
  string = string[0].toUpperCase() + string.slice(1);
  switch (string) {
    case 'L':
      return 'Lizard';
    case 'Sp':
      return 'Spock';
    case 'R':
      return 'Rock';
    case 'P':
      return 'Paper';
    case 'Sc':
      return 'Scissors';
    default:
      return string;
  }
};

const playerChoice = function (gameOptions, shortenedGameOptions) {
  prompt(`${gameMessages.playerChoose} ${gameOptions.join(', ')} or ${shortenedGameOptions.join(', ')}`);
  let choice = ask();
  choice = changeAbbreviationToFullWord(choice);

  while (!gameOptions.includes(choice)) {
    prompt(`${gameMessages.invalidChoice} ${gameOptions.join(', ')} or ${shortenedGameOptions.join(', ')}`);
    choice = ask();
    choice = changeAbbreviationToFullWord(choice);
  }
  return choice;
};

const computerChoice = function (array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  const computerPick = array[randomIndex];
  return computerPick;
};

const incrementPlayerScore = function (score) {
  return ++score;
};
const incrementComputerScore = function (score) {
  return ++score;
};

const determineWinner = function (playerChoice, computerChoice) {
  console.clear();
  prompt(`You choose ${playerChoice}, Computer choose ${computerChoice}`);
  if (
    (playerChoice === 'Lizard' && (computerChoice === 'Spock' || computerChoice === 'Paper')) ||
    (playerChoice === 'Spock' && (computerChoice === 'Rock' || computerChoice === 'Scissors')) ||
    (playerChoice === 'Rock' && (computerChoice === 'Scissors' || computerChoice === 'Lizard')) ||
    (playerChoice === 'Paper' && (computerChoice === 'Rock' || computerChoice === 'Spock')) ||
    (playerChoice === 'Scissors' && (computerChoice === 'Paper' || computerChoice === 'Lizard'))) {
    prompt(`${playerChoice} beats ${computerChoice}! You win the round!`);
    return 'player';
  } else if (playerChoice === computerChoice) {
    prompt('Its a tie');
  } else {
    prompt(`${computerChoice} beats ${playerChoice}! Computer wins this round!`);
    return 'computer';
  }
};

const displayScore = function (playerPoints, computerPoints) {
  if (playerPoints === 3) {
    return prompt(`You win the game ${playerPoints} to ${computerPoints}`);
  } else if (computerPoints === 3) {
    return prompt(`Computer wins the game ${computerPoints} to ${playerPoints}`);
  } else if (playerPoints === computerPoints) {
    prompt(`The score is tied ${playerPoints} to ${computerPoints}`);
  } else if (playerPoints > computerPoints) {
    prompt(`You're winning ${playerPoints} to ${computerPoints}`);
  } else {
    prompt(`You're losing ${playerPoints} to ${computerPoints}`);
  }
};

const startGame = function () {
  console.clear();
  prompt(gameMessages.welcome);
  displayScore(playerScore, computerScore);
  while (playerScore < 3 && computerScore < 3) {
    const playerPick = playerChoice(GAME_OPTIONS, ABBREVIATED_GAME_OPTIONS);
    const computerPick = computerChoice(GAME_OPTIONS);
    const winner = determineWinner(playerPick, computerPick);
    if (winner === 'player') playerScore = incrementPlayerScore(playerScore);
    if (winner === 'computer') computerScore = incrementComputerScore(computerScore);
    displayScore(playerScore, computerScore);
  }
};

const restartGame = function () {
  prompt(gameMessages.restart);
  let response = ask().toUpperCase();
  const options = ['YES', 'Y', 'NO', 'N'];
  while (!options.includes(response)) {
    prompt(gameMessages.invalidRestart);
    response = ask().toUpperCase();
  }
  playerScore = 0;
  computerScore = 0;
  if (response === 'YES' || response === 'Y') return startGame();
  if (response === 'NO' || response === 'N') return prompt(gameMessages.goodbye);
};

startGame();
restartGame();