const readline = require('readline-sync');
const ask = readline.question;
const OPTIONS = ['Rock', 'Paper', 'Scissors'];

function prompt(message) {
  console.log(` => ${message}`);
}

const playerChoice = function (array) {
  prompt(`Choose one: ${array.join(', ')}`);
  let choice = ask();
  choice = choice[0].toUpperCase() + choice.slice(1);

  while (!array.includes(choice)) {
    prompt(`Thats not a valid choice. Pick between ${array.join(', ')}`);
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
    (playerPick === 'Rock' && computerPick === 'Scissors') ||
    (playerPick === 'Paper' && computerPick === 'Rock') ||
    (playerPick === 'Scissors' && computerPick === 'Paper')) {
    return prompt(`${playerPick} beats ${computerPick}! You win!`);
  } else if (playerPick === computerPick) {
    return prompt('Its a tie');
  } else {
    return prompt(`${computerPick} beats ${playerPick}! Computer wins!`);
  }
};

determineWinner(playerChoice, computerChoice);


