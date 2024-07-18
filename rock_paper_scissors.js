const readline = require('readline-sync');
const gameMessages = require('./game_messages.json');
const ask = readline.question;
const IN_GAME_OPTIONS = ['Rock', 'Paper', 'Scissors', 'Spock', 'Lizard'];
const ABBREVIATED_IN_GAME_OPTIONS = ['R', 'P', 'Sc', 'Sp', 'L'];

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


const determineWinner = function (playerChoice, computerChoice) {
  prompt(`You choose ${playerChoice}, Computer choose ${computerChoice}`);
  if (
    (playerChoice === 'Lizard' && (computerChoice === 'Spock' || computerChoice === 'Paper')) ||
    (playerChoice === 'Spock' && (computerChoice === 'Rock' || computerChoice === 'Scissors')) ||
    (playerChoice === 'Rock' && (computerChoice === 'Scissors' || computerChoice === 'Lizard')) ||
    (playerChoice === 'Paper' && (computerChoice === 'Rock' || computerChoice === 'Spock')) ||
    (playerChoice === 'Scissors' && (computerChoice === 'Paper' || computerChoice === 'Lizard'))) {
    prompt(`${playerChoice} beats ${computerChoice}! You win!`);
  } else if (playerChoice === computerChoice) {
    prompt('Its a tie');
  } else {
    prompt(`${computerChoice} beats ${playerChoice}! Computer wins!`);
  }
  return restartGame();
};

const startGame = function () {
  console.clear();
  prompt(gameMessages.welcome);
  const playerPick = playerChoice(IN_GAME_OPTIONS, ABBREVIATED_IN_GAME_OPTIONS);
  const computerPick = computerChoice(IN_GAME_OPTIONS);
  determineWinner(playerPick, computerPick);
};

const restartGame = function () {
  prompt(gameMessages.restart);
  let response = ask().toUpperCase();
  const options = ['YES', 'Y', 'NO', 'N'];
  while (!options.includes(response)) {
    prompt(gameMessages.invalidRestart);
    response = ask().toUpperCase();
  }
  if (response === 'YES' || response === 'Y') return startGame();
  if (response === 'NO' || response === 'N') return prompt(gameMessages.goodbye);
};

startGame();