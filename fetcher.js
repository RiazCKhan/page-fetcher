const request = require('request'); // request library
const userInput = process.argv.slice(2); // accept CLI arguments

const fs = require('fs'); // fs module to write files

const link = userInput[0]; // save CLI to bindings for readability
const localpath = userInput[1];

const fetch = function(link, localpath) {
  request(link, (error, response, body) => {
    if (error) { // edge case: ensure valid URL and response
      return console.log("Invalid URL or non-200 result");
    }
    if (fs.existsSync(localpath)) { // edge case: ensure valid filepath
      fs.writeFile(localpath, body, (err) => {
        if (err) throw err;
        console.log(`Downloaded and saved ${body.length} bytes to ${localpath}`);
      });
    } else {
      console.log("Invalid Filepath");
    }
  });
};

fetch(link, localpath);

