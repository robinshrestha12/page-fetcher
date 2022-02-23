//importing request and file
const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
let fileToBeWritten = args[1];

console.log(args[0]);
request(args[0], (error, response, body)=>{
  if (error && (response && response.statusCode) !== 200) {
    console.log('Could not fetch the URL', error);
    console.log('statusCode: ', response && response.statusCode);// Print the response status code if a response was received
    return;
  }
  fs.writeFile((fileToBeWritten), body, err => { //write the file, file if already there overwrites the file.
    if (err) { //check if error in file extension
      console.log("File not saved", err);
      return;
    } else {
      fs.stat(fileToBeWritten, (err, stats)=>{ // getting status
        console.log(`Downloaded and saved ${stats.size} bytes to ${fileToBeWritten}.`);
      }
      );
    }
  });
});
