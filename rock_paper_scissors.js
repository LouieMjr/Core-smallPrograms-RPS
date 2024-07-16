const readline = require('readline-sync');
const ask = readline.question;
const OPTIONS = ['Rock', 'Paper', 'Scissors'];

function prompt(message) {
  console.log(` => ${message}`);
}

prompt(`Choose one: ${OPTIONS.join(', ')}`);
let choice = ask();
choice = choice[0].toUpperCase() + choice.slice(1);

while (!OPTIONS.includes(choice)) {
  prompt(`Thats not a valid choice. Pick between ${OPTIONS.join(', ')}`);
  choice = ask();
}

const computerChoice = function (array) {
  const index = Math.round(Math.random() * OPTIONS.length);
  return `Computer choose ${array[index]}`;
};

console.log(computerChoice(OPTIONS));

