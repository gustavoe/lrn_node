import inquirer from 'inquirer';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'favColor',
      message: 'What is your favorite color?',
      default: 'Blue'
    },
  ])
  .then(answers => {
    console.info('Your answer are :', JSON.stringify(answers));
  });
