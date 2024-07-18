const readline = require('readline-sync');
const gameMessages = require('./game_messages.json');
const ask = readline.question;
const OPTIONS = ['Rock', 'Paper', 'Scissors', 'Spock', 'Lizard'];

function prompt(message) {
  console.log(` => ${message}`);
}

const playerChoice = function (array) {
  prompt(`${gameMessages.playerChoose} ${array.join(', ')}`);
  let choice = ask();
  choice = choice[0].toUpperCase() + choice.slice(1);

  while (!array.includes(choice)) {
    prompt(`${gameMessages.invalidChoice} ${array.join(', ')}`);
    choice = ask();
    choice = choice[0].toUpperCase() + choice.slice(1);
  }
  return choice;
};

const computerChoice = function (array) {
  const randomIndex = Math.floor(Math.random() * OPTIONS.length);
  const computerPick = array[randomIndex];
  return computerPick;
};


const determineWinner = function (playerFunc, computerFunc) {
  const playerPick = playerFunc(OPTIONS);
  const computerPick = computerFunc(OPTIONS);
  prompt(`You choose ${playerPick}, Computer choose ${computerPick}`);

  if (
    (playerPick === 'Lizard' && (computerPick === 'Spock' || computerPick === 'Paper')) ||
    (playerPick === 'Spock' && (computerPick === 'Rock' || computerPick === 'Scissors')) ||
    (playerPick === 'Rock' && (computerPick === 'Scissors' || computerPick === 'Lizard')) ||
    (playerPick === 'Paper' && (computerPick === 'Rock' || computerPick === 'Spock')) ||
    (playerPick === 'Scissors' && (computerPick === 'Paper' || computerPick === 'Lizard'))) {
    prompt(`${playerPick} beats ${computerPick}! You win!`);
  } else if (playerPick === computerPick) {
    prompt('Its a tie');
  } else {
    prompt(`${computerPick} beats ${playerPick}! Computer wins!`);
  }
  return restartGame();
};

const startGame = function () {
  console.clear();
  prompt(gameMessages.welcome);
  determineWinner(playerChoice, computerChoice);
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