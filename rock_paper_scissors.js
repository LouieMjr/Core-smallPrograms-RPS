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
  }
  return choice;
};

const computerChoice = function (array) {
  const randomIndex = Math.floor(Math.random() * OPTIONS.length);
  const computerPick = array[randomIndex];
  console.log(randomIndex);
  return computerPick;
};

const determineWinner = function (player, computer) {
  const playerPick = player(OPTIONS)
  const computerPick = computer(OPTIONS)
  console.log(`You choose ${playerPick}`);
  console.log(`Computer choose ${computerPick}`);
  return;
};

determineWinner(playerChoice, computerChoice);

