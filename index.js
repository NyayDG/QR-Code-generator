import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Enter your URL: ",
      name: "URL"
    },
    {
      message: "Enter the name of the QR code: ",
      name: "name"
    }
  ])
  .then(answers => {
    const url = answers.URL;
    const name = answers.name;

    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(`images/${name}.png`));

    fs.appendFile('URL.txt', url + '\n', err => {
      if (err) throw err;
      console.log('The URL has been appended to the file!');
    });
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
